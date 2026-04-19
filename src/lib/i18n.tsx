import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "ar";
type Currency = "AED" | "SAR" | "QAR" | "OMR" | "BHD" | "KWD" | "USD";

const RATES: Record<Currency, number> = {
  AED: 1,
  SAR: 1.02,
  QAR: 0.99,
  OMR: 0.105,
  BHD: 0.103,
  KWD: 0.083,
  USD: 0.272,
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (aed: number) => string;
  t: (key: string) => string;
}

const dict: Record<string, { en: string; ar: string }> = {
  shop: { en: "SHOP", ar: "المتجر" },
  home: { en: "HOME", ar: "الرئيسية" },
  about: { en: "ABOUT US", ar: "من نحن" },
  blogs: { en: "BLOGS", ar: "المدونة" },
  contact: { en: "CONTACT", ar: "تواصل معنا" },
  announce: {
    en: "Free delivery in UAE  |  Money back guarantee  |  Monthly new arrivals",
    ar: "توصيل مجاني في الإمارات | ضمان استرداد الأموال | وصول شهري جديد",
  },
  welcome: { en: "WELCOME TO OUR STORE!", ar: "أهلاً بكم في متجرنا!" },
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [currency, setCurrencyState] = useState<Currency>("AED");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("elite-lang") : null;
    const c = typeof window !== "undefined" ? localStorage.getItem("elite-currency") : null;
    if (stored === "ar" || stored === "en") setLangState(stored);
    if (c && c in RATES) setCurrencyState(c as Currency);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("elite-lang", l);
  };
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") localStorage.setItem("elite-currency", c);
  };

  const formatPrice = (aed: number) => {
    const v = aed * RATES[currency];
    const decimals = currency === "OMR" || currency === "BHD" || currency === "KWD" ? 3 : 2;
    return `${currency} ${v.toFixed(decimals)}`;
  };

  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, currency, setCurrency, formatPrice, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export const CURRENCIES: Currency[] = ["AED", "SAR", "QAR", "OMR", "BHD", "KWD", "USD"];
