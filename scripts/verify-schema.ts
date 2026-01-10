
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function verifySchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(`Checking project: ${supabaseUrl}`);

  // We can't easily check columns via JS client without a raw query or RPC
  // but we can try to insert/select and see if it fails
  const { data, error } = await supabase
    .from('leads')
    .select('content_page_id')
    .limit(1);

  if (error) {
    if (error.message.includes('column "content_page_id" does not exist')) {
      console.log('COLUMN_MISSING');
    } else {
      console.error('Error checking schema:', error.message);
    }
  } else {
    console.log('COLUMN_EXISTS');
  }
}

verifySchema();
