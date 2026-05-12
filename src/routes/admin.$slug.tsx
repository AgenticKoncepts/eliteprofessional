import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";
import { useProductBySlug } from "@/lib/products-api";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/$slug")({
  head: () => ({ meta: [{ title: "Edit product — Elite Admin" }, { name: "robots", content: "noindex" }] }),
  component: EditProduct,
});

function EditProduct() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, refetch } = useProductBySlug(slug);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "", name_ar: "", price: "0", price_max: "", stock: "0",
    category: "", brand: "", sku: "", description: "", description_ar: "",
    variants: "", is_published: true, is_featured: false,
  });
  const [images, setImages] = useState<string[]>([]);
  const [primary, setPrimary] = useState<string>("");
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (!product) return;
    const p = product as typeof product & { isPublished?: boolean; isFeatured?: boolean; sku?: string | null; brand?: string | null; images?: string[] };
    setForm({
      name: p.name,
      name_ar: "",
      price: String(p.priceAed),
      price_max: p.priceMaxAed ? String(p.priceMaxAed) : "",
      stock: String((p as { stock?: number }).stock ?? 0),
      category: p.category ?? "",
      brand: p.brand ?? "",
      sku: p.sku ?? "",
      description: p.description ?? "",
      description_ar: p.description_ar ?? "",
      variants: (p.variantOptions ?? []).join("\n"),
      is_published: !!p.isPublished,
      is_featured: !!p.isFeatured,
    });
    setImages(p.images ?? [p.image]);
    setPrimary(p.image);
    // Fetch the AR name separately
    supabase.from("products").select("name_ar").eq("slug", slug).maybeSingle().then(({ data }) => {
      if (data?.name_ar) setForm((f) => ({ ...f, name_ar: data.name_ar as string }));
    });
  }, [product, slug]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSaving(true);

    let allImages = [...images];
    let newPrimary = primary;
    for (const file of newImages) {
      const path = `${slug}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
      if (upErr) { toast.error(upErr.message); setSaving(false); return; }
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      allImages.push(pub.publicUrl);
      if (!newPrimary) newPrimary = pub.publicUrl;
    }
    if (!newPrimary && allImages.length > 0) newPrimary = allImages[0];

    const variantList = form.variants.split("\n").map((s) => s.trim()).filter(Boolean);
    const stockNum = Number(form.stock) || 0;

    const { error } = await supabase.from("products").update({
      name: form.name,
      name_ar: form.name_ar || null,
      price_aed: Number(form.price) || 0,
      price_max_aed: form.price_max ? Number(form.price_max) : null,
      stock: stockNum,
      in_stock: stockNum > 0,
      category: form.category || null,
      brand: form.brand || null,
      sku: form.sku || null,
      description: form.description || null,
      description_ar: form.description_ar || null,
      variants: variantList,
      is_published: form.is_published,
      is_featured: form.is_featured,
      primary_image: newPrimary || null,
      images: allImages,
    }).eq("slug", slug);

    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    setNewImages([]);
    refetch();
  };

  const removeImg = (url: string) => {
    setImages((arr) => arr.filter((i) => i !== url));
    if (primary === url) setPrimary(images.find((i) => i !== url) ?? "");
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${form.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("slug", slug);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); navigate({ to: "/admin" }); }
  };

  if (isLoading) return <Layout><div className="container-elite py-20 text-center">Loading…</div></Layout>;
  if (!product) return (
    <Layout>
      <div className="container-elite py-20 text-center">
        <p className="mb-4">Product not found.</p>
        <Link to="/admin" className="text-gold hover:underline">← Back to admin</Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container-elite py-10 max-w-3xl">
        <Link to="/admin" className="text-xs text-muted-foreground hover:text-gold tracking-wider mb-6 inline-block">← BACK</Link>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl">Edit product</h1>
          <button onClick={handleDelete} className="p-2 border border-border hover:border-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name (EN)" required><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <Field label="Name (AR)"><input dir="rtl" value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Price (AED)" required><input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="w-full px-3 py-2 border border-border bg-background" /></Field>
            <Field label="Max price (range)"><input type="number" step="0.01" value={form.price_max} onChange={(e) => setForm({ ...form, price_max: e.target.value })} className="w-full px-3 py-2 border border-border bg-background" /></Field>
            <Field label="Stock"><input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Category"><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-border bg-background" /></Field>
            <Field label="Brand"><input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full px-3 py-2 border border-border bg-background" /></Field>
            <Field label="SKU"><input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          </div>
          <Field label="Description (EN)"><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <Field label="Description (AR)"><textarea dir="rtl" value={form.description_ar} onChange={(e) => setForm({ ...form, description_ar: e.target.value })} rows={5} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <Field label="Variants (one per line)"><textarea value={form.variants} onChange={(e) => setForm({ ...form, variants: e.target.value })} rows={4} className="w-full px-3 py-2 border border-border bg-background" /></Field>

          <div>
            <label className="text-[11px] tracking-[0.2em] block mb-2 text-muted-foreground">Images</label>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {images.map((url) => (
                <div key={url} className={`relative border-2 ${primary === url ? "border-gold" : "border-border"}`}>
                  <img src={url} alt="" className="w-full aspect-square object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex text-[10px] tracking-wider">
                    <button type="button" onClick={() => setPrimary(url)} className="flex-1 py-1 bg-background/90 hover:bg-gold/30">{primary === url ? "PRIMARY" : "SET MAIN"}</button>
                    <button type="button" onClick={() => removeImg(url)} className="px-2 py-1 bg-background/90 hover:bg-destructive hover:text-destructive-foreground">✕</button>
                  </div>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={(e) => setNewImages(Array.from(e.target.files ?? []))} />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /> Published</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Featured on home</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] disabled:opacity-50">{saving ? "SAVING…" : "SAVE CHANGES"}</button>
            <Link to="/products/$productId" params={{ productId: slug }} className="px-6 py-3 border border-border text-xs tracking-[0.25em]">VIEW</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.2em] block mb-1.5 text-muted-foreground">{label}{required && " *"}</label>
      {children}
    </div>
  );
}
