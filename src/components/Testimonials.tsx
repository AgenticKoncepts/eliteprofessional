import { Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useI18n();
  const items = [
    { name: "Layla A.", roleKey: "t1_role", textKey: "t1_text" },
    { name: "Mohammed R.", roleKey: "t2_role", textKey: "t2_text" },
    { name: "Sara K.", roleKey: "t3_role", textKey: "t3_text" },
  ];
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container-elite">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("testimonials_eyebrow")}</div>
          <h2 className="font-display text-3xl md:text-5xl">{t("testimonials_title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((it) => (
            <figure
              key={it.name}
              className="bg-background p-8 border border-border/60 flex flex-col gap-5"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-foreground/85 leading-relaxed italic">
                "{t(it.textKey)}"
              </blockquote>
              <figcaption className="mt-auto">
                <div className="font-display text-lg">{it.name}</div>
                <div className="text-xs text-muted-foreground">{t(it.roleKey)}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
