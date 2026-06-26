import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useMemo, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TiltProductCard } from "@/components/TiltProductCard";
import type { Product } from "@/data/products";

interface BrandWorldProps {
  brand: string;
  products: Product[];
  onBack: () => void;
  coverImage?: string;
}

interface TypeGroup {
  type: string;
  products: Product[];
  subtypes: { subtype: string; products: Product[] }[];
}

function groupByType(products: Product[]): TypeGroup[] {
  const map = new Map<string, Product[]>();
  for (const p of products) {
    const t = (p.productType && p.productType.trim()) || p.category || "Other";
    if (!map.has(t)) map.set(t, []);
    map.get(t)!.push(p);
  }
  return Array.from(map.entries())
    .map(([type, items]) => {
      const subMap = new Map<string, Product[]>();
      for (const p of items) {
        const s = (p.productSubtype && p.productSubtype.trim()) || "";
        if (!subMap.has(s)) subMap.set(s, []);
        subMap.get(s)!.push(p);
      }
      const subtypes = Array.from(subMap.entries())
        .filter(([s]) => s.length > 0)
        .map(([subtype, products]) => ({ subtype, products }));
      return { type, products: items, subtypes };
    })
    .sort((a, b) => b.products.length - a.products.length);
}

export function BrandWorld({ brand, products, onBack, coverImage }: BrandWorldProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const typeGroups = useMemo(() => groupByType(products), [products]);
  const heroImage = useMemo(() => {
    if (coverImage) return coverImage;
    const featured = products.find((p) => (p as Product & { isFeatured?: boolean }).isFeatured);
    return featured?.image || products[0]?.image || null;
  }, [products, coverImage]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Sticky back pill */}
      <div className="sticky top-20 z-30 pointer-events-none">
        <div className="container-elite flex justify-start pt-4">
          <button
            onClick={onBack}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 bg-background/85 backdrop-blur border border-border hover:border-gold text-[11px] tracking-[0.3em] text-foreground hover:text-gold transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            ALL BRANDS
          </button>
        </div>
      </div>

      {/* HERO with parallax backdrop */}
      <div className="relative -mt-14 h-[70vh] min-h-[480px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {heroImage ? (
            <img
              src={heroImage}
              alt=""
              aria-hidden
              className="w-full h-[125%] object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary via-background to-secondary/40" />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 h-full container-elite flex flex-col items-center justify-center text-center"
        >
          <div className="text-[11px] tracking-[0.5em] text-gold mb-4">THE HOUSE OF</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-5 leading-[0.95]">
            {brand}
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {products.length} {products.length === 1 ? "product" : "products"} across{" "}
            {typeGroups.length} {typeGroups.length === 1 ? "category" : "categories"} — every piece
            curated for the UAE's finest salons.
          </p>
        </motion.div>
      </div>

      {/* Stacked product-type sections */}
      {typeGroups.length === 0 ? (
        <div className="container-elite py-24 text-center text-muted-foreground">
          No products available for this brand yet.
        </div>
      ) : (
        typeGroups.map((group, i) => (
          <motion.section
            key={group.type}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative py-16 md:py-24 border-t border-border/40 first:border-t-0"
          >
            <div className="container-elite">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
                <div>
                  <div className="text-[11px] tracking-[0.4em] text-gold mb-3">
                    CHAPTER · {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                    {group.type}
                  </h2>
                  {group.subtypes.length > 0 && (
                    <p className="text-muted-foreground mt-2 text-sm">
                      {group.subtypes.map((s) => s.subtype).join(" · ")}
                    </p>
                  )}
                </div>
                <div className="text-[11px] tracking-[0.3em] text-muted-foreground">
                  {group.products.length} {group.products.length === 1 ? "PIECE" : "PIECES"}
                </div>
              </div>

              <div className="relative [perspective:1200px]">
                <Carousel
                  opts={{ align: "start", loop: false, dragFree: true }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {group.products.map((p) => (
                      <CarouselItem
                        key={p.id}
                        className="pl-4 basis-[78%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <TiltProductCard product={p} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-4" />
                  <CarouselNext className="hidden md:flex -right-4" />
                </Carousel>
              </div>
            </div>
          </motion.section>
        ))
      )}
    </motion.section>
  );
}
