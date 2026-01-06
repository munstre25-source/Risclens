import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Missing Supabase configuration' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const leadId = params.id;

  // 1. Fetch Lead
  const { data: lead, error: leadError } = await supabase
    .from('SOC2_Leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (leadError || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  // 2. Fetch Active Buyers
  const { data: buyers, error: buyersError } = await supabase
    .from('buyers')
    .select('*')
    .eq('active', true);

  if (buyersError) {
    return NextResponse.json({ error: buyersError.message }, { status: 500 });
  }

  // 3. Match Logic
  const matches = buyers.map(buyer => {
    let score = 0;
    const reasons: string[] = [];

    // Check lead type (default to soc2 if not specified)
    const leadType = lead.industry === 'pentest' ? 'pentest' : 'soc2';
    if (buyer.lead_types && buyer.lead_types.includes(leadType)) {
      score += 40;
      reasons.push(`Matches buyer's preferred lead type (${leadType})`);
    }

    // Check score
    if (lead.lead_score >= (buyer.min_score || 0)) {
      score += 30;
      reasons.push(`Lead score (${lead.lead_score}) meets buyer's minimum (${buyer.min_score})`);
    }

    // Check Industry match (bonus)
    if (buyer.company_name?.toLowerCase().includes(lead.industry.toLowerCase())) {
      score += 20;
      reasons.push(`Strong industry alignment with ${lead.industry}`);
    }

    // Scale score to 100
    const finalScore = Math.min(score, 100);

    return {
      buyer_id: buyer.id,
      buyer_name: buyer.name,
      company_name: buyer.company_name,
      match_score: finalScore,
      reasons,
      max_price: buyer.max_price_per_lead
    };
  }).sort((a, b) => b.match_score - a.match_score);

  return NextResponse.json({
    lead_id: leadId,
    matches: matches.slice(0, 3) // Return top 3
  });
}
