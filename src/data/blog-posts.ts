import heroElite from "@/assets/hero-elite-purple.jpg";
import heroGold from "@/assets/hero-elite-gold.jpg";
import imgKyo from "@/assets/product-haircolor-kyo.jpg";
import imgBio from "@/assets/product-bioactivator.jpg";
import imgDryer from "@/assets/cat-hairdryer.jpg";

export type BlogSection = { heading?: string; body: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  eyebrow: string;
  date: string;
  readMinutes: number;
  image: string;
  excerpt: string;
  sections: BlogSection[];
  closing?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "elite-professional-from-a-small-dream",
    title: "From a Small Dream to a Trusted Beauty Destination",
    subtitle: "The 25-year journey of Elite Professional across the UAE.",
    category: "The House",
    eyebrow: "Founder's Story · Since 2001",
    date: "Established 2001",
    readMinutes: 9,
    image: heroGold,
    excerpt:
      "Every successful business begins with a dream. Ours began in 2001 with AED 10,000, a rented car, and a vision to bring professional beauty within reach of every customer in the Emirates.",
    sections: [
      {
        body: [
          "Every successful business begins with a dream. The story of Elite Professional began in 2001 with a simple vision: to provide high-quality manicure, pedicure, body care, and beauty products to customers across the United Arab Emirates.",
          "With an initial investment of only AED 10,000, I started my journey determined to build a business based on quality, trust, and exceptional customer service. From the beginning, I believed that success comes not only from working hard but also from working smart. My goal was to make professional beauty products accessible to every customer segment throughout the UAE.",
        ],
      },
      {
        heading: "The First Breakthrough",
        body: [
          "In the early 2000s, ADNOC service stations operated convenience stores known as C-Stores, providing food, beverages, snacks, ATM services, and everyday essentials. I recognized an opportunity to introduce Elite Professional products to a wider audience.",
          "I repeatedly submitted my company profile to ADNOC Food Services and attended numerous meetings. After many visits and presentations, my persistence paid off. Elite Professional was selected to supply products to ADNOC C-Stores across the UAE.",
          "At that time, resources were limited, but determination was unlimited. I rented a car and personally delivered Elite Professional display stands and products to stores throughout the country — from Abu Dhabi to Liwa, Madinat Zayed, Dubai, and the Northern Emirates. I enjoyed visiting every location, meeting staff members, and ensuring our products were displayed in the best possible way.",
          "The business quickly gained momentum. Thanks to strong sales and a payment cycle every 15 days, my original AED 10,000 investment grew to nearly AED 100,000 within the first year.",
        ],
      },
      {
        heading: "Expanding Across Major Retail Chains",
        body: [
          "Encouraged by this success, I took the next step by registering Elite Professional products with major retail groups including Abu Dhabi Cooperative Society and Union Coop Dubai. After completing the required registration and listing procedures, our products became available in supermarkets across the UAE.",
          "This milestone allowed Elite Professional to reach thousands of new customers and established the company as a growing name in the beauty industry.",
        ],
      },
      {
        heading: "Discovering Italian Excellence",
        body: [
          "My passion for quality products eventually led me to Italy. In 2005, I traveled there with a dream of finding trusted international brands that could bring innovation and excellence to the UAE beauty market.",
          "During this journey, I met Mr. Marco from 3ME, a renowned Italian family-owned hairbrush manufacturer established in 1948. Through this partnership, I was introduced to professional beauty innovations, including FreeLimix hair color and hair care products.",
          "At that time, Elite Professional was still a very small company. I managed every aspect of the business myself — manager, salesperson, accountant, delivery driver, warehouse operator, and customer service representative — all at the same time. It was not easy, but I loved every moment of it because I believed in what I was building.",
        ],
      },
      {
        heading: "Our First Retail Store",
        body: [
          "As the business continued to grow, I dreamed of opening a showroom in Marina Mall, one of Abu Dhabi's most prestigious destinations at the time. Unfortunately, the leasing requirements were beyond what my business could accommodate.",
          "Instead, I found an excellent opportunity in Al Mamoura, Abu Dhabi. I opened our first retail store in a growing community with convenient parking and easy customer access. At the same time, I rented a warehouse in Mina Abu Dhabi to support our expanding operations.",
          "Gradually, I built a small team, including a part-time accountant and a sales assistant. Together, we worked tirelessly to serve customers and build the reputation of Elite Professional. That store represented much more than a retail location — it represented years of hard work, sacrifice, and belief in a dream.",
        ],
      },
      {
        heading: "Building a Reputation for Quality and Trust",
        body: [
          "From day one, Elite Professional has focused on offering high-quality products, unique beauty solutions, and trusted international brands at fair and accessible prices.",
          "Our mission has always been to serve both beauty professionals and consumers by providing products that deliver real results and lasting value. Over the years, we have built strong relationships with customers who continue to place their trust in our brand.",
          "Like every business, we experienced both successes and challenges. The COVID-19 pandemic brought unprecedented disruption to businesses around the world. During those difficult times, our strong retail partnerships and loyal customer base helped us continue operating and serving the beauty community.",
        ],
      },
      {
        heading: "A New Chapter at The Galleria Al Maryah Island",
        body: [
          "In 2021, Elite Professional achieved another major milestone when we opened our store at The Galleria Al Maryah Island, one of Abu Dhabi's most prestigious luxury shopping destinations.",
          "Located near the VIP entrance, the store quickly became a destination for beauty professionals and consumers seeking premium products and expert advice. For four successful years, we proudly served customers from one of the UAE's most iconic retail destinations.",
        ],
      },
      {
        heading: "Reimagining the Future",
        body: [
          "In 2025, we were given the opportunity to relocate and create an even better customer experience. During the transition, the store remained closed while we carefully planned and developed a completely new retail concept.",
          "On May 1, 2026, Elite Professional proudly reopened its doors with a fresh vision, modern design, and enhanced shopping experience. Our newest flagship store reflects everything we have learned throughout our journey — combining beauty, innovation, expertise, and customer experience in a contemporary environment.",
          "Today, customers can discover a carefully selected collection of premium international brands, including 3ME, FreeLimix, KYO, Barber Club, Logevy, and many more.",
        ],
      },
      {
        heading: "Looking Ahead",
        body: [
          "More than 25 years after starting with a small investment and a big dream, I remain passionate about growing Elite Professional and strengthening the relationships we have built with our customers.",
          "Our journey has never been only about selling products. It has always been about creating trust, sharing expertise, supporting beauty professionals, and helping people feel confident and beautiful.",
          "As we continue to grow, our mission remains unchanged: to make every member of the Elite Professional family happier, more confident, and completely satisfied with the products and services we provide.",
        ],
      },
    ],
    closing: "Beauty, It's All About You. — Elite Professional Beauty & Cosmetics Trading",
  },
  {
    slug: "logevy-firenze-1965",
    title: "Logevy Firenze 1965 — The Soul of a Perfumer",
    subtitle: "Master Perfumer Stefano Cintelli's olfactory journeys, written in botanicals.",
    category: "Fragrance",
    eyebrow: "Logevy · Firenze, Italy",
    date: "Heritage House",
    readMinutes: 4,
    image: heroElite,
    excerpt:
      "At the heart of Logevy Firenze 1965 lies the visionary expertise of Master Perfumer Stefano Cintelli — fragrances that are bridges to the past, awakening ancient memories.",
    sections: [
      {
        heading: "The Soul of Logevy Firenze 1965",
        body: [
          "At the heart of Logevy Firenze 1965 lies the visionary expertise of Master Perfumer Stefano Cintelli. His creations are more than mere fragrances; they are meticulously crafted olfactory journeys designed to resonate with the human spirit.",
          "Drawing inspiration from deep-rooted traditions and the quiet power of introspection, Cintelli's work serves as a bridge to the past, awakening ancient memories and evoking profound emotional landscapes.",
        ],
      },
      {
        heading: "The Genesis of a Name",
        body: [
          "The name \"Logevy\" is a deliberate synthesis of nature's most evocative elements — a tribute to the earth and the timeless narratives written in its flora. Each syllable serves as a cornerstone of our brand philosophy, weaving together the virtues of love, resilience, and harmony.",
          "LO — from Lonicera Implexa, the Mediterranean Honeysuckle, symbolising elegance and the unbreakable bonds of love.",
          "GE — from Gentiana Lutea, the Great Yellow Gentian, embodying resilience, strength, and defiance in adversity.",
          "VY — from Vinca Minor L., the Periwinkle, representing fidelity, sweet nostalgia, and harmonious memory.",
        ],
      },
    ],
    closing: "Logevy Firenze 1965 — Fragrance as a return to the self.",
  },
  {
    slug: "3me-maestri-precision-since-1948",
    title: "3ME Maestri — The Vanguard of Precision",
    subtitle: "Since 1948, a family enterprise engineering the art of styling.",
    category: "Tools & Brushes",
    eyebrow: "3ME Maestri · Italy",
    date: "Heritage House",
    readMinutes: 5,
    image: imgDryer,
    excerpt:
      "Since 1948, 3ME Maestri has transcended its origins as a dedicated family enterprise to emerge as a global benchmark for excellence in professional hair styling instrumentation.",
    sections: [
      {
        body: [
          "Since 1948, 3ME Maestri has transcended its origins as a dedicated family enterprise to emerge as a global benchmark for excellence in professional hair styling instrumentation. Our legacy is defined by an unwavering devotion to quality, a relentless pursuit of technical refinement, and an intuitive alignment with the sophisticated needs of the modern stylist.",
          "Today, the Maestri name serves as the definitive hallmark of professional craftsmanship — the convergence of sophisticated design, advanced technology, and perpetual evolution.",
        ],
      },
      {
        heading: "The Maestri Ethos: Engineering the Art of Styling",
        body: [
          "At the heart of our operations lies an enduring passion for the craft — a drive that compels us to redefine the boundaries of possibility. We do not merely manufacture tools; we engineer high-performance solutions.",
          "Rigorous Research & Development — we systematically iterate and test cutting-edge materials, ensuring every brush achieves peak performance under professional demands.",
          "Design Excellence — we masterfully harmonize ergonomic functionality with aesthetic grace, resulting in instruments that are as visually compelling as they are operationally effective.",
          "Material Integrity — we select only the highest-caliber components, ensuring our tools maintain their precision and durability within the rigors of the high-tempo salon environment.",
        ],
      },
      {
        heading: "A Philosophy of Forward Momentum",
        body: [
          "The beauty industry is in a state of constant, dynamic flux; at Maestri, we thrive within this momentum. We anticipate emerging trends, monitor global styling shifts, and continuously reinvent the catalog so it consistently represents the most innovative solutions available.",
          "Your success is our greatest metric. We view ourselves as an extension of your craft, providing the precision-engineered instruments necessary for you to excel.",
        ],
      },
    ],
    closing: "At 3ME Maestri, we do not simply follow the evolution of style — we define it.",
  },
  {
    slug: "freelimix-italian-benchmark",
    title: "FreeLimix — The Italian Benchmark in Professional Hair Care",
    subtitle: "Born from 3ME Maestri's lineage, orchestrated in Reggio Emilia.",
    category: "Hair Color & Care",
    eyebrow: "FreeLimix · Reggio Emilia, Italy",
    date: "Heritage House",
    readMinutes: 5,
    image: imgBio,
    excerpt:
      "Born from the visionary lineage of 3ME Maestri, FreeLimix stands as a definitive pinnacle of Italian professional hair care — synthesizing chemical engineering with hair vitality.",
    sections: [
      {
        heading: "A Heritage of Precision",
        body: [
          "FreeLimix represents the natural, strategic evolution of 3ME Maestri, a family-owned enterprise whose commitment to craftsmanship traces back to 1948.",
          "While our parent brand revolutionised the industry as a global authority in professional styling instrumentation, the inception of FreeLimix marked our seamless transition into the realm of professional chemistry. By leveraging decades of intimate collaboration with the hairdressing community, we have translated mastery of mechanical precision into the art of professional hair care.",
        ],
      },
      {
        heading: "The Science of Luminous Results",
        body: [
          "Flagship Coloring Technology — our signature permanent coloring cream is defined by a sophisticated, multi-vitamin complex. With a spectrum of over 100 meticulously calibrated shades, our pigments penetrate the hair fiber deeply, ensuring exceptional, long-lasting vibrancy while fortifying the hair's internal architecture.",
          "Nutrient-Dense Formulations — each product is enriched with a potent synergy of protective active ingredients including essential vitamins, advanced solar filters, and select botanical extracts, leaving hair resilient, luminous, and supple.",
          "A Holistic Salon Ecosystem — beyond our color portfolio, we offer high-performance oxidizing emulsions, advanced color-removal systems, specialised hair-loss prevention treatments, and innovative color-tinted waxes for the finishing touch of creative excellence.",
        ],
      },
      {
        heading: "Empowering the Modern Stylist",
        body: [
          "FreeLimix is more than a product line; it is a testament to the enduring rigor of Italian quality and innovation. Trusted by masters of the craft across the globe, we continue to bridge the divide between creative ambition and scientific precision.",
        ],
      },
    ],
    closing: "Discover the FreeLimix difference — where authentic Italian heritage converges with the future of professional hair care.",
  },
  {
    slug: "kyo-conscious-professional-beauty",
    title: "KYO — The Evolution of Conscious Professional Beauty",
    subtitle: "Big vision. Sustainable beauty. Crafted in Italy by Trade Force Brands.",
    category: "Hair Color & Treatments",
    eyebrow: "KYO · Italy",
    date: "Heritage House",
    readMinutes: 6,
    image: imgKyo,
    excerpt:
      "KYO stands at the vanguard of Italian professional hair care — harmonising high-performance results with an uncompromising commitment to scalp health and environmental stewardship.",
    sections: [
      {
        body: [
          "KYO stands at the vanguard of Italian professional hair care — a premium brand meticulously engineered to harmonise high-performance results with an uncompromising commitment to scalp health and environmental stewardship.",
          "Developed by Trade Force Brands and crafted in Italy — the undisputed epicenter of global cosmetic innovation — KYO derives its name from the Japanese term for \"big.\" This nomenclature serves as a testament to our ambitious vision: to redefine the future of the professional salon industry by placing sustainable, \"clean\" beauty at the heart of every service.",
        ],
      },
      {
        heading: "Our Philosophy: Performance Without Compromise",
        body: [
          "We operate on the foundational belief that professional excellence and hair integrity are not mutually exclusive. The KYO mission is rooted in the conviction that the most exceptional aesthetic results are achieved through formulations that nurture, protect, and respect the hair's natural structure.",
          "By championing a clean-beauty ethos, we empower stylists across our expansive global network — from our European foundations to our premier salons in the Middle East — to deliver transformative results with complete peace of mind.",
        ],
      },
      {
        heading: "Advanced Color Technologies",
        body: [
          "KYO Permanent Hair Color — our flagship innovation. Enriched with marine collagen and keratin, it offers unparalleled performance, providing up to 100% white hair coverage and the capacity to lift up to four tones.",
          "KYO Lumen — a sophisticated, PPD-free permanent color line infused with organic ginger and hemp extracts, designed to impart brilliant luminosity and multi-dimensional shine.",
          "KYO Majimé — our premier demi-permanent low-pH toner. Powered by the proprietary Active Plex complex (Glycolic Acid, Peptides, and Inulin), engineered to repair and seal the hair cuticle post-lightening for enduring, vibrant results.",
        ],
      },
      {
        heading: "A Holistic Approach to Hair Vitality",
        body: [
          "Detox & Purifying (KYO Noir) — organic charcoal powder and bamboo extract detoxify the scalp and eliminate impurities, formulated entirely without silicones or parabens.",
          "Smoothing & Protein Systems — KYO Brazilian Protein and K2LISS are fortified with caviar extract, sericin, and acai berries for superior structural reinforcement and a flawless, smooth finish.",
          "Hydration & Volume — Hydra System and Volume Design use advanced vegan keratins to optimise moisture retention and restore natural vitality to every strand.",
        ],
      },
    ],
    closing: "KYO — Big Vision. Sustainable Beauty. Professional Excellence.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
