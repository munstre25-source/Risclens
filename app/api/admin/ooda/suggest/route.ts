import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/supabase-auth';

export async function POST(request: NextRequest) {
  const authorized = await requireAdmin(request);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { lead_id } = await request.json();
    const supabase = getSupabaseAdmin();

    // Fetch lead details
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // OODA Logic: Observe, Orient, Decide, Act
    let suggestions = [];

    // Observe & Orient
    if (lead.lead_score >= 8) {
      suggestions.push({
        priority: 'high',
        action: 'Immediate Outreach',
        reason: 'High-intent score detected. Enterprise readiness verified.',
        logic: 'Observe: Lead score > 8. Orient: This is a whale. Act: Manual personal email.'
      });
    }

    if (lead.readiness_score < 40) {
      suggestions.push({
        priority: 'medium',
        action: 'Send Readiness Checklist',
        reason: 'Lead is in early stages of compliance.',
        logic: 'Observe: Readiness < 40%. Orient: Educational gap. Act: Drip campaign step 1.'
      });
    }

    if (lead.keep_or_sell === 'sell' && !lead.sold) {
      suggestions.push({
        priority: 'high',
        action: 'Promote to Auction',
        reason: 'Lead is designated for sale but has no active bids.',
        logic: 'Observe: KeepOrSell=sell. Orient: Idle inventory. Act: Push to Auditor Portal top-tier.'
      });
    }

    if (lead.industry === 'saas' && lead.num_employees > 50) {
      suggestions.push({
        priority: 'medium',
        action: 'Pitch "Multi-Framework" Roadmap',
        reason: 'Mid-sized SaaS firms often need ISO 27001 alongside SOC 2.',
        logic: 'Observe: Industry=SaaS, Size>50. Orient: Complexity growth. Act: Upsell pitch.'
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        priority: 'low',
        action: 'Monitor for Signals',
        reason: 'No immediate red/green flags.',
        logic: 'Observe: Default state. Orient: Steady state. Act: Routine follow-up in 7 days.'
      });
    }

    return NextResponse.json({ success: true, suggestions });
  } catch (error) {
    console.error('OODA Suggest error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
