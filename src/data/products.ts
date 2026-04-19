import kyo from "@/assets/product-haircolor-kyo.jpg";
import freelimix from "@/assets/product-freelimix.jpg";
import bio from "@/assets/product-bioactivator.jpg";
import emulsion from "@/assets/product-emulsion.jpg";
import tweezer from "@/assets/product-tweezer.jpg";
import tweezerD from "@/assets/product-tweezer-diagonal.jpg";
import bio1l from "@/assets/product-bioactivator-1l.jpg";
import toenail from "@/assets/product-toenail.jpg";
import kyorganic from "@/assets/product-kyorganic.jpg";
import sts from "@/assets/product-sts-clipper.jpg";
import nail from "@/assets/product-nailclipper.jpg";
import lumen from "@/assets/product-kyo-lumen.jpg";

export interface Product {
  id: string;
  name: string;
  image: string;
  priceAed: number;
  priceMaxAed?: number;
  variants?: number;
  variantOptions?: string[];
  category: string;
  description?: string;
  description_ar?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "kyo-color",
    name: "KYO Permanent Hair Color (Ammonia Free & PPD Free) / 73 Variety",
    image: kyo,
    priceAed: 36.75,
    variants: 73,
    variantOptions: ["1.0 Black", "3.0 Dark Brown", "5.0 Light Brown", "7.0 Blonde", "9.0 Very Light Blonde", "10.0 Platinum"],
    category: "Hair Color",
    description:
      "KYO Permanent Hair Color delivers vibrant, long-lasting results — ammonia and PPD free. Enriched with conditioning agents that protect the hair fiber during the coloring process. Available across 73 fashion-forward shades for total creative freedom.",
    description_ar:
      "صبغة كيو الدائمة للشعر تمنحك ألواناً نابضة وطويلة الأمد — خالية من الأمونيا و PPD. غنية بمكونات مرطبة تحمي الشعرة أثناء الصبغ. متوفرة في ٧٣ درجة عصرية لحرية إبداعية كاملة.",
  },
  {
    id: "freelimix",
    name: "Freelimix Permanent Hair Color with Multivitamins / 133 Variety",
    image: freelimix,
    priceAed: 31.5,
    variants: 133,
    variantOptions: ["Natural", "Ash", "Golden", "Copper", "Mahogany", "Red", "Violet"],
    category: "Hair Color",
    description:
      "Freelimix combines a stable color formula with a multivitamin complex that nourishes the hair throughout the chemical process — leaving it shiny, healthy and full of intense color. 133 shades cover every client request.",
    description_ar:
      "تجمع صبغة فريليمكس بين تركيبة لون ثابتة ومركّب فيتامينات يغذي الشعر أثناء العملية — فيتركه لامعاً وصحياً ومفعماً باللون. ١٣٣ درجة تغطي طلبات جميع العميلات.",
  },
  {
    id: "kyo-bio-150",
    name: "Kyo Bio-Activator 150ml (Marine Collagen & Keratin)",
    image: bio,
    priceAed: 18.9,
    variants: 2,
    variantOptions: ["150ml Original", "150ml Intense"],
    category: "Hair Care",
    description:
      "An intensive serum powered by marine collagen and hydrolyzed keratin. Restores damaged strands in three applications, reinforces the cuticle and adds long-lasting shine. Use after color services or as a stand-alone repair treatment.",
    description_ar:
      "سيروم مكثف معزز بالكولاجين البحري والكيراتين المُحلَّل. يستعيد الشعر التالف في ثلاث جلسات، يقوي الطبقة الخارجية ويمنح لمعاناً يدوم طويلاً.",
  },
  {
    id: "freelimix-emulsion",
    name: "Freelimix Hair Color Oxidizing Emulsion Cream 150ml",
    image: emulsion,
    priceAed: 18.9,
    variants: 4,
    variantOptions: ["10 Vol", "20 Vol", "30 Vol", "40 Vol"],
    category: "Hair Color",
    description:
      "Stable oxidizing emulsion designed to pair with Freelimix and KYO color lines. Creamy texture for even mixing, gentle developer action and predictable lift across volumes.",
    description_ar:
      "مستحلب أكسدة ثابت مصمم للاستخدام مع خطوط كيو وفريليمكس. قوام كريمي لخلط متجانس ومفعول لطيف ورفع متوقع للون عبر الحجوم المختلفة.",
  },
  {
    id: "depilatory-tweezer",
    name: "Elite Professional Depilatory Tweezer (ST 9053)",
    image: tweezer,
    priceAed: 12.6,
    category: "Tools & Accessories",
    description:
      "Precision-tipped depilatory tweezer with hand-finished tension for clean, single-hair grip every time. Stainless steel construction, comfortable contoured shanks.",
    description_ar:
      "ملقط نتف مدبب بدقة مع توتر يدوي للإمساك النظيف بشعرة واحدة في كل مرة. مصنوع من الفولاذ المقاوم للصدأ بمقابض مريحة.",
  },
  {
    id: "diagonal-tweezer",
    name: "Elite Professional Diagonal Tweezer (DI 9473)",
    image: tweezerD,
    priceAed: 12.6,
    category: "Tools & Accessories",
    description:
      "Diagonal-tip tweezer engineered for brow shaping and detail work. Razor-aligned tips, perfect closure, and a satin-matte stainless body.",
    description_ar:
      "ملقط بطرف مائل مصمم لتشكيل الحاجبين والأعمال الدقيقة. أطراف بمحاذاة شفرات، إغلاق مثالي، وجسم فولاذي مطفي.",
  },
  {
    id: "kyo-bio-1000",
    name: "Kyo Bio-Activator 1000ml",
    image: bio1l,
    priceAed: 42.0,
    variants: 2,
    variantOptions: ["1L Original", "1L Intense"],
    category: "Hair Care",
    description:
      "Salon-size Bio-Activator with the same marine collagen and keratin technology as our 150ml — formulated for back-bar use and high-volume treatments.",
    description_ar:
      "حجم صالون من بايو-أكتيفيتور بنفس تقنية الكولاجين البحري والكيراتين الموجودة في حجم ١٥٠ مل — مصممة للاستخدام داخل الصالون والعلاجات بكميات كبيرة.",
  },
  {
    id: "toenail-clipper",
    name: "Elite Professional Toenail Clipper",
    image: toenail,
    priceAed: 12.6,
    category: "Tools & Accessories",
    description:
      "Heavy-duty toenail clipper with a curved, sharp blade and ergonomic lever. Built for pedicure rooms — quick, accurate, comfortable.",
    description_ar:
      "قصافة أظافر للقدم متينة بشفرة منحنية حادة وذراع مريحة. مصممة لغرف العناية بالقدم — سريعة ودقيقة ومريحة.",
  },
  {
    id: "kyorganic",
    name: "KYORGANIC Shampoo (Bamboo, Black Tea, Keratin) 2 sizes",
    image: kyorganic,
    priceAed: 63.0,
    priceMaxAed: 138.6,
    variants: 2,
    variantOptions: ["500ml — AED 63.00", "1000ml — AED 138.60"],
    category: "Hair Care",
    description:
      "An organic-inspired shampoo blending bamboo extract, black tea antioxidants and hydrolyzed keratin. Gently cleanses, fortifies and restores natural shine — sulfate-free formula safe for color-treated hair.",
    description_ar:
      "شامبو مستوحى من الطبيعة يجمع بين خلاصة الخيزران ومضادات الأكسدة من الشاي الأسود والكيراتين المُحلَّل. ينظف بلطف ويقوي ويعيد اللمعان الطبيعي — تركيبة خالية من الكبريتات وآمنة للشعر المصبوغ.",
  },
  {
    id: "sts-toenail",
    name: "Elite Professional STS Toenail Clipper (TL 6144)",
    image: sts,
    priceAed: 19.95,
    category: "Tools & Accessories",
    description:
      "Premium STS toenail clipper with a wider jaw, reinforced spring and corrosion-resistant finish. Ideal for thicker nails and long-life salon use.",
    description_ar:
      "قصافة أظافر قدم STS فاخرة بفك أعرض ونابض معزز وطلاء مقاوم للصدأ. مثالية للأظافر السميكة والاستخدام الطويل في الصالونات.",
  },
  {
    id: "nail-clipper",
    name: "Elite Professional Nail Clipper",
    image: nail,
    priceAed: 7.35,
    category: "Tools & Accessories",
    description:
      "Classic stainless-steel nail clipper with a precision-ground edge. Compact, reliable, salon-grade quality at an everyday price.",
    description_ar:
      "قصافة أظافر كلاسيكية من الفولاذ المقاوم للصدأ بحافة مصقولة بدقة. عملية وموثوقة بجودة الصالونات وبسعر يومي.",
  },
  {
    id: "kyo-lumen",
    name: "KYO Lumen Permanent Hair Color (PPD Free) / 59 Variety",
    image: lumen,
    priceAed: 31.5,
    variants: 59,
    variantOptions: ["Natural Series", "Cool Series", "Warm Series", "Fashion Series"],
    category: "Hair Color",
    description:
      "KYO Lumen — the next generation PPD-free permanent hair color. 59 luminous shades engineered for vibrant tone, soft handle and reduced sensitization risk.",
    description_ar:
      "كيو لومن — الجيل الجديد من الصبغات الدائمة الخالية من PPD. ٥٩ درجة مضيئة مصممة لنغمة نابضة وملمس ناعم وحساسية أقل.",
  },
];

