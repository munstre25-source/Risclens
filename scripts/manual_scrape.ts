import { extractSignalsForCompany } from '../lib/intelligence';
import { getSupabaseAdmin } from '../lib/supabase';
import { normalizeDomain } from '../lib/intelligence';

async function run() {
  const supabase = getSupabaseAdmin();
  const openaiApiKey = process.env.OPENAI_API_KEY || 'dummy';
  
  const domains = [
    'stripe.com', 'vercel.com', 'auth0.com'
  ];

  console.log(`Starting manual scrape for ${domains.length} companies...`);

  for (const domain of domains) {
    try {
      console.log(`Scraping ${domain}...`);
      const extraction = await extractSignalsForCompany(domain, openaiApiKey);
      
      const slug = domain.split('.')[0];
      const updateData: any = {
        last_run_status: extraction.status,
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        signal_score: extraction.final_score,
        markers: extraction.markers,
        public_signals: extraction.markers,
        signals: extraction.markers,
        score_breakdown: extraction.score_breakdown,
        ai_summary: extraction.ai_summary,
        detected_tools: extraction.detected_tools,
        detected_certifications: extraction.detected_certifications,
        indexable: extraction.final_score >= 30
      };

      const { error } = await supabase
        .from('company_signals')
        .update(updateData)
        .eq('domain', domain);

      if (error) {
        console.error(`Failed to update ${domain}:`, error.message);
      } else {
        console.log(`Successfully updated ${domain} with score ${extraction.final_score}`);
      }
    } catch (err: any) {
      console.error(`Error scraping ${domain}:`, err.message);
    }
  }
}

run();
