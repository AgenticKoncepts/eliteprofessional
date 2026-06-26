import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/lib/products-api";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/data/products";
import { deriveUseCase } from "@/components/ProductCard";
import { BrandTile, type BrandTileData } from "@/components/BrandTile";
import { BrandWorld } from "@/components/BrandWorld";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { brand?: string } => ({
    brand: typeof search.brand === "string" ? search.brand : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop by Brand — Elite Professional UAE" },
      {
        name: "description",
        content:
          "Browse every Elite Professional house — KYO, Freelimix, 3ME Maestri, Arcocere and more. Free UAE delivery.",
      },
      { property: "og:title", content: "Shop by Brand — Elite Professional UAE" },
      {
        property: "og:description",
        content: "An immersive, brand-by-brand gallery of professional beauty and salon products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://eliteprofessional.lovable.app/shop" },
      { property: "og:image", content: "https://eliteprofessional.lovable.app/og-shop.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shop by Brand — Elite Professional UAE" },
      { name: "twitter:description", content: "Immersive brand-by-brand gallery of pro salon products." },
      { name: "twitter:image", content: "https://eliteprofessional.lovable.app/og-shop.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://eliteprofessional.lovable.app/shop" }],
  }),
  component: ShopPage,
});

// Tidy display label (DB has "FREELIMIX", "3ME MAESTRI", "DR.KRAUT" etc.)
function tidyBrand(raw: string): string {
  const t = raw.trim();
  if (!t) return "Other";
  // Keep all-caps that are 3 chars or fewer (KYO, 3ME) as-is
  if (/^[A-Z0-9.\s'&-]{2,}$/.test(t) && t === t.toUpperCase()) {
    return t
      .toLowerCase()
      .replace(/\b([a-z])/g, (m) => m.toUpperCase())
      .replace(/\b(3me|kyo|sts|ppd)\b/gi, (m) => m.toUpperCase());
  }
  return t;
}

function ShopPage() {
  const { t } = useI18n();
  const { data: products = [], isLoading } = useProducts();
  const navigate = Route.useNavigate();
  const { brand: selectedSlug } = Route.useSearch();
  const [query, setQuery] = useState("");

  // Group all products by brandSlug → collapses DB casing duplicates automatically
  const brandGroups = useMemo(() => {
    const map = new Map<
      string,
      { brand: string; brandSlug: string; products: Product[]; isFeaturedHero?: string | null }
    >();
    for (const p of products) {
      const rawBrand = (p.brand && p.brand.trim()) || "Other";
      const brandSlug =
        (p as Product & { brandSlug?: string | null }).brandSlug ||
        rawBrand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const key = brandSlug || rawBrand;
      if (!map.has(key)) {
        map.set(key, {
          brand: tidyBrand(rawBrand),
          brandSlug,
          products: [],
        });
      }
      map.get(key)!.products.push(p);
    }
    return Array.from(map.values()).sort((a, b) => b.products.length - a.products.length);
  }, [products]);

  const brandTiles: BrandTileData[] = useMemo(
    () =>
      brandGroups.map((g) => {
        const featured = g.products.find(
          (p) => (p as Product & { isFeatured?: boolean }).isFeatured,
        );
        const heroImage = featured?.image || g.products[0]?.image || null;
        return { brand: g.brand, brandSlug: g.brandSlug, count: g.products.length, heroImage };
      }),
    [brandGroups],
  );

  const filteredTiles = useMemo(() => {
    if (!query.trim()) return brandTiles;
    const q = query.toLowerCase();
    const matchingSlugs = new Set(
      brandGroups
        .filter(
          (g) =>
            g.brand.toLowerCase().includes(q) ||
            g.brandSlug.includes(q) ||
            g.products.some(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                (p.category ?? "").toLowerCase().includes(q) ||
                deriveUseCase(p).toLowerCase().includes(q),
            ),
        )
        .map((g) => g.brandSlug),
    );
    return brandTiles.filter((t) => matchingSlugs.has(t.brandSlug));
  }, [brandTiles, brandGroups, query]);

  const activeGroup = useMemo(
    () => (selectedSlug ? brandGroups.find((g) => g.brandSlug === selectedSlug) : undefined),
    [brandGroups, selectedSlug],
  );

  // Reset scroll on view change
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedSlug]);

  function selectBrand(slug: string) {
    navigate({ search: { brand: slug }, replace: false });
  }
  function clearBrand() {
    navigate({ search: {}, replace: false });
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {activeGroup ? (
          <motion.div key={`world-${activeGroup.brandSlug}`}>
            <BrandWorld
              brand={activeGroup.brand}
              products={activeGroup.products}
              onBack={clearBrand}
            />
          </motion.div>
        ) : (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-secondary/40 to-background">
              <div className="container-elite py-16 md:py-24 text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-[11px] tracking-[0.5em] text-gold mb-4"
                >
                  {t("shop_eyebrow")}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="font-display text-4xl md:text-6xl lg:text-7xl mb-5"
                >
                  Choose Your House
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Every brand, its own world. Step inside any house to glide through a cinematic
                  gallery of its complete collection — categorized by use, with prices, stories and
                  one-tap ordering.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mt-8 max-w-md mx-auto"
                >
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search brands, products, use-cases…"
                    className="w-full px-5 py-3 bg-background border border-border focus:border-gold outline-none text-sm tracking-wide"
                  />
                </motion.div>
              </div>
            </section>

            {/* BRAND TILES */}
            <section className="container-elite py-16 md:py-24">
              {isLoading ? (
                <div className="py-16 text-center text-muted-foreground">Loading collections…</div>
              ) : filteredTiles.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  No brands match &ldquo;{query}&rdquo;.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 [perspective:1400px]">
                  {filteredTiles.map((tile, i) => (
                    <BrandTile key={tile.brandSlug} data={tile} index={i} onSelect={selectBrand} />
                  ))}
                </div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
