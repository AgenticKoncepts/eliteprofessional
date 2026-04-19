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
  // Nav
  shop: { en: "SHOP", ar: "المتجر" },
  home: { en: "HOME", ar: "الرئيسية" },
  about: { en: "ABOUT US", ar: "من نحن" },
  blogs: { en: "BLOGS", ar: "المدونة" },
  contact: { en: "CONTACT", ar: "تواصل معنا" },
  search: { en: "Search", ar: "بحث" },
  wishlist: { en: "Wishlist", ar: "المفضلة" },
  cart: { en: "Cart", ar: "السلة" },
  menu: { en: "Menu", ar: "القائمة" },

  // Categories
  cat_offers: { en: "Offers And Deals", ar: "العروض والصفقات" },
  cat_haircare: { en: "Hair Care", ar: "العناية بالشعر" },
  cat_haircolor: { en: "Hair Color", ar: "صبغات الشعر" },
  cat_shower: { en: "Shower Vitamin Head", ar: "رأس فيتامين الدش" },
  cat_3me: { en: "3ME Brushes", ar: "فرش ٣ ام إي" },
  cat_electronics: { en: "Electronics", ar: "الإلكترونيات" },
  cat_mens: { en: "Men's Collections", ar: "مجموعات الرجال" },
  cat_skincare: { en: "Skin Care", ar: "العناية بالبشرة" },
  cat_tools: { en: "Tools & Accessories", ar: "الأدوات والإكسسوارات" },
  cat_cinema: { en: "Cinema Makeup", ar: "مكياج السينما" },
  cat_fragrances: { en: "Fragrances", ar: "العطور" },

  // Announcement / common
  announce: {
    en: "Free delivery in UAE  |  Money back guarantee  |  Monthly new arrivals",
    ar: "توصيل مجاني في الإمارات | ضمان استرداد الأموال | وصول شهري جديد",
  },
  welcome: { en: "WELCOME TO OUR STORE!", ar: "أهلاً بكم في متجرنا!" },
  go_to_shop: { en: "GO TO SHOP", ar: "اذهب إلى المتجر" },
  add_to_cart: { en: "ADD TO CART", ar: "أضف إلى السلة" },
  select_options: { en: "SELECT OPTIONS", ar: "اختر الخيارات" },
  follow_instagram: { en: "FOLLOW ON INSTAGRAM", ar: "تابعنا على إنستغرام" },
  free_delivery_uae: { en: "Free delivery in UAE · Money back guarantee", ar: "توصيل مجاني في الإمارات · ضمان استرداد الأموال" },

  // Sections
  shop_by_category_eyebrow: { en: "ELITE PROFESSIONAL", ar: "إيليت بروفيشنال" },
  shop_by_category_title: { en: "Shop by Category", ar: "تسوق حسب الفئة" },
  shop_by_category_sub: {
    en: "Check out our broad variety of categories designed to meet your specific needs.",
    ar: "اكتشف مجموعتنا الواسعة من الفئات المصممة لتلبية احتياجاتك الخاصة.",
  },
  shop_by_brand_eyebrow: { en: "SHOP BY BRAND", ar: "تسوق حسب العلامة" },
  shop_by_brand_title: { en: "We put the world in your hands", ar: "نضع العالم بين يديك" },
  featured_eyebrow: { en: "DISCOVER THE GREATNESS", ar: "اكتشف العظمة" },
  featured_title: { en: "Featured Products", ar: "المنتجات المميزة" },
  featured_sub: {
    en: "Check out our broad variety of products our customer likes.",
    ar: "اطلع على مجموعتنا الواسعة من المنتجات التي يحبها عملاؤنا.",
  },
  about_eyebrow: { en: "ABOUT US", ar: "من نحن" },
  about_title_short: { en: "Crafted with passion since 2001", ar: "صُنع بشغف منذ ٢٠٠١" },
  about_long: {
    en: "Elite professional is a self-established company, since 2001. Relentlessly, we develop new ideas. Concepts and technologies to maintain the point of concept (POC). We combine attractiveness and individuality with user friendliness and cost efficiency products.",
    ar: "إيليت بروفيشنال شركة مستقلة تأسست منذ عام ٢٠٠١. نطوّر باستمرار أفكاراً ومفاهيم وتقنيات جديدة، ونجمع بين الجاذبية والتميّز وسهولة الاستخدام بأسعار اقتصادية.",
  },

  // Hero slides
  hero_haircare_eyebrow: { en: "HAIR CARE", ar: "العناية بالشعر" },
  hero_haircare_title: { en: "Luxurious Shampoo", ar: "شامبو فاخر" },
  hero_haircare_text: {
    en: "Our luxurious Shampoo gently cleanses and nourishes your hair, leaving it soft, shiny, and manageable.",
    ar: "شامبونا الفاخر ينظف الشعر بلطف ويغذيه، فيتركه ناعماً ولامعاً وسهل التصفيف.",
  },
  hero_haircolor_eyebrow: { en: "HAIR COLOR", ar: "صبغات الشعر" },
  hero_haircolor_title: { en: "133+ Shades", ar: "أكثر من ١٣٣ درجة" },
  hero_haircolor_text: {
    en: "Vibrant, long-lasting permanent color formulated with multivitamins and gentle care.",
    ar: "ألوان دائمة نابضة بالحياة تدوم طويلاً ومُدعّمة بالفيتامينات للعناية اللطيفة.",
  },
  hero_electronics_eyebrow: { en: "ELECTRONICS", ar: "الإلكترونيات" },
  hero_electronics_title: { en: "Salon-Grade Tools", ar: "أدوات بمستوى الصالونات" },
  hero_electronics_text: {
    en: "Professional dryers, straighteners and trimmers engineered for daily salon performance.",
    ar: "مجففات ومملسات وماكينات قص احترافية مصممة للأداء اليومي في الصالونات.",
  },
  hero_skincare_eyebrow: { en: "SKIN CARE", ar: "العناية بالبشرة" },
  hero_skincare_title: { en: "Glow Restored", ar: "إشراقة متجددة" },
  hero_skincare_text: {
    en: "Treatments and serums chosen by professionals for visible, lasting results.",
    ar: "علاجات ومصول مختارة من قبل المحترفين لنتائج ظاهرة ودائمة.",
  },
  hero_tools_eyebrow: { en: "TOOLS & ACCESSORIES", ar: "الأدوات والإكسسوارات" },
  hero_tools_title: { en: "Precision Crafted", ar: "صُنعت بدقة" },
  hero_tools_text: {
    en: "From brushes to clippers — the equipment your craft deserves.",
    ar: "من الفرش إلى ماكينات القص — المعدات التي تستحقها مهنتك.",
  },

  // Promo banners
  deals_eyebrow: { en: "EXCLUSIVE DEALS", ar: "عروض حصرية" },
  deals_title: { en: "Boost Your Savings Today!", ar: "ضاعف توفيرك اليوم!" },
  deals_text: {
    en: "Unlock exclusive deals tailored for your salon's success. Explore our latest promotions and elevate your business with unbeatable offers!",
    ar: "اكتشف عروضاً حصرية مصممة لنجاح صالونك. تصفح أحدث ترويجاتنا وارتقِ بأعمالك بعروض لا تُقاوم!",
  },
  deals_cta: { en: "DEALS AND PROMOTIONS", ar: "العروض والترويجات" },
  sale_eyebrow: { en: "SUPER SALE", ar: "تخفيضات كبرى" },
  sale_title: { en: "Exclusive Super Sale Today!", ar: "تخفيضات حصرية اليوم!" },
  sale_text: {
    en: "Avail Our Packages of Treatment for hair, face and body. Big discount ever in this year, Don't miss amazing deal. Enjoy shopping!!!!",
    ar: "احصل على باقاتنا للعناية بالشعر والوجه والجسم. أكبر خصم هذا العام، لا تفوّت العرض المذهل. استمتع بالتسوق!",
  },
  sale_cta: { en: "PACKAGE OFFERS", ar: "عروض الباقات" },

  // Instagram
  ig_followers: { en: "335 posts · 5,019 followers", ar: "٣٣٥ منشوراً · ٥٬٠١٩ متابعاً" },

  // Testimonials
  testimonials_eyebrow: { en: "TESTIMONIALS", ar: "آراء العملاء" },
  testimonials_title: { en: "What our customers say!", ar: "ماذا يقول عملاؤنا!" },
  t1_text: {
    en: "Elite Professional has been our go-to supplier for years. The hair color range is unmatched and delivery across UAE is always on time.",
    ar: "إيليت بروفيشنال هي مورّدنا المفضل منذ سنوات. مجموعة صبغات الشعر لا مثيل لها والتوصيل في الإمارات دائماً في موعده.",
  },
  t1_role: { en: "Salon Owner, Dubai", ar: "مالكة صالون، دبي" },
  t2_text: {
    en: "Quality tools at honest prices. The trimmers and clippers feel premium and last through heavy daily use.",
    ar: "أدوات بجودة عالية وأسعار صادقة. الماكينات تبدو فاخرة وتدوم رغم الاستخدام اليومي المكثف.",
  },
  t2_role: { en: "Master Barber, Abu Dhabi", ar: "حلّاق محترف، أبو ظبي" },
  t3_text: {
    en: "KYO and Freelimix products are truly professional grade. My clients love the results and I love the consistency.",
    ar: "منتجات كيو وفريليمكس احترافية فعلاً. عميلاتي يحببن النتائج وأنا أحب الثبات في الجودة.",
  },
  t3_role: { en: "Stylist, Sharjah", ar: "مصففة شعر، الشارقة" },

  // Footer
  footer_about: {
    en: "Self-established since 2001. We combine attractiveness and individuality with user friendliness and cost efficiency products.",
    ar: "شركة مستقلة منذ ٢٠٠١. نجمع بين الجاذبية والتميّز وسهولة الاستخدام بأسعار اقتصادية.",
  },
  footer_information: { en: "Information", ar: "معلومات" },
  footer_policies: { en: "Policies", ar: "السياسات" },
  footer_we_accept: { en: "We Accept", ar: "نقبل الدفع عبر" },
  footer_about_us: { en: "About us", ar: "من نحن" },
  footer_contact_us: { en: "Contact us", ar: "تواصل معنا" },
  footer_refund: { en: "Refund And Returns Policy", ar: "سياسة الاسترداد والإرجاع" },
  footer_terms: { en: "Terms and Conditions", ar: "الشروط والأحكام" },
  footer_privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  footer_shipping: { en: "Shipping & Delivery Policy", ar: "سياسة الشحن والتوصيل" },
  footer_cancellation: { en: "Cancellation Policy", ar: "سياسة الإلغاء" },
  copyright_en: { en: "© 2026 Elite Professional", ar: "© ٢٠٢٦ إيليت بروفيشنال" },

  // About page
  about_page_title: { en: "Welcome to our store!", ar: "أهلاً بكم في متجرنا!" },
  about_stat_years: { en: "Years of Experience", ar: "سنوات من الخبرة" },
  about_stat_customers: { en: "Loyal Customers", ar: "عميل وفي" },
  about_stat_brands: { en: "Premium Brands", ar: "علامة تجارية فاخرة" },
  about_get_in_touch: { en: "Get in Touch", ar: "تواصل معنا" },

  // Blogs
  blogs_eyebrow: { en: "JOURNAL", ar: "المدوّنة" },
  blogs_title: { en: "Blogs", ar: "المدوّنة" },
  blog1_title: {
    en: "Choosing the Right Permanent Hair Color for Your Clients",
    ar: "كيف تختارين الصبغة الدائمة المناسبة لعميلاتك",
  },
  blog1_excerpt: {
    en: "From tone selection to oxidizing emulsion ratios — a professional's guide to flawless coverage with KYO and Freelimix.",
    ar: "من اختيار الدرجة إلى نسب مستحلب الأكسدة — دليل احترافي لتغطية مثالية مع كيو وفريليمكس.",
  },
  blog1_date: { en: "March 12, 2026", ar: "١٢ مارس ٢٠٢٦" },
  blog2_title: { en: "Why Marine Collagen & Keratin Treatments Work", ar: "لماذا تنجح علاجات الكولاجين البحري والكيراتين" },
  blog2_excerpt: {
    en: "Discover the science behind the Kyo Bio-Activator and how it restores damaged strands in just three applications.",
    ar: "اكتشف العلم وراء كيو بايو-أكتيفيتور وكيف يستعيد الشعر التالف في ثلاث جلسات فقط.",
  },
  blog2_date: { en: "February 28, 2026", ar: "٢٨ فبراير ٢٠٢٦" },
  blog3_title: { en: "Salon Equipment Maintenance: Hair Dryers & Trimmers", ar: "صيانة معدات الصالون: المجففات وماكينات القص" },
  blog3_excerpt: {
    en: "A practical checklist to extend the life of your professional electronics and keep performance consistent.",
    ar: "قائمة عملية لإطالة عمر أجهزتك الاحترافية والحفاظ على ثبات الأداء.",
  },
  blog3_date: { en: "February 14, 2026", ar: "١٤ فبراير ٢٠٢٦" },

  // Contact page
  contact_eyebrow: { en: "CONTACT", ar: "تواصل" },
  contact_title: { en: "Get in touch", ar: "تواصل معنا" },
  contact_email_label: { en: "EMAIL", ar: "البريد الإلكتروني" },
  contact_phone_label: { en: "PHONE", ar: "الهاتف" },
  contact_instagram_label: { en: "INSTAGRAM", ar: "إنستغرام" },
  contact_location_label: { en: "LOCATION", ar: "الموقع" },
  contact_uae: { en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  contact_free_delivery: { en: "Free delivery across UAE", ar: "توصيل مجاني في جميع أنحاء الإمارات" },
  contact_send_message: { en: "Send us a message", ar: "أرسل لنا رسالة" },
  contact_your_name: { en: "Your name", ar: "اسمك" },
  contact_email: { en: "Email", ar: "البريد الإلكتروني" },
  contact_phone_opt: { en: "Phone (optional)", ar: "الهاتف (اختياري)" },
  contact_message: { en: "Message", ar: "الرسالة" },
  contact_send_btn: { en: "SEND MESSAGE", ar: "إرسال الرسالة" },
  contact_sent: { en: "MESSAGE SENT — THANK YOU", ar: "تم إرسال الرسالة — شكراً لك" },

  // Shop page
  shop_eyebrow: { en: "SHOP", ar: "المتجر" },
  shop_all_products: { en: "All Products", ar: "كل المنتجات" },
  shop_all: { en: "ALL", ar: "الكل" },
  shop_by_category_h2: { en: "Shop by Category", ar: "تسوق حسب الفئة" },

  // Product detail
  pd_description: { en: "Description", ar: "الوصف" },
  pd_quantity: { en: "Quantity", ar: "الكمية" },
  pd_variant: { en: "Variant", ar: "الخيار" },
  pd_in_stock: { en: "In Stock", ar: "متوفر" },
  pd_free_shipping: { en: "Free shipping in UAE", ar: "شحن مجاني في الإمارات" },
  pd_money_back: { en: "Money back guarantee", ar: "ضمان استرداد الأموال" },
  pd_category: { en: "Category", ar: "الفئة" },
  pd_added: { en: "Added to cart", ar: "أُضيف إلى السلة" },
  pd_back_to_shop: { en: "← Back to shop", ar: "→ الرجوع للمتجر" },
  pd_default_desc: {
    en: "A professional-grade product hand-picked by Elite Professional. Crafted for salons across the UAE — long-lasting, reliable and safe for daily use. Includes our money-back guarantee and free delivery anywhere in the Emirates.",
    ar: "منتج احترافي مختار بعناية من إيليت بروفيشنال. مصمم لصالونات الإمارات — يدوم طويلاً، موثوق وآمن للاستخدام اليومي. يشمل ضمان استرداد الأموال والتوصيل المجاني في جميع أنحاء الدولة.",
  },

  // Cart drawer
  cart_title: { en: "Your Cart", ar: "سلتك" },
  cart_empty: { en: "Your cart is empty", ar: "سلتك فارغة" },
  cart_empty_sub: { en: "Add a few products and they will appear here.", ar: "أضف بعض المنتجات وستظهر هنا." },
  cart_subtotal: { en: "Subtotal", ar: "المجموع الفرعي" },
  cart_shipping: { en: "Shipping", ar: "الشحن" },
  cart_free: { en: "FREE", ar: "مجاني" },
  cart_total: { en: "Total", ar: "الإجمالي" },
  cart_checkout: { en: "CHECKOUT", ar: "إتمام الشراء" },
  cart_continue: { en: "CONTINUE SHOPPING", ar: "متابعة التسوق" },
  cart_remove: { en: "Remove", ar: "إزالة" },

  // Checkout
  checkout_title: { en: "Shipping Details", ar: "تفاصيل الشحن" },
  checkout_back: { en: "← Back to cart", ar: "→ الرجوع للسلة" },
  checkout_full_name: { en: "Full name", ar: "الاسم الكامل" },
  checkout_phone: { en: "Phone number", ar: "رقم الهاتف" },
  checkout_address: { en: "Street address", ar: "العنوان" },
  checkout_city: { en: "City / Emirate", ar: "المدينة / الإمارة" },
  checkout_country: { en: "Country", ar: "الدولة" },
  checkout_notes: { en: "Order notes (optional)", ar: "ملاحظات الطلب (اختياري)" },
  checkout_place_order: { en: "PLACE ORDER (CASH ON DELIVERY)", ar: "تأكيد الطلب (الدفع عند الاستلام)" },
  checkout_placing: { en: "PLACING ORDER...", ar: "جاري تأكيد الطلب..." },
  checkout_success_title: { en: "Order placed!", ar: "تم تأكيد الطلب!" },
  checkout_success_sub: {
    en: "We've received your order. Our team will contact you shortly to confirm delivery.",
    ar: "استلمنا طلبك. سيتواصل معك فريقنا قريباً لتأكيد التوصيل.",
  },
  checkout_order_number: { en: "Order number", ar: "رقم الطلب" },
  checkout_keep_shopping: { en: "KEEP SHOPPING", ar: "متابعة التسوق" },
  checkout_failed: { en: "Could not place order. Please try again.", ar: "تعذر تأكيد الطلب. يرجى المحاولة مرة أخرى." },

  // Shop by category cards
  cat_dryers: { en: "Hair Dryers", ar: "مجففات الشعر" },
  cat_straighteners: { en: "Hair Straighteners", ar: "مملسات الشعر" },
  cat_curler: { en: "Curler", ar: "ملفّ الشعر" },
  cat_wax: { en: "Wax Machine", ar: "جهاز الشمع" },
  cat_trimmers: { en: "Trimmers", ar: "ماكينات القص" },
  word_product: { en: "Product", ar: "منتج" },
  word_products: { en: "Products", ar: "منتجات" },
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
