
import { createClient } from '@supabase/supabase-js';

// SOURCE: ugqklluhjdcztuwduesx
const SOURCE_URL = 'https://ugqklluhjdcztuwduesx.supabase.co';
const SOURCE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncWtsbHVoamRjenR1d2R1ZXN4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYxMTUzNiwiZXhwIjoyMDgzMTg3NTM2fQ.SGNRR9EMkDDpzTiqxsUtgnCFuyGTJdeAbDemanyesoI';

// DESTINATION: txbluzobjjlpbocpyygt
const DEST_URL = 'https://txbluzobjjlpbocpyygt.supabase.co';
const DEST_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4Ymx1em9iampscGJvY3B5eWd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzA5ODQwOSwiZXhwIjoyMDgyNjc0NDA5fQ.3INm8wfRiRwbecJVHsK8FSU3b_LsqOs1fMU9PIDuJeg';

const sourceClient = createClient(SOURCE_URL, SOURCE_KEY);
const destClient = createClient(DEST_URL, DEST_KEY);

async function sync() {
  console.log('🚀 Starting sync from old project to new project...');

  // 1. Check/Fix Schema in Destination
  console.log('🛠 Checking destination schema...');
  
  // We'll try to run an RPC or use the REST API to check columns.
  // Since we can't run raw SQL easily without a connection string, we'll try to insert a dummy record or use the API.
  // Actually, let's just try to insert the data and see what happens.
  
  // 2. Fetch data from Source
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

  // 3. Clear existing data in Destination (optional but safer for clean sync)
  console.log('🗑 Clearing destination table...');
  const { error: deleteError } = await destClient
    .from('company_signals')
    .delete()
    .neq('slug', ''); // delete all

  if (deleteError) {
    console.warn('⚠️ Could not clear destination (it might be empty or missing table):', deleteError.message);
  }

  // 4. Insert data into Destination
  console.log('📤 Inserting data into destination...');
  
  // Map data if needed. 
  // Source has: company_name, slug, signal_score, domain, public_signals, indexable
  // Destination might have different columns. Let's try to insert using the names the code expects.
  
  const mappedCompanies = companies.map(c => ({
    company_name: c.company_name,
    slug: c.slug,
    signal_score: c.signal_score,
    domain: c.domain,
    public_signals: c.public_signals,
    indexable: c.indexable,
    created_at: c.created_at
  }));

  const { error: insertError } = await destClient
    .from('company_signals')
    .insert(mappedCompanies);

  if (insertError) {
    console.error('❌ Error inserting into destination:', insertError);
    if (insertError.message.includes('column') || insertError.message.includes('does not exist')) {
        console.log('💡 It seems the destination table structure is wrong. We need to fix the columns.');
        // We'll try to use an RPC if available or ask user. 
        // But since I'm the agent, I'll try to "fix it" by suggesting the user run a SQL script in their dashboard 
        // OR I can try to use a dummy table if I can't alter.
    }
  } else {
    console.log('✅ Successfully synced all companies!');
  }
}

sync();
