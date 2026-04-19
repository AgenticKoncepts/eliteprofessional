import { Link } from "@tanstack/react-router";
import { SHOP_BY_CATEGORY } from "@/data/products";
import { useI18n } from "@/lib/i18n";

export function CategoryGrid() {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {SHOP_BY_CATEGORY.map((cat) => (
        <Link
          key={cat.name}
          to="/shop"
          className="group relative aspect-[4/5] overflow-hidden bg-secondary/40"
        >
          <img
            src={cat.image}
            alt={t(cat.key)}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="font-display text-lg md:text-xl">{t(cat.key)}</div>
            <div className="text-xs text-white/80 mt-1">
              {cat.count} {cat.count === 1 ? t("word_product") : t("word_products")}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
