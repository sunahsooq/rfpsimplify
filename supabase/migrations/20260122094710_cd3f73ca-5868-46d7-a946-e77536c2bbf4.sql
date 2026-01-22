-- Tighten write access for demo: only backend (service role) should write; keep public read

DROP POLICY IF EXISTS "Public can create opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Public can update opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "Public can delete opportunities" ON public.opportunities;

-- Explicitly block client-side writes (service role bypasses RLS)
CREATE POLICY "No public inserts" ON public.opportunities
  FOR INSERT WITH CHECK (false);

CREATE POLICY "No public updates" ON public.opportunities
  FOR UPDATE USING (false);

CREATE POLICY "No public deletes" ON public.opportunities
  FOR DELETE USING (false);
