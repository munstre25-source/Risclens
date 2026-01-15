-- ============================================================================
-- pSEO Database Fix Script
-- Run this in Supabase SQL Editor to fix broken/incomplete pSEO pages
-- Generated: 2026-01-15
-- ============================================================================

-- ============================================================================
-- STEP 1: Delete Critical Broken Pages (5 pricing pages with missing toolName)
-- ============================================================================

DELETE FROM pseo_pages 
WHERE id IN (
  '16b604ff-46ca-42a0-a841-7aae1ae43029',  -- ai-governance-budgeting-guide
  '623af3c0-be44-4b40-af78-5c72c58544c2',  -- vanta
  '8af8553f-dbea-4ace-aecd-8cad92f3696e',  -- drata
  '6cef5da0-d74a-47ca-a84c-bf6595590036',  -- secureframe
  'ca36882a-22fb-444b-aaec-dd4329ae80e2'   -- sprinto
);

-- ============================================================================
-- STEP 2: Fix Directory Pages (add cityName from slug)
-- ============================================================================

-- Update all directory pages to have cityName derived from slug
UPDATE pseo_pages 
SET content_json = jsonb_set(
  COALESCE(content_json, '{}'::jsonb),
  '{cityName}',
  to_jsonb(
    INITCAP(REPLACE(slug, '-', ' '))
  )
)
WHERE category = 'directory' 
AND (content_json->>'cityName' IS NULL OR content_json->>'cityName' = '');

-- Also set citySlug if missing
UPDATE pseo_pages 
SET content_json = jsonb_set(
  content_json,
  '{citySlug}',
  to_jsonb(slug)
)
WHERE category = 'directory' 
AND (content_json->>'citySlug' IS NULL OR content_json->>'citySlug' = '');

-- ============================================================================
-- STEP 3: Fix Role Pages (add roleName from slug)
-- ============================================================================

-- Update all role pages to have roleName derived from slug
UPDATE pseo_pages 
SET content_json = jsonb_set(
  COALESCE(content_json, '{}'::jsonb),
  '{roleName}',
  to_jsonb(
    INITCAP(REPLACE(REPLACE(slug, 'ai-governance-for-', ''), '-', ' '))
  )
)
WHERE category = 'role' 
AND (content_json->>'roleName' IS NULL OR content_json->>'roleName' = '');

-- Also set title for role pages
UPDATE pseo_pages 
SET title = 'SOC 2 Compliance Guide for ' || INITCAP(REPLACE(REPLACE(slug, 'ai-governance-for-', ''), '-', ' ')) || 's'
WHERE category = 'role' 
AND (title IS NULL OR title = '');

-- ============================================================================
-- STEP 4: Fix Compliance Pages (add title)
-- ============================================================================

UPDATE pseo_pages 
SET title = INITCAP(REPLACE(slug, '-', ' '))
WHERE category = 'compliance' 
AND (title IS NULL OR title = '');

UPDATE pseo_pages 
SET content_json = jsonb_set(
  COALESCE(content_json, '{}'::jsonb),
  '{title}',
  to_jsonb(title)
)
WHERE category = 'compliance' 
AND (content_json->>'title' IS NULL OR content_json->>'title' = '');

-- ============================================================================
-- STEP 5: Fix Comparison Pages (add title from slug)
-- ============================================================================

UPDATE pseo_pages 
SET title = INITCAP(REPLACE(slug, '-', ' '))
WHERE category IN ('comparison', 'framework_comparison', 'use_case', 'use-case') 
AND (title IS NULL OR title = '');

UPDATE pseo_pages 
SET content_json = jsonb_set(
  COALESCE(content_json, '{}'::jsonb),
  '{title}',
  to_jsonb(title)
)
WHERE category IN ('comparison', 'framework_comparison', 'use_case', 'use-case') 
AND (content_json->>'title' IS NULL OR content_json->>'title' = '');

-- ============================================================================
-- STEP 6: Add meta_description to pages that are missing it
-- ============================================================================

-- Directory pages
UPDATE pseo_pages 
SET meta_description = 'Find top SOC 2 auditors in ' || INITCAP(REPLACE(slug, '-', ' ')) || '. Compare firms by pricing, expertise, and reviews.'
WHERE category = 'directory' 
AND (meta_description IS NULL OR meta_description = '');

-- Role pages
UPDATE pseo_pages 
SET meta_description = 'Comprehensive SOC 2 compliance guide for ' || INITCAP(REPLACE(REPLACE(slug, 'ai-governance-for-', ''), '-', ' ')) || 's. Learn key priorities, timelines, and best practices.'
WHERE category = 'role' 
AND (meta_description IS NULL OR meta_description = '');

-- ============================================================================
-- STEP 7: Verify fixes
-- ============================================================================

-- Check remaining issues after fix
SELECT 
  category,
  COUNT(*) as total_pages,
  COUNT(*) FILTER (WHERE content_json->>'cityName' IS NOT NULL) as has_city_name,
  COUNT(*) FILTER (WHERE content_json->>'roleName' IS NOT NULL) as has_role_name,
  COUNT(*) FILTER (WHERE content_json->>'title' IS NOT NULL) as has_title,
  COUNT(*) FILTER (WHERE title IS NOT NULL AND title != '') as has_page_title,
  COUNT(*) FILTER (WHERE meta_description IS NOT NULL AND meta_description != '') as has_meta_desc
FROM pseo_pages
GROUP BY category
ORDER BY category;

-- ============================================================================
-- End of script
-- ============================================================================
