import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ZoomParallax } from "@/components/ZoomParallax";
import { useProductsByBrandSlug } from "@/lib/products-api";
import { useMemo } from "react";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

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

function deriveUseCase(p: {
  productType?: string | null;
  productSubtype?: string | null;
  category?: string;
  name: string;
}) {
  return (
    p.productSubtype ||
    p.productType ||
    p.category ||
    "Professional Use"
  );
}

function shortDesc(desc?: string, max = 180) {
  if (!desc) return "Salon-grade formulation engineered for professional results — luxurious texture, lasting performance.";
  const clean = desc.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
}

function BrandPage() {
  const { brand: brandSlug } = Route.useParams();
  const { data: products = [], isLoading } = useProductsByBrandSlug(brandSlug);
  const { formatPrice, t } = useI18n();
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const brandName = products[0]?.brand ?? brandSlug.toUpperCase();

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

  // Sort: featured first, then by sort_order/created — already from API
  const ordered = products;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
          <div className="container-elite pt-16 md:pt-24 text-center">
            <div className="text-[11px] tracking-[0.5em] text-gold mb-4">
              ELITE PROFESSIONAL · BRAND
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground/95 drop-shadow-sm">
              {brandName}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              {ordered.length} {ordered.length === 1 ? "product" : "products"} · the complete {brandName} collection
            </p>
          </div>
        </div>

        {parallaxImages.length > 0 && <ZoomParallax images={parallaxImages} />}
      </section>

      {/* BRAND GALLERY CAROUSEL — all products of this brand only */}
      <section className="container-elite py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">THE GALLERY</div>
          <h2 className="font-display text-3xl md:text-5xl mb-3">{brandName} · Signature Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Swipe through the full {brandName} range — every product with its purpose, finish, and price.
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-4">
            {ordered.map((p) => {
              const useCase = deriveUseCase(p);
              const isWished = has(p.id);
              const hasVariants = (p.variants ?? 0) > 1;
              return (
                <CarouselItem
                  key={p.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <article className="group relative h-full flex flex-col bg-card border border-border/60 hover:border-gold/50 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]">
                    <button
                      aria-label="Add to wishlist"
                      onClick={() => toggle(p.id)}
                      className="absolute top-3 end-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white"
                    >
                      <Heart className={`w-4 h-4 ${isWished ? "fill-price text-price" : "text-foreground"}`} />
                    </button>

                    <Link
                      to="/products/$productId"
                      params={{ productId: p.id }}
                      className="block aspect-[4/5] overflow-hidden bg-secondary/30"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-gold">
                        <Sparkles className="w-3 h-3" />
                        <span>{useCase.toUpperCase()}</span>
                      </div>

                      <Link
                        to="/products/$productId"
                        params={{ productId: p.id }}
                        className="font-display text-lg leading-snug line-clamp-2 hover:text-gold transition-colors"
                      >
                        {p.name}
                      </Link>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {shortDesc(p.description)}
                      </p>

                      <div className="flex items-end justify-between pt-3 border-t border-border/60 mt-2">
                        <div>
                          <div className="text-[10px] tracking-[0.25em] text-muted-foreground mb-1">PRICE</div>
                          <div className="font-display text-xl text-price">
                            {p.priceMaxAed
                              ? `${formatPrice(p.priceAed)} – ${formatPrice(p.priceMaxAed)}`
                              : formatPrice(p.priceAed)}
                          </div>
                        </div>
                        {hasVariants ? (
                          <Link
                            to="/products/$productId"
                            params={{ productId: p.id }}
                            className="text-[11px] tracking-[0.2em] font-medium border border-foreground/80 px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {t("select_options")}
                          </Link>
                        ) : (
                          <button
                            onClick={() =>
                              add({
                                productId: p.id,
                                name: p.name,
                                image: p.image,
                                priceAed: p.priceAed,
                              })
                            }
                            className="text-[11px] tracking-[0.2em] font-medium border border-foreground/80 px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            {t("add_to_cart")}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>

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
