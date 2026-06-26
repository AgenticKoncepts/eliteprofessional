import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog-posts";

export const Route = createFileRoute("/blogs")({
  head: () => {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://eliteprofessional.lovable.app/blogs/${p.slug}`,
        name: p.title,
      })),
    };
    return {
      meta: [
        { title: "Journal — Elite Professional UAE" },
        {
          name: "description",
          content:
            "Brand stories and Italian heritage houses behind Elite Professional UAE — Logevy, 3ME Maestri, FreeLimix, KYO.",
        },
        { property: "og:title", content: "Journal — Elite Professional UAE" },
        {
          property: "og:description",
          content:
            "Brand stories and Italian heritage houses behind Elite Professional UAE.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://eliteprofessional.lovable.app/blogs" },
        { property: "og:image", content: BLOG_POSTS[0].image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: BLOG_POSTS[0].image },
      ],
      links: [{ rel: "canonical", href: "https://eliteprofessional.lovable.app/blogs" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(itemList) },
      ],
    };
  },
  component: BlogsPage,
});

function BlogsPage() {
  const [feature, ...rest] = BLOG_POSTS;

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
            THE JOURNAL
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl"
          >
            Brand Histories & House Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          >
            The 25-year founder's journey and the Italian heritage houses behind every Elite Professional shelf.
          </motion.p>
        </div>
      </section>

      <section className="container-elite py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            to="/blogs/$slug"
            params={{ slug: feature.slug }}
            className="group grid md:grid-cols-2 gap-0 border border-border/60 overflow-hidden hover:border-gold/50 transition-colors block"
          >
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-secondary/30">
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
              />
              <div className="absolute top-4 left-4 bg-gold text-gold-foreground text-[10px] tracking-[0.3em] px-3 py-1.5">
                FEATURED
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.35em] text-gold mb-4">
                {feature.eyebrow.toUpperCase()}
              </div>
              <h2 className="font-display text-3xl md:text-4xl leading-tight mb-3">
                {feature.title}
              </h2>
              <p className="text-sm md:text-base text-foreground/70 italic mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{feature.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{feature.date}</span>
                  <span className="opacity-50">·</span>
                  <span>{feature.readMinutes} min read</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-foreground group-hover:text-gold transition-colors text-[11px] tracking-[0.25em]">
                  READ <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {rest.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to="/blogs/$slug"
                params={{ slug: p.slug }}
                className="group border border-border/60 overflow-hidden hover:border-gold/50 hover:shadow-[var(--shadow-card-hover)] transition-all block h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                  />
                </div>
                <div className="p-8">
                  <div className="text-[10px] tracking-[0.3em] text-gold mb-3">
                    {p.eyebrow.toUpperCase()}
                  </div>
                  <h3 className="font-display text-2xl mb-2 leading-snug group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-foreground/60 italic mb-3">{p.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{p.date}</span>
                      <span className="opacity-50">·</span>
                      <span>{p.readMinutes} min</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 group-hover:text-gold transition-colors text-[11px] tracking-[0.25em]">
                      READ <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
