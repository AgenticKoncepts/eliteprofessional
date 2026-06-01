import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "@/lib/admin-middleware";

const MAX_URLS = 100;
const MAX_URL_LEN = 2048;
function validateUrls(urls: unknown): string[] {
  if (!Array.isArray(urls)) throw new Error("urls must be an array");
  if (urls.length === 0) throw new Error("No URLs provided");
  if (urls.length > MAX_URLS) throw new Error(`Too many URLs (max ${MAX_URLS})`);
  const out: string[] = [];
  for (const raw of urls) {
    if (typeof raw !== "string" || raw.length === 0 || raw.length > MAX_URL_LEN) {
      throw new Error("Invalid URL");
    }
    let u: URL;
    try { u = new URL(raw); } catch { throw new Error(`Invalid URL: ${raw.slice(0, 80)}`); }
    if (u.protocol !== "https:") throw new Error("Only https:// URLs are allowed");
    out.push(u.toString());
  }
  return out;
}

function admin() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function fcKey() {
  const k = process.env.FIRECRAWL_API_KEY;
  if (!k) throw new Error("FIRECRAWL_API_KEY not configured");
  return k;
}

const PRODUCT_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string" },
    brand: { type: "string" },
    category: { type: "string" },
    sku: { type: "string" },
    price_aed: { type: "number" },
    price_max_aed: { type: ["number", "null"] },
    variants: { type: "array", items: { type: "string" } },
    images: { type: "array", items: { type: "string" } },
    description: { type: "string" },
    in_stock: { type: "boolean" },
  },
  required: ["name", "price_aed"],
};

async function fcScrape(url: string) {
  const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${fcKey()}` },
    body: JSON.stringify({
      url,
      formats: [{ type: "json", schema: PRODUCT_SCHEMA }],
      onlyMainContent: true,
    }),
  });
  const json = (await res.json()) as { success?: boolean; data?: { json?: Record<string, unknown> }; error?: string };
  if (!res.ok || !json.success) throw new Error(json.error || `Scrape failed (${res.status})`);
  return json.data?.json ?? {};
}

function approxEq(a: number, b: number, tol = 0.05) {
  if (a === 0 && b === 0) return true;
  const m = Math.max(Math.abs(a), Math.abs(b));
  return Math.abs(a - b) / m <= tol;
}

// =========================================================================
// VERIFICATION
// =========================================================================
export const verifyProduct = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const sb = admin();
    const { data: row, error } = await sb.from("products").select("*").eq("slug", data.slug).maybeSingle();
    if (error || !row) throw new Error("Product not found");
    if (!row.source_url) throw new Error("No source URL on product");

    let scraped: Record<string, unknown> = {};
    let err: string | null = null;
    try {
      scraped = await fcScrape(row.source_url);
    } catch (e) {
      err = (e as Error).message;
    }

    const sName = String(scraped.name ?? "").trim();
    const sPrice = Number(scraped.price_aed ?? 0);
    const sVariants = Array.isArray(scraped.variants) ? (scraped.variants as string[]) : [];
    const sImages = Array.isArray(scraped.images) ? (scraped.images as string[]) : [];

    const dbVariants = (row.variants as string[]) ?? [];
    const dbImages = (row.images as string[]) ?? [];

    const name_match = err ? null : sName.toLowerCase() === String(row.name).toLowerCase();
    const price_match = err ? null : approxEq(Number(row.price_aed), sPrice);
    const variants_match = err ? null : sVariants.length === dbVariants.length;
    const images_match = err ? null : sImages.length === dbImages.length;

    const ok = !err && !!name_match && !!price_match && !!variants_match && !!images_match;
    const diff = err ? null : {
      name: { db: row.name, scraped: sName },
      price: { db: Number(row.price_aed), scraped: sPrice },
      variants: { db: dbVariants.length, scraped: sVariants.length },
      images: { db: dbImages.length, scraped: sImages.length },
    };

    await sb.from("product_verifications").insert({
      product_slug: row.slug,
      source_url: row.source_url,
      name_match,
      price_match,
      variants_match,
      images_match,
      ok,
      scraped,
      diff,
      error: err,
    });

    return { ok, diff, error: err };
  });

export const listLatestVerifications = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
  const sb = admin();
  const { data, error } = await sb
    .from("product_verifications")
    .select("*")
    .order("checked_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return data ?? [];
});

// =========================================================================
// CATEGORY SYNC
// =========================================================================
export const runCategorySync = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .handler(async () => {
  const sb = admin();
  const { data: maps } = await sb.from("category_mappings").select("raw_category,canonical_name");
  const lookup = new Map<string, string>();
  (maps ?? []).forEach((m) => lookup.set(m.raw_category, m.canonical_name));

  const { data: prods } = await sb.from("products").select("slug,category");
  let updated = 0;
  let unmapped: string[] = [];
  const unmappedSet = new Set<string>();

  for (const p of prods ?? []) {
    if (!p.category) continue;
    const target = lookup.get(p.category);
    if (!target) {
      if (!unmappedSet.has(p.category)) {
        unmappedSet.add(p.category);
        unmapped.push(p.category);
      }
      continue;
    }
    if (target !== p.category) {
      await sb.from("products").update({ category: target }).eq("slug", p.slug);
      updated++;
    }
  }

  return { updated, unmapped, total: prods?.length ?? 0 };
});

export const listCategoryMappings = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
  const sb = admin();
  const [{ data: maps }, { data: prods }] = await Promise.all([
    sb.from("category_mappings").select("*").order("raw_category"),
    sb.from("products").select("category"),
  ]);
  const counts = new Map<string, number>();
  (prods ?? []).forEach((p) => {
    if (p.category) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  });
  const mapped = new Set((maps ?? []).map((m) => m.raw_category));
  const unmapped = Array.from(counts.entries())
    .filter(([k]) => !mapped.has(k))
    .map(([raw_category, product_count]) => ({ raw_category, product_count }))
    .sort((a, b) => b.product_count - a.product_count);
  return { mappings: maps ?? [], unmapped, counts: Object.fromEntries(counts) };
});

export const upsertCategoryMapping = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { raw_category: string; canonical_slug: string; canonical_name: string }) => d)
  .handler(async ({ data }) => {
    const sb = admin();
    const { error } = await sb
      .from("category_mappings")
      .upsert({ ...data }, { onConflict: "raw_category" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCategoryMapping = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const sb = admin();
    const { error } = await sb.from("category_mappings").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// =========================================================================
// IMPORT JOBS
// =========================================================================
export const listImportJobs = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => {
  const sb = admin();
  const { data, error } = await sb
    .from("import_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getJobAudit = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { job_id: string; status?: string }) => d)
  .handler(async ({ data }) => {
    const sb = admin();
    let q = sb
      .from("import_audit")
      .select("*")
      .eq("job_id", data.job_id)
      .order("created_at", { ascending: false })
      .limit(2000);
    if (data.status) q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const refreshJobStatus = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { job_id: string }) => d)
  .handler(async ({ data }) => {
    const sb = admin();
    const { data: job } = await sb.from("import_jobs").select("*").eq("id", data.job_id).maybeSingle();
    if (!job) throw new Error("Job not found");
    if (!job.firecrawl_job_id) throw new Error("No Firecrawl job linked");

    const res = await fetch(`https://api.firecrawl.dev/v2/batch/scrape/${job.firecrawl_job_id}`, {
      headers: { Authorization: `Bearer ${fcKey()}` },
    });
    const j = (await res.json()) as {
      status?: string;
      total?: number;
      completed?: number;
      success?: boolean;
      error?: string;
    };
    if (!res.ok) throw new Error(j.error || `Status check failed (${res.status})`);

    await sb
      .from("import_jobs")
      .update({
        status: j.status ?? job.status,
        total: j.total ?? job.total,
        completed: j.completed ?? job.completed,
        finished_at: j.status === "completed" ? new Date().toISOString() : job.finished_at,
      })
      .eq("id", data.job_id);

    return { status: j.status, total: j.total, completed: j.completed };
  });

