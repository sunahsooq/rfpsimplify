-- Add status column to opportunities for dashboard filtering
ALTER TABLE public.opportunities
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active';

-- Backfill in case existing rows have NULLs (shouldn't due to NOT NULL + default)
UPDATE public.opportunities SET status = 'active' WHERE status IS NULL;

-- Helpful index for dashboard/opportunities queries
CREATE INDEX IF NOT EXISTS idx_opportunities_status_created_at
ON public.opportunities (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_opportunities_source_status_created_at
ON public.opportunities (source, status, created_at DESC);