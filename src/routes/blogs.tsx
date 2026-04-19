import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs — Elite Professional UAE" },
      {
        name: "description",
        content: "Salon tips, product spotlights and beauty news from Elite Professional.",
      },
      { property: "og:title", content: "Elite Professional Blog" },
      {
        property: "og:description",
        content: "Salon tips, product spotlights and beauty news.",
      },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const { t } = useI18n();
  const posts = [
    { titleKey: "blog1_title", excerptKey: "blog1_excerpt", dateKey: "blog1_date", catKey: "cat_haircolor" },
    { titleKey: "blog2_title", excerptKey: "blog2_excerpt", dateKey: "blog2_date", catKey: "cat_haircare" },
    { titleKey: "blog3_title", excerptKey: "blog3_excerpt", dateKey: "blog3_date", catKey: "cat_electronics" },
  ];
  return (
    <Layout>
      <div className="container-elite py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("blogs_eyebrow")}</div>
          <h1 className="font-display text-4xl md:text-6xl">{t("blogs_title")}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.titleKey} className="border border-border/60 p-8 hover:border-gold/40 transition-colors">
              <div className="text-[10px] tracking-[0.3em] text-gold mb-3">{t(p.catKey).toUpperCase()}</div>
              <h2 className="font-display text-2xl mb-3 leading-snug">{t(p.titleKey)}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t(p.excerptKey)}</p>
              <div className="text-xs text-muted-foreground">{t(p.dateKey)}</div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
