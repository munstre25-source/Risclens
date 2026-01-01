-- Migration: Add context_note column to SOC2_Leads
-- Purpose: Store optional free-text input from assessment form
-- Field: "Anything specific an auditor, customer, or investor has already asked for?"
-- 
-- This field is:
-- - Optional (nullable)
-- - NOT used in scoring calculations
-- - NOT validated beyond basic sanitization
-- - For internal review and routing purposes only

ALTER TABLE "SOC2_Leads" ADD COLUMN IF NOT EXISTS context_note TEXT;

-- Add comment for documentation
COMMENT ON COLUMN "SOC2_Leads".context_note IS 'Optional context from user about specific auditor/customer/investor requests. Not used in scoring.';
