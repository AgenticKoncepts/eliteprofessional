import { Mail, Phone, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, lang } = useI18n();
  return (
    <footer className="bg-background text-foreground mt-24 border-t border-gold/20">
      {/* Hairline gold divider with center wordmark */}
      <div className="container-elite pt-16 pb-10">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-display text-4xl md:text-5xl font-light tracking-[0.18em] uppercase leading-none">
            Elite
          </span>
          <span className="mt-2 text-[10px] tracking-[0.5em] uppercase text-gold">
            {lang === "ar" ? "بروفيشنال — الإمارات" : "Professional — UAE"}
          </span>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {/* About + contact */}
          <div className="md:col-span-1">
            <h4 className="font-display text-xl mb-4 text-gold">
              {lang === "ar" ? "إيليت بروفيشنال" : "The House"}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {t("footer_about")}
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href="mailto:info@eliteprofessionaluae.com"
                className="flex items-center gap-2.5 text-foreground/80 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" strokeWidth={1.25} />
                <span className="truncate">info@eliteprofessionaluae.com</span>
              </a>
              <a
                href="tel:+971508844641"
                className="flex items-center gap-2.5 text-foreground/80 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" strokeWidth={1.25} />
                <span dir="ltr">+971 50 884 4641</span>
              </a>
              <a
                href="https://www.instagram.com/elite_professional/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-foreground/80 hover:text-gold transition-colors"
              >
                <Instagram className="w-4 h-4 text-gold" strokeWidth={1.25} />
                <span dir="ltr">@elite_professional</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5 text-gold tracking-wide">
              {t("footer_information")}
            </h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li><Link to="/shop" className="hover:text-gold transition-colors">{t("shop")}</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">{t("footer_about_us")}</Link></li>
              <li><Link to="/blogs" className="hover:text-gold transition-colors">{t("blogs")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t("footer_contact_us")}</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer_refund")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5 text-gold tracking-wide">
              {t("footer_policies")}
            </h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer_terms")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer_privacy")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer_shipping")}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t("footer_cancellation")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5 text-gold tracking-wide">
              {t("footer_we_accept")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "PayPal", "Stripe", "COD"].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-medium bg-card border border-gold/20 text-foreground/80"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              {t("free_delivery_uae")}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="container-elite py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          <span>{t("copyright_en")}</span>
          <span className="text-gold/70 font-display italic tracking-normal text-sm normal-case">
            Crafted in the Emirates · Since 2001
          </span>
          <span dir="rtl" className="font-display tracking-normal text-sm normal-case">
            © ٢٠٢٦ إيليت بروفيشنال
          </span>
        </div>
      </div>
    </footer>
  );
}
