-- =============================================================================
-- FIX COMPANY SIGNAL SCORES
-- Sets default signal_score for companies that don't have one
-- =============================================================================

-- Set default signal_score of 50 for any company with null score
UPDATE company_signals 
SET signal_score = 50 
WHERE signal_score IS NULL AND indexable = true;

-- Verify count
SELECT COUNT(*) as total_companies_with_score 
FROM company_signals 
WHERE indexable = true AND signal_score > 0;
