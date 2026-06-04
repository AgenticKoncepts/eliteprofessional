import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useBrands } from "@/lib/products-api";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Our Brands — Elite Professional UAE" },
      {
        name: "description",
        content:
          "Discover premium beauty and professional grooming brands at Elite Professional UAE — KYO, Freelimix, 3ME Maestri, Arcocere, Dr. Kraut, Logevy Firenze and more.",
      },
      { property: "og:title", content: "Our Brands — Elite Professional UAE" },
      {
        property: "og:description",
        content: "Explore curated brand collections of hair color, hair care, skincare, fragrance and salon tools.",
      },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsIndex,
});

function BrandsIndex() {
  const { data: brands = [], isLoading } = useBrands();

  return (
    <Layout>
      <section className="container-elite py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">SINCE 2001</div>
          <h1 className="font-display text-4xl md:text-6xl mb-4">Our Brands</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked Italian and Korean houses for hair, skin, fragrance and professional salon work.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-20">Loading brands…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {brands.map((b, i) => (
              <Link
                key={b.brandSlug}
                to="/brands/$brand"
                params={{ brand: b.brandSlug }}
                className="group relative aspect-[4/5] overflow-hidden bg-secondary"
              >
                {b.heroImage ? (
                  <img
                    src={b.heroImage}
                    alt={b.brand}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[10px] tracking-[0.35em] text-gold/90 mb-2">
                    {b.count} {b.count === 1 ? "product" : "products"}
                  </div>
                  <div className="font-display text-2xl md:text-3xl mb-3">{b.brand}</div>
                  <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                    EXPLORE <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
