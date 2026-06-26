import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { HeroVideo } from "@/components/HeroVideo";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionTitle } from "@/components/SectionTitle";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BrandStrip } from "@/components/BrandStrip";
import { ProductCard } from "@/components/ProductCard";
import { DealsBanner, SaleBanner } from "@/components/PromoBanners";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Testimonials } from "@/components/Testimonials";
import { useI18n } from "@/lib/i18n";
import { useProducts } from "@/lib/products-api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Professional UAE — Beauty & Salon Supply Since 2001" },
      {
        name: "description",
        content:
          "Premium hair care, hair color, salon electronics and tools from Elite Professional UAE. Free delivery across the Emirates.",
      },
      { name: "keywords", content: "salon supplies UAE, professional hair color, KYO, Freelimix, 3ME Maestri, hair dryer Dubai, beauty supplies" },
      { property: "og:title", content: "Elite Professional UAE — Beauty & Salon Supply" },
      {
        property: "og:description",
        content: "Premium professional beauty supplies since 2001. Free delivery across the UAE.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://eliteprofessional.lovable.app/" },
      { property: "og:image", content: "https://eliteprofessional.lovable.app/og-home.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Elite Professional UAE — Beauty & Salon Supply" },
      { name: "twitter:description", content: "Premium professional beauty supplies since 2001. Free UAE delivery." },
      { name: "twitter:image", content: "https://eliteprofessional.lovable.app/og-home.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://eliteprofessional.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const { data: allProducts = [] } = useProducts();
  const featured = (allProducts.filter((p) => (p as { isFeatured?: boolean }).isFeatured).length > 0
    ? allProducts.filter((p) => (p as { isFeatured?: boolean }).isFeatured)
    : allProducts
  ).slice(0, 12);
  return (
    <Layout>
      <HeroVideo />
      <ScrollShowcase />
      <HeroSlider />


      <section className="container-elite py-20 md:py-28">
        <SectionTitle
          eyebrow={t("shop_by_category_eyebrow")}
          title={t("shop_by_category_title")}
          subtitle={t("shop_by_category_sub")}
        />
        <CategoryGrid />
      </section>

      <section className="py-16 md:py-20">
        <div className="container-elite mb-10 text-center">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("shop_by_brand_eyebrow")}</div>
          <h2 className="font-display text-3xl md:text-5xl">{t("shop_by_brand_title")}</h2>
        </div>
        <BrandStrip />
      </section>

      <section className="container-elite py-16 md:py-24">
        <SectionTitle
          eyebrow={t("featured_eyebrow")}
          title={t("featured_title")}
          subtitle={t("featured_sub")}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <DealsBanner />
      <SaleBanner />
      <InstagramFeed />
      <Testimonials />

      <section className="container-elite py-20 md:py-28 text-center max-w-3xl">
        <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("about_eyebrow")}</div>
        <h2 className="font-display text-3xl md:text-5xl mb-6">{t("about_title_short")}</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">{t("about_long")}</p>
      </section>
    </Layout>
  );
}
