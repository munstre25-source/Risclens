
import { getSupabaseAdmin } from './lib/supabase';

async function check() {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from('company_signals')
    .select('*', { count: 'exact', head: true });
  
  const { count: indexableCount } = await supabase
    .from('company_signals')
    .select('*', { count: 'exact', head: true })
    .eq('indexable', true);

  console.log('Total companies:', count);
  console.log('Indexable companies:', indexableCount);
  if (error) console.error('Error:', error);
}

check();
