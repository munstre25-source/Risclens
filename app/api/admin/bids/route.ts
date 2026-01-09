import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/supabase';
import { z } from 'zod';

const bidSchema = z.object({
  lead_id: z.string().uuid(),
  auditor_email: z.string().email(),
  amount: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bidSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { lead_id, auditor_email, amount } = parsed.data;

    // 1. Find or create the auditor (buyer)
    let { data: buyer, error: buyerError } = await supabase
      .from('buyers')
      .select('id')
      .eq('contact_email', auditor_email)
      .single();

    if (buyerError && buyerError.code !== 'PGRST116') {
      throw buyerError;
    }

    if (!buyer) {
      const { data: newBuyer, error: createError } = await supabase
        .from('buyers')
        .insert({
          contact_email: auditor_email,
          name: auditor_email.split('@')[0],
          company_name: auditor_email.split('@')[1].split('.')[0].toUpperCase(),
          active: true,
          lead_types: ['soc2_readiness', 'iso42001_readiness']
        })
        .select('id')
        .single();

      if (createError) throw createError;
      buyer = newBuyer;
    }

    // 2. Insert the bid
    const { error: bidError } = await supabase
      .from('bids')
      .insert({
        lead_id,
        buyer_id: buyer.id,
        amount,
        status: 'pending'
      });

    if (bidError) throw bidError;

    // 3. Log event
    await logAuditEvent('lead_bid_placed', {
      lead_id,
      buyer_id: buyer.id,
      amount,
      auditor_email
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Bid API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
