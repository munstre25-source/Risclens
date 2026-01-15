/**
 * Submit URLs to IndexNow after deployment
 * Run: npx tsx scripts/submit-indexnow.ts
 * 
 * This notifies search engines about new/updated pages for faster indexing
 */

import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const BASE_URL = 'https://risclens.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'risclens-indexnow-key-2026';

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
];

async function getAllUrls(): Promise<string[]> {
  const urls: string[] = [];
  
  // Priority pages - submit these first
  const priorityPaths = [
    '/',
    '/soc-2-readiness-index',
    '/soc-2-cost',
    '/soc-2-timeline',
    '/soc-2',
    '/iso-42001-calculator',
    '/ai-governance-readiness-index',
    '/compliance-roi-calculator',
    '/auditor-match',
    '/penetration-testing',
    '/vendor-risk-assessment',
    '/compare',
    '/tools',
  ];
  
  urls.push(...priorityPaths.map(p => `${BASE_URL}${p}`));

  // Get dynamic URLs from Supabase
  try {
    const supabase = getSupabaseAdmin();
    
    const [
      { data: companies },
      { data: pseoPages },
      { data: frameworks },
      { data: decisions },
      { data: industries },
      { data: locations }
    ] = await Promise.all([
      supabase.from('company_signals').select('slug').eq('indexable', true),
      supabase.from('pseo_pages').select('slug, category, framework:pseo_frameworks(slug)'),
      supabase.from('pseo_frameworks').select('slug'),
      supabase.from('pseo_decision_types').select('slug'),
      supabase.from('pseo_industries').select('slug'),
      supabase.from('pseo_locations').select('slug')
    ]);

    // Company directory pages
    companies?.forEach(c => urls.push(`${BASE_URL}/compliance/directory/${c.slug}`));
    
    // Location pages
    locations?.forEach(l => urls.push(`${BASE_URL}/auditor-directory/${l.slug}`));

    // pSEO pages by category
    pseoPages?.forEach(p => {
      if (p.slug.includes('/')) return;
      const frameworkSlug = (p.framework as any)?.slug;
      
      switch (p.category) {
        case 'pricing': urls.push(`${BASE_URL}/pricing/${p.slug}`); break;
        case 'alternatives': urls.push(`${BASE_URL}/compare/${p.slug}`); break;
        case 'industry': urls.push(`${BASE_URL}/soc-2/industries/${p.slug}`); break;
        case 'compliance':
          if (['soc-2', 'iso-27001', 'pci-dss', 'hipaa', 'gdpr'].includes(frameworkSlug)) {
            urls.push(`${BASE_URL}/compliance/${frameworkSlug}/${p.slug}`);
          } else {
            urls.push(`${BASE_URL}/ai-governance/${p.slug}`);
          }
          break;
      }
    });

    // Matrix pages: [framework]/[decision]/[industry]
    const matrixFrameworks = ['soc-2', 'iso-27001', 'hipaa', 'gdpr', 'pci-dss'];
    if (frameworks && decisions && industries) {
      for (const f of frameworks) {
        if (!matrixFrameworks.includes(f.slug)) continue;
        for (const d of decisions) {
          for (const i of industries) {
            urls.push(`${BASE_URL}/${f.slug}/${d.slug}/${i.slug}`);
          }
        }
      }
    }

  } catch (err) {
    console.error('Error fetching dynamic URLs:', err);
  }

  return [...new Set(urls)]; // Remove duplicates
}

async function submitBatch(urls: string[]): Promise<void> {
  const payload = {
    host: 'risclens.com',
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log(`  ${endpoint}: ${response.status} ${response.ok ? '✓' : '✗'}`);
    } catch (err) {
      console.error(`  ${endpoint}: FAILED`, err);
    }
  }
}

async function run() {
  console.log('🚀 IndexNow Submission Script\n');
  
  console.log('Collecting URLs...');
  const allUrls = await getAllUrls();
  console.log(`Found ${allUrls.length} URLs to submit\n`);

  // Submit in batches of 10,000 (IndexNow limit)
  const batchSize = 10000;
  const batches = Math.ceil(allUrls.length / batchSize);

  for (let i = 0; i < batches; i++) {
    const start = i * batchSize;
    const end = Math.min(start + batchSize, allUrls.length);
    const batch = allUrls.slice(start, end);
    
    console.log(`Submitting batch ${i + 1}/${batches} (${batch.length} URLs)...`);
    await submitBatch(batch);
    
    // Rate limit between batches
    if (i < batches - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n✅ Done! URLs submitted to IndexNow endpoints.');
  console.log('Search engines will begin crawling within 24-48 hours.');
}

run().catch(console.error);
