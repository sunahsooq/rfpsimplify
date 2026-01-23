-- GovCon-grade Company Profile: Enums + completeness + triggers (safe cast approach)

-- 1) Enum types (idempotent)
DO $$ BEGIN
  CREATE TYPE public.sam_status_enum AS ENUM ('Active','Inactive','Pending');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.employee_count_range_enum AS ENUM ('1-10','11-50','51-200','201-500','500+');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.annual_revenue_range_enum AS ENUM ('<$1M','$1-5M','$5-25M','$25-100M','$100M+');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.set_aside_type_enum AS ENUM ('SB','8a','WOSB','EDWOSB','SDVOSB','VOSB','HUBZone','SDB');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.set_aside_status_enum AS ENUM ('Certified','Self-Certified','Pending','Expired','N/A');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.set_aside_agency_enum AS ENUM ('SBA','VA','Self');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.certification_type_enum AS ENUM ('Security','Quality','Industry','Clearance');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.certification_status_enum AS ENUM ('Active','In Process','Expired','Pending');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.client_type_enum AS ENUM ('Municipal','State','Federal','Commercial');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.contract_type_enum AS ENUM ('IDIQ','IDIQ-TO','FFP','T&M','Cost-Plus','BPA','Other');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.contract_role_enum AS ENUM ('Prime','Subcontractor','JV-Partner');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.contract_value_range_enum AS ENUM ('<$1M','$1-5M','$5-25M','$25M+');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.past_performance_status_enum AS ENUM ('Active','Completed','Terminated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.cpars_rating_enum AS ENUM ('Exceptional','Very Good','Satisfactory','Marginal','Unsatisfactory');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) company_profiles: Drop defaults, cast, re-add defaults

ALTER TABLE public.company_profiles
  ALTER COLUMN sam_status DROP DEFAULT;

ALTER TABLE public.company_profiles
  ALTER COLUMN sam_status TYPE public.sam_status_enum
    USING (CASE
      WHEN sam_status::text IN ('Active','Inactive','Pending') THEN sam_status::text::public.sam_status_enum
      ELSE 'Pending'::public.sam_status_enum
    END);

ALTER TABLE public.company_profiles
  ALTER COLUMN sam_status SET DEFAULT 'Pending'::public.sam_status_enum;

ALTER TABLE public.company_profiles
  ALTER COLUMN employee_count_range DROP DEFAULT;

ALTER TABLE public.company_profiles
  ALTER COLUMN employee_count_range TYPE public.employee_count_range_enum
    USING (CASE
      WHEN employee_count_range::text IN ('1-10','11-50','51-200','201-500','500+') THEN employee_count_range::text::public.employee_count_range_enum
      ELSE '1-10'::public.employee_count_range_enum
    END);

ALTER TABLE public.company_profiles
  ALTER COLUMN employee_count_range SET DEFAULT '1-10'::public.employee_count_range_enum;

ALTER TABLE public.company_profiles
  ALTER COLUMN annual_revenue_range DROP DEFAULT;

ALTER TABLE public.company_profiles
  ALTER COLUMN annual_revenue_range TYPE public.annual_revenue_range_enum
    USING (CASE
      WHEN annual_revenue_range::text IN ('<$1M','$1-5M','$5-25M','$25-100M','$100M+') THEN annual_revenue_range::text::public.annual_revenue_range_enum
      ELSE '<$1M'::public.annual_revenue_range_enum
    END);

ALTER TABLE public.company_profiles
  ALTER COLUMN annual_revenue_range SET DEFAULT '<$1M'::public.annual_revenue_range_enum;

-- 3) company_set_asides

ALTER TABLE public.company_set_asides
  ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.company_set_asides
  ALTER COLUMN status TYPE public.set_aside_status_enum
    USING (CASE
      WHEN status::text IN ('Certified','Self-Certified','Pending','Expired','N/A') THEN status::text::public.set_aside_status_enum
      ELSE 'N/A'::public.set_aside_status_enum
    END);

ALTER TABLE public.company_set_asides
  ALTER COLUMN status SET DEFAULT 'N/A'::public.set_aside_status_enum;

ALTER TABLE public.company_set_asides
  ALTER COLUMN type TYPE public.set_aside_type_enum
    USING (CASE
      WHEN type::text IN ('SB','8a','WOSB','EDWOSB','SDVOSB','VOSB','HUBZone','SDB') THEN type::text::public.set_aside_type_enum
      -- legacy mappings
      WHEN lower(type::text) IN ('small business','small_business','sb') THEN 'SB'::public.set_aside_type_enum
      WHEN lower(type::text) IN ('8(a)','8a') THEN '8a'::public.set_aside_type_enum
      WHEN lower(type::text) IN ('hubzone') THEN 'HUBZone'::public.set_aside_type_enum
      ELSE 'SB'::public.set_aside_type_enum
    END);

