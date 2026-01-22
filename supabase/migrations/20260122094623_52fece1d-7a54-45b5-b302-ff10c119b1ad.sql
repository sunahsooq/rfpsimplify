-- Manual RFP ingestion persistence

CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  source TEXT NOT NULL DEFAULT 'manual_upload',

  -- Core, list-card friendly fields
  title TEXT,
  solicitation_id TEXT,
  agency TEXT,
  sub_agency TEXT,
  due_date TEXT,
  naics_codes TEXT[] NOT NULL DEFAULT '{}',
  set_aside TEXT[] NOT NULL DEFAULT '{}',
  contract_type TEXT,
  estimated_value TEXT,
  place_of_performance TEXT,

  summary TEXT[] NOT NULL DEFAULT '{}',

  -- Structured analysis blobs (kept flexible for v1)
  requirements JSONB,
  evaluation_criteria TEXT[] NOT NULL DEFAULT '{}',
  match_analysis JSONB,
  scores JSONB,
  partner_recommendations JSONB,
  bid_brief JSONB,

  -- Traceability
  raw_rfp_text TEXT
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Demo-only: open policies (loginless MVP)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities' AND policyname = 'Public can read opportunities'
  ) THEN
    CREATE POLICY "Public can read opportunities" ON public.opportunities
      FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities' AND policyname = 'Public can create opportunities'
  ) THEN
    CREATE POLICY "Public can create opportunities" ON public.opportunities
      FOR INSERT WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities' AND policyname = 'Public can update opportunities'
  ) THEN
    CREATE POLICY "Public can update opportunities" ON public.opportunities
      FOR UPDATE USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities' AND policyname = 'Public can delete opportunities'
  ) THEN
    CREATE POLICY "Public can delete opportunities" ON public.opportunities
      FOR DELETE USING (true);
  END IF;
END $$;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS set_opportunities_updated_at ON public.opportunities;
CREATE TRIGGER set_opportunities_updated_at
BEFORE UPDATE ON public.opportunities
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_opportunities_created_at ON public.opportunities (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_agency ON public.opportunities (agency);
CREATE INDEX IF NOT EXISTS idx_opportunities_naics ON public.opportunities USING GIN (naics_codes);
CREATE INDEX IF NOT EXISTS idx_opportunities_set_aside ON public.opportunities USING GIN (set_aside);
