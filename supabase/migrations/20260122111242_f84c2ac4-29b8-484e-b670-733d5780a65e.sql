-- GovCon-grade Company Profile schema (per-user)

-- 1) company_profiles
CREATE TABLE IF NOT EXISTS public.company_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,

  -- Identity
  legal_name text NOT NULL,
  dba_name text,
  website_url text,
  year_founded integer,

  -- Federal Identifiers
  uei text NOT NULL,
  cage_code text,

  -- SAM.gov Status
  sam_status text NOT NULL DEFAULT 'Pending',
  sam_expiration_date date,
  sam_last_synced timestamptz,

  -- NAICS
  primary_naics text NOT NULL,
  secondary_naics text[] NOT NULL DEFAULT '{}'::text[],

  -- Size & Location
  headquarters jsonb NOT NULL DEFAULT jsonb_build_object(
    'address','',
    'city','',
    'state','',
    'zip',''
  ),
  employee_count_range text NOT NULL DEFAULT '1-10',
  annual_revenue_range text NOT NULL DEFAULT '<$1M',

  -- Capabilities (structured)
  capabilities jsonb NOT NULL DEFAULT jsonb_build_object(
    'core_capabilities', jsonb_build_array(),
    'capability_confidence', 'Self',
    'capability_statement_url', null,
    'last_extracted_at', null
  ),

  -- Advanced (Phase 2)
  advanced jsonb,

  -- Meta (Internal)
  profile_completeness integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_company_profiles_user_id ON public.company_profiles(user_id);

ALTER TABLE public.company_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their company profile"
ON public.company_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their company profile"
ON public.company_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their company profile"
ON public.company_profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their company profile"
ON public.company_profiles
FOR DELETE
USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS set_company_profiles_updated_at ON public.company_profiles;
CREATE TRIGGER set_company_profiles_updated_at
BEFORE UPDATE ON public.company_profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- 2) company_set_asides
CREATE TABLE IF NOT EXISTS public.company_set_asides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_profile_id uuid NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,

  type text NOT NULL,
  status text NOT NULL DEFAULT 'N/A',
  certifying_agency text,
  expiration_date date,
  certification_number text,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_company_set_asides_company_profile_id ON public.company_set_asides(company_profile_id);

ALTER TABLE public.company_set_asides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their set-asides"
ON public.company_set_asides
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their set-asides"
ON public.company_set_asides
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their set-asides"
ON public.company_set_asides
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their set-asides"
ON public.company_set_asides
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

DROP TRIGGER IF EXISTS set_company_set_asides_updated_at ON public.company_set_asides;
CREATE TRIGGER set_company_set_asides_updated_at
BEFORE UPDATE ON public.company_set_asides
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- 3) company_certifications
CREATE TABLE IF NOT EXISTS public.company_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_profile_id uuid NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,

  type text NOT NULL,
  name text NOT NULL,
  level text,
  status text NOT NULL DEFAULT 'Active',
  issuing_authority text NOT NULL,
  issue_date date,
  expiration_date date,
  certificate_number text,
  verification_url text,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_company_certifications_company_profile_id ON public.company_certifications(company_profile_id);

ALTER TABLE public.company_certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their certifications"
ON public.company_certifications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their certifications"
ON public.company_certifications
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their certifications"
ON public.company_certifications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their certifications"
ON public.company_certifications
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

DROP TRIGGER IF EXISTS set_company_certifications_updated_at ON public.company_certifications;
CREATE TRIGGER set_company_certifications_updated_at
BEFORE UPDATE ON public.company_certifications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();


-- 4) company_past_performance
CREATE TABLE IF NOT EXISTS public.company_past_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_profile_id uuid NOT NULL REFERENCES public.company_profiles(id) ON DELETE CASCADE,

  contract_name text NOT NULL,
  contract_number text,

  client_type text NOT NULL,
  agency_or_client text NOT NULL,
  sub_agency text,

  contract_type text NOT NULL,
  contract_vehicle text,

  role text NOT NULL,
  work_share_percentage integer,

  contract_value_range text NOT NULL,
  pop_start_date date,
  pop_end_date date,
  status text NOT NULL,

  scope_tags text[] NOT NULL DEFAULT '{}'::text[],
  scope_description text,
  cpars_rating text,
  reference_contact jsonb,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_company_past_performance_company_profile_id ON public.company_past_performance(company_profile_id);

ALTER TABLE public.company_past_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their past performance"
ON public.company_past_performance
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert their past performance"
ON public.company_past_performance
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their past performance"
ON public.company_past_performance
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their past performance"
ON public.company_past_performance
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.company_profiles cp
    WHERE cp.id = company_profile_id AND cp.user_id = auth.uid()
  )
);

DROP TRIGGER IF EXISTS set_company_past_performance_updated_at ON public.company_past_performance;
CREATE TRIGGER set_company_past_performance_updated_at
BEFORE UPDATE ON public.company_past_performance
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
