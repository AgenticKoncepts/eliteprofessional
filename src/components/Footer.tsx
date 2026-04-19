import { Mail, Phone, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container-elite py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl mb-1">Elite</div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/60 mb-6">
            Professional
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">
            Self-established since 2001. We combine attractiveness and individuality with user
            friendliness and cost efficiency products.
          </p>
          <div className="space-y-2 text-sm">
            <a
              href="mailto:info@eliteprofessionaluae.com"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4" /> info@eliteprofessionaluae.com
            </a>
            <a
              href="tel:+971508844641"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" /> +971 50 884 4641
            </a>
            <a
              href="https://www.instagram.com/elite_professional/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Instagram className="w-4 h-4" /> @elite_professional
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Information</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/shop" className="hover:text-gold">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold">About us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact us</Link></li>
            <li><a href="#" className="hover:text-gold">Refund And Returns Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Policies</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><a href="#" className="hover:text-gold">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-gold">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gold">Shipping &amp; Delivery Policy</a></li>
            <li><a href="#" className="hover:text-gold">Cancellation Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">We Accept</h4>
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
          <span>© 2026 Elite Professional</span>
          <span dir="rtl" className="font-display">© 2026 إيليت بروفيشنال</span>
        </div>
      </div>
    </footer>
  );
}
