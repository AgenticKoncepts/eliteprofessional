import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n, CURRENCIES } from "@/lib/i18n";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/data/products";

export function Header() {
  const { lang, setLang, currency, setCurrency, t } = useI18n();
  const { ids } = useWishlist();
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("home") },
    { to: "/shop", label: t("shop") },
    { to: "/about", label: t("about") },
    { to: "/blogs", label: t("blogs") },
    { to: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 md:h-24 gap-4">
          {/* Left: primary nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
            {navItems.slice(0, 3).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="hover:text-gold transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu trigger (left) */}
          <button
            className="lg:hidden -ml-1 p-2 hover:text-gold transition-colors"
            aria-label={t("menu")}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Center: wordmark */}
          <Link to="/" aria-label="Elite Professional" className="flex flex-col items-center justify-center">
            <span className="font-display text-3xl md:text-4xl font-light tracking-[0.18em] uppercase leading-none">
              Elite
            </span>
            <span className="mt-1 text-[9px] tracking-[0.5em] uppercase text-gold">
              {lang === "ar" ? "بروفيشنال" : "Professional UAE"}
            </span>
          </Link>

          {/* Right: utilities */}
          <div className="flex items-center gap-4 md:gap-6 justify-end">
            <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6">
              <div className="relative">
                <button
                  onClick={() => setCurrencyOpen((v) => !v)}
                  className="text-[11px] uppercase tracking-[0.2em] flex items-center gap-1 hover:text-gold transition-colors"
                >
                  {currency} <ChevronDown className="w-3 h-3" />
                </button>
                {currencyOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-card border border-white/10 shadow-lg py-1 min-w-[80px] z-50">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-white/5 ${
                          c === currency ? "text-gold" : ""
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors"
              >
                {lang === "en" ? "العربية" : "EN"}
              </button>
              <Link
                to="/blogs"
                className="hidden xl:inline text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors"
              >
                {t("blogs")}
              </Link>
              <Link
                to="/contact"
                className="hidden xl:inline text-[11px] uppercase tracking-[0.2em] hover:text-gold transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
            <button aria-label={t("search")} className="hover:text-gold transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.25} />
            </button>
            <button aria-label={t("wishlist")} className="hover:text-gold transition-colors relative">
              <Heart className="w-5 h-5" strokeWidth={1.25} />
              {ids.size > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {ids.size}
                </span>
              )}
            </button>
            <button aria-label={t("cart")} onClick={openCart} className="hover:text-gold transition-colors relative">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-gold-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category sub-nav */}
      <div className="hidden lg:block bg-card border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3.5 overflow-x-auto">
          <div className="flex justify-center items-center gap-12 min-w-max">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop"
                className="text-[10px] uppercase tracking-[0.25em] text-foreground/55 hover:text-gold transition-colors whitespace-nowrap"
              >
                {t(c.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5 bg-background">
          <nav className="container-elite py-4 flex flex-col gap-3 text-sm">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="py-2 border-b border-white/5 uppercase tracking-[0.2em] text-xs hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="py-2 border-b border-white/5 text-left uppercase tracking-[0.2em] text-xs"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
            <div className="flex flex-wrap gap-2 pt-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 text-xs border ${
                    c === currency ? "border-gold text-gold" : "border-white/15"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} to="/shop" onClick={() => setMobileOpen(false)} className="py-1 uppercase tracking-[0.2em] text-foreground/60">
                  {t(c.key)}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
