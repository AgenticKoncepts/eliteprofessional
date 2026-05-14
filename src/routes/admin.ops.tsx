import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";
import { CATEGORIES } from "@/data/products";
import {
  verifyProduct,
  listLatestVerifications,
  runCategorySync,
  listCategoryMappings,
  upsertCategoryMapping,
  deleteCategoryMapping,
  listImportJobs,
  getJobAudit,
  refreshJobStatus,
  retryFailed,
} from "@/lib/ops.functions";
import { useAllProductsAdmin } from "@/lib/products-api";

type Verif = { id: string; product_slug: string; ok: boolean; error: string | null; name_match: boolean | null; price_match: boolean | null; variants_match: boolean | null; images_match: boolean | null; checked_at: string; diff: unknown };
type Mapping = { id: string; raw_category: string; canonical_slug: string; canonical_name: string };
type Unmapped = { raw_category: string; product_count: number };
type ImportJob = { id: string; firecrawl_job_id: string | null; kind: string; status: string; total: number; completed: number; succeeded: number; failed: number; notes: string | null; started_at: string };
type AuditRow = { id: string; source_url: string | null; error: string | null };

export const Route = createFileRoute("/admin/ops")({
  head: () => ({ meta: [{ title: "Operations — Elite Admin" }, { name: "robots", content: "noindex" }] }),
  component: OpsPage,
});

type Tab = "verify" | "categories" | "imports";

