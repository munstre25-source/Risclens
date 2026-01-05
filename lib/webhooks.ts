import { getSupabaseAdmin } from './supabase';

export async function triggerBuyerWebhooks(leadId: string) {
  const supabase = getSupabaseAdmin();

  // 1. Fetch the lead data
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead || lead.is_partial) return;

  // 2. Find matching buyers
  // Criteria: active, matches lead_type, score >= min_score
  const { data: buyers, error: buyersError } = await supabase
    .from('buyers')
    .select('*, buyer_webhooks(*)')
    .eq('active', true)
    .contains('lead_types', [lead.lead_type])
    .lte('min_score', lead.score || 0);

  if (buyersError || !buyers || buyers.length === 0) {
    console.log('No matching buyers found for lead:', leadId);
    return;
  }

  // 3. Trigger webhooks for each matching buyer
  for (const buyer of buyers) {
    const webhooks = buyer.buyer_webhooks || [];
    for (const webhook of webhooks) {
      if (!webhook.is_active) continue;

      try {
        console.log(`Triggering webhook for buyer ${buyer.name} at ${webhook.url}`);
        
        const payload = {
          event: 'lead.created',
          lead: {
            id: lead.id,
            email: lead.email,
            company: lead.company_name,
            industry: lead.industry,
            score: lead.score,
            readiness_score: lead.readiness_score,
            estimated_cost: {
              low: lead.estimated_cost_low,
              high: lead.estimated_cost_high
            },
            num_employees: lead.num_employees,
            created_at: lead.created_at
          },
          buyer_context: {
            buyer_id: buyer.id,
            match_score: lead.score
          }
        };

        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [webhook.secret_header || 'X-Lead-Secret']: webhook.secret_value || '',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error(`Webhook failed for ${webhook.url}: ${response.statusText}`);
        } else {
          // Mark as sold if we have a real buyer match logic (simulated here)
          await supabase
            .from('leads')
            .update({ 
              sold: true, 
              buyer_email: buyer.contact_email,
              status: 'sold' 
            })
            .eq('id', lead.id);
        }
      } catch (err) {
        console.error(`Error triggering webhook for ${webhook.url}:`, err);
      }
    }
  }
}
