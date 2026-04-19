import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  priceAed: number;
  variant?: string;
  qty: number;
}

interface Ctx {
  items: CartItem[];
  add: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotalAed: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("elite-cart");
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
  }, []);

  const persist = (next: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("elite-cart", JSON.stringify(next));
    }
  };

  const add: Ctx["add"] = (item) => {
    setItems((prev) => {
      const id = `${item.productId}::${item.variant ?? ""}`;
      const existing = prev.find((p) => p.id === id);
      const qty = item.qty ?? 1;
      const next = existing
        ? prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p))
        : [...prev, { ...item, id, qty }];
      persist(next);
      return next;
    });
    setIsOpen(true);
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persist(next);
      return next;
    });
  };

  const setQty = (id: string, qty: number) => {
    setItems((prev) => {
      const next = prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, qty) } : p))
        .filter((p) => p.qty > 0);
      persist(next);
      return next;
    });
  };

  const clear = () => {
    setItems([]);
    persist([]);
  };

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotalAed = items.reduce((s, i) => s + i.priceAed * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        count,
        subtotalAed,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
