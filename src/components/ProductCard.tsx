import { Heart, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import type { Product } from "@/data/products";

export function deriveUseCase(p: Pick<Product, "productSubtype" | "productType" | "category">) {
  return p.productSubtype || p.productType || p.category || "Professional Use";
}

export function ProductCard({ product }: { product: Product }) {
  const { formatPrice, t } = useI18n();
  const { has, toggle } = useWishlist();
  const { add } = useCart();
  const isWished = has(product.id);
  const hasVariants = (product.variants ?? 0) > 1;
  const useCase = deriveUseCase(product);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVariants) return;
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      priceAed: product.priceAed,
    });
  };

  return (
    <article className="group relative bg-card border border-border/60 hover:border-gold/40 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <button
        aria-label="Add to wishlist"
        onClick={() => toggle(product.id)}
        className="absolute top-3 end-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWished ? "fill-price text-price" : "text-foreground"
          }`}
        />
      </button>

      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="block aspect-square overflow-hidden bg-secondary/30"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </Link>

      <div className="p-4 md:p-5 flex flex-col gap-2.5">
        <div className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.28em] text-gold uppercase">
          <Sparkles className="w-3 h-3" />
          <span className="truncate">{useCase}</span>
        </div>
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="text-sm leading-snug min-h-[2.5rem] line-clamp-2 font-medium hover:text-gold transition-colors"
        >
          {product.name}
        </Link>
        <div className="text-base font-display text-price">
          {product.priceMaxAed
            ? `${formatPrice(product.priceAed)} – ${formatPrice(product.priceMaxAed)}`
            : formatPrice(product.priceAed)}
        </div>
        {hasVariants ? (
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="mt-1 text-[11px] tracking-[0.2em] font-medium border border-foreground/80 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors text-center"
          >
            {t("select_options")}
          </Link>
        ) : (
          <button
            onClick={handleClick}
            className="mt-1 text-[11px] tracking-[0.2em] font-medium border border-foreground/80 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {t("add_to_cart")}
          </button>
        )}
      </div>
    </article>
  );
}
