
CREATE TABLE public.import_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firecrawl_job_id text UNIQUE,
  source_url text,
  kind text NOT NULL DEFAULT 'batch_scrape',
  status text NOT NULL DEFAULT 'pending',
  total int NOT NULL DEFAULT 0,
  completed int NOT NULL DEFAULT 0,
  succeeded int NOT NULL DEFAULT 0,
  failed int NOT NULL DEFAULT 0,
  notes text,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.import_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.import_jobs(id) ON DELETE CASCADE,
  source_url text,
  slug text,
  status text NOT NULL,
  error text,
  scraped jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_job ON public.import_audit(job_id);
CREATE INDEX idx_audit_status ON public.import_audit(status);
CREATE INDEX idx_audit_slug ON public.import_audit(slug);

CREATE TABLE public.category_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_category text NOT NULL UNIQUE,
  canonical_slug text NOT NULL,
  canonical_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.product_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_slug text NOT NULL,
  source_url text,
  name_match boolean,
  price_match boolean,
  variants_match boolean,
  images_match boolean,
  ok boolean NOT NULL DEFAULT false,
  scraped jsonb,
  diff jsonb,
  error text,
  checked_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_verif_slug ON public.product_verifications(product_slug);
CREATE INDEX idx_verif_checked ON public.product_verifications(checked_at DESC);

ALTER TABLE public.import_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "open all" ON public.import_jobs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open all" ON public.import_audit FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open all" ON public.category_mappings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open all" ON public.product_verifications FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER trg_import_jobs_updated BEFORE UPDATE ON public.import_jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_category_mappings_updated BEFORE UPDATE ON public.category_mappings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
