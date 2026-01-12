
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing connection to:', supabaseUrl);
console.log('Using key starting with:', supabaseAnonKey?.substring(0, 10));

const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

async function test() {
  const { data, error } = await supabase.from('compliance_tools').select('slug').limit(1);
  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connection successful! Found tool:', data);
  }
}

test();
