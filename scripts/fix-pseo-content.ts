/**
 * pSEO Content Fix Script
 * 
 * Run: npx tsx scripts/fix-pseo-content.ts
 * 
 * This script fixes missing fields in pSEO pages by generating
 * content from slugs and updating the database.
 */

import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface FixResult {
  slug: string;
  category: string;
  fixes: string[];
  success: boolean;
  error?: string;
}

// Helper to format slug to title case
function slugToTitle(slug: string, removePrefix?: string): string {
  let formatted = slug;
  if (removePrefix) {
    formatted = formatted.replace(removePrefix, '');
  }
  return formatted
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function fixPseoContent() {
  const supabase = getSupabaseAdmin();
  const results: FixResult[] = [];

  console.log('🔧 Starting pSEO Content Fix...\n');

  // Fetch all pSEO pages
  const { data: pages, error } = await supabase
    .from('pseo_pages')
    .select('*');

  if (error) {
    console.error('❌ Failed to fetch pages:', error);
    return;
  }

  if (!pages || pages.length === 0) {
    console.log('No pSEO pages found.');
    return;
  }

  console.log(`Found ${pages.length} pages. Checking for issues...\n`);

  for (const page of pages) {
    const fixes: string[] = [];
    let content = page.content_json || {};
    let needsUpdate = false;
    let newTitle = page.title;
    let newMetaDesc = page.meta_description;

    // Category-specific fixes
    switch (page.category) {
      case 'directory':
        // Always ensure cityName exists
        if (!content.cityName || content.cityName.trim() === '') {
          const cityName = slugToTitle(page.slug);
          content.cityName = cityName;
          fixes.push(`Added cityName: "${cityName}"`);
          needsUpdate = true;
        }
        // Ensure citySlug exists
        if (!content.citySlug || content.citySlug.trim() === '') {
          content.citySlug = page.slug;
          fixes.push(`Added citySlug: "${page.slug}"`);
          needsUpdate = true;
        }
        // Ensure title exists
        if (!newTitle || newTitle.trim() === '') {
          newTitle = `SOC 2 Auditors in ${content.cityName || slugToTitle(page.slug)}`;
          fixes.push(`Added title`);
          needsUpdate = true;
        }
        // Ensure meta description exists
        if (!newMetaDesc || newMetaDesc.trim() === '') {
          newMetaDesc = `Find top SOC 2 auditors in ${content.cityName || slugToTitle(page.slug)}. Compare firms by pricing, expertise, and reviews.`;
          fixes.push(`Added meta_description`);
          needsUpdate = true;
        }
        // Add default heroDescription if missing
        if (!content.heroDescription || content.heroDescription.trim() === '') {
          content.heroDescription = `Find trusted SOC 2 auditors in ${content.cityName || slugToTitle(page.slug)}. Compare local firms by pricing, experience, and specialization.`;
          fixes.push(`Added heroDescription`);
          needsUpdate = true;
        }
        // Add default industries if missing
        if (!content.industries || !Array.isArray(content.industries) || content.industries.length === 0) {
          content.industries = ['Technology', 'Healthcare', 'Financial Services', 'SaaS'];
          fixes.push(`Added default industries`);
          needsUpdate = true;
        }
        break;

      case 'role':
        // Always ensure roleName exists
        if (!content.roleName || content.roleName.trim() === '') {
          const roleName = slugToTitle(page.slug, 'ai-governance-for-');
          content.roleName = roleName;
          fixes.push(`Added roleName: "${roleName}"`);
          needsUpdate = true;
        }
        // Ensure page-level title exists
        const effectiveRoleName = content.roleName || slugToTitle(page.slug, 'ai-governance-for-');
        if (!newTitle || newTitle.trim() === '') {
          newTitle = `SOC 2 Compliance Guide for ${effectiveRoleName}s`;
          fixes.push(`Added page title`);
          needsUpdate = true;
        }
        // Ensure content title exists
        if (!content.title || content.title.trim() === '') {
          content.title = `SOC 2 Compliance Guide for ${effectiveRoleName}s`;
          fixes.push(`Added content title`);
          needsUpdate = true;
        }
        // Ensure meta description exists
        if (!newMetaDesc || newMetaDesc.trim() === '') {
          const roleName = content.roleName || slugToTitle(page.slug, 'ai-governance-for-');
          newMetaDesc = `Comprehensive SOC 2 compliance guide for ${roleName}s. Learn key priorities, timelines, and best practices.`;
          fixes.push(`Added meta_description`);
          needsUpdate = true;
        }
        // Add default heroDescription if missing
        if (!content.heroDescription || content.heroDescription.trim() === '') {
          const roleName = content.roleName || slugToTitle(page.slug, 'ai-governance-for-');
          content.heroDescription = `A comprehensive guide for ${roleName}s on navigating SOC 2 compliance requirements and best practices.`;
          fixes.push(`Added heroDescription`);
          needsUpdate = true;
        }
        break;

      case 'compliance':
        if (!content.title || content.title.trim() === '') {
          const title = slugToTitle(page.slug);
          content.title = title;
          fixes.push(`Added content title: "${title}"`);
          needsUpdate = true;
        }
        if (!newTitle) {
          newTitle = content.title || slugToTitle(page.slug);
          fixes.push(`Added page title`);
          needsUpdate = true;
        }
        break;

      case 'comparison':
      case 'framework_comparison':
        if (!content.title || content.title.trim() === '') {
          const title = slugToTitle(page.slug);
          content.title = title;
          fixes.push(`Added content title: "${title}"`);
          needsUpdate = true;
        }
        break;

      case 'use_case':
      case 'use-case':
        if (!content.title || content.title.trim() === '') {
          const title = slugToTitle(page.slug);
          content.title = title;
          fixes.push(`Added content title: "${title}"`);
          needsUpdate = true;
        }
        break;

      case 'industry':
        if (!content.industryName || content.industryName.trim() === '') {
          const industryName = slugToTitle(page.slug);
          content.industryName = industryName;
          fixes.push(`Added industryName: "${industryName}"`);
          needsUpdate = true;
        }
        break;

      case 'matrix':
        // Matrix pages are cost/role matrices
        if (!content.title || content.title.trim() === '') {
          const title = slugToTitle(page.slug);
          content.title = title;
          fixes.push(`Added content title: "${title}"`);
          needsUpdate = true;
        }
        if (!newTitle || newTitle.trim() === '') {
          newTitle = content.title || slugToTitle(page.slug);
          fixes.push(`Added page title`);
          needsUpdate = true;
        }
        break;

      case 'industry_guide':
        // Industry guide pages
        if (!content.title || content.title.trim() === '') {
          const title = slugToTitle(page.slug);
          content.title = title;
          fixes.push(`Added content title: "${title}"`);
          needsUpdate = true;
        }
        if (!newTitle || newTitle.trim() === '') {
          newTitle = content.title || slugToTitle(page.slug);
          fixes.push(`Added page title`);
          needsUpdate = true;
        }
        break;
    }

    // Apply updates if needed
    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from('pseo_pages')
        .update({
          content_json: content,
          title: newTitle,
          meta_description: newMetaDesc,
          updated_at: new Date().toISOString(),
        })
        .eq('id', page.id);

      if (updateError) {
        results.push({
          slug: page.slug,
          category: page.category,
          fixes,
          success: false,
          error: updateError.message,
        });
      } else {
        results.push({
          slug: page.slug,
          category: page.category,
          fixes,
          success: true,
        });
      }
    }
  }

  // Print results
  console.log('═'.repeat(80));
  console.log('FIX RESULTS');
  console.log('═'.repeat(80));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n📊 Summary: ${results.length} pages updated`);
  console.log(`   ✅ Successful: ${successful.length}`);
  console.log(`   ❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\n' + '─'.repeat(80));
    console.log('✅ SUCCESSFULLY FIXED PAGES');
    console.log('─'.repeat(80));
    
    // Group by category for cleaner output
    const byCategory: Record<string, FixResult[]> = {};
    for (const result of successful) {
      if (!byCategory[result.category]) {
        byCategory[result.category] = [];
      }
      byCategory[result.category].push(result);
    }

    for (const [category, categoryResults] of Object.entries(byCategory)) {
      console.log(`\n📁 ${category} (${categoryResults.length} pages):`);
      categoryResults.slice(0, 5).forEach(r => {
        console.log(`   - ${r.slug}: ${r.fixes.join(', ')}`);
      });
      if (categoryResults.length > 5) {
        console.log(`   ... and ${categoryResults.length - 5} more`);
      }
    }
  }

  if (failed.length > 0) {
    console.log('\n' + '─'.repeat(80));
    console.log('❌ FAILED UPDATES');
    console.log('─'.repeat(80));
    failed.forEach(r => {
      console.log(`- ${r.slug}: ${r.error}`);
    });
  }

  console.log('\n✅ Fix complete!\n');
}

fixPseoContent().catch(console.error);
