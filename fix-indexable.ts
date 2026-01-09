
import { getSupabaseAdmin } from './lib/supabase';

async function fix() {
  const supabase = getSupabaseAdmin();
  console.log('Fetching all companies...');
  const { data: companies, error: fetchError } = await supabase
    .from('company_signals')
    .select('id, name, indexable');
  
  if (fetchError) {
    console.error('Fetch error:', fetchError);
    return;
  }

  console.log(`Found ${companies?.length} companies.`);
  
  if (companies && companies.length > 0) {
    console.log('Updating all to indexable=true...');
    const { error: updateError } = await supabase
      .from('company_signals')
      .update({ indexable: true })
      .filter('id', 'neq', '00000000-0000-0000-0000-000000000000'); // Dummy filter to update all
    
    if (updateError) {
      console.error('Update error:', updateError);
    } else {
      console.log('Successfully updated all companies to indexable=true.');
    }
  }
}

fix();
