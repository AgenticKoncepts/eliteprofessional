import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/data/products";

export interface DbProduct {
  id: string;
  slug: string;
  name: string;
  name_ar: string | null;
  description: string | null;
  description_ar: string | null;
  short_description: string | null;
  brand: string | null;
  category: string | null;
  sku: string | null;
  price_aed: number;
  price_max_aed: number | null;
  source_price_usd: number | null;
  stock: number;
  in_stock: boolean;
  variants: string[];
  images: string[];
  primary_image: string | null;
  source_url: string | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  product_type?: string | null;
  product_subtype?: string | null;
  brand_slug?: string | null;
}


export function dbToProduct(row: DbProduct): Product & {
  slug: string;
  stock: number;
  brand?: string | null;
  images?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  sourceUrl?: string | null;
  sku?: string | null;
  productType?: string | null;
  productSubtype?: string | null;
  brandSlug?: string | null;
} {
  const fallbackImg = "/placeholder.svg";
  const image = row.primary_image || row.images?.[0] || fallbackImg;
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    image,
    images: row.images?.length ? row.images : [image],
    priceAed: Number(row.price_aed) || 0,
    priceMaxAed: row.price_max_aed ? Number(row.price_max_aed) : undefined,
    variants: row.variants?.length || 0,
    variantOptions: row.variants?.length ? row.variants : undefined,
    category: row.category || "Uncategorized",
    description: row.description || undefined,
    description_ar: row.description_ar || undefined,
    brand: row.brand,
    stock: row.stock,
    isFeatured: row.is_featured,
    isPublished: row.is_published,
    sourceUrl: row.source_url,
    sku: row.sku,
    productType: row.product_type ?? null,
    productSubtype: row.product_subtype ?? null,
    brandSlug: row.brand_slug ?? null,
  };
}


export function useProducts(opts?: { publishedOnly?: boolean; featuredOnly?: boolean }) {
  return useQuery({
    queryKey: ["products", opts],
    queryFn: async () => {
      let q = supabase.from("products").select("*").order("sort_order").order("created_at");
      if (opts?.publishedOnly !== false) q = q.eq("is_published", true);
      if (opts?.featuredOnly) q = q.eq("is_featured", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data as unknown as DbProduct[]).map(dbToProduct);
    },
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return dbToProduct(data as unknown as DbProduct);
    },
  });
}

export function useAllProductsAdmin() {
  return useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as unknown as DbProduct[]).map(dbToProduct);
    },
  });
}

export function useCategoriesList() {
  return useQuery({
    queryKey: ["categories-distinct"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .eq("is_published", true);
      if (error) throw error;
      const set = new Set<string>();
      (data ?? []).forEach((r: { category: string | null }) => {
        if (r.category) set.add(r.category);
      });
      return Array.from(set).sort();
    },
  });
}

export interface BrandSummary {
  brand: string;
  brandSlug: string;
  count: number;
  heroImage: string | null;
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands-summary"],
    queryFn: async (): Promise<BrandSummary[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("brand, brand_slug, primary_image, images, is_featured, sort_order")
        .eq("is_published", true);
      if (error) throw error;
      const grouped = new Map<string, BrandSummary>();
      (data ?? []).forEach((r: { brand: string | null; brand_slug: string | null; primary_image: string | null; images: string[] | null; is_featured: boolean | null }) => {
        if (!r.brand || !r.brand_slug) return;
        const existing = grouped.get(r.brand_slug);
        const img = r.primary_image || r.images?.[0] || null;
        if (!existing) {
          grouped.set(r.brand_slug, { brand: r.brand, brandSlug: r.brand_slug, count: 1, heroImage: img });
        } else {
          existing.count += 1;
          if (!existing.heroImage && img) existing.heroImage = img;
          if (r.is_featured && img) existing.heroImage = img;
        }
      });
      return Array.from(grouped.values()).sort((a, b) => b.count - a.count);
    },
  });
}

export function useProductsByBrandSlug(brandSlug: string) {
  return useQuery({
    queryKey: ["products-by-brand", brandSlug],
    enabled: !!brandSlug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .eq("brand_slug", brandSlug)
        .order("is_featured", { ascending: false })
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return (data as unknown as DbProduct[]).map(dbToProduct);
    },
  });
}

