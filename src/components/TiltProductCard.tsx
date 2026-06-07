import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useI18n } from "@/lib/i18n";
import { deriveUseCase } from "@/components/ProductCard";
import type { Product } from "@/data/products";

function shortDesc(desc?: string, max = 160) {
  if (!desc)
    return "Salon-grade formulation engineered for professional results — luxurious texture, lasting performance.";
  const clean = desc.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
}

export function TiltProductCard({ product }: { product: Product }) {
  const { formatPrice, t } = useI18n();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });

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
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="relative h-full group"
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
            style={{ translateZ: 30 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
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
