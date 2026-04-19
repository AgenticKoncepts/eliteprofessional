import { Mail, Phone, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/elite-logo.png";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-elite py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="bg-white p-3 inline-block mb-6">
            <img src={logo} alt="Elite Professional" width={140} height={56} className="h-12 w-auto object-contain" />
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">
            {t("footer_about")}
          </p>
          <div className="space-y-2 text-sm">
            <a
              href="mailto:info@eliteprofessionaluae.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@eliteprofessionaluae.com</span>
            </a>
            <a
              href="tel:+971508844641"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+971 50 884 4641</span>
            </a>
            <a
              href="https://www.instagram.com/elite_professional/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@elite_professional</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">{t("footer_information")}</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/shop" className="hover:text-gold">{t("shop")}</Link></li>
            <li><Link to="/about" className="hover:text-gold">{t("footer_about_us")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("footer_contact_us")}</Link></li>
            <li><a href="#" className="hover:text-gold">{t("footer_refund")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">{t("footer_policies")}</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-gold">{t("footer_terms")}</a></li>
            <li><a href="#" className="hover:text-gold">{t("footer_privacy")}</a></li>
            <li><a href="#" className="hover:text-gold">{t("footer_shipping")}</a></li>
            <li><a href="#" className="hover:text-gold">{t("footer_cancellation")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">{t("footer_we_accept")}</h4>
          <div className="flex flex-wrap gap-2">
            {["Visa", "PayPal", "Stripe", "Mastercard", "COD"].map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 text-[11px] font-medium bg-primary-foreground/10 border border-primary-foreground/20 rounded"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-elite py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
          <span>{t("copyright_en")}</span>
          <span dir="rtl" className="font-display">© ٢٠٢٦ إيليت بروفيشنال</span>
        </div>
      </div>
    </footer>
  );
}
