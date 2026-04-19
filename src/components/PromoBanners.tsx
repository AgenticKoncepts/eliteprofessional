import { Link } from "@tanstack/react-router";

export function DealsBanner() {
  return (
    <section className="container-elite my-16 md:my-24">
      <div className="relative overflow-hidden bg-primary text-primary-foreground py-14 md:py-20 px-6 md:px-16 text-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "var(--gradient-gold)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-4">EXCLUSIVE DEALS</div>
          <h3 className="font-display text-3xl md:text-5xl mb-5">Boost Your Savings Today!</h3>
          <p className="text-primary-foreground/80 mb-8 leading-relaxed">
            Unlock exclusive deals tailored for your salon's success. Explore our latest promotions
            and elevate your business with unbeatable offers!
          </p>
          <Link
            to="/shop"
            className="inline-flex px-8 py-3.5 bg-gold text-gold-foreground text-xs tracking-[0.25em] font-medium hover:bg-white hover:text-primary transition-colors"
          >
            DEALS AND PROMOTIONS
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SaleBanner() {
  return (
    <section className="container-elite my-16 md:my-24">
      <div
        className="relative overflow-hidden py-14 md:py-20 px-6 md:px-16 text-center text-gold-foreground"
        style={{ background: "var(--gradient-gold)" }}
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="text-[11px] tracking-[0.4em] mb-4 text-white/90">SUPER SALE</div>
          <h3 className="font-display text-3xl md:text-5xl mb-5 text-white">
            Exclusive Super Sale Today!
          </h3>
          <p className="text-white/90 mb-8 leading-relaxed">
            Avail Our Packages of Treatment for hair, face and body. Big discount ever in this year,
            Don't miss amazing deal. Enjoy shopping!!!!
          </p>
          <Link
            to="/shop"
            className="inline-flex px-8 py-3.5 bg-white text-primary text-xs tracking-[0.25em] font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            PACKAGE OFFERS
          </Link>
        </div>
      </div>
    </section>
  );
}
