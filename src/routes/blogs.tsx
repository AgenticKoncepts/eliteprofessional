import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import hero1 from "@/assets/product-haircolor-kyo.jpg";
import hero2 from "@/assets/product-bioactivator.jpg";
import hero3 from "@/assets/cat-hairdryer.jpg";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Journal — Salon Tips & Product Stories | Elite Professional UAE" },
      {
        name: "description",
        content:
          "Editorial guides on permanent hair color, marine collagen treatments and salon equipment care — written by Elite Professional UAE specialists.",
      },
      { property: "og:title", content: "Elite Professional Journal — Salon Tips & Product Stories" },
      {
        property: "og:description",
        content: "Editorial guides on hair color, treatments and salon equipment care from Elite Professional UAE.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://eliteprofessional.lovable.app/blogs" },
    ],
    links: [{ rel: "canonical", href: "https://eliteprofessional.lovable.app/blogs" }],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const { t } = useI18n();
  const posts = [
    {
      titleKey: "blog1_title",
      excerptKey: "blog1_excerpt",
      dateKey: "blog1_date",
      catKey: "cat_haircolor",
      image: hero1,
      readMinutes: 4,
    },
    {
      titleKey: "blog2_title",
      excerptKey: "blog2_excerpt",
      dateKey: "blog2_date",
      catKey: "cat_haircare",
      image: hero2,
      readMinutes: 6,
    },
    {
      titleKey: "blog3_title",
      excerptKey: "blog3_excerpt",
      dateKey: "blog3_date",
      catKey: "cat_electronics",
      image: hero3,
      readMinutes: 3,
    },
  ];

  const [feature, ...rest] = posts;

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-secondary/40 to-background">
        <div className="container-elite py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] tracking-[0.5em] text-gold mb-4"
          >
            {t("blogs_eyebrow")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl"
          >
            {t("blogs_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          >
            Inside the salon, behind the bottle. Editorial guides, product breakdowns and the rituals
            our master stylists swear by.
          </motion.p>
        </div>
      </section>

      <section className="container-elite py-16 md:py-20">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group grid md:grid-cols-2 gap-0 border border-border/60 overflow-hidden mb-16 hover:border-gold/50 transition-colors"
        >
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary/30">
            <img
              src={feature.image}
              alt={t(feature.titleKey)}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
            />
            <div className="absolute top-4 left-4 bg-gold text-gold-foreground text-[10px] tracking-[0.3em] px-3 py-1.5">
              FEATURED
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-[10px] tracking-[0.35em] text-gold mb-4">
              {t(feature.catKey).toUpperCase()}
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-4">
              {t(feature.titleKey)}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t(feature.excerptKey)}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t(feature.dateKey)}</span>
                <span className="opacity-50">·</span>
                <span>{feature.readMinutes} min read</span>
              </div>
              <button className="inline-flex items-center gap-1.5 text-foreground hover:text-gold transition-colors text-[11px] tracking-[0.25em]">
                READ <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.article>

        <div className="grid md:grid-cols-2 gap-8">
          {rest.map((p, i) => (
            <motion.article
              key={p.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group border border-border/60 overflow-hidden hover:border-gold/50 hover:shadow-[var(--shadow-card-hover)] transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                <img
                  src={p.image}
                  alt={t(p.titleKey)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                />
              </div>
              <div className="p-8">
                <div className="text-[10px] tracking-[0.3em] text-gold mb-3">
                  {t(p.catKey).toUpperCase()}
                </div>
                <h3 className="font-display text-2xl mb-3 leading-snug group-hover:text-gold transition-colors">
                  {t(p.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t(p.excerptKey)}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t(p.dateKey)}</span>
                    <span className="opacity-50">·</span>
                    <span>{p.readMinutes} min</span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 hover:text-gold transition-colors text-[11px] tracking-[0.25em]">
                    READ <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
