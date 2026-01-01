-- Migration: Admin Dashboard Enhancements
-- Purpose: Add lead lifecycle status and admin notes

-- =============================================================================
-- PART 1: Lead Status State Machine
-- =============================================================================

-- Add lead_status column with enum-like constraint
ALTER TABLE "SOC2_Leads" ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'new';

-- Add check constraint for valid status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'valid_lead_status'
  ) THEN
    ALTER TABLE "SOC2_Leads" ADD CONSTRAINT valid_lead_status 
    CHECK (lead_status IN ('new', 'qualified', 'contacted', 'in_conversation', 'closed_won', 'closed_lost'));
  END IF;
END $$;

COMMENT ON COLUMN "SOC2_Leads".lead_status IS 'Lead lifecycle status: new, qualified, contacted, in_conversation, closed_won, closed_lost';

-- =============================================================================
-- PART 2: Admin Notes Table (Append-only, timestamped)
-- =============================================================================

CREATE TABLE IF NOT EXISTS "ADMIN_NOTES" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES "SOC2_Leads"(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  author TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast lookups by lead
CREATE INDEX IF NOT EXISTS idx_admin_notes_lead_id ON "ADMIN_NOTES"(lead_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_created_at ON "ADMIN_NOTES"(created_at DESC);

COMMENT ON TABLE "ADMIN_NOTES" IS 'Append-only admin notes for leads. Separate from user-provided context.';

-- =============================================================================
-- PART 3: Saved Filters Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS "SAVED_FILTERS" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  filter_config JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE "SAVED_FILTERS" IS 'Saved filter configurations for admin dashboard';

-- Insert default saved filters
INSERT INTO "SAVED_FILTERS" (name, filter_config) VALUES
  ('Enterprise + Urgent (<90 days)', '{"urgency": "urgent", "requirer": "enterprise"}'),
  ('Fintech + PII', '{"industry": "fintech", "data_type": "pii"}'),
  ('High Cost / Low Readiness', '{"min_cost": 30000, "max_readiness": 40}')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- PART 4: Add soc2_requirers column if not exists
-- =============================================================================

ALTER TABLE "SOC2_Leads" ADD COLUMN IF NOT EXISTS soc2_requirers TEXT[] DEFAULT '{}';

COMMENT ON COLUMN "SOC2_Leads".soc2_requirers IS 'Array of SOC 2 requirement sources: enterprise, midmarket, investors, exploratory';
