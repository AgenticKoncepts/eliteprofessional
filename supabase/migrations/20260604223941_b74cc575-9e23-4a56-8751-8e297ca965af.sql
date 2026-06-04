
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS product_type TEXT,
  ADD COLUMN IF NOT EXISTS product_subtype TEXT,
  ADD COLUMN IF NOT EXISTS brand_slug TEXT GENERATED ALWAYS AS (
    lower(regexp_replace(coalesce(brand, ''), '[^a-zA-Z0-9]+', '-', 'g'))
  ) STORED;

CREATE INDEX IF NOT EXISTS products_brand_slug_idx ON public.products(brand_slug);
CREATE INDEX IF NOT EXISTS products_product_type_idx ON public.products(product_type);

-- Backfill product_type from category + name heuristics
UPDATE public.products SET product_type = CASE
  WHEN coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%permanent hair color%'
    OR coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%hair color%' THEN 'Hair Color'
  WHEN coalesce(category,'') ILIKE '%hair care%' OR coalesce(category,'') ILIKE '%treatment%' THEN 'Hair Care'
  WHEN coalesce(category,'') ILIKE '%straighten%' THEN 'Hair Straighteners'
  WHEN coalesce(category,'') ILIKE '%dryer%' THEN 'Hair Dryers'
  WHEN coalesce(category,'') ILIKE '%trimmer%' OR coalesce(category,'') ILIKE '%curler%' THEN 'Styling Tools'
  WHEN coalesce(category,'') ILIKE '%comb%' THEN 'Combs'
  WHEN coalesce(category,'') ILIKE '%brush%' AND coalesce(category,'') ILIKE '%makeup%' THEN 'Makeup Brushes'
  WHEN coalesce(category,'') ILIKE '%brush%' THEN 'Hair Brushes'
  WHEN coalesce(category,'') ILIKE '%wax machine%' THEN 'Wax Machines'
  WHEN coalesce(category,'') ILIKE '%wax%' THEN 'Body Wax'
  WHEN coalesce(category,'') ILIKE '%makeup%' OR coalesce(category,'') ILIKE '%cinema%' THEN 'Makeup'
  WHEN coalesce(category,'') ILIKE '%skin%' THEN 'Skin Care'
  WHEN coalesce(category,'') ILIKE '%shower%' OR coalesce(category,'') ILIKE '%vitamin head%' THEN 'Shower Vitamins'
  WHEN coalesce(category,'') ILIKE '%perfume%' OR coalesce(category,'') ILIKE '%fragrance%' OR coalesce(category,'') ILIKE '%eau de%' OR coalesce(category,'') ILIKE '%linen%' THEN 'Fragrance'
  WHEN coalesce(category,'') ILIKE '%men%groom%' OR coalesce(category,'') ILIKE '%barber%' THEN 'Men''s Grooming'
  WHEN coalesce(category,'') ILIKE '%tools%' OR coalesce(category,'') ILIKE '%accessor%' THEN 'Tools & Accessories'
  ELSE 'Other'
END
WHERE product_type IS NULL;

-- Backfill product_subtype with notable lines
UPDATE public.products SET product_subtype = CASE
  WHEN coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%lumen%' THEN 'Lumen (Ginger & Hemp)'
  WHEN coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%keratin%marine%' OR coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%marine collagen%' THEN 'Keratin & Marine Collagen'
  WHEN coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%keratin%' THEN 'Keratin'
  WHEN coalesce(category,'') || ' ' || coalesce(name,'') ILIKE '%multivitamin%' THEN 'Multivitamin'
  WHEN coalesce(category,'') ILIKE '%home fragrance%' THEN 'Home Fragrance'
  WHEN coalesce(category,'') ILIKE '%linen%' THEN 'Linen Perfume'
  WHEN coalesce(category,'') ILIKE '%eau de%' THEN 'Eau de Parfum'
  WHEN coalesce(category,'') ILIKE '%korean%' THEN 'Korean Line'
  ELSE NULL
END
WHERE product_subtype IS NULL;
