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
  category: string;
}

export const PRODUCTS: Product[] = [
  { id: "kyo-color", name: "KYO Permanent Hair Color (Ammonia Free & PPD Free) / 73 Variety", image: kyo, priceAed: 36.75, variants: 73, category: "Hair Color" },
  { id: "freelimix", name: "Freelimix Permanent Hair Color with Multivitamins / 133 Variety", image: freelimix, priceAed: 31.50, variants: 133, category: "Hair Color" },
  { id: "kyo-bio-150", name: "Kyo Bio-Activator 150ml (Marine Collagen & Keratin)", image: bio, priceAed: 18.90, variants: 2, category: "Hair Care" },
  { id: "freelimix-emulsion", name: "Freelimix Hair Color Oxidizing Emulsion Cream 150ml", image: emulsion, priceAed: 18.90, variants: 4, category: "Hair Color" },
  { id: "depilatory-tweezer", name: "Elite Professional Depilatory Tweezer (ST 9053)", image: tweezer, priceAed: 12.60, category: "Tools & Accessories" },
  { id: "diagonal-tweezer", name: "Elite Professional Diagonal Tweezer (DI 9473)", image: tweezerD, priceAed: 12.60, category: "Tools & Accessories" },
  { id: "kyo-bio-1000", name: "Kyo Bio-Activator 1000ml", image: bio1l, priceAed: 42.00, variants: 2, category: "Hair Care" },
  { id: "toenail-clipper", name: "Elite Professional Toenail Clipper", image: toenail, priceAed: 12.60, category: "Tools & Accessories" },
  { id: "kyorganic", name: "KYORGANIC Shampoo (Bamboo, Black Tea, Keratin) 2 sizes", image: kyorganic, priceAed: 63.00, priceMaxAed: 138.60, variants: 2, category: "Hair Care" },
  { id: "sts-toenail", name: "Elite Professional STS Toenail Clipper (TL 6144)", image: sts, priceAed: 19.95, category: "Tools & Accessories" },
  { id: "nail-clipper", name: "Elite Professional Nail Clipper", image: nail, priceAed: 7.35, category: "Tools & Accessories" },
  { id: "kyo-lumen", name: "KYO Lumen Permanent Hair Color (PPD Free) / 59 Variety", image: lumen, priceAed: 31.50, variants: 59, category: "Hair Color" },
];

export const CATEGORIES = [
  { name: "Offers And Deals", slug: "offers" },
  { name: "Hair Care", slug: "hair-care" },
  { name: "Hair Color", slug: "hair-color" },
  { name: "Shower Vitamin Head", slug: "shower-vitamin" },
  { name: "3ME Brushes", slug: "3me-brushes" },
  { name: "Electronics", slug: "electronics" },
  { name: "Men's Collections", slug: "mens" },
  { name: "Skin Care", slug: "skin-care" },
  { name: "Tools & Accessories", slug: "tools" },
  { name: "Cinema Makeup", slug: "cinema-makeup" },
  { name: "Fragrances", slug: "fragrances" },
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
  { name: "Hair Dryers", count: 6, image: dryer },
  { name: "Hair Straighteners", count: 6, image: straight },
  { name: "Curler", count: 1, image: curl },
  { name: "Wax Machine", count: 9, image: wax },
  { name: "Trimmers", count: 2, image: trim },
];
