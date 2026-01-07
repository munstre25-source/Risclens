import { getSupabaseAdmin } from '../lib/supabase';

// SOURCE: External project (ugqklluhjdcztuwduesx)
const SOURCE_URL = process.env.SOURCE_SUPABASE_URL || 'https://ugqklluhjdcztuwduesx.supabase.co';
const SOURCE_KEY = process.env.SOURCE_SUPABASE_SERVICE_ROLE_KEY;

async function sync() {
  console.log('🚀 Starting sync from source project to current project...');

  if (!SOURCE_KEY) {
    console.error('Missing SOURCE_SUPABASE_SERVICE_ROLE_KEY environment variable.');
    process.exit(1);
  }

  const { createClient } = await import('@supabase/supabase-js');
  const sourceClient = createClient(SOURCE_URL, SOURCE_KEY);
  const destClient = getSupabaseAdmin();

  // 1. Fetch data from Source
  console.log('📥 Fetching data from source...');
  const { data: companies, error: fetchError } = await sourceClient
    .from('company_signals')
    .select('*');

  if (fetchError) {
    console.error('❌ Error fetching from source:', fetchError);
    return;
  }

  console.log(`✅ Fetched ${companies?.length || 0} companies.`);

  if (!companies || companies.length === 0) {
    console.log('⚠️ No data to sync.');
    return;
  }

  // 2. Clear existing data in Destination
  console.log('🗑 Clearing destination table...');
  const { error: deleteError } = await destClient
    .from('company_signals')
    .delete()
    .neq('slug', ''); 

  if (deleteError) {
    console.warn('⚠️ Could not clear destination:', deleteError.message);
  }

  // 3. Insert data into Destination
  console.log('📤 Inserting data into destination...');
  
  const mappedCompanies = companies.map(c => ({
    company_name: c.company_name,
    slug: c.slug,
    signal_score: c.signal_score,
    domain: c.domain,
    public_signals: c.public_signals,
    indexable: c.indexable,
    created_at: c.created_at,
    updated_at: c.updated_at,
    markers: c.markers,
    signals: c.signals,
    ai_summary: c.ai_summary,
    score_breakdown: c.score_breakdown,
    indexable_locked: c.indexable_locked
  }));

  const { error: insertError } = await destClient
    .from('company_signals')
    .insert(mappedCompanies);

  if (insertError) {
    console.error('❌ Error inserting into destination:', insertError);
  } else {
    console.log('✅ Successfully synced all companies!');
  }
}

sync();
