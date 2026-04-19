import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

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

const posts = [
  {
    title: "Choosing the Right Permanent Hair Color for Your Clients",
    excerpt:
      "From tone selection to oxidizing emulsion ratios — a professional's guide to flawless coverage with KYO and Freelimix.",
    date: "March 12, 2026",
    cat: "Hair Color",
  },
  {
    title: "Why Marine Collagen & Keratin Treatments Work",
    excerpt:
      "Discover the science behind the Kyo Bio-Activator and how it restores damaged strands in just three applications.",
    date: "February 28, 2026",
    cat: "Hair Care",
  },
  {
    title: "Salon Equipment Maintenance: Hair Dryers & Trimmers",
    excerpt:
      "A practical checklist to extend the life of your professional electronics and keep performance consistent.",
    date: "February 14, 2026",
    cat: "Electronics",
  },
];

function BlogsPage() {
  return (
    <Layout>
      <div className="container-elite py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">JOURNAL</div>
          <h1 className="font-display text-4xl md:text-6xl">Blogs</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.title} className="border border-border/60 p-8 hover:border-gold/40 transition-colors">
              <div className="text-[10px] tracking-[0.3em] text-gold mb-3">{p.cat.toUpperCase()}</div>
              <h2 className="font-display text-2xl mb-3 leading-snug">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.excerpt}</p>
              <div className="text-xs text-muted-foreground">{p.date}</div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
