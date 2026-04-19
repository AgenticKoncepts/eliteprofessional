import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function DealsBanner() {
  const { t } = useI18n();
  return (
    <section className="container-elite my-16 md:my-24">
      <div className="relative overflow-hidden bg-primary text-primary-foreground py-14 md:py-20 px-6 md:px-16 text-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-4">{t("deals_eyebrow")}</div>
          <h3 className="font-display text-3xl md:text-5xl mb-5">{t("deals_title")}</h3>
          <p className="text-primary-foreground/80 mb-8 leading-relaxed">{t("deals_text")}</p>
          <Link
            to="/shop"
            className="inline-flex px-8 py-3.5 bg-gold text-gold-foreground text-xs tracking-[0.25em] font-medium hover:bg-white hover:text-primary transition-colors"
          >
            {t("deals_cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SaleBanner() {
  const { t } = useI18n();
  return (
    <section className="container-elite my-16 md:my-24">
      <div
        className="relative overflow-hidden py-14 md:py-20 px-6 md:px-16 text-center text-gold-foreground"
        style={{ background: "var(--gradient-gold)" }}
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="text-[11px] tracking-[0.4em] mb-4 text-white/90">{t("sale_eyebrow")}</div>
          <h3 className="font-display text-3xl md:text-5xl mb-5 text-white">{t("sale_title")}</h3>
          <p className="text-white/90 mb-8 leading-relaxed">{t("sale_text")}</p>
          <Link
            to="/shop"
            className="inline-flex px-8 py-3.5 bg-white text-primary text-xs tracking-[0.25em] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {t("sale_cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