export const startScrapeJob = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { urls: string[]; notes?: string }) => ({
    urls: validateUrls(d.urls),
    notes: typeof d.notes === "string" ? d.notes.slice(0, 500) : undefined,
  }))
  .handler(async ({ data }) => {
    const sb = admin();
    const res = await fetch("https://api.firecrawl.dev/v2/batch/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${fcKey()}` },
      body: JSON.stringify({
        urls: data.urls,
        formats: [{ type: "json", schema: PRODUCT_SCHEMA }, "markdown"],
        onlyMainContent: true,
      }),
    });
    const j = (await res.json()) as { id?: string; success?: boolean; error?: string };
    if (!res.ok || !j.id) throw new Error(j.error || "Failed to start scrape");

    const { data: row, error } = await sb
      .from("import_jobs")
      .insert({
        firecrawl_job_id: j.id,
        kind: "batch_scrape",
        status: "scraping",
        total: data.urls.length,
        notes: data.notes ?? null,
        meta: { urls: data.urls.slice(0, 50), url_count: data.urls.length },
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { job: row };
  });

export const retryFailed = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { job_id: string }) => d)
  .handler(async ({ data }) => {
    const sb = admin();
    const { data: failed } = await sb
      .from("import_audit")
      .select("source_url")
      .eq("job_id", data.job_id)
      .eq("status", "failed");
    const urls = Array.from(new Set((failed ?? []).map((r) => r.source_url).filter(Boolean))) as string[];
    if (!urls.length) return { started: 0 };

    const res = await fetch("https://api.firecrawl.dev/v2/batch/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${fcKey()}` },
      body: JSON.stringify({
        urls,
        formats: [{ type: "json", schema: PRODUCT_SCHEMA }, "markdown"],
        onlyMainContent: true,
      }),
    });
    const j = (await res.json()) as { id?: string; success?: boolean; error?: string };
    if (!res.ok || !j.id) throw new Error(j.error || "Failed to start retry");

    const { data: row, error } = await sb
      .from("import_jobs")
      .insert({
        firecrawl_job_id: j.id,
        kind: "retry",
        status: "scraping",
        total: urls.length,
        notes: `Retry of ${data.job_id}`,
        meta: { retry_of: data.job_id, url_count: urls.length },
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { started: urls.length, job: row };
  });
