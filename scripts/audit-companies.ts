import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { extractSignalsForCompany, normalizeDomain } from '../lib/intelligence';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

console.log('CWD:', process.cwd());
console.log('Env path:', path.join(__dirname, '..', '.env.local'));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  console.log('Starting audit of all companies...');
  
  const { data: companies, error } = await supabase
    .from('company_signals')
    .select('id, domain, name, slug')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching companies:', error);
    return;
  }

  console.log(`Found ${companies.length} companies to audit.`);

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    console.log(`[${i + 1}/${companies.length}] Auditing ${company.name} (${company.domain})...`);

    try {
      const domain = normalizeDomain(company.domain);
      const extraction = await extractSignalsForCompany(domain, OPENAI_API_KEY!);

      const updateData: any = {
        last_run_status: extraction.status,
        last_run_error: null,
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (extraction.status === 'success') {
        updateData.signal_score = extraction.final_score;
        updateData.markers = extraction.markers;
        updateData.public_signals = extraction.markers;
        updateData.signals = extraction.markers;
        updateData.score_breakdown = extraction.score_breakdown;
        updateData.ai_summary = extraction.ai_summary;
        updateData.detected_tools = extraction.detected_tools;
        updateData.detected_certifications = extraction.detected_certifications;
        updateData.indexable = extraction.indexable;
      }

      const { error: updateError } = await supabase
        .from('company_signals')
        .update(updateData)
        .eq('id', company.id);

      if (updateError) {
        console.error(`Error updating ${company.name}:`, updateError);
      } else {
        console.log(`Successfully updated ${company.name}. Score: ${extraction.final_score}`);
      }
    } catch (err: any) {
      console.error(`Failed to audit ${company.name}:`, err.message);
      await supabase
        .from('company_signals')
        .update({
          last_run_status: 'error',
          last_run_error: err.message,
          last_run_at: new Date().toISOString(),
        })
        .eq('id', company.id);
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('Audit completed!');
}

main().catch(console.error);
