import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  try {
    const targets = ['SOC2_Leads', 'REVENUE_EVENTS'];
    for (const table of targets) {
      const { error } = await supabase.from(table).delete().eq('is_test', true);
      if (error) {
        console.error(`Failed to delete test data from ${table}:`, error);
        return NextResponse.json({ error: `Failed to delete test data from ${table}` }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to clear test data:', err);
    return NextResponse.json({ error: 'Failed to clear test data' }, { status: 500 });
  }
}
