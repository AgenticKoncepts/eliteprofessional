import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { Heart, Minus, Plus, Truck, Shield, Check } from "lucide-react";
import { useState } from "react";
import { useProductBySlug } from "@/lib/products-api";
import { supabase } from "@/integrations/supabase/client";
import { dbToProduct, type DbProduct } from "@/lib/products-api";

const SITE_URL = "https://eliteprofessional.lovable.app";

function truncate(s: string, n: number) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + "…";
}

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("slug", params.productId)
      .maybeSingle();
    if (!data) return { product: null as ReturnType<typeof dbToProduct> | null };
    return { product: dbToProduct(data as unknown as DbProduct) };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.product;
    if (!p) {
      return {
        meta: [
          { title: "Product not found — Elite Professional UAE" },
          { name: "description", content: "This product is no longer available." },
        ],
      };
    }
    const title = truncate(`${p.name} — Elite Professional UAE`, 60);
    const rawDesc =
      (p.description ?? `${p.name} by ${p.brand ?? "Elite Professional"} — shop premium ${p.category} in the UAE with free delivery.`).replace(/\s+/g, " ").trim();
    const desc = truncate(rawDesc, 158).padEnd(50, " ").slice(0, 160);
    const url = `${SITE_URL}/products/${params.productId}`;
    const image = p.image?.startsWith("http") ? p.image : `${SITE_URL}${p.image ?? ""}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            image: image ? [image] : undefined,
            description: p.description ?? undefined,
            sku: p.sku ?? undefined,
            brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
            category: p.category ?? undefined,
            ...(p.variantOptions && p.variantOptions.length > 0
              ? {
                  hasVariant: p.variantOptions.map((v) => ({
                    "@type": "Product",
                    name: `${p.name} — ${v}`,
                    sku: p.sku ? `${p.sku}-${v}` : undefined,
                    offers: {
                      "@type": "Offer",
                      url,
                      priceCurrency: "AED",
                      price: p.priceAed,
                      availability:
                        (p as { stock?: number }).stock === 0
                          ? "https://schema.org/OutOfStock"
                          : "https://schema.org/InStock",
                    },
                  })),
                }
              : {}),
            offers: p.priceMaxAed
              ? {
                  "@type": "AggregateOffer",
                  url,
                  priceCurrency: "AED",
                  lowPrice: p.priceAed,
                  highPrice: p.priceMaxAed,
                  offerCount: Math.max(p.variantOptions?.length ?? 1, 1),
                  availability:
                    (p as { stock?: number }).stock === 0
                      ? "https://schema.org/OutOfStock"
                      : "https://schema.org/InStock",
                }
              : {
                  "@type": "Offer",
                  url,
                  priceCurrency: "AED",
                  price: p.priceAed,
                  availability:
                    (p as { stock?: number }).stock === 0
                      ? "https://schema.org/OutOfStock"
                      : "https://schema.org/InStock",
                },
          }),
        },
      ],

    };
  },
  component: ProductPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <Layout>
        <div className="container-elite py-24 text-center">
          <p className="mb-4">Something went wrong: {error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em]"
          >
            RETRY
          </button>
        </div>
      </Layout>
    );
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-elite py-24 text-center">
        <h1 className="font-display text-4xl mb-4">Product not found</h1>
        <Link to="/shop" className="text-gold hover:underline">
          ← Back to shop
        </Link>
      </div>
    </Layout>
  ),
});

function ProductPage() {
  const { productId } = Route.useParams();
  const { data: product, isLoading } = useProductBySlug(productId);
  const { formatPrice, t, lang } = useI18n();
  const { add } = useCart();
  const { has, toggle } = useWishlist();

  const [variant, setVariant] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState(0);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-elite py-24 text-center text-muted-foreground">Loading…</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-elite py-24 text-center">
          <h1 className="font-display text-4xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-gold hover:underline">← Back to shop</Link>
        </div>
      </Layout>
    );
  }

  const isWished = has(product.id);
  const variantOptions = product.variantOptions ?? [];
  const hasVariants = variantOptions.length > 0;
  const currentVariant = variant || (hasVariants ? variantOptions[0] : "");
  const description = lang === "ar" ? product.description_ar ?? product.description : product.description;
  const gallery = (product as { images?: string[] }).images?.length
    ? (product as { images: string[] }).images
    : [product.image];

  const handleAdd = () => {
    add({
      productId: product.id,
      name: product.name,
      image: product.image,
      priceAed: product.priceAed,
      variant: currentVariant || undefined,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Layout>
      <div className="container-elite py-10 md:py-14">
        <Link to="/shop" className="text-xs text-muted-foreground hover:text-gold tracking-wider mb-8 inline-block">
          {t("pd_back_to_shop")}
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <div className="aspect-square bg-secondary/30 overflow-hidden">
              <img src={gallery[selected] ?? product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {gallery.slice(0, 8).map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${
                      selected === i ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <img src={src} alt={`${product.name} — view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-[11px] tracking-[0.3em] text-gold mb-3">{product.category.toUpperCase()}</div>
            <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl font-display text-price">
                {product.priceMaxAed
                  ? `${formatPrice(product.priceAed)} – ${formatPrice(product.priceMaxAed)}`
                  : formatPrice(product.priceAed)}
              </div>
              {(product as { stock?: number }).stock !== 0 && (
                <span className="text-xs tracking-wider text-gold flex items-center gap-1">
                  <Check className="w-3 h-3" /> {t("pd_in_stock")}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {description ?? t("pd_default_desc")}
            </p>

            {hasVariants && (
              <div className="mb-6">
                <label className="text-[11px] tracking-[0.25em] font-medium block mb-2">{t("pd_variant")}</label>
                <div className="flex flex-wrap gap-2">
                  {variantOptions.map((v: string) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        currentVariant === v
                          ? "border-gold text-gold bg-gold/5"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div>
                <label className="text-[11px] tracking-[0.25em] font-medium block mb-2">{t("pd_quantity")}</label>
                <div className="flex items-center border border-border w-fit">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary" aria-label="Decrease"><Minus className="w-3.5 h-3.5" /></button>
                  <span className="w-12 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary" aria-label="Increase"><Plus className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={handleAdd} className="flex-1 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] font-medium hover:bg-gold hover:text-gold-foreground transition-colors">
                {added ? t("pd_added") : t("add_to_cart")}
              </button>
              <button onClick={() => toggle(product.id)} aria-label={t("wishlist")} className="w-14 h-14 border border-border flex items-center justify-center hover:border-gold transition-colors">
                <Heart className={`w-5 h-5 ${isWished ? "fill-price text-price" : ""}`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3 text-sm"><Truck className="w-5 h-5 text-gold" /><span>{t("pd_free_shipping")}</span></div>
              <div className="flex items-center gap-3 text-sm"><Shield className="w-5 h-5 text-gold" /><span>{t("pd_money_back")}</span></div>
            </div>
          </div>
        </div>

        <section className="mt-20 max-w-3xl">
          <div className="text-[11px] tracking-[0.4em] text-gold mb-3">{t("pd_description").toUpperCase()}</div>
          <h2 className="font-display text-2xl md:text-3xl mb-6">{product.name}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{description ?? t("pd_default_desc")}</p>
        </section>
      </div>
    </Layout>
  );
}
