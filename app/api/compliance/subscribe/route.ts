import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { companySlug, email, industry } = await request.json();

    if (!email || (!companySlug && !industry)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Insert subscription
    const { error: subError } = await supabase
      .from('signal_subscriptions')
      .upsert({
        email,
        company_slug: companySlug || null,
        industry: industry || null,
        is_active: true
      }, { onConflict: 'email, company_slug, industry' });

    if (subError) {
      console.error('Error inserting subscription:', subError);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
