
import { getSupabaseAdmin } from '../lib/supabase';

async function check() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('company_signals').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data found:', data);
  }
}

check();
