
# Premium Brand-First Gallery — /shop

## Chosen flow (picking the most visually satisfying option)

**Full-takeover on `/shop`** — a single immersive page, no route change.

1. Landing state: cinematic hero + a grid of 3D brand cards ("the houses").
2. Click a brand → the grid morphs/scrolls away and that brand's **world** takes over the viewport: brand hero + parallax background built from that brand's hero image + stacked product-type sections.
3. A persistent "← All brands" pill returns to the selector. URL syncs via a `?brand=kyo` query param so the state is shareable, back-button friendly, and SEO-safe — without creating a new route.
4. The existing `/brands/$brand` route stays untouched (deep-link/SEO fallback).

Why this and not the others: inline-expand crowds the page on mobile and weakens each brand's identity; routing to `/brands/$brand` loses the cinematic transition. Takeover gives each brand its own "world" (the brief's exact language) while keeping one URL and zero new routes.

## Files

**Edit**
- `src/routes/shop.tsx` — rewrite as a brand-first selector + takeover view. Reuses `TiltCard` (already in this file) and keeps current SEO `head()`.

**New**
- `src/components/BrandTile.tsx` — the 3D brand card (tilt, depth, gold accents, hero-image backdrop, count, keyboard-focusable, mobile tap-friendly).
- `src/components/BrandWorld.tsx` — the takeover panel: brand hero with parallax backdrop, "← All brands" pill, and stacked product-type sections (each with its own `framer-motion` reveal + horizontal `embla` carousel of `TiltCard`s).

**Untouched** (guardrails): Header, Footer, Cart, Wishlist, `/products/$productId`, `/brands/$brand`, `Layout`, i18n, styling tokens, all other routes, all data hooks. No DB changes.

## Data — already in place

`useProducts()` returns products with `brand`, `brandSlug`, `productType`, `productSubtype`, `category`, image, price, description. Grouping is pure derivation:

```
products
  → group by brandSlug         → BrandTile list (sorted by count desc)
    → group by productType     → stacked sections inside BrandWorld
      → optional productSubtype subtitle inside a section
```

Brand hero image = the first featured product's image (already available via `is_featured` + `sort_order` from `useProducts`).

One small data-hygiene step: case-normalize brand display names (DB has `3me` + `3ME MAESTRI`, `FREELIMIX` + `Freelimix`, etc.) so duplicates collapse. Done client-side via `brandSlug` as the key + a tidy display label — no DB migration needed.

## Animation / parallax approach

- Already installed: `framer-motion@12`, `embla-carousel-react`.
- Brand tiles: `motion.div` with `useMotionValue` tilt (same technique already in `TiltCard`) + soft gold glow on hover. `whileTap={{ scale: 0.97 }}` for mobile.
- Takeover transition: `AnimatePresence` mode="wait" crossfade between selector and world; world enters with a subtle y-up + scale.
- Parallax: `useScroll` + `useTransform` on the brand-world backdrop image (translateY 0 → -80px on scroll). One layer only — keeps mobile smooth.
- Product-type sections: `whileInView` fade-up (staggered children). `viewport={{ once: true, margin: "-80px" }}`.
- Respects `prefers-reduced-motion` (motion-safe variants).

## UX states

- Empty brand: "No products available for this brand yet." inside the world.
- Empty type section: hidden (don't render empty headings).
- Search input from current `/shop` is preserved and filters within the active brand when one is selected, or across all brands in the selector view.

## Responsive

- Selector: 1 col mobile, 2 cols sm, 3 cols lg. Tilt disabled <768px (tap-scale only).
- Brand world: carousel basis `78%` mobile → `1/4` xl (same scale as current TiltCard layout).
- Sticky "← All brands" pill on mobile so users never feel trapped.

## Risks / assumptions

- DB brand-name casing inconsistencies — handled via `brandSlug` keying.
- Hero image fallback if a brand has no featured product — falls back to first product image, then to a neutral CSS gradient.
- Performance: one parallax layer + IntersectionObserver-driven reveals; tested pattern in the existing codebase.

## Out of scope (won't touch)

Cart logic, checkout, product detail page, auth, CMS, `/brands/$brand`, SEO meta of other pages, global styles.
