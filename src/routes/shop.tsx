import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { useMemo, useRef, useState } from "react";
import { useProducts } from "@/lib/products-api";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/data/products";
import { deriveUseCase } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop by Brand — Elite Professional UAE" },
      {
        name: "description",
        content:
          "Explore every Elite Professional brand in its own animated gallery — KYO, Freelimix, 3ME Maestri, Arcocere and more. Free UAE delivery.",
      },
      { property: "og:title", content: "Shop by Brand — Elite Professional UAE" },
      {
        property: "og:description",
        content: "An immersive, brand-by-brand gallery of professional beauty and salon products.",
      },
    ],
  }),
  component: ShopPage,
});

function shortDesc(desc?: string, max = 160) {
  if (!desc)
    return "Salon-grade formulation engineered for professional results — luxurious texture, lasting performance.";
  const clean = desc.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
}

function TiltCard({ product }: { product: Product }) {
  const { formatPrice, t } = useI18n();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const isWished = has(product.id);
  const hasVariants = (product.variants ?? 0) > 1;
  const useCase = deriveUseCase(product);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="relative h-full"
    >
      <article className="relative h-full flex flex-col bg-card border border-border/60 overflow-hidden shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] transition-shadow duration-500 [transform-style:preserve-3d]">
        <button
          aria-label="Add to wishlist"
          onClick={() => toggle(product.id)}
          className="absolute top-3 end-3 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white"
        >
          <Heart className={`w-4 h-4 ${isWished ? "fill-price text-price" : "text-foreground"}`} />
        </button>

        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="block aspect-[4/5] overflow-hidden bg-secondary/30 relative"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ translateZ: 40 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(220px circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.45), transparent 60%)`,
            }}
          />
        </Link>

        <div className="p-5 md:p-6 flex flex-col gap-3 flex-1" style={{ transform: "translateZ(20px)" }}>
          <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-gold uppercase">
            <Sparkles className="w-3 h-3" />
            <span className="truncate">{useCase}</span>
          </div>
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="font-display text-base md:text-lg leading-snug line-clamp-2 hover:text-gold transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {shortDesc(product.description)}
          </p>
          <div className="flex items-end justify-between pt-3 border-t border-border/60 mt-1 gap-3">
            <div>
              <div className="text-[10px] tracking-[0.25em] text-muted-foreground mb-1">PRICE</div>
              <div className="font-display text-lg text-price">
                {product.priceMaxAed
                  ? `${formatPrice(product.priceAed)} – ${formatPrice(product.priceMaxAed)}`
                  : formatPrice(product.priceAed)}
              </div>
            </div>
            {hasVariants ? (
              <Link
                to="/products/$productId"
                params={{ productId: product.id }}
                className="text-[10px] tracking-[0.2em] font-medium border border-foreground/80 px-3 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t("select_options")}
              </Link>
            ) : (
              <button
                onClick={() =>
                  add({
                    productId: product.id,
                    name: product.name,
                    image: product.image,
                    priceAed: product.priceAed,
                  })
                }
                className="text-[10px] tracking-[0.2em] font-medium border border-foreground/80 px-3 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {t("add_to_cart")}
              </button>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

function BrandSection({
  brand,
  brandSlug,
  products,
  index,
}: {
  brand: string;
  brandSlug: string;
  products: Product[];
  index: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.05 * (index % 3) }}
      className="relative py-16 md:py-20 border-t border-border/40 first:border-t-0"
    >
      <div className="container-elite">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] tracking-[0.4em] text-gold mb-3">
              THE COLLECTION · {String(index + 1).padStart(2, "0")}
            </div>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight">{brand}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              {products.length} {products.length === 1 ? "product" : "products"} — the complete{" "}
              {brand} gallery, curated for the UAE's finest salons.
            </p>
          </div>
          {brandSlug && (
            <Link
              to="/brands/$brand"
              params={{ brand: brandSlug }}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-foreground hover:text-gold transition-colors self-start md:self-end"
            >
              VIEW BRAND <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="relative [perspective:1200px]">
          <Carousel opts={{ align: "start", loop: false, dragFree: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {products.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="pl-4 basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <TiltCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>
        </div>
      </div>
    </motion.section>
  );
}

function ShopPage() {
  const { t } = useI18n();
  const { data: products = [], isLoading } = useProducts();
  const [query, setQuery] = useState("");

  const brandGroups = useMemo(() => {
    const map = new Map<string, { brand: string; brandSlug: string; products: Product[] }>();
    for (const p of products) {
      const brand = (p.brand && p.brand.trim()) || "Other";
      const brandSlug =
        (p as Product & { brandSlug?: string | null }).brandSlug ||
        brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const key = brandSlug || brand;
      if (!map.has(key)) map.set(key, { brand, brandSlug, products: [] });
      map.get(key)!.products.push(p);
    }
    return Array.from(map.values()).sort((a, b) => b.products.length - a.products.length);
  }, [products]);

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return brandGroups;
    const q = query.toLowerCase();
    return brandGroups
      .map((g) => ({
        ...g,
        products: g.products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.category ?? "").toLowerCase().includes(q) ||
            (p.brand ?? "").toLowerCase().includes(q) ||
            deriveUseCase(p).toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.products.length > 0);
  }, [brandGroups, query]);

  return (
    <Layout>
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
            Shop by Brand
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Every house, its own gallery. Glide through animated 3D carousels of the entire Elite
            Professional catalogue — by brand, with use-case, price, and one-tap ordering.
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
              placeholder="Search products, brands, use-cases…"
              className="w-full px-5 py-3 bg-background border border-border focus:border-gold outline-none text-sm tracking-wide"
            />
          </motion.div>
        </div>
      </section>

      {/* BRAND GALLERIES */}
      {isLoading ? (
        <div className="container-elite py-24 text-center text-muted-foreground">
          Loading collections…
        </div>
      ) : filteredGroups.length === 0 ? (
        <div className="container-elite py-24 text-center text-muted-foreground">
          No products match “{query}”.
        </div>
      ) : (
        filteredGroups.map((g, i) => (
          <BrandSection
            key={g.brandSlug || g.brand}
            brand={g.brand}
            brandSlug={g.brandSlug}
            products={g.products}
            index={i}
          />
        ))
      )}
    </Layout>
  );
}
