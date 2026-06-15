import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Instagram, Mail, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Elite Professional UAE — Salon Supply Since 2001" },
      {
        name: "description",
        content:
          "Established in 2001, Elite Professional distributes premium salon supplies across the UAE — 23+ years serving 5,000+ professionals with 10+ leading global brands.",
      },
      { property: "og:title", content: "About Elite Professional UAE — Salon Supply Since 2001" },
      {
        property: "og:description",
        content: "23+ years, 5,000+ loyal customers, 10+ premium brands — the Elite Professional story.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://eliteprofessional.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://eliteprofessional.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  const stats = [
    { n: "23+", k: "about_stat_years" },
    { n: "5,000+", k: "about_stat_customers" },
    { n: "10+", k: "about_stat_brands" },
  ];
  return (
    <Layout>
      <div className="container-elite py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("about_eyebrow")}</div>
          <h1 className="font-display text-4xl md:text-6xl mb-6">{t("about_page_title")}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("about_long")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {stats.map((s) => (
            <div key={s.k} className="text-center p-10 bg-secondary/40">
              <div className="font-display text-5xl text-gradient-gold mb-2">{s.n}</div>
              <div className="text-sm tracking-wider text-muted-foreground uppercase">{t(s.k)}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-10 md:p-16">
          <h2 className="font-display text-3xl mb-6 text-gold">{t("about_get_in_touch")}</h2>
          <div className="space-y-3 text-sm">
            <a
              href="mailto:info@eliteprofessionaluae.com"
              className="flex items-center justify-center gap-2 hover:text-gold"
            >
              <Mail className="w-4 h-4" />
              <span>info@eliteprofessionaluae.com</span>
            </a>
            <a href="tel:+971508844641" className="flex items-center justify-center gap-2 hover:text-gold">
              <Phone className="w-4 h-4" />
              <span>+971 50 884 4641</span>
            </a>
            <a
              href="https://www.instagram.com/elite_professional/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 hover:text-gold"
            >
              <Instagram className="w-4 h-4" />
              <span>@elite_professional</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
