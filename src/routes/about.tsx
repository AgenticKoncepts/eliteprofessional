import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Instagram, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Elite Professional UAE" },
      {
        name: "description",
        content:
          "Self-established since 2001, Elite Professional develops new ideas, concepts and technologies for the salon industry.",
      },
      { property: "og:title", content: "About Elite Professional — Since 2001" },
      {
        property: "og:description",
        content: "Self-established since 2001, serving salons across the UAE.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <div className="container-elite py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">ABOUT US</div>
          <h1 className="font-display text-4xl md:text-6xl mb-6">Welcome to our store!</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Elite professional is a self-established company, since 2001. Relentlessly, we develop
            new ideas, concepts and technologies to maintain the point of concept (POC). We combine
            attractiveness and individuality with user friendliness and cost efficiency products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { n: "23+", t: "Years of Experience" },
            { n: "5,000+", t: "Loyal Customers" },
            { n: "10+", t: "Premium Brands" },
          ].map((s) => (
            <div key={s.t} className="text-center p-10 bg-secondary/40">
              <div className="font-display text-5xl text-gradient-gold mb-2">{s.n}</div>
              <div className="text-sm tracking-wider text-muted-foreground uppercase">{s.t}</div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center bg-primary text-primary-foreground p-10 md:p-16">
          <h2 className="font-display text-3xl mb-6 text-gold">Get in Touch</h2>
          <div className="space-y-3 text-sm">
            <a
              href="mailto:info@eliteprofessionaluae.com"
              className="flex items-center justify-center gap-2 hover:text-gold"
            >
              <Mail className="w-4 h-4" /> info@eliteprofessionaluae.com
            </a>
            <a
              href="tel:+971508844641"
              className="flex items-center justify-center gap-2 hover:text-gold"
            >
              <Phone className="w-4 h-4" /> +971 50 884 4641
            </a>
            <a
              href="https://www.instagram.com/elite_professional/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 hover:text-gold"
            >
              <Instagram className="w-4 h-4" /> @elite_professional
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
