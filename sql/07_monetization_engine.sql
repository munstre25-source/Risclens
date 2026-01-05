-- Migration: Monetization Engine (Buyers, Webhooks, Enrichment)
-- Description: Adds tables for lead auctioning and enrichment, and tracks partial submissions.

-- 1. Track partial submissions in leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS is_partial BOOLEAN DEFAULT FALSE;

-- 2. Buyers table (Partners who purchase leads)
CREATE TABLE IF NOT EXISTS buyers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    contact_email TEXT UNIQUE NOT NULL,
    company_name TEXT,
    active BOOLEAN DEFAULT TRUE,
    lead_types TEXT[] DEFAULT '{}',
    min_score NUMERIC DEFAULT 0,
    max_price_per_lead NUMERIC DEFAULT 0
);

-- 3. Buyer Webhooks (Real-time lead delivery)
CREATE TABLE IF NOT EXISTS buyer_webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    buyer_id UUID REFERENCES buyers(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    secret_header TEXT DEFAULT 'X-Lead-Secret',
    secret_value TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_buyer_webhooks_buyer_id ON buyer_webhooks(buyer_id);

-- 4. Lead Enrichment (Background data from Clearbit/Apollo etc)
CREATE TABLE IF NOT EXISTS lead_enrichment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    provider TEXT NOT NULL,
    raw_data JSONB DEFAULT '{}',
    enriched_fields JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_lead_enrichment_lead_id ON lead_enrichment(lead_id);
