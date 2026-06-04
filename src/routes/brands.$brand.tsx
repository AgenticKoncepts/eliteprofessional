import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ZoomParallax } from "@/components/ZoomParallax";
import { ProductCard } from "@/components/ProductCard";
import { useProductsByBrandSlug } from "@/lib/products-api";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

const SITE_URL = "https://eliteprofessionaluae.lovable.app";

export const Route = createFileRoute("/brands/$brand")({
  head: ({ params }) => {
    const pretty = params.brand
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    const title = `${pretty} — Elite Professional UAE`;
    const desc = `Shop the full ${pretty} collection at Elite Professional UAE. Authentic products with free delivery across the UAE.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/brands/${params.brand}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/brands/${params.brand}` }],
    };
  },
  component: BrandPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <Layout>
        <div className="container-elite py-24 text-center">
          <p className="mb-4">Something went wrong: {error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em]"
          >
            RETRY
          </button>
        </div>
      </Layout>
    );
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-elite py-24 text-center">
        <h1 className="font-display text-4xl mb-4">Brand not found</h1>
        <Link to="/brands" className="text-gold hover:underline">
          ← All brands
        </Link>
      </div>
    </Layout>
  ),
});

function BrandPage() {
  const { brand: brandSlug } = Route.useParams();
  const { data: products = [], isLoading } = useProductsByBrandSlug(brandSlug);

  const brandName = products[0]?.brand ?? brandSlug.toUpperCase();

  // Pick up to 7 distinct images for the zoom parallax — prefer featured, then largest image set.
  const parallaxImages = useMemo(() => {
    const seen = new Set<string>();
    const pool: { src: string; alt: string }[] = [];
    const sorted = [...products].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    for (const p of sorted) {
      const img = p.image;
      if (img && !seen.has(img)) {
        seen.add(img);
        pool.push({ src: img, alt: p.name });
      }
      if (pool.length >= 7) break;
    }
    return pool;
  }, [products]);

  // Group by product_type then product_subtype
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, typeof products>>();
    for (const p of products) {
      const type = p.productType ?? "Other";
      const sub = p.productSubtype ?? "Signature";
      if (!map.has(type)) map.set(type, new Map());
      const subMap = map.get(type)!;
      if (!subMap.has(sub)) subMap.set(sub, []);
      subMap.get(sub)!.push(p);
    }
    return Array.from(map.entries()).map(([type, subMap]) => ({
      type,
      subgroups: Array.from(subMap.entries()).map(([subtype, items]) => ({ subtype, items })),
    }));
  }, [products]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-elite py-24 text-center text-muted-foreground">Loading brand…</div>
      </Layout>
    );
  }

  if (!products.length) {
    return (
      <Layout>
        <div className="container-elite py-24 text-center">
          <h1 className="font-display text-4xl mb-4">No products for this brand yet</h1>
          <Link to="/brands" className="text-gold hover:underline">← All brands</Link>
        </div>
      </Layout>
    );
  }

  // Structured data — CollectionPage of Products
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brandName} — Elite Professional UAE`,
    url: `${SITE_URL}/brands/${brandSlug}`,
    isPartOf: { "@type": "WebSite", name: "Elite Professional UAE", url: SITE_URL },
    about: { "@type": "Brand", name: brandName },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 30).map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/products/${p.slug}`,
        name: p.name,
      })),
    },
  };

  return (
    <Layout>
      {/* HERO — text overlay above zoom parallax */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
          <div className="container-elite pt-16 md:pt-24 text-center">
            <div className="text-[11px] tracking-[0.5em] text-gold mb-4">ELITE PROFESSIONAL · BRAND</div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground/95 drop-shadow-sm">
              {brandName}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              {products.length} products across {grouped.length}{" "}
              {grouped.length === 1 ? "category" : "categories"} · scroll to explore
            </p>
          </div>
        </div>

        {parallaxImages.length > 0 && <ZoomParallax images={parallaxImages} />}
      </section>

      {/* Category tabs (Brand → Type → Subtype) */}
      <section className="container-elite py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">THE COLLECTION</div>
          <h2 className="font-display text-3xl md:text-5xl mb-3">{brandName} · Catalogue</h2>
          <p className="text-muted-foreground">Organised by product line and finishing range.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {grouped.map((g) => (
            <a
              key={g.type}
              href={`#${slug(g.type)}`}
              className="px-4 py-2 text-xs tracking-[0.2em] border border-border hover:border-gold hover:text-gold transition-colors"
            >
              {g.type.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="space-y-20">
          {grouped.map((g) => (
            <div key={g.type} id={slug(g.type)} className="scroll-mt-24">
              <div className="flex items-end justify-between mb-8 pb-4 border-b border-border">
                <div>
                  <div className="text-[11px] tracking-[0.4em] text-gold mb-2">{brandName}</div>
                  <h3 className="font-display text-2xl md:text-4xl">{g.type}</h3>
                </div>
                <div className="text-xs text-muted-foreground tracking-wider hidden md:block">
                  {g.subgroups.reduce((n, s) => n + s.items.length, 0)} ITEMS
                </div>
              </div>

              {g.subgroups.map((sg) => (
                <div key={sg.subtype} className="mb-12">
                  {g.subgroups.length > 1 || sg.subtype !== "Signature" ? (
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[10px] tracking-[0.3em] text-muted-foreground">RANGE</span>
                      <span className="font-display text-lg text-gold">{sg.subtype}</span>
                      <span className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground">{sg.items.length}</span>
                    </div>
                  ) : null}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {sg.items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-gold hover:underline"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> ALL BRANDS
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
    </Layout>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
