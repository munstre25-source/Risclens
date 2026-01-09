import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { companySlug, email } = await request.json();

    if (!companySlug || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Check if company exists
    const { data: company, error: companyError } = await supabase
      .from('company_signals')
      .select('name')
      .eq('slug', companySlug)
      .single();

    if (companyError || !company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Insert claim
    const { error: claimError } = await supabase
      .from('company_claims')
      .insert({
        company_slug: companySlug,
        requester_email: email,
        status: 'pending'
      });

    if (claimError) {
      console.error('Error inserting claim:', claimError);
      return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 });
    }

    // In a real app, we would send an email here to the requester or admin

    return NextResponse.json({ success: true, message: 'Claim submitted' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
