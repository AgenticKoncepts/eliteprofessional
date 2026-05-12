import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { useProducts } from "@/lib/products-api";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Elite Professional UAE" },
      {
        name: "description",
        content:
          "Shop premium hair care, hair color, electronics, skin care and salon tools. Free delivery in UAE.",
      },
      { property: "og:title", content: "Shop — Elite Professional UAE" },
      {
        property: "og:description",
        content: "Browse our full catalog of professional beauty products.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { t } = useI18n();
  const [active, setActive] = useState<string>("All");
  const { data: products = [], isLoading } = useProducts();

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category))).sort()];
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  const labelFor = (c: string) => {
    if (c === "All") return t("shop_all");
    const match = CATEGORIES.find((x) => x.name === c);
    return match ? t(match.key).toUpperCase() : c.toUpperCase();
  };

  return (
    <Layout>
      <div className="container-elite py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("shop_eyebrow")}</div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{t("shop_all_products")}</h1>
          <p className="text-muted-foreground">{t("free_delivery_uae")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 text-xs tracking-wider border transition-colors ${
                active === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-gold"
              }`}
            >
              {labelFor(c)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading products…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No products yet.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-border">
          <h2 className="font-display text-2xl mb-4 text-center">{t("shop_by_category_h2")}</h2>
          <div className="flex flex-wrap justify-center gap-3 text-xs tracking-wider">
            {cats.filter((c) => c !== "All").map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="px-4 py-2 bg-secondary hover:bg-gold/10 transition-colors"
              >
                {labelFor(c)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
