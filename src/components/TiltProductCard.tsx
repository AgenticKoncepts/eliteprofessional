import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useI18n } from "@/lib/i18n";
import { deriveUseCase } from "@/components/ProductCard";
import type { Product } from "@/data/products";

// Palette of swirl tints chosen from the reference card (sandal red, patchouli teal,
// graphite, ritual gold). Deterministic per-product so a card always looks the same.
const SWIRLS = [
  { from: "rgba(190,42,42,0.55)", via: "rgba(120,18,28,0.35)", glow: "rgba(255,90,90,0.35)", label: "COLOR" },
  { from: "rgba(20,128,128,0.55)", via: "rgba(8,60,72,0.35)", glow: "rgba(80,220,210,0.32)", label: "CARE" },
  { from: "rgba(120,80,55,0.55)", via: "rgba(40,28,22,0.35)", glow: "rgba(220,170,120,0.30)", label: "TOOLS" },
  { from: "rgba(190,150,70,0.55)", via: "rgba(80,55,18,0.35)", glow: "rgba(240,205,120,0.40)", label: "RITUAL" },
  { from: "rgba(150,40,90,0.55)", via: "rgba(60,12,40,0.35)", glow: "rgba(230,110,170,0.30)", label: "SIGNATURE" },
];

function hashIndex(id: string, mod: number) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % mod;
}

function shortDesc(desc?: string, max = 90) {
  if (!desc) return "Salon-grade craftsmanship — engineered for the professional ritual.";
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
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 22 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);

  const isWished = has(product.id);
  const hasVariants = (product.variants ?? 0) > 1;
  const useCase = deriveUseCase(product);
  const swirl = SWIRLS[hashIndex(product.id, SWIRLS.length)];
  // Editorial caption shown above the card (like "SANDAL SPEZIE")
  const eyebrow = (product.productSubtype || product.productType || useCase || "")
    .toString()
    .toUpperCase()
    .slice(0, 24);

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
    <div className="relative h-full flex flex-col items-center [perspective:1400px]">
      {/* Editorial eyebrow above the card */}
      <div className="text-[10px] tracking-[0.4em] text-white/55 mb-3 min-h-[14px] text-center">
        {eyebrow}
      </div>

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative w-full group"
      >
        <article
          className="relative w-full aspect-[3/4.4] flex flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#0a0a0c] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.9)] hover:shadow-[0_40px_80px_-25px_rgba(0,0,0,1)] transition-shadow duration-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle gold inner edge */}
          <div className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-inset ring-[color:color-mix(in_oklab,var(--gold)_28%,transparent)] z-30" />

          {/* Deep dark backdrop gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.05), transparent 55%), linear-gradient(180deg, #0d0d10 0%, #06070a 100%)",
            }}
          />

          {/* Colored swirl glow behind the product */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-90"
            style={{
              background: `radial-gradient(60% 45% at 50% 62%, ${swirl.from}, ${swirl.via} 45%, transparent 75%)`,
            }}
          />
          {/* Swirl streaks */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-70 mix-blend-screen"
            style={{
              background: `conic-gradient(from 220deg at 50% 60%, transparent 0deg, ${swirl.glow} 60deg, transparent 140deg, ${swirl.glow} 240deg, transparent 320deg)`,
              filter: "blur(28px)",
            }}
          />

          {/* Top spotlight */}
          <div
            aria-hidden
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[60%] h-32 rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(255,235,200,0.18), transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          {/* Wishlist */}
          <button
            aria-label="Add to wishlist"
            onClick={() => toggle(product.id)}
            className="absolute top-3 end-3 z-30 w-9 h-9 rounded-full bg-black/55 backdrop-blur border border-white/15 flex items-center justify-center hover:border-gold transition-colors"
          >
            <Heart className={`w-4 h-4 ${isWished ? "fill-gold text-gold" : "text-white/85"}`} />
          </button>

          {/* Product image floating */}
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="relative z-10 flex-1 flex items-end justify-center pt-12 pb-6 px-6"
            style={{ transform: "translateZ(60px)" }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="max-h-[78%] w-auto object-contain drop-shadow-[0_30px_25px_rgba(0,0,0,0.75)]"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            />
          </Link>

          {/* Floor reflection / vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          {/* Caption block */}
          <div
            className="relative z-20 px-5 pb-5 pt-3 text-center"
            style={{ transform: "translateZ(40px)" }}
          >
            <Link
              to="/products/$productId"
              params={{ productId: product.id }}
              className="block font-display text-base md:text-lg text-white leading-tight line-clamp-2 hover:text-gold transition-colors"
            >
              {product.name}
            </Link>
            <p className="mt-1.5 text-[11px] text-white/55 leading-snug line-clamp-2">
              {shortDesc(product.description)}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="text-left">
                <div className="text-[9px] tracking-[0.3em] text-white/40">PRICE</div>
                <div className="font-display text-base text-gold">
                  {product.priceMaxAed
                    ? `${formatPrice(product.priceAed)} – ${formatPrice(product.priceMaxAed)}`
                    : formatPrice(product.priceAed)}
                </div>
              </div>
              {hasVariants ? (
                <Link
                  to="/products/$productId"
                  params={{ productId: product.id }}
                  className="text-[9px] tracking-[0.3em] font-medium border border-white/30 text-white px-3 py-2 hover:border-gold hover:text-gold transition-colors"
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
                  className="text-[9px] tracking-[0.3em] font-medium border border-white/30 text-white px-3 py-2 hover:border-gold hover:text-gold transition-colors"
                >
                  {t("add_to_cart")}
                </button>
              )}
            </div>
          </div>

          {/* Cursor-tracking glare */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
            style={{
              background: `radial-gradient(300px circle at ${glareX.get()} ${glareY.get()}, rgba(255,220,150,0.18), transparent 60%)`,
            }}
          />
        </article>
      </motion.div>
    </div>
  );
}
