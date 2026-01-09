
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://txbluzobjjlpbocpyygt.supabase.co';
const supabaseKey = 'sb_publishable_MEe1z8yUzN5QNIGjY0qnNA_mxqnzg3k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { count, error } = await supabase
    .from('company_signals')
    .select('*', { count: 'exact', head: true })
    .eq('indexable', true);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Indexable companies count:', count);
  }
}

check();
