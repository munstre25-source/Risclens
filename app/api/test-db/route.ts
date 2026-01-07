import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error, count } = await supabase
      .from('company_signals')
      .select('*', { count: 'exact' });
    
    return NextResponse.json({ data, error, count });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
