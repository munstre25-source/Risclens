import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log(`Checking project: ${supabaseUrl}`);
  
  // Try to get a single lead to see columns
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching leads:', error);
    if (error.code === 'PGRST116') {
      console.log('Leads table might be empty or missing.');
    }
  } else {
    console.log('Successfully fetched lead. Columns:');
    if (data && data.length > 0) {
      console.log(Object.keys(data[0]));
      const hasContentPageId = 'content_page_id' in data[0];
      console.log(`Has content_page_id: ${hasContentPageId}`);
    } else {
      console.log('Table is empty. Cannot determine columns via select *.');
      
      // Try to insert a dummy lead with content_page_id to see if it fails
      console.log('Testing insert with content_page_id...');
      const { error: insertError } = await supabase
        .from('leads')
        .insert([{ 
          email: 'test-schema@example.com',
          content_page_id: 'test'
        }]);
      
      if (insertError) {
        console.log(`Insert failed: ${insertError.message}`);
        if (insertError.message.includes('content_page_id')) {
          console.log('CONFIRMED: content_page_id column is MISSING.');
        }
      } else {
        console.log('Insert succeeded! content_page_id column EXISTS.');
        // Clean up
        await supabase.from('leads').delete().eq('email', 'test-schema@example.com');
      }
    }
  }
}

run();
