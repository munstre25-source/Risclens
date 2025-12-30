-- =============================================================================
-- RISCLENS SOC 2 CALCULATOR - DATABASE SCHEMA
-- =============================================================================
-- This migration creates all tables needed for the SOC 2 Calculator MVP.
-- Run this against your Supabase Postgres database.
--
-- Usage:
--   psql $DATABASE_URL -f sql/00_init.sql
--   OR use Supabase Dashboard SQL Editor
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- SOC2_Leads - Main leads table
-- =============================================================================
CREATE TABLE IF NOT EXISTS "SOC2_Leads" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    num_employees INTEGER NOT NULL,
    data_types TEXT[] NOT NULL DEFAULT '{}',
    audit_date DATE NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    utm_source TEXT,
    variation_id TEXT,
    readiness_score INTEGER NOT NULL DEFAULT 0,
    estimated_cost_low INTEGER NOT NULL DEFAULT 0,
    estimated_cost_high INTEGER NOT NULL DEFAULT 0,
    lead_score INTEGER NOT NULL DEFAULT 0,
    keep_or_sell TEXT NOT NULL DEFAULT 'sell' CHECK (keep_or_sell IN ('keep', 'sell')),
    pdf_url TEXT,
    email_sent BOOLEAN NOT NULL DEFAULT FALSE,
    email_delivery_status TEXT,
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    sold BOOLEAN NOT NULL DEFAULT FALSE,
    buyer_email TEXT,
    sale_amount NUMERIC(10, 2),
    followup_day3_sent BOOLEAN NOT NULL DEFAULT FALSE,
    followup_day7_sent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_soc2_leads_email ON "SOC2_Leads" (email);
