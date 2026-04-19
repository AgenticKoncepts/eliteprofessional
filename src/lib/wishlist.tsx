import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface Ctx {
  ids: Set<string>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

const WishlistContext = createContext<Ctx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("elite-wishlist");
    if (raw) {
      try {
        setIds(new Set(JSON.parse(raw)));
      } catch {
        // ignore
      }
    }
  }, []);

  const persist = (next: Set<string>) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("elite-wishlist", JSON.stringify([...next]));
    }
  };

  const toggle = (id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persist(next);
      return next;
    });
  };

  const has = (id: string) => ids.has(id);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
