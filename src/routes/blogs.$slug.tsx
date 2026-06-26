import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS, getPostBySlug, type BlogPost } from "@/data/blog-posts";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) {
      return { meta: [{ title: "Story not found — Elite Professional UAE" }] };
    }
    const url = `https://eliteprofessional.lovable.app/blogs/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} | Elite Professional UAE Journal` },
        { name: "description", content: p.excerpt.slice(0, 158) },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt.slice(0, 158) },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.excerpt.slice(0, 158) },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-elite py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Story not found</h1>
        <Link to="/blogs" className="text-gold hover:underline tracking-[0.2em] text-sm uppercase">
          ← Back to The Journal
        </Link>
      </div>
    </Layout>
  ),
  errorComponent: () => (
    <Layout>
      <div className="container-elite py-32 text-center">
        <h1 className="font-display text-3xl mb-4">Something went wrong.</h1>
        <Link to="/blogs" className="text-gold hover:underline">Back to The Journal</Link>
      </div>
    </Layout>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="relative aspect-[21/9] md:aspect-[21/8] w-full bg-secondary/40">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="container-elite -mt-24 md:-mt-40 relative z-10 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] text-gold uppercase mb-6 hover:opacity-80"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> The Journal
            </Link>
            <div className="text-[11px] tracking-[0.4em] text-gold mb-4">
              {post.eyebrow.toUpperCase()}
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-4">
              {post.title}
            </h1>
            <p className="font-display italic text-lg md:text-xl text-foreground/70 mb-6">
              {post.subtitle}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
              <span className="opacity-50">·</span>
              <span>{post.readMinutes} min read</span>
              <span className="opacity-50">·</span>
              <span className="text-gold">{post.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <article className="container-elite py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="font-display text-2xl md:text-3xl leading-snug text-foreground/85 mb-12 pb-12 border-b border-gold/20">
            {post.excerpt}
          </div>

          <div className="space-y-12">
            {post.sections.map((s, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                {s.heading && (
                  <h2 className="font-display text-2xl md:text-3xl text-gold mb-5 tracking-tight">
                    {s.heading}
                  </h2>
                )}
                <div className="space-y-5 text-base md:text-[17px] leading-[1.85] text-foreground/80">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {post.closing && (
            <div className="mt-16 pt-10 border-t border-gold/30 text-center">
              <p className="font-display italic text-xl md:text-2xl text-gold/90">{post.closing}</p>
            </div>
          )}
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border/40 bg-secondary/20">
        <div className="container-elite py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[11px] tracking-[0.4em] text-gold mb-2">CONTINUE READING</div>
              <h2 className="font-display text-3xl md:text-4xl">More from the Journal</h2>
            </div>
            <Link
              to="/blogs"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] tracking-[0.25em] hover:text-gold transition-colors"
            >
              ALL STORIES <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blogs/$slug"
                params={{ slug: p.slug }}
                className="group border border-border/60 overflow-hidden hover:border-gold/50 transition-colors block"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1000ms]"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[10px] tracking-[0.3em] text-gold mb-2">
                    {p.eyebrow.toUpperCase()}
                  </div>
                  <h3 className="font-display text-xl leading-snug group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
