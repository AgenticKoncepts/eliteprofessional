
-- Orders table — public storefront, anyone can place an order; only owner reads back via id+email.
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE DEFAULT ('EP-' || to_char(now(), 'YYYYMMDD') || '-' || lpad((floor(random()*100000))::text, 5, '0')),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'United Arab Emirates',
  shipping_notes TEXT,
  items JSONB NOT NULL,
  subtotal_aed NUMERIC(10,2) NOT NULL,
  total_aed NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'AED',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) may insert an order (storefront checkout, no login required).
CREATE POLICY "Anyone can place an order"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Reading orders is admin-only (locked down by default; admins use service role / future admin UI).
-- No SELECT policy means: nothing is readable through the anon key.

-- Touch updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_orders_email ON public.orders(customer_email);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