function OpsPage() {
  const [tab, setTab] = useState<Tab>("verify");
  return (
    <Layout>
      <div className="container-elite py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl">Operations</h1>
            <p className="text-sm text-muted-foreground">Verify, sync categories, and track imports.</p>
          </div>
          <Link to="/admin" className="text-xs tracking-[0.25em] text-muted-foreground hover:text-gold">← CATALOGUE</Link>
        </div>

        <div className="flex gap-1 border-b border-border mb-6">
          {([
            ["verify", "VERIFY"],
            ["categories", "CATEGORIES"],
            ["imports", "IMPORTS"],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-2 text-xs tracking-[0.25em] border-b-2 -mb-px ${
                tab === k ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {tab === "verify" && <VerifyTab />}
        {tab === "categories" && <CategoriesTab />}
        {tab === "imports" && <ImportsTab />}
      </div>
    </Layout>
  );
}

// ===================== VERIFY ============================
function VerifyTab() {
  const { data: products = [] } = useAllProductsAdmin();
  const fetchVerifs = listLatestVerifications;
  const verify = verifyProduct;
  const qc = useQueryClient();
  const { data: verifs = [] } = useQuery({ queryKey: ["verifs"], queryFn: () => fetchVerifs() as Promise<Verif[]> });
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [limit, setLimit] = useState(20);

  const latestBySlug = new Map<string, (typeof verifs)[number]>();
  for (const v of verifs) if (!latestBySlug.has(v.product_slug)) latestBySlug.set(v.product_slug, v);

  const verifiable = products.filter((p) => p.sourceUrl);
  const matches = verifs.filter((v) => v.ok).length;
  const mismatches = verifs.filter((v) => !v.ok && !v.error).length;
  const errors = verifs.filter((v) => v.error).length;

  const runBatch = async () => {
    setRunning(true);
    const targets = verifiable.slice(0, limit);
    setProgress({ done: 0, total: targets.length });
    for (let i = 0; i < targets.length; i++) {
      try {
        await verify({ data: { slug: targets[i].slug } });
      } catch (e) {
        toast.error(`${targets[i].slug}: ${(e as Error).message}`);
      }
      setProgress({ done: i + 1, total: targets.length });
    }
    setRunning(false);
    qc.invalidateQueries({ queryKey: ["verifs"] });
  };

  const verifyOne = async (slug: string) => {
    try {
      const r = await verify({ data: { slug } }) as { ok: boolean; error: string | null };
      if (r.ok) toast.success("Match"); else toast.error(r.error || "Mismatch");
      qc.invalidateQueries({ queryKey: ["verifs"] });
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Verifiable" value={verifiable.length} />
        <Stat label="Matches" value={matches} tone="ok" />
        <Stat label="Mismatches" value={mismatches} tone="warn" />
        <Stat label="Scrape errors" value={errors} tone="err" />
      </div>

      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-[11px] tracking-wider text-muted-foreground block mb-1">BATCH SIZE</label>
          <input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value) || 1)} className="w-24 px-3 py-2 border border-border bg-background" />
        </div>
        <button onClick={runBatch} disabled={running} className="px-4 py-2 bg-primary text-primary-foreground text-xs tracking-[0.25em] disabled:opacity-50">
          {running ? `VERIFYING ${progress?.done}/${progress?.total}…` : `VERIFY NEXT ${limit}`}
        </button>
        <p className="text-xs text-muted-foreground">Re-scrapes each source URL via Firecrawl and compares name, price, variants, and image counts.</p>
      </div>

      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs tracking-wider">
            <tr>
              <th className="text-start p-3">Product</th>
              <th className="text-start p-3">Name</th>
              <th className="text-start p-3">Price</th>
              <th className="text-start p-3">Variants</th>
              <th className="text-start p-3">Images</th>
              <th className="text-start p-3">Checked</th>
              <th className="text-end p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {verifiable.slice(0, 200).map((p) => {
              const v = latestBySlug.get(p.slug);
              return (
                <tr key={p.slug} className="border-t border-border">
                  <td className="p-3 max-w-[24rem]"><div className="line-clamp-1">{p.name}</div><div className="text-xs text-muted-foreground">{p.slug}</div></td>
                  <td className="p-3"><Cell flag={v?.name_match} diff={v?.diff ? `${(v.diff as { name?: { db?: string; scraped?: string } }).name?.db ?? ""} → ${(v.diff as { name?: { db?: string; scraped?: string } }).name?.scraped ?? ""}` : null} /></td>
                  <td className="p-3"><Cell flag={v?.price_match} diff={v?.diff ? `${(v.diff as { price?: { db?: number; scraped?: number } }).price?.db} → ${(v.diff as { price?: { db?: number; scraped?: number } }).price?.scraped}` : null} /></td>
                  <td className="p-3"><Cell flag={v?.variants_match} diff={v?.diff ? `${(v.diff as { variants?: { db?: number; scraped?: number } }).variants?.db} / ${(v.diff as { variants?: { db?: number; scraped?: number } }).variants?.scraped}` : null} /></td>
                  <td className="p-3"><Cell flag={v?.images_match} diff={v?.diff ? `${(v.diff as { images?: { db?: number; scraped?: number } }).images?.db} / ${(v.diff as { images?: { db?: number; scraped?: number } }).images?.scraped}` : null} /></td>
                  <td className="p-3 text-xs text-muted-foreground">{v ? new Date(v.checked_at).toLocaleString() : "—"}</td>
                  <td className="p-3 text-end">
                    <button onClick={() => verifyOne(p.slug)} className="px-2 py-1 border border-border text-xs hover:border-gold">CHECK</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Cell({ flag, diff }: { flag: boolean | null | undefined; diff?: string | null | false }) {
  if (flag === undefined) return <span className="text-muted-foreground">—</span>;
  if (flag === null) return <span className="text-destructive">err</span>;
  return (
    <span title={diff || ""} className={flag ? "text-emerald-600" : "text-destructive"}>
      {flag ? "✓" : "✕"}
    </span>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: "ok" | "warn" | "err" }) {
  const c = tone === "ok" ? "text-emerald-600" : tone === "warn" ? "text-amber-600" : tone === "err" ? "text-destructive" : "";
  return (
    <div className="border border-border p-3">
      <div className="text-[10px] tracking-[0.2em] text-muted-foreground">{label.toUpperCase()}</div>
      <div className={`text-2xl font-display ${c}`}>{value}</div>
    </div>
  );
}

// ===================== CATEGORIES ============================
function CategoriesTab() {
  const fetchMaps = listCategoryMappings;
  const sync = runCategorySync;
  const upsert = upsertCategoryMapping;
  const del = deleteCategoryMapping;
  const qc = useQueryClient();

  const { data, refetch } = useQuery({ queryKey: ["cat-maps"], queryFn: () => fetchMaps() as Promise<{ mappings: Mapping[]; unmapped: Unmapped[]; counts: Record<string, number> }> });
  const syncMut = useMutation({
    mutationFn: () => sync() as Promise<{ updated: number; unmapped: string[]; total: number }>,
    onSuccess: (r) => { toast.success(`Synced. Updated ${r.updated}. Unmapped: ${r.unmapped.length}`); refetch(); qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products"] }); qc.invalidateQueries({ queryKey: ["categories-distinct"] }); },
    onError: (e) => toast.error((e as Error).message),
  });

  const setMap = async (raw: string, slug: string) => {
    const cat = CATEGORIES.find((c) => c.slug === slug);
    if (!cat) return;
    await upsert({ data: { raw_category: raw, canonical_slug: slug, canonical_name: cat.name } });
    toast.success("Mapping saved");
    refetch();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground max-w-xl">Map every raw scraped category to one of your storefront category bar / shop-by-category cards. Run sync to apply mappings to all products.</p>
        <button onClick={() => syncMut.mutate()} disabled={syncMut.isPending} className="px-4 py-2 bg-primary text-primary-foreground text-xs tracking-[0.25em] disabled:opacity-50">
          {syncMut.isPending ? "SYNCING…" : "RUN SYNC"}
        </button>
      </div>

      <Section title={`Unmapped raw categories (${data?.unmapped.length ?? 0})`}>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs tracking-wider">
              <tr><th className="text-start p-3">Raw</th><th className="text-start p-3">#</th><th className="text-start p-3">Map to</th></tr>
            </thead>
            <tbody>
              {(data?.unmapped ?? []).map((u) => (
                <tr key={u.raw_category} className="border-t border-border">
                  <td className="p-3">{u.raw_category}</td>
                  <td className="p-3">{u.product_count}</td>
                  <td className="p-3">
                    <select defaultValue="" onChange={(e) => e.target.value && setMap(u.raw_category, e.target.value)} className="px-2 py-1 border border-border bg-background text-xs">
                      <option value="">— choose —</option>
                      {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {(data?.unmapped ?? []).length === 0 && <tr><td colSpan={3} className="p-6 text-center text-muted-foreground text-xs">All raw categories are mapped 🎉</td></tr>}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={`Existing mappings (${data?.mappings.length ?? 0})`}>
        <div className="border border-border max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs tracking-wider sticky top-0">
              <tr><th className="text-start p-3">Raw</th><th className="text-start p-3">Maps to</th><th className="text-start p-3">#</th><th className="text-end p-3"></th></tr>
            </thead>
            <tbody>
              {(data?.mappings ?? []).map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="p-3">{m.raw_category}</td>
                  <td className="p-3">
                    <select value={m.canonical_slug} onChange={(e) => setMap(m.raw_category, e.target.value)} className="px-2 py-1 border border-border bg-background text-xs">
                      {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-muted-foreground">{data?.counts[m.raw_category] ?? 0}</td>
                  <td className="p-3 text-end">
                    <button onClick={async () => { await del({ data: { id: m.id } }); refetch(); }} className="text-xs text-destructive hover:underline">remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h2 className="text-xs tracking-[0.25em] text-muted-foreground mb-3">{title.toUpperCase()}</h2>{children}</div>;
}

// ===================== IMPORTS ============================
function ImportsTab() {
  const fetchJobs = listImportJobs;
  const refresh = refreshJobStatus;
  const audit = getJobAudit;
  const retry = retryFailed;
  const qc = useQueryClient();

  const { data: jobs = [] } = useQuery({ queryKey: ["import-jobs"], queryFn: () => fetchJobs() as Promise<ImportJob[]>, refetchInterval: 15_000 });
  const [openId, setOpenId] = useState<string | null>(null);
  const { data: auditRows = [] } = useQuery({
    queryKey: ["audit", openId],
    queryFn: () => (openId ? audit({ data: { job_id: openId, status: "failed" } }) as Promise<AuditRow[]> : Promise.resolve([] as AuditRow[])),
    enabled: !!openId,
  });

  const refreshOne = async (id: string) => {
    try { const r = await refresh({ data: { job_id: id } }) as { status: string; completed: number; total: number }; toast.success(`${r.status}: ${r.completed}/${r.total}`); qc.invalidateQueries({ queryKey: ["import-jobs"] }); }
    catch (e) { toast.error((e as Error).message); }
  };
  const retryOne = async (id: string) => {
    try { const r = await retry({ data: { job_id: id } }) as { started: number }; toast.success(`Started retry for ${r.started} URLs`); qc.invalidateQueries({ queryKey: ["import-jobs"] }); }
    catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Tracks every Firecrawl batch scrape, with completion counts and a per-URL audit log. Polls every 15 s.</p>
      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs tracking-wider">
            <tr>
              <th className="text-start p-3">Started</th>
              <th className="text-start p-3">Kind</th>
              <th className="text-start p-3">Status</th>
              <th className="text-start p-3">Progress</th>
              <th className="text-start p-3">Succeeded</th>
              <th className="text-start p-3">Failed</th>
              <th className="text-start p-3">Notes</th>
              <th className="text-end p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground text-xs">No import jobs yet.</td></tr>}
            {jobs.map((j) => (
              <Fragment key={j.id}>
                <tr key={j.id} className="border-t border-border">
                  <td className="p-3 text-xs">{new Date(j.started_at).toLocaleString()}</td>
                  <td className="p-3 text-xs">{j.kind}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 border ${j.status === "completed" ? "border-emerald-600 text-emerald-600" : j.status === "failed" ? "border-destructive text-destructive" : "border-amber-600 text-amber-600"}`}>{j.status}</span></td>
                  <td className="p-3 text-xs">{j.completed}/{j.total}</td>
                  <td className="p-3 text-xs text-emerald-600">{j.succeeded}</td>
                  <td className="p-3 text-xs text-destructive">{j.failed}</td>
                  <td className="p-3 text-xs text-muted-foreground max-w-[16rem] truncate">{j.notes ?? "—"}</td>
                  <td className="p-3 text-end whitespace-nowrap">
                    <button onClick={() => refreshOne(j.id)} className="px-2 py-1 border border-border text-xs hover:border-gold mr-1">REFRESH</button>
                    <button onClick={() => setOpenId(openId === j.id ? null : j.id)} className="px-2 py-1 border border-border text-xs hover:border-gold mr-1">{openId === j.id ? "CLOSE" : "AUDIT"}</button>
                    {j.failed > 0 && <button onClick={() => retryOne(j.id)} className="px-2 py-1 border border-border text-xs hover:border-gold">RETRY FAILED</button>}
                  </td>
                </tr>
                {openId === j.id && (
                  <tr className="bg-secondary/30">
                    <td colSpan={8} className="p-3">
                      <div className="text-xs tracking-[0.25em] text-muted-foreground mb-2">FAILED URLS ({auditRows.length})</div>
                      <div className="max-h-72 overflow-y-auto border border-border bg-background">
                        {auditRows.length === 0 ? <div className="p-3 text-xs text-muted-foreground">None.</div> :
                          auditRows.map((r) => (
                            <div key={r.id} className="p-2 border-b border-border last:border-0 text-xs">
                              <div className="truncate"><a href={r.source_url ?? "#"} target="_blank" rel="noreferrer" className="text-gold hover:underline">{r.source_url}</a></div>
                              {r.error && <div className="text-destructive mt-0.5">{r.error}</div>}
                            </div>
                          ))
                        }
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
