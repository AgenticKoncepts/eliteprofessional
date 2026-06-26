import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => {
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Elite Professional UAE",
      url: "https://eliteprofessional.lovable.app/contact",
      telephone: "+971508844641",
      email: "info@eliteprofessionaluae.com",
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
      address: { "@type": "PostalAddress", addressCountry: "AE" },
      sameAs: ["https://www.instagram.com/elite_professional/"],
    };
    return {
      meta: [
        { title: "Contact Elite Professional UAE — Phone, Email & Showroom" },
        {
          name: "description",
          content:
            "Get in touch with Elite Professional UAE. Call +971 50 884 4641, email info@eliteprofessionaluae.com, or message us on Instagram.",
        },
        { property: "og:title", content: "Contact Elite Professional UAE" },
        {
          property: "og:description",
          content: "Phone, email and Instagram — reach our UAE salon-supply team.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://eliteprofessional.lovable.app/contact" },
      ],
      links: [{ rel: "canonical", href: "https://eliteprofessional.lovable.app/contact" }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(localBusiness) },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <div className="container-elite py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("contact_eyebrow")}</div>
          <h1 className="font-display text-4xl md:text-6xl">{t("contact_title")}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <a
              href="mailto:info@eliteprofessionaluae.com"
              className="flex items-start gap-4 p-6 border border-border/60 hover:border-gold/40 transition-colors"
            >
              <Mail className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">{t("contact_email_label")}</div>
                <div className="font-medium">info@eliteprofessionaluae.com</div>
              </div>
            </a>
            <a
              href="tel:+971508844641"
              className="flex items-start gap-4 p-6 border border-border/60 hover:border-gold/40 transition-colors"
            >
              <Phone className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">{t("contact_phone_label")}</div>
                <div className="font-medium">+971 50 884 4641</div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/elite_professional/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 border border-border/60 hover:border-gold/40 transition-colors"
            >
              <Instagram className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">{t("contact_instagram_label")}</div>
                <div className="font-medium">@elite_professional</div>
                <div className="text-xs text-muted-foreground mt-1">{t("ig_followers")}</div>
              </div>
            </a>
            <div className="flex items-start gap-4 p-6 border border-border/60">
              <MapPin className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">{t("contact_location_label")}</div>
                <div className="font-medium">{t("contact_uae")}</div>
                <div className="text-xs text-muted-foreground mt-1">{t("contact_free_delivery")}</div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="bg-secondary/40 p-8 space-y-4"
          >
            <h2 className="font-display text-2xl mb-4">{t("contact_send_message")}</h2>
            <input
              required
              maxLength={200}
              placeholder={t("contact_your_name")}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              required
              type="email"
              maxLength={200}
              placeholder={t("contact_email")}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              maxLength={50}
              placeholder={t("contact_phone_opt")}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <textarea
              required
              maxLength={1000}
              placeholder={t("contact_message")}
              rows={5}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.25em] hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              {sent ? t("contact_sent") : t("contact_send_btn")}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
