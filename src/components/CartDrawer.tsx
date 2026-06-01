import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { placeOrder } from "@/lib/orders.functions";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, subtotalAed, count, clear } = useCart();
  const { t, formatPrice, lang } = useI18n();
  const [view, setView] = useState<"cart" | "checkout" | "success">("cart");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const placeOrderFn = useServerFn(placeOrder);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "United Arab Emirates",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      // reset to cart view when closed
      setTimeout(() => {
        setView("cart");
        setError(null);
      }, 300);
    }
  }, [isOpen]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await placeOrderFn({
        data: {
          customer_name: form.name.trim().slice(0, 200),
          customer_email: form.email.trim().slice(0, 200),
          customer_phone: form.phone.trim().slice(0, 50),
          shipping_address: form.address.trim().slice(0, 500),
          shipping_city: form.city.trim().slice(0, 100),
          shipping_country: form.country.trim().slice(0, 100),
          shipping_notes: form.notes.trim().slice(0, 500) || null,
          items: items.map((i) => ({
            product_id: i.productId,
            variant: i.variant ?? null,
            qty: i.qty,
          })),
        },
      });
      setOrderNumber(result?.order_number ?? null);
      clear();
      setView("success");
    } catch (err) {
      console.error("Order placement failed:", err);
      setError(t("checkout_failed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`fixed top-0 ${lang === "ar" ? "left-0" : "right-0"} h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : lang === "ar" ? "-translate-x-full" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl">
            {view === "checkout" ? t("checkout_title") : view === "success" ? t("checkout_success_title") : `${t("cart_title")} (${count})`}
          </h2>
          <button onClick={closeCart} aria-label="Close" className="hover:text-gold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {view === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-display text-2xl mb-2">{t("cart_empty")}</h3>
                  <p className="text-sm text-muted-foreground">{t("cart_empty_sub")}</p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((it) => (
                    <li key={it.id} className="p-5 flex gap-4">
                      <img src={it.image} alt={it.name} className="w-20 h-20 object-cover bg-secondary/30 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium leading-snug line-clamp-2">{it.name}</h3>
                        {it.variant && (
                          <p className="text-xs text-muted-foreground mt-1">{it.variant}</p>
                        )}
                        <div className="text-price font-display mt-1">{formatPrice(it.priceAed)}</div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => setQty(it.id, it.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-secondary"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{it.qty}</span>
                            <button
                              onClick={() => setQty(it.id, it.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-secondary"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(it.id)}
                            aria-label={t("cart_remove")}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>{t("cart_subtotal")}</span>
                  <span className="font-display text-price">{formatPrice(subtotalAed)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t("cart_shipping")}</span>
                  <span className="text-gold">{t("cart_free")}</span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-border">
                  <span className="font-medium">{t("cart_total")}</span>
                  <span className="font-display text-price text-lg">{formatPrice(subtotalAed)}</span>
                </div>
                <button
                  onClick={() => setView("checkout")}
                  className="w-full py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.25em] font-medium hover:bg-gold hover:text-gold-foreground transition-colors"
                >
                  {t("cart_checkout")}
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-2.5 border border-border text-xs tracking-[0.25em] font-medium hover:border-gold transition-colors"
                >
                  {t("cart_continue")}
                </button>
              </div>
            )}
          </>
        )}

        {view === "checkout" && (
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 space-y-3">
            <button type="button" onClick={() => setView("cart")} className="text-xs text-muted-foreground hover:text-gold mb-2">
              {t("checkout_back")}
            </button>
            <input
              required maxLength={200}
              placeholder={t("checkout_full_name")}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              required type="email" maxLength={200}
              placeholder={t("contact_email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              required maxLength={50}
              placeholder={t("checkout_phone")}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <input
              required maxLength={500}
              placeholder={t("checkout_address")}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required maxLength={100}
                placeholder={t("checkout_city")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
              />
              <input
                required maxLength={100}
                placeholder={t("checkout_country")}
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm"
              />
            </div>
            <textarea
              maxLength={500}
              placeholder={t("checkout_notes")}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border focus:border-gold outline-none text-sm resize-none"
            />
            <div className="pt-3 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("cart_subtotal")}</span>
                <span className="font-display text-price">{formatPrice(subtotalAed)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t("cart_shipping")}</span>
                <span className="text-gold">{t("cart_free")}</span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-border">
                <span className="font-medium">{t("cart_total")}</span>
                <span className="font-display text-price text-lg">{formatPrice(subtotalAed)}</span>
              </div>
            </div>
            {error && <div className="text-xs text-destructive">{error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.25em] font-medium hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-60"
            >
              {submitting ? t("checkout_placing") : t("checkout_place_order")}
            </button>
          </form>
        )}

        {view === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-5">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-display text-3xl mb-3">{t("checkout_success_title")}</h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs">{t("checkout_success_sub")}</p>
            {orderNumber && (
              <div className="text-xs tracking-[0.2em] text-muted-foreground mb-6">
                {t("checkout_order_number")} <span className="text-foreground font-mono">{orderNumber}</span>
              </div>
            )}
            <button
              onClick={closeCart}
              className="px-8 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] font-medium hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              {t("checkout_keep_shopping")}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
