import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/new")({
  head: () => ({ meta: [{ title: "New product — Elite Admin" }, { name: "robots", content: "noindex" }] }),
  component: NewProductPage,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function NewProductPage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const finalSlug = slug || slugify(name);
    let primaryImage: string | null = null;
    const images: string[] = [];
    if (imageFile) {
      const path = `${finalSlug}/${Date.now()}-${imageFile.name}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, imageFile, { upsert: true });
      if (upErr) { toast.error(upErr.message); setSaving(false); return; }
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(path);
      primaryImage = pub.publicUrl;
      images.push(pub.publicUrl);
    }
    const { error } = await supabase.from("products").insert({
      slug: finalSlug,
      name,
      price_aed: Number(price) || 0,
      stock: Number(stock) || 0,
      in_stock: (Number(stock) || 0) > 0,
      category: category || null,
      brand: brand || null,
      description: description || null,
      primary_image: primaryImage,
      images,
      is_published: true,
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Product created");
    navigate({ to: "/admin/$slug", params: { slug: finalSlug } });
  };

  return (
    <Layout>
      <div className="container-elite py-10 max-w-2xl">
        <Link to="/admin" className="text-xs text-muted-foreground hover:text-gold tracking-wider mb-6 inline-block">← BACK</Link>
        <h1 className="font-display text-3xl mb-6">New product</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name" required><input value={name} onChange={(e) => { setName(e.target.value); if (!slug) setSlug(slugify(e.target.value)); }} required className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <Field label="Slug (URL)"><input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-from-name" className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (AED)" required><input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 border border-border bg-background" /></Field>
            <Field label="Stock"><input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category"><input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-border bg-background" /></Field>
            <Field label="Brand"><input value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          </div>
          <Field label="Description"><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className="w-full px-3 py-2 border border-border bg-background" /></Field>
          <Field label="Image"><input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} /></Field>
          <button type="submit" disabled={saving} className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] disabled:opacity-50">{saving ? "SAVING…" : "CREATE PRODUCT"}</button>
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