ALTER TABLE public.company_set_asides
  ALTER COLUMN certifying_agency TYPE public.set_aside_agency_enum
    USING (CASE
      WHEN certifying_agency IS NULL THEN NULL
      WHEN certifying_agency::text IN ('SBA','VA','Self') THEN certifying_agency::text::public.set_aside_agency_enum
      ELSE NULL
    END);

-- 4) company_certifications

ALTER TABLE public.company_certifications
  ALTER COLUMN status DROP DEFAULT;

ALTER TABLE public.company_certifications
  ALTER COLUMN status TYPE public.certification_status_enum
    USING (CASE
      WHEN status::text IN ('Active','In Process','Expired','Pending') THEN status::text::public.certification_status_enum
      ELSE 'Active'::public.certification_status_enum
    END);

ALTER TABLE public.company_certifications
  ALTER COLUMN status SET DEFAULT 'Active'::public.certification_status_enum;

ALTER TABLE public.company_certifications
  ALTER COLUMN type TYPE public.certification_type_enum
    USING (CASE
      WHEN type::text IN ('Security','Quality','Industry','Clearance') THEN type::text::public.certification_type_enum
      ELSE 'Industry'::public.certification_type_enum
    END);

-- 5) company_past_performance

ALTER TABLE public.company_past_performance
  ALTER COLUMN client_type TYPE public.client_type_enum
    USING (CASE
      WHEN client_type::text IN ('Municipal','State','Federal','Commercial') THEN client_type::text::public.client_type_enum
      ELSE 'Federal'::public.client_type_enum
    END);

ALTER TABLE public.company_past_performance
  ALTER COLUMN contract_type TYPE public.contract_type_enum
    USING (CASE
      WHEN contract_type::text IN ('IDIQ','IDIQ-TO','FFP','T&M','Cost-Plus','BPA','Other') THEN contract_type::text::public.contract_type_enum
      ELSE 'Other'::public.contract_type_enum
    END);

ALTER TABLE public.company_past_performance
  ALTER COLUMN role TYPE public.contract_role_enum
    USING (CASE
      WHEN role::text IN ('Prime','Subcontractor','JV-Partner') THEN role::text::public.contract_role_enum
      ELSE 'Prime'::public.contract_role_enum
    END);

ALTER TABLE public.company_past_performance
  ALTER COLUMN contract_value_range TYPE public.contract_value_range_enum
    USING (CASE
      WHEN contract_value_range::text IN ('<$1M','$1-5M','$5-25M','$25M+') THEN contract_value_range::text::public.contract_value_range_enum
      ELSE '<$1M'::public.contract_value_range_enum
    END);

ALTER TABLE public.company_past_performance
  ALTER COLUMN status TYPE public.past_performance_status_enum
    USING (CASE
      WHEN status::text IN ('Active','Completed','Terminated') THEN status::text::public.past_performance_status_enum
      ELSE 'Completed'::public.past_performance_status_enum
    END);

ALTER TABLE public.company_past_performance
  ALTER COLUMN cpars_rating TYPE public.cpars_rating_enum
    USING (CASE
      WHEN cpars_rating IS NULL THEN NULL
      WHEN cpars_rating::text IN ('Exceptional','Very Good','Satisfactory','Marginal','Unsatisfactory') THEN cpars_rating::text::public.cpars_rating_enum
      ELSE NULL
    END);

-- 6) updated_at triggers

DROP TRIGGER IF EXISTS trg_company_profiles_updated_at ON public.company_profiles;
CREATE TRIGGER trg_company_profiles_updated_at
BEFORE UPDATE ON public.company_profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_company_set_asides_updated_at ON public.company_set_asides;
CREATE TRIGGER trg_company_set_asides_updated_at
BEFORE UPDATE ON public.company_set_asides
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_company_certifications_updated_at ON public.company_certifications;
CREATE TRIGGER trg_company_certifications_updated_at
BEFORE UPDATE ON public.company_certifications
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_company_past_performance_updated_at ON public.company_past_performance;
CREATE TRIGGER trg_company_past_performance_updated_at
BEFORE UPDATE ON public.company_past_performance
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 7) Profile completeness function

CREATE OR REPLACE FUNCTION public.recompute_profile_completeness(p_profile_id uuid)
RETURNS void
LANGUAGE plpgsql
SET search_path TO public
AS $$
DECLARE
  v_cp public.company_profiles%ROWTYPE;
  v_score int := 0;
  v_active_certs int := 0;
  v_active_certs_unexpired bool := true;
  v_past_perf_count int := 0;
  v_has_cpars bool := false;
  v_has_set_aside_exp bool := false;
  v_core_caps_count int := 0;
  v_cap_stmt_url text;
