import { getSupabaseAdmin } from './supabase';

/**
 * Enrichment service to fetch additional company data using AI.
 */
export async function enrichLead(leadId: string) {
  const supabase = getSupabaseAdmin();
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    console.warn('Missing OPENAI_API_KEY for enrichment');
    return;
  }

  // 1. Fetch the lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead || !lead.company_name) return;

  try {
    console.log(`Enriching lead ${leadId} for company: ${lead.company_name}`);

    const prompt = `
      You are an expert business intelligence agent. Provide enriched data for the following company:
      Company Name: ${lead.company_name}
      Industry: ${lead.industry || 'Unknown'}
      Email Domain: ${lead.email?.split('@')[1] || 'Unknown'}

      Provide the following details in JSON format:
      - estimated_revenue: (e.g., "$1M-5M", "$10M-50M", "Enterprise")
      - funding_stage: (e.g., "Seed", "Series A", "Public", "Bootstrapped")
      - tech_stack: Array of common technologies they likely use (e.g., ["AWS", "React", "Salesforce"])
      - company_description: A 1-sentence description of what they do.
      - hq_location: City, State/Country.
      - employee_count_estimate: A number or range.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: 'You are a business research assistant.' }, { role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const result = await response.json();
    const enriched = JSON.parse(result.choices[0].message.content);
    
    const enrichedData = {
      provider: 'openai_gpt4o_v1',
      raw_data: enriched,
      enriched_fields: {
        employee_count_range: enriched.employee_count_estimate,
        hq_location: enriched.hq_location,
        industry_refined: lead.industry || 'Technology',
        description: enriched.company_description
      }
    };

    // 2. Save enrichment data
    await supabase.from('lead_enrichment').insert({
      lead_id: leadId,
      provider: enrichedData.provider,
      raw_data: enrichedData.raw_data,
      enriched_fields: enrichedData.enriched_fields,
    });

    // 3. Update the lead with refined data
    await supabase
      .from('leads')
      .update({
        context_note: `${lead.context_note || ''}\n\n[AI Enrichment] Funding: ${enriched.funding_stage}, Rev: ${enriched.estimated_revenue}, Tech: ${enriched.tech_stack?.join(', ')}`,
      })
      .eq('id', leadId);

    console.log(`Enrichment complete for lead ${leadId}`);
  } catch (err) {
    console.error('Enrichment error:', err);
  }
}
