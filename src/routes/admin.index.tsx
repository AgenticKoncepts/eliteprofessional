import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAllProductsAdmin } from "@/lib/products-api";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { Pencil, Trash2, Plus, Eye, EyeOff, Star } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — Elite Professional" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminProducts,
});

function AdminProducts() {
  const { data: products = [], isLoading, refetch } = useAllProductsAdmin();
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "unpublished" | "out">("all");

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "published" && !p.isPublished) return false;
    if (filter === "unpublished" && p.isPublished) return false;
    if (filter === "out" && (p.stock ?? 0) > 0) return false;
    return true;
  });

  const togglePublish = async (slug: string, current: boolean) => {
    const { error } = await supabase.from("products").update({ is_published: !current }).eq("slug", slug);
    if (error) toast.error(error.message);
    else { toast.success(current ? "Unpublished" : "Published"); qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products"] }); }
  };
  const toggleFeatured = async (slug: string, current: boolean) => {
    const { error } = await supabase.from("products").update({ is_featured: !current }).eq("slug", slug);
    if (error) toast.error(error.message);
    else { toast.success(current ? "Unfeatured" : "Featured"); qc.invalidateQueries({ queryKey: ["admin-products"] }); qc.invalidateQueries({ queryKey: ["products"] }); }
  };
  const updateStock = async (slug: string, value: number) => {
    const { error } = await supabase.from("products").update({ stock: value, in_stock: value > 0 }).eq("slug", slug);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["admin-products"] });
  };
  const remove = async (slug: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("slug", slug);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); refetch(); }
  };

  return (
    <Layout>
      <div className="container-elite py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl">Catalogue admin</h1>
            <p className="text-sm text-muted-foreground">{products.length} products in database. ⚠️ Open access — add login before publishing.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/ops" className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs tracking-[0.25em] hover:border-gold">OPS &amp; AUDIT</Link>
            <Link to="/admin/new" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs tracking-[0.25em]">
              <Plus className="w-4 h-4" /> NEW PRODUCT
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[240px] px-3 py-2 border border-border bg-background text-sm"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="px-3 py-2 border border-border bg-background text-sm">
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            <option value="out">Out of stock</option>
          </select>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading…</div>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-xs tracking-wider">
                <tr>
                  <th className="text-start p-3">Image</th>
                  <th className="text-start p-3">Name</th>
                  <th className="text-start p-3">Category</th>
                  <th className="text-start p-3">Brand</th>
                  <th className="text-start p-3">Price (AED)</th>
                  <th className="text-start p-3">Stock</th>
                  <th className="text-start p-3">Flags</th>
                  <th className="text-end p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="p-3"><img src={p.image} alt="" className="w-12 h-12 object-cover bg-secondary" /></td>
                    <td className="p-3 max-w-md"><div className="font-medium line-clamp-2">{p.name}</div><div className="text-xs text-muted-foreground">{p.slug}</div></td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.brand ?? "—"}</td>
                    <td className="p-3">{p.priceAed.toFixed(2)}</td>
                    <td className="p-3">
                      <input type="number" defaultValue={p.stock ?? 0} onBlur={(e) => { const v = parseInt(e.target.value || "0", 10); if (v !== (p.stock ?? 0)) updateStock(p.slug, v); }} className="w-20 px-2 py-1 border border-border bg-background" />
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button onClick={() => togglePublish(p.slug, !!p.isPublished)} title={p.isPublished ? "Published" : "Hidden"} className={`p-1.5 border ${p.isPublished ? "border-gold text-gold" : "border-border text-muted-foreground"}`}>
                          {p.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => toggleFeatured(p.slug, !!p.isFeatured)} title="Featured" className={`p-1.5 border ${p.isFeatured ? "border-gold text-gold" : "border-border text-muted-foreground"}`}>
                          <Star className={`w-3.5 h-3.5 ${p.isFeatured ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-end">
                      <div className="inline-flex gap-1">
                        <Link to="/admin/$slug" params={{ slug: p.slug }} className="p-2 border border-border hover:border-gold"><Pencil className="w-3.5 h-3.5" /></Link>
                        <button onClick={() => remove(p.slug, p.name)} className="p-2 border border-border hover:border-destructive hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
