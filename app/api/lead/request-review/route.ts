import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, logAuditEvent } from '@/lib/supabase';
import { isValidUUID } from '@/lib/validation';

const REVIEW_TYPES = ['auditor_intro', 'gap_review'] as const;
type ReviewType = (typeof REVIEW_TYPES)[number];

export async function POST(request: NextRequest) {
  try {
    const { lead_id, review_type, email } = await request.json();

    if (!lead_id || !isValidUUID(lead_id)) {
      return NextResponse.json({ success: false, error: 'Valid lead_id is required' }, { status: 400 });
    }

    if (!REVIEW_TYPES.includes(review_type)) {
      return NextResponse.json({ success: false, error: 'Invalid review type' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const updates: Record<string, unknown> = {
      lead_status: 'requested_review',
      status: 'requested_review',
      context_note: review_type === 'auditor_intro' ? 'Requested auditor introduction' : 'Requested gap review',
    };

    if (email && typeof email === 'string' && email.includes('@')) {
      updates.email = email.trim();
    }

    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', lead_id);

    if (error) {
      console.error('Failed to update lead for review:', error.message);
      return NextResponse.json({ success: false, error: 'update_failed' }, { status: 500 });
    }

    await logAuditEvent('lead_review_requested', {
      lead_id,
      review_type,
      has_email: !!updates.email,
      timestamp: new Date().toISOString(),
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('request-review error:', error);
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 });
  }
}