BEGIN
  SELECT * INTO v_cp FROM public.company_profiles WHERE id = p_profile_id;
  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Compliance
  IF coalesce(v_cp.uei,'') <> '' THEN v_score := v_score + 10; END IF;
  IF coalesce(v_cp.cage_code,'') <> '' THEN v_score := v_score + 5; END IF;
  IF v_cp.sam_status = 'Active'::public.sam_status_enum THEN v_score := v_score + 10; END IF;
  IF v_cp.sam_expiration_date IS NOT NULL AND v_cp.sam_expiration_date > (current_date + 60) THEN
    v_score := v_score + 5;
  END IF;

  -- Classification
  IF coalesce(v_cp.primary_naics,'') <> '' THEN v_score := v_score + 10; END IF;
  SELECT EXISTS (
    SELECT 1 FROM public.company_set_asides s
    WHERE s.company_profile_id = p_profile_id AND s.expiration_date IS NOT NULL
  ) INTO v_has_set_aside_exp;
  IF v_has_set_aside_exp THEN v_score := v_score + 5; END IF;

  -- Capabilities (JSON)
  SELECT jsonb_array_length(coalesce(v_cp.capabilities->'core_capabilities','[]'::jsonb)) INTO v_core_caps_count;
  IF v_core_caps_count >= 3 THEN v_score := v_score + 10; END IF;

  v_cap_stmt_url := NULLIF((v_cp.capabilities->>'capability_statement_url'), '');
  IF v_cap_stmt_url IS NOT NULL THEN v_score := v_score + 10; END IF;

  -- Certifications
  SELECT count(*) INTO v_active_certs
  FROM public.company_certifications c
  WHERE c.company_profile_id = p_profile_id AND c.status = 'Active'::public.certification_status_enum;

  IF v_active_certs >= 2 THEN v_score := v_score + 10; END IF;

  SELECT NOT EXISTS (
    SELECT 1
    FROM public.company_certifications c
    WHERE c.company_profile_id = p_profile_id
      AND c.status = 'Active'::public.certification_status_enum
      AND c.expiration_date IS NOT NULL
      AND c.expiration_date <= current_date
  ) INTO v_active_certs_unexpired;

  IF v_active_certs >= 1 AND v_active_certs_unexpired THEN v_score := v_score + 5; END IF;

  -- Past performance
  SELECT count(*) INTO v_past_perf_count
  FROM public.company_past_performance p
  WHERE p.company_profile_id = p_profile_id;

  IF v_past_perf_count >= 1 THEN v_score := v_score + 10; END IF;
  IF v_past_perf_count >= 3 THEN v_score := v_score + 5; END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.company_past_performance p
    WHERE p.company_profile_id = p_profile_id AND p.cpars_rating IS NOT NULL
  ) INTO v_has_cpars;
  IF v_has_cpars THEN v_score := v_score + 5; END IF;

  UPDATE public.company_profiles
  SET profile_completeness = LEAST(v_score, 100)
  WHERE id = p_profile_id;
END;
$$;

-- 8) Helper trigger functions

CREATE OR REPLACE FUNCTION public._trg_company_profiles_recompute_completeness()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO public
AS $$
BEGIN
  PERFORM public.recompute_profile_completeness(NEW.id);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public._trg_company_related_recompute_completeness()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO public
AS $$
DECLARE
  v_profile_id uuid;
BEGIN
  v_profile_id := COALESCE(NEW.company_profile_id, OLD.company_profile_id);
  IF v_profile_id IS NOT NULL THEN
    PERFORM public.recompute_profile_completeness(v_profile_id);
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- 9) Attach completeness triggers

DROP TRIGGER IF EXISTS trg_company_profiles_recompute_completeness ON public.company_profiles;
CREATE TRIGGER trg_company_profiles_recompute_completeness
AFTER INSERT OR UPDATE ON public.company_profiles
FOR EACH ROW EXECUTE FUNCTION public._trg_company_profiles_recompute_completeness();

DROP TRIGGER IF EXISTS trg_company_set_asides_recompute_completeness ON public.company_set_asides;
CREATE TRIGGER trg_company_set_asides_recompute_completeness
AFTER INSERT OR UPDATE OR DELETE ON public.company_set_asides
FOR EACH ROW EXECUTE FUNCTION public._trg_company_related_recompute_completeness();

DROP TRIGGER IF EXISTS trg_company_certifications_recompute_completeness ON public.company_certifications;
CREATE TRIGGER trg_company_certifications_recompute_completeness
AFTER INSERT OR UPDATE OR DELETE ON public.company_certifications
FOR EACH ROW EXECUTE FUNCTION public._trg_company_related_recompute_completeness();

DROP TRIGGER IF EXISTS trg_company_past_performance_recompute_completeness ON public.company_past_performance;
CREATE TRIGGER trg_company_past_performance_recompute_completeness
AFTER INSERT OR UPDATE OR DELETE ON public.company_past_performance
FOR EACH ROW EXECUTE FUNCTION public._trg_company_related_recompute_completeness();
