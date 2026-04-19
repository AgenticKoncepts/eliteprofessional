import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { HeroSlider } from "@/components/HeroSlider";
import { SectionTitle } from "@/components/SectionTitle";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BrandStrip } from "@/components/BrandStrip";
import { ProductCard } from "@/components/ProductCard";
import { DealsBanner, SaleBanner } from "@/components/PromoBanners";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Testimonials } from "@/components/Testimonials";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elite Professional — UAE Beauty & Salon Supply Since 2001" },
      {
        name: "description",
        content:
          "Welcome to Elite Professional. Premium hair care, color, electronics & salon tools delivered free across the UAE.",
      },
      { property: "og:title", content: "Elite Professional — UAE Beauty Supply" },
      {
        property: "og:description",
        content: "Welcome to our store! Premium professional beauty supplies since 2001.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <HeroSlider />

      <section className="container-elite py-20 md:py-28">
        <SectionTitle
          eyebrow="ELITE PROFESSIONAL"
          title="Shop by Category"
          subtitle="Check out our broad variety of categories designed to meet your specific needs."
        />
        <CategoryGrid />
      </section>

      <section className="py-16 md:py-20">
        <div className="container-elite mb-10 text-center">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">SHOP BY BRAND</div>
          <h2 className="font-display text-3xl md:text-5xl">We put the world in your hands</h2>
        </div>
        <BrandStrip />
      </section>

      <section className="container-elite py-16 md:py-24">
        <SectionTitle
          eyebrow="DISCOVER THE GREATNESS"
          title="Featured Products"
          subtitle="Check out our broad variety of products our customer likes."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <DealsBanner />
      <SaleBanner />
      <InstagramFeed />
      <Testimonials />

      <section className="container-elite py-20 md:py-28 text-center max-w-3xl">
        <div className="text-[11px] tracking-[0.4em] text-gold mb-3">ABOUT US</div>
        <h2 className="font-display text-3xl md:text-5xl mb-6">Crafted with passion since 2001</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Elite professional is a self-established company, since 2001. Relentlessly, we develop new
          ideas. Concepts and technologies to maintain the point of concept (POC). We combine
          attractiveness and individuality with user friendliness and cost efficiency products.
        </p>
      </section>
    </Layout>
  );
}
