
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabase = getSupabaseAdmin();

  const { searchParams } = new URL(request.url);
  const fix = searchParams.get('fix') === 'true';

  if (fix) {
    await supabase
      .from('company_signals')
      .update({ indexable: true })
      .filter('id', 'neq', '00000000-0000-0000-0000-000000000000');
  }

  const { count: totalCount, error: totalError } = await supabase
    .from('company_signals')
    .select('*', { count: 'exact', head: true });

  const { count: indexableCount, error: indexableError } = await supabase
    .from('company_signals')
    .select('*', { count: 'exact', head: true })
    .eq('indexable', true);

  return NextResponse.json({
    supabaseUrl,
    totalCount,
    indexableCount,
    errors: {
      total: totalError,
      indexable: indexableError
    }
  });
}
