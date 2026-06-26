
# Plan — Make Elite Professional UAE a Complete Store

Goal: take the site from "beautiful catalog with a draft checkout" to a real, launch-ready bilingual e-commerce experience.

## 1. Payments — Card + Cash on Delivery
- Enable Lovable's built-in **Stripe Payments** (card, Apple Pay, Google Pay; AED supported via UAE pricing).
- Add a **payment method step** in the cart drawer:
  - **Pay by card** → Stripe Checkout session, success/cancel routes.
  - **Cash on Delivery (COD)** → existing `placeOrder` flow, order saved as `pending_cod`.
- Stripe webhook (`/api/public/webhooks/stripe`) marks orders `paid`, decrements stock, sends confirmation email.
- Order schema gains: `payment_method`, `payment_status`, `stripe_session_id`, `paid_at`.

## 2. Customer Accounts (guest checkout still works)
- Add public `/account` area gated by `_authenticated/` (Google + email/password + password reset).
- Pages: **Orders**, **Order detail / tracking**, **Addresses**, **Wishlist**, **Profile**.
- New tables: `profiles`, `customer_addresses`, `wishlists` (synced from the current local wishlist on first login).
- Link `orders.user_id` (nullable for guests). Guests can still check out; an order-lookup page (`/track?email=&order=`) lets them view status without an account.
- Configure Google sign-in via `supabase--configure_social_auth`.

## 3. Inventory & Stock
- Webhook decrements `stock` atomically when payment succeeds (or when COD order is placed).
- Product card / detail show **Low stock** and **Out of stock** badges.
- Admin gets a low-stock dashboard widget.

## 4. Transactional Emails (Lovable Emails)
- Scaffold branded React Email templates in Editorial Noir styling:
  - Order confirmation (EN + AR variants)
  - Payment receipt
  - Shipped / status update
  - Password reset, email verification, magic link
- Order confirmation includes line items, AED totals, shipping address, support contact.

## 5. Real Category Browsing + Filters
- New route `/category/$slug` (Hair Care, Hair Color, Fragrance, Skincare, Tools & Electronics, Shower Vitamin Heads, Professional / Salon).
- Filters: brand, price range, in-stock, use-case; sort by featured / price / newest.
- Header sub-rail and footer link straight to these category pages.
- All routes have unique SEO + breadcrumb JSON-LD.

## 6. Product Reviews & Ratings
- New `reviews` table (rating 1-5, title, body, verified_purchase flag, status).
- Customers who purchased a product can leave a review from `/account/orders`.
- Product page shows average rating, distribution, sorted reviews, and emits `AggregateRating` schema.
- Admin moderation tab.

## 7. Wishlist & Cart Sync
- When a logged-in user adds to wishlist or cart, persist to Supabase (`wishlists`, `carts`) and rehydrate across devices.
- Guests keep using `localStorage`; merge on login.

## 8. Blog CMS
- New `blog_posts` table (title/title_ar, slug, cover, excerpt, body MDX-ish, author, published_at, tags).
- Routes: `/blogs` index (already exists; wire to DB), `/blogs/$slug` detail with OG image, article schema, related posts.
- Admin: create/edit/publish posts (bilingual).

## 9. Shipping & Delivery Rules
- Configurable shipping zones (UAE Emirates) with thresholds: free over AED 200, flat AED 25 below.
- Estimated delivery window shown at checkout (e.g. "1-3 business days, Dubai & Sharjah").

## 10. Site-wide Polish
- **Analytics**: add Plausible (privacy-friendly, no cookie banner needed) + GA4 via env-var IDs.
- **Search**: global product search in the header (Supabase full-text on name/brand/category).
- **Trust band**: free delivery / money-back / authentic products / WhatsApp support.
- **WhatsApp Click-to-Chat** floating button (UAE shoppers expect it).
- **404 page** with brand styling and search.
- **robots.txt** + dynamic `sitemap.xml` already exists — extend with categories, brands, blog posts.
- **Performance**: image `loading="lazy"` audit, responsive `srcset` for product images via Supabase storage transforms.
- **Accessibility pass**: focus rings on gold, alt text audit, contrast check on champagne text.

## Technical Notes (for the team)

| Area | Where | Tech |
|---|---|---|
| Payments | `enable_stripe_payments` + `/api/public/webhooks/stripe` server route | Stripe Checkout, webhook signature verify |
| Auth | `_authenticated/` subtree + `/auth` page | Supabase managed gate, Google OAuth via `lovable.auth` |
| Tables | New migrations | `profiles`, `customer_addresses`, `wishlists`, `carts`, `reviews`, `blog_posts`; add `payment_*` + `user_id` to `orders`. RLS + GRANTs per template rules |
| Emails | `scaffold_auth_email_templates` + new `send-order-email` server fn | Lovable Emails, React Email |
| Stock | DB trigger on `orders` paid → decrement `products.stock` | SQL function + trigger |
| Search/filters | Server fn with Postgres `ilike`/full-text | TanStack Query |
| Analytics | Script tag in `__root.tsx` head | Plausible + optional GA4 |

## Suggested Build Order (so the site stays usable at each step)

1. **Accounts + Auth** (gates the rest)
2. **Stripe payments + COD selector + webhook**
3. **Order confirmation emails + customer order history**
4. **Inventory decrement + stock badges**
5. **Category routes + filters + global search**
6. **Reviews**
7. **Blog CMS**
8. **Wishlist/cart sync, WhatsApp button, analytics, 404, sitemap extension, perf/a11y pass**

I'll ship in that order — each step is independently shippable, so you can publish after any of them.
