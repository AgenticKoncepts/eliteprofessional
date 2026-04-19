import { Instagram } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useI18n } from "@/lib/i18n";

export function InstagramFeed() {
  const { t } = useI18n();
  const tiles = PRODUCTS.slice(0, 8);
  return (
    <section className="container-elite my-16 md:my-24">
      <div className="text-center mb-10">
        <a
          href="https://www.instagram.com/elite_professional/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 hover:text-gold transition-colors"
        >
          <Instagram className="w-6 h-6" />
          <span className="font-display text-2xl md:text-3xl">@elite_professional</span>
        </a>
        <div className="text-sm text-muted-foreground mt-2">{t("ig_followers")}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {tiles.map((p) => (
          <a
            key={p.id}
            href="https://www.instagram.com/elite_professional/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group bg-secondary/40"
          >
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
              <Instagram className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/elite_professional/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-8 py-3.5 border border-foreground text-xs tracking-[0.25em] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {t("follow_instagram")}
        </a>
      </div>
    </section>
  );
}
