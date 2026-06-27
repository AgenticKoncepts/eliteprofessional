## Goal
Replace the removed featured editorial panel with a cinematic, horizontal-pinned scroll-parallax product showcase, in the "Elite noir showcase" direction the user chose.

## What I'll build

**New file:** `src/components/ProductParallax.tsx`
- Section header: gold eyebrow "The Professional Edit" + headline "Excellence in every detail." (uses existing Cormorant/Karla tokens, not a new font).
- Pinned horizontal reel powered by GSAP `ScrollTrigger` (already installed):
  - Outer wrapper `h-[300vh]` pins the inner viewport while a horizontal track translates with `scrub`.
  - Per-tile parallax: image translates `y` opposite to caption; eyebrow/name/price fade-up with stagger as each tile enters center.
  - Gold scroll progress rail at the bottom synced to the timeline.
- Mobile (`< md`): falls back to native horizontal snap-scroll carousel (`overflow-x-auto snap-x snap-mandatory`), no pin, no ScrollTrigger — gestures stay natural on touch.
- `prefers-reduced-motion`: skip pin/scrub, render static snap row.

**Tile design (matches selected prototype + existing dark-luxury card system):**
- Aspect 4/5, `bg-[#0a0a0c]`, gold inner ring on hover.
- Per-tile colored radial swirl behind the product image (red/teal/champagne/gold/crimson — deterministic by product id, reusing `SWIRLS` palette from `TiltProductCard` for consistency).
- Floating product PNG with drop-shadow, subtle scale on hover.
- Caption block: eyebrow (productType), `font-display` name, variant chip (first `variantOptions` entry or "Single Variant"), gold AED price (via `useI18n().formatPrice`), and "View product →" CTA — a TanStack `Link` to `/products/$productId`.

**Data source:** existing `PRODUCTS` from `@/data/products`. Pick 6 hero items spanning brands: `kyo-color`, `freelimix`, `kyo-bio-150`, `kyorganic`, `kyo-lumen`, `freelimix-emulsion` (covers KYO/Freelimix/Elite categories already in the data; no fake products invented).

**RTL safety:**
- Detect direction via `useI18n()` (or `document.dir`) inside the component.
- Use logical properties (`ms-`/`me-`, `start-`/`end-`) throughout.
- Flip horizontal scrub direction when `dir === "rtl"` (translate `+x` instead of `-x`); flip progress rail fill side.
- Mobile snap-scroll already respects `dir` natively.

**Integration:**
- Edit `src/routes/index.tsx`: render `<ProductParallax />` in the slot where the old featured editorial panel used to sit (right after `ScrollShowcase` marquee).
- No changes to cart, routing, or product detail.
- No edits to `ScrollShowcase.tsx` beyond what's already done.

## Out of scope (not in this turn)
- Generating new product imagery (uses existing `product.image` assets).
- Touching unrelated cards, brand pages, or the carousel on `/brands/$brand`.
- Backend / audit-log / CSV-PDF / scheduled-jobs tasks from earlier list — separate follow-up.

## Technical notes
- GSAP + `@gsap/react` + `ScrollTrigger` already installed and registered in `ScrollShowcase`.
- Refresh `ScrollTrigger` on resize and on i18n direction change to recompute pin distance.
- All colors via existing tokens (`--gold`, noir backgrounds) — no new globals.
