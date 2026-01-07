import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '../lib/supabase';

// =============================================================================
// DATA SYNC SCRIPT: LOCAL -> PRODUCTION
// =============================================================================
// This script copies core data from your local Supabase project to production.
//
// Usage:
//   1. Ensure PROD_SUPABASE_SERVICE_ROLE_KEY is set in .env.local
//   2. Run: npx tsx scripts/sync-to-prod.ts
// =============================================================================

async function sync() {
  const localUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const localKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const prodUrl = process.env.PROD_NEXT_PUBLIC_SUPABASE_URL;
  const prodKey = process.env.PROD_SUPABASE_SERVICE_ROLE_KEY;

  if (!localUrl || !localKey || !prodUrl || !prodKey || prodKey === 'your_production_service_role_key_here') {
    console.error('❌ Error: Missing configuration.');
    console.log('Please ensure the following are set in .env.local:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL');
    console.log('- SUPABASE_SERVICE_ROLE_KEY');
    console.log('- PROD_NEXT_PUBLIC_SUPABASE_URL');
    console.log('- PROD_SUPABASE_SERVICE_ROLE_KEY (must be updated from placeholder)');
    process.exit(1);
  }

  const local = getSupabaseAdmin();
  const prod = createClient(prodUrl, prodKey);

  const tables = ['system_settings', 'company_signals', 'leads', 'AB_VARIANTS', 'KEYWORDS', 'buyers'];

  console.log('🚀 Starting Data Sync...\n');

  for (const table of tables) {
    console.log(`⏳ Syncing table: ${table}...`);
    
    // 1. Fetch from local
    const { data: localData, error: fetchError } = await local.from(table).select('*');
    if (fetchError) {
      console.error(`   ❌ Failed to fetch from local ${table}:`, fetchError.message);
      continue;
    }

    if (!localData || localData.length === 0) {
      console.log(`   ℹ️ No data found in local ${table}. skipping.`);
      continue;
    }

    console.log(`   📦 Found ${localData.length} rows.`);

    // 2. Insert into production (upsert by ID)
    const { error: insertError } = await prod.from(table).upsert(localData);
    if (insertError) {
      console.error(`   ❌ Failed to insert into production ${table}:`, insertError.message);
      if (insertError.message.includes('ECONNREFUSED')) {
        console.log('   💡 Tip: This environment may not support IPv6 connections to Supabase.');
      }
    } else {
      console.log(`   ✅ Successfully synced ${table}.`);
    }
    console.log('');
  }

  console.log('🎉 Sync process finished.');
}

sync().catch(err => {
  console.error('💥 Fatal error during sync:', err);
  process.exit(1);
});
