import { getSupabaseAdmin } from './supabase';

export interface BuyerWebhook {
  url: string;
  secret_header: string;
  secret_value: string;
}

export interface Buyer {
  id: string;
  name: string;
  contact_email: string;
  lead_types: string[];
  min_score: number;
  webhooks: BuyerWebhook[];
}

/**
 * Finds matching buyers for a lead and dispatches data to their webhooks.
 */
export async function dispatchLeadToBuyers(leadId: string) {
  const supabase = getSupabaseAdmin();

  // 1. Get the lead details
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead) {
    console.error('[Monetization] Lead not found for dispatch:', leadId, leadError);
    return;
  }

  // Only dispatch if it's NOT a test lead and NOT a partial lead
  if (lead.is_test || lead.is_partial) {
    console.log('[Monetization] Skipping dispatch for test/partial lead:', leadId);
    return;
  }

  // 2. Find matching buyers
  // Logic: Buyer is active, accepts lead_type, and lead_score >= buyer's min_score
  const { data: buyers, error: buyersError } = await supabase
    .from('buyers')
    .select(`
      id,
      name,
      lead_types,
      min_score,
      buyer_webhooks (
        url,
        secret_header,
        secret_value,
        is_active
      )
    `)
    .eq('active', true);

  if (buyersError || !buyers) {
    console.error('[Monetization] Failed to fetch buyers:', buyersError);
    return;
  }

  const matchingBuyers = buyers.filter(buyer => {
    const acceptsType = buyer.lead_types.includes(lead.lead_type) || buyer.lead_types.includes('*');
    const meetsScore = lead.lead_score >= (buyer.min_score || 0);
    return acceptsType && meetsScore;
  });

  console.log(`[Monetization] Found ${matchingBuyers.length} matching buyers for lead ${leadId}`);

  // 3. Dispatch to webhooks
  const dispatchPromises = matchingBuyers.flatMap(buyer => {
    const activeWebhooks = (buyer.buyer_webhooks as any[])?.filter(wh => wh.is_active) || [];
    
    return activeWebhooks.map(async (webhook) => {
      try {
        const response = await fetch(webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            [webhook.secret_header || 'X-Lead-Secret']: webhook.secret_value || '',
          },
          body: JSON.stringify({
            event: 'lead.created',
            timestamp: new Date().toISOString(),
            lead: {
              id: lead.id,
              name: lead.name,
              email: lead.email,
              company: lead.company_name || lead.company,
              industry: lead.industry,
              score: lead.lead_score,
              readiness_score: lead.readiness_score,
              estimated_cost_low: lead.estimated_cost_low,
              estimated_cost_high: lead.estimated_cost_high,
              num_employees: lead.num_employees,
              utm_source: lead.utm_source,
              utm_medium: lead.utm_medium,
              utm_campaign: lead.utm_campaign,
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        console.log(`[Monetization] Successfully dispatched lead ${leadId} to buyer ${buyer.name} (${webhook.url})`);
        return { buyerId: buyer.id, success: true };
      } catch (err) {
        console.error(`[Monetization] Webhook dispatch failed for buyer ${buyer.name}:`, err);
        return { buyerId: buyer.id, success: false, error: err };
      }
    });
  });

  await Promise.all(dispatchPromises);
}
