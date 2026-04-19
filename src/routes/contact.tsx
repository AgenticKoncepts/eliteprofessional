import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, Phone, Instagram, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elite Professional UAE" },
      {
        name: "description",
        content: "Reach Elite Professional UAE — phone, email and Instagram. Salon supplies across the Emirates.",
      },
      { property: "og:title", content: "Contact Elite Professional" },
      { property: "og:description", content: "Phone, email and social — get in touch." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <div className="container-elite py-16 md:py-24">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">CONTACT</div>
          <h1 className="font-display text-4xl md:text-6xl">Get in touch</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <a
              href="mailto:info@eliteprofessionaluae.com"
              className="flex items-start gap-4 p-6 border border-border/60 hover:border-gold/40 transition-colors"
            >
              <Mail className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">EMAIL</div>
                <div className="font-medium">info@eliteprofessionaluae.com</div>
              </div>
            </a>
            <a
              href="tel:+971508844641"
              className="flex items-start gap-4 p-6 border border-border/60 hover:border-gold/40 transition-colors"
            >
              <Phone className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">PHONE</div>
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
                <div className="text-xs tracking-wider text-muted-foreground mb-1">INSTAGRAM</div>
                <div className="font-medium">@elite_professional</div>
                <div className="text-xs text-muted-foreground mt-1">335 posts · 5,019 followers</div>
              </div>
            </a>
            <div className="flex items-start gap-4 p-6 border border-border/60">
              <MapPin className="w-5 h-5 text-gold mt-1" />
              <div>
                <div className="text-xs tracking-wider text-muted-foreground mb-1">LOCATION</div>
                <div className="font-medium">United Arab Emirates</div>
                <div className="text-xs text-muted-foreground mt-1">Free delivery across UAE</div>
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
            <h2 className="font-display text-2xl mb-4">Send us a message</h2>
            <input
              required
              placeholder="Your name"
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              placeholder="Phone (optional)"
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <textarea
              required
              placeholder="Message"
              rows={5}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.25em] hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              {sent ? "MESSAGE SENT — THANK YOU" : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
