import { Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useWishlist } from "@/lib/wishlist";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { formatPrice } = useI18n();
  const { has, toggle } = useWishlist();
  const isWished = has(product.id);
  const hasVariants = (product.variants ?? 0) > 1;

  return (
    <article className="group relative bg-card border border-border/60 hover:border-gold/40 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <button
        aria-label="Add to wishlist"
        onClick={() => toggle(product.id)}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWished ? "fill-price text-price" : "text-foreground"
          }`}
        />
      </button>

      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-3">
        <h3 className="text-sm leading-snug min-h-[2.5rem] line-clamp-2 font-medium">
          {product.name}
        </h3>
        <div className="text-base font-display text-price">
          {product.priceMaxAed
            ? `${formatPrice(product.priceAed)} – ${formatPrice(product.priceMaxAed)}`
            : formatPrice(product.priceAed)}
        </div>
        <button className="mt-1 text-[11px] tracking-[0.2em] font-medium border border-foreground/80 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors">
          {hasVariants ? "SELECT OPTIONS" : "ADD TO CART"}
        </button>
      </div>
    </article>
  );
}
