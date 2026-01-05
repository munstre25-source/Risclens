import { getSupabaseAdmin } from './supabase';

/**
 * Enrichment service to fetch additional company data.
 * In a real-world scenario, you would call Clearbit, Apollo, or similar APIs.
 */
export async function enrichLead(leadId: string) {
  const supabase = getSupabaseAdmin();

  // 1. Fetch the lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead || !lead.company_name) return;

  try {
    console.log(`Enriching lead ${leadId} for company: ${lead.company_name}`);

    // SIMULATION: In reality, call an external API here
    // const response = await fetch(`https://api.clearbit.com/v1/companies/find?name=${lead.company_name}`, { ... });
    
    // Mocking enriched data
    const enrichedData = {
      provider: 'mock_enrichment_v1',
      raw_data: {
        company_name: lead.company_name,
        estimated_revenue: '1M-5M',
        funding: 'Series A',
        tech_stack: ['AWS', 'React', 'Node.js', 'PostgreSQL'],
        linkedin_url: `https://www.linkedin.com/company/${lead.company_name.toLowerCase().replace(/\s/g, '-')}`,
      },
      enriched_fields: {
        employee_count_range: lead.num_employees || 25,
        hq_location: 'San Francisco, CA',
        industry_refined: lead.industry || 'Technology',
      }
    };

    // 2. Save enrichment data
    await supabase.from('lead_enrichment').insert({
      lead_id: leadId,
      provider: enrichedData.provider,
      raw_data: enrichedData.raw_data,
      enriched_fields: enrichedData.enriched_fields,
    });

    // 3. Update the lead with refined data if better than what we have
    await supabase
      .from('leads')
      .update({
        context_note: `${lead.context_note || ''}\n\n[Enrichment] Funding: ${enrichedData.raw_data.funding}, Tech: ${enrichedData.raw_data.tech_stack.join(', ')}`,
      })
      .eq('id', leadId);

    console.log(`Enrichment complete for lead ${leadId}`);
  } catch (err) {
    console.error('Enrichment error:', err);
  }
}
