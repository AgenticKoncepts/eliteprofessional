import { Star } from "lucide-react";

const items = [
  {
    name: "Layla A.",
    role: "Salon Owner, Dubai",
    text: "Elite Professional has been our go-to supplier for years. The hair color range is unmatched and delivery across UAE is always on time.",
  },
  {
    name: "Mohammed R.",
    role: "Master Barber, Abu Dhabi",
    text: "Quality tools at honest prices. The trimmers and clippers feel premium and last through heavy daily use.",
  },
  {
    name: "Sara K.",
    role: "Stylist, Sharjah",
    text: "KYO and Freelimix products are truly professional grade. My clients love the results and I love the consistency.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container-elite">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">TESTIMONIALS</div>
          <h2 className="font-display text-3xl md:text-5xl">What our customers say!</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((t) => (
            <figure
              key={t.name}
              className="bg-background p-8 border border-border/60 flex flex-col gap-5"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-foreground/85 leading-relaxed italic">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-auto">
                <div className="font-display text-lg">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
