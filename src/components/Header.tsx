import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n, CURRENCIES } from "@/lib/i18n";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/data/products";
import logo from "@/assets/elite-logo.png";

export function Header() {
  const { lang, setLang, currency, setCurrency, t } = useI18n();
  const { ids } = useWishlist();
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("home") },
    { to: "/shop", label: t("shop") },
    { to: "/brands", label: "Brands" },
    { to: "/about", label: t("about") },
    { to: "/blogs", label: t("blogs") },
    { to: "/contact", label: t("contact") },
  ];


  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container-elite">
        <div className="flex items-center justify-between h-20 gap-6">
          <Link to="/" aria-label="Elite Professional" className="shrink-0 flex items-center">
            <img
              src={logo}
              alt="Elite Professional"
              width={140}
              height={56}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navItems.map((n) => (
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
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="hover:text-gold transition-colors font-display"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative hidden md:block">
              <button
                onClick={() => setCurrencyOpen((v) => !v)}
                className="text-xs font-medium tracking-wider flex items-center gap-1 hover:text-gold transition-colors"
              >
                {currency} <ChevronDown className="w-3 h-3" />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border shadow-lg rounded-md py-1 min-w-[80px] z-50">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-1.5 text-xs hover:bg-accent ${
                        c === currency ? "text-gold" : ""
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button aria-label={t("search")} className="hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button aria-label={t("wishlist")} className="hover:text-gold transition-colors relative">
              <Heart className="w-5 h-5" />
              {ids.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gold-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {ids.size}
                </span>
              )}
            </button>
            <button aria-label={t("cart")} onClick={openCart} className="hover:text-gold transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-gold-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              className="lg:hidden"
              aria-label={t("menu")}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="hidden lg:block border-t border-border bg-secondary/40">
        <div className="container-elite">
          <div className="flex items-center justify-center gap-7 h-11 text-[11px] uppercase tracking-[0.15em] font-medium overflow-x-auto">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop"
                className="whitespace-nowrap hover:text-gold transition-colors"
              >
                {t(c.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-elite py-4 flex flex-col gap-3 text-sm">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="py-2 border-b border-border"
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="py-2 border-b border-border text-left"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
            <div className="flex flex-wrap gap-2 pt-2">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 text-xs border rounded ${
                    c === currency ? "border-gold text-gold" : "border-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} to="/shop" onClick={() => setMobileOpen(false)} className="py-1">
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