export const CATEGORIES = [
  { name: "Offers And Deals", slug: "offers", key: "cat_offers" },
  { name: "Hair Care", slug: "hair-care", key: "cat_haircare" },
  { name: "Hair Color", slug: "hair-color", key: "cat_haircolor" },
  { name: "Shower Vitamin Head", slug: "shower-vitamin", key: "cat_shower" },
  { name: "3ME Brushes", slug: "3me-brushes", key: "cat_3me" },
  { name: "Electronics", slug: "electronics", key: "cat_electronics" },
  { name: "Men's Collections", slug: "mens", key: "cat_mens" },
  { name: "Skin Care", slug: "skin-care", key: "cat_skincare" },
  { name: "Tools & Accessories", slug: "tools", key: "cat_tools" },
  { name: "Cinema Makeup", slug: "cinema-makeup", key: "cat_cinema" },
  { name: "Fragrances", slug: "fragrances", key: "cat_fragrances" },
];

export const BRANDS = [
  "Elite",
  "Logevy Firenze",
  "Freelimix",
  "KYO",
  "Arco Cosmetici",
  "Cinema",
  "3ME Maestri",
  "Dailycha-e",
  "Gentleman's Hair Club",
  "Dr. Kraut Milano",
];

import dryer from "@/assets/cat-hairdryer.jpg";
import straight from "@/assets/cat-straightener.jpg";
import curl from "@/assets/cat-curler.jpg";
import wax from "@/assets/cat-wax.jpg";
import trim from "@/assets/cat-trimmer.jpg";

export const SHOP_BY_CATEGORY = [
  { name: "Hair Dryers", count: 6, image: dryer, key: "cat_dryers" },
  { name: "Hair Straighteners", count: 6, image: straight, key: "cat_straighteners" },
  { name: "Curler", count: 1, image: curl, key: "cat_curler" },
  { name: "Wax Machine", count: 9, image: wax, key: "cat_wax" },
  { name: "Trimmers", count: 2, image: trim, key: "cat_trimmers" },
];
