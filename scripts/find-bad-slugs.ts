/**
 * Find pSEO pages with problematic slugs
 */
import { getSupabaseAdmin } from '../lib/supabase';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function findBadSlugs() {
  const supabase = getSupabaseAdmin();
  
  // Find pages with "/" in slug
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('id, slug, category, title, content_json')
    .like('slug', '%/%');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('═'.repeat(80));
  console.log('PAGES WITH "/" IN SLUG (potential routing issues)');
  console.log('═'.repeat(80));
  console.log(`\nFound ${data?.length || 0} pages:\n`);

  data?.forEach((p, i) => {
    console.log(`${i + 1}. [${p.category}] ${p.slug}`);
    console.log(`   ID: ${p.id}`);
    console.log(`   Title: ${p.title || '(none)'}`);
    
    // Suggest fix
    const fixedSlug = p.slug.replace(/\//g, '-');
    console.log(`   Suggested fix: ${fixedSlug}`);
    console.log('');
  });

  if (data && data.length > 0) {
    console.log('─'.repeat(80));
    console.log('SQL TO DELETE THESE PAGES:');
    console.log('─'.repeat(80));
    const ids = data.map(p => `'${p.id}'`).join(', ');
    console.log(`\nDELETE FROM pseo_pages WHERE id IN (${ids});\n`);

    console.log('─'.repeat(80));
    console.log('SQL TO FIX SLUGS (if pages are valid):');
    console.log('─'.repeat(80));
    data.forEach(p => {
      const fixedSlug = p.slug.replace(/\//g, '-');
      console.log(`UPDATE pseo_pages SET slug = '${fixedSlug}' WHERE id = '${p.id}';`);
    });
  }
}

findBadSlugs().catch(console.error);
