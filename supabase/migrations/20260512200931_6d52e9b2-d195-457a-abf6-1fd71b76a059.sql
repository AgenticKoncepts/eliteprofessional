
-- Products table
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  name_ar text,
  description text,
  description_ar text,
  short_description text,
  brand text,
  category text,
  sku text,
  price_aed numeric(10,2) NOT NULL DEFAULT 0,
  price_max_aed numeric(10,2),
  source_price_usd numeric(10,2),
  stock integer NOT NULL DEFAULT 0,
  in_stock boolean NOT NULL DEFAULT true,
  variants jsonb NOT NULL DEFAULT '[]'::jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  primary_image text,
  source_url text,
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_published ON public.products(is_published);
CREATE INDEX idx_products_featured ON public.products(is_featured);

CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can read published products
CREATE POLICY "Public can view published products" ON public.products
  FOR SELECT USING (is_published = true);

-- Open admin (no auth yet) — anon + authenticated can write
CREATE POLICY "Anyone can insert products" ON public.products
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON public.products
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete products" ON public.products
  FOR DELETE TO anon, authenticated USING (true);
CREATE POLICY "Anyone can view all products" ON public.products
  FOR SELECT TO anon, authenticated USING (true);

-- Categories table
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  name_ar text,
  parent_slug text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can insert categories" ON public.categories FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update categories" ON public.categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete categories" ON public.categories FOR DELETE TO anon, authenticated USING (true);

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Anyone can upload product images" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Anyone can update product images" ON storage.objects
  FOR UPDATE TO anon, authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Anyone can delete product images" ON storage.objects
  FOR DELETE TO anon, authenticated USING (bucket_id = 'product-images');