CREATE INDEX IF NOT EXISTS idx_soc2_leads_created_at ON "SOC2_Leads" (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_soc2_leads_keep_or_sell ON "SOC2_Leads" (keep_or_sell);
CREATE INDEX IF NOT EXISTS idx_soc2_leads_industry ON "SOC2_Leads" (industry);
CREATE INDEX IF NOT EXISTS idx_soc2_leads_followup ON "SOC2_Leads" (created_at, email_sent, followup_day3_sent, followup_day7_sent);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_soc2_leads_updated_at ON "SOC2_Leads";
CREATE TRIGGER update_soc2_leads_updated_at
    BEFORE UPDATE ON "SOC2_Leads"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- REVENUE_EVENTS - Track revenue-generating events
-- =============================================================================
CREATE TABLE IF NOT EXISTS "REVENUE_EVENTS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES "SOC2_Leads"(id) ON DELETE SET NULL,
    keyword_id UUID,
    calculator_page TEXT NOT NULL DEFAULT '/soc-2-cost-calculator',
    event_type TEXT NOT NULL,
    event_value NUMERIC(10, 2) NOT NULL DEFAULT 0,
    event_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_revenue_events_lead_id ON "REVENUE_EVENTS" (lead_id);
CREATE INDEX IF NOT EXISTS idx_revenue_events_event_date ON "REVENUE_EVENTS" (event_date DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_events_event_type ON "REVENUE_EVENTS" (event_type);

-- =============================================================================
-- KEYWORDS - Mini-Ahrefs schema placeholder
-- =============================================================================
CREATE TABLE IF NOT EXISTS "KEYWORDS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword TEXT NOT NULL,
    category TEXT,
    intent_type TEXT,
    revenue_score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    future_metrics JSONB
);

CREATE INDEX IF NOT EXISTS idx_keywords_keyword ON "KEYWORDS" (keyword);
CREATE INDEX IF NOT EXISTS idx_keywords_revenue_score ON "KEYWORDS" (revenue_score DESC);

-- =============================================================================
-- AUDIT_LOGS - System audit trail
-- =============================================================================
CREATE TABLE IF NOT EXISTS "AUDIT_LOGS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_event_type ON "AUDIT_LOGS" (event_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON "AUDIT_LOGS" (created_at DESC);

-- =============================================================================
-- AB_VARIANTS - A/B testing configuration
-- =============================================================================
CREATE TABLE IF NOT EXISTS "AB_VARIANTS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variation_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    headline TEXT,
    cta_text TEXT,
    impressions INTEGER NOT NULL DEFAULT 0,
    submissions INTEGER NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ab_variants_variation_id ON "AB_VARIANTS" (variation_id);
CREATE INDEX IF NOT EXISTS idx_ab_variants_active ON "AB_VARIANTS" (active);

-- Helper function to increment A/B counters atomically
CREATE OR REPLACE FUNCTION increment_ab_counter(p_variation_id TEXT, p_field TEXT)
RETURNS VOID AS $$
BEGIN
    IF p_field = 'impressions' THEN
        UPDATE "AB_VARIANTS" 
        SET impressions = impressions + 1 
        WHERE variation_id = p_variation_id;
    ELSIF p_field = 'submissions' THEN
        UPDATE "AB_VARIANTS" 
        SET submissions = submissions + 1 
        WHERE variation_id = p_variation_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- UNSUBSCRIBED_EMAILS - Email opt-out list
-- =============================================================================
CREATE TABLE IF NOT EXISTS "UNSUBSCRIBED_EMAILS" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_unsubscribed_emails_email ON "UNSUBSCRIBED_EMAILS" (email);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
-- Enable RLS on all tables
ALTER TABLE "SOC2_Leads" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "REVENUE_EVENTS" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KEYWORDS" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AUDIT_LOGS" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AB_VARIANTS" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UNSUBSCRIBED_EMAILS" ENABLE ROW LEVEL SECURITY;

-- Service role has full access (for server-side operations)
-- These policies allow the service_role key to perform all operations
CREATE POLICY "Service role full access on SOC2_Leads" ON "SOC2_Leads"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on REVENUE_EVENTS" ON "REVENUE_EVENTS"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on KEYWORDS" ON "KEYWORDS"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on AUDIT_LOGS" ON "AUDIT_LOGS"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on AB_VARIANTS" ON "AB_VARIANTS"
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access on UNSUBSCRIBED_EMAILS" ON "UNSUBSCRIBED_EMAILS"
    FOR ALL USING (auth.role() = 'service_role');

-- =============================================================================
-- STORAGE BUCKET (run separately in Supabase Dashboard)
-- =============================================================================
-- Note: Create storage bucket via Supabase Dashboard or API:
-- 
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create bucket named 'soc2-pdfs' (or your SUPABASE_STORAGE_BUCKET value)
-- 3. Set as public bucket (for PDF links)
-- 4. Configure CORS if needed

-- =============================================================================
-- SEED DATA FOR A/B VARIANTS
-- =============================================================================
INSERT INTO "AB_VARIANTS" (variation_id, name, headline, cta_text, active) VALUES
    ('default', 'Control', 'How Much Will Your SOC 2 Compliance Cost?', 'Get My Results', TRUE),
    ('v1', 'Variant A - Urgency', 'Find Out Your SOC 2 Costs in 2 Minutes', 'Calculate Now', FALSE),
    ('v2', 'Variant B - Benefit', 'Save Thousands on Your SOC 2 Compliance', 'See How Much You Can Save', FALSE)
ON CONFLICT (variation_id) DO NOTHING;

-- =============================================================================
-- SAMPLE KEYWORDS (Mini-Ahrefs placeholder data)
-- =============================================================================
INSERT INTO "KEYWORDS" (keyword, category, intent_type, revenue_score) VALUES
    ('soc 2 cost', 'compliance', 'commercial', 8),
    ('soc 2 audit cost', 'compliance', 'commercial', 9),
    ('soc 2 compliance requirements', 'compliance', 'informational', 5),
    ('soc 2 type 2 vs type 1', 'compliance', 'informational', 4),
    ('how long does soc 2 take', 'compliance', 'informational', 6)
ON CONFLICT DO NOTHING;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================
-- Run these to verify the schema was created correctly:
--
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT * FROM "AB_VARIANTS";
-- SELECT * FROM "KEYWORDS";

