/**
 * pSEO Page Health Audit Script
 * 
 * Run: npx tsx scripts/audit-pseo-pages.ts
 * 
 * This script identifies broken or incomplete pSEO pages that could cause
 * indexing issues or render "undefined" content.
 */

import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface AuditIssue {
  id: string;
  slug: string;
  category: string;
  issue: string;
  severity: 'critical' | 'warning' | 'info';
  fix: string;
}

async function auditPseoPages() {
  const supabase = getSupabaseAdmin();
  const issues: AuditIssue[] = [];

  console.log('🔍 Starting pSEO Page Audit...\n');

  // Fetch all pSEO pages
  const { data: pages, error } = await supabase
    .from('pseo_pages')
    .select('*');

  if (error) {
    console.error('❌ Failed to fetch pages:', error);
    return;
  }

  if (!pages || pages.length === 0) {
    console.log('No pSEO pages found in database.');
    return;
  }

  console.log(`Found ${pages.length} pSEO pages. Analyzing...\n`);

  for (const page of pages) {
    const content = page.content_json || {};

    // 1. Check for missing content_json
    if (!page.content_json) {
      issues.push({
        id: page.id,
        slug: page.slug,
        category: page.category,
        issue: 'Missing content_json - page will render empty',
        severity: 'critical',
        fix: `DELETE FROM pseo_pages WHERE id = '${page.id}';`
      });
      continue;
    }

    // 2. Category-specific validation
    switch (page.category) {
      case 'pricing':
        if (!content.toolName || content.toolName.trim() === '') {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing toolName - renders "undefined Pricing"',
            severity: 'critical',
            fix: `DELETE FROM pseo_pages WHERE id = '${page.id}';`
          });
        }
        if (!content.pricingTiers || content.pricingTiers.length === 0) {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing pricingTiers - pricing section will be empty',
            severity: 'warning',
            fix: `-- Add pricingTiers to content_json for slug: ${page.slug}`
          });
        }
        break;

      case 'alternatives':
        if (!content.toolName || content.toolName.trim() === '') {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing toolName - renders "undefined Alternatives"',
            severity: 'critical',
            fix: `DELETE FROM pseo_pages WHERE id = '${page.id}';`
          });
        }
        if (!content.alternatives || content.alternatives.length === 0) {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing alternatives array - page will show no alternatives',
            severity: 'warning',
            fix: `-- Add alternatives to content_json for slug: ${page.slug}`
          });
        }
        break;

      case 'framework_comparison':
        if (!content.frameworkA || !content.frameworkB) {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing frameworkA or frameworkB - comparison will fail',
            severity: 'critical',
            fix: `DELETE FROM pseo_pages WHERE id = '${page.id}';`
          });
        }
        break;

      case 'compliance':
      case 'industry':
      case 'role':
        if (!content.title || content.title.trim() === '') {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing title - page will have generic/empty title',
            severity: 'warning',
            fix: `-- Add title to content_json for slug: ${page.slug}`
          });
        }
        break;

      case 'directory':
        if (!content.cityName || content.cityName.trim() === '') {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category,
            issue: 'Missing cityName - renders "undefined" in title',
            severity: 'critical',
            fix: `UPDATE pseo_pages SET content_json = jsonb_set(content_json, '{cityName}', '"${page.slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}"') WHERE id = '${page.id}';`
          });
        }
        break;

      default:
        // Generic validation for unknown categories
        if (!content.title && !content.toolName && !content.name && !content.cityName && !content.roleName && !content.industryName) {
          issues.push({
            id: page.id,
            slug: page.slug,
            category: page.category || 'unknown',
            issue: 'No identifiable title/name field - may render incorrectly',
            severity: 'warning',
            fix: `-- Review content_json for slug: ${page.slug}`
          });
        }
    }

    // 3. Check for invalid slugs
    if (!page.slug || page.slug.trim() === '') {
      issues.push({
        id: page.id,
        slug: '(empty)',
        category: page.category,
        issue: 'Empty slug - page is unreachable',
        severity: 'critical',
        fix: `DELETE FROM pseo_pages WHERE id = '${page.id}';`
      });
    } else if (page.slug.includes('/')) {
      issues.push({
        id: page.id,
        slug: page.slug,
        category: page.category,
        issue: 'Slug contains "/" - may cause routing issues',
        severity: 'warning',
        fix: `-- Review slug format for: ${page.slug}`
      });
    }

    // 4. Check for missing meta_description
    if (!page.meta_description || page.meta_description.trim() === '') {
      issues.push({
        id: page.id,
        slug: page.slug,
        category: page.category,
        issue: 'Missing meta_description - bad for SEO',
        severity: 'info',
        fix: `-- Add meta_description for slug: ${page.slug}`
      });
    }

    // 5. Check for "undefined" in content
    const contentStr = JSON.stringify(content);
    if (contentStr.includes('"undefined"') || contentStr.includes(': undefined')) {
      issues.push({
        id: page.id,
        slug: page.slug,
        category: page.category,
        issue: 'Content contains "undefined" string - data generation bug',
        severity: 'warning',
        fix: `-- Review and regenerate content for slug: ${page.slug}`
      });
    }
  }

  // Print results
  console.log('═'.repeat(80));
  console.log('AUDIT RESULTS');
  console.log('═'.repeat(80));

  const critical = issues.filter(i => i.severity === 'critical');
  const warnings = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');

  console.log(`\n📊 Summary: ${issues.length} issues found`);
  console.log(`   🔴 Critical: ${critical.length}`);
  console.log(`   🟡 Warning: ${warnings.length}`);
  console.log(`   🔵 Info: ${info.length}`);

  if (critical.length > 0) {
    console.log('\n' + '─'.repeat(80));
    console.log('🔴 CRITICAL ISSUES (will cause broken pages)');
    console.log('─'.repeat(80));
    critical.forEach((issue, i) => {
      console.log(`\n${i + 1}. [${issue.category}] ${issue.slug}`);
      console.log(`   Issue: ${issue.issue}`);
      console.log(`   Fix: ${issue.fix}`);
    });
  }

  if (warnings.length > 0) {
    console.log('\n' + '─'.repeat(80));
    console.log('🟡 WARNINGS (may cause display issues)');
    console.log('─'.repeat(80));
    warnings.forEach((issue, i) => {
      console.log(`\n${i + 1}. [${issue.category}] ${issue.slug}`);
      console.log(`   Issue: ${issue.issue}`);
    });
  }

  if (info.length > 0 && process.argv.includes('--verbose')) {
    console.log('\n' + '─'.repeat(80));
    console.log('🔵 INFO (minor improvements)');
    console.log('─'.repeat(80));
    info.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.category}] ${issue.slug}: ${issue.issue}`);
    });
  }

  // Generate SQL for critical fixes
  if (critical.length > 0) {
    console.log('\n' + '═'.repeat(80));
    console.log('SQL TO FIX CRITICAL ISSUES');
    console.log('═'.repeat(80));
    console.log('\n-- Run this in Supabase SQL Editor:\n');
    
    const deleteIds = critical.map(i => `'${i.id}'`).join(', ');
    console.log(`-- Delete all ${critical.length} broken pages:`);
    console.log(`DELETE FROM pseo_pages WHERE id IN (${deleteIds});\n`);
    
    console.log('-- Or delete individually:');
    critical.forEach(issue => {
      console.log(issue.fix);
    });
  }

  console.log('\n✅ Audit complete!\n');
}

auditPseoPages().catch(console.error);
