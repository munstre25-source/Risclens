import { NextResponse } from 'next/server';
import { supabase } from '@/lib/content';
import { requireAdmin } from '@/lib/supabase-auth';

export async function GET(request: Request) {
  const authorized = await requireAdmin(request);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Check for stale content (> 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const { data: stalePages } = await supabase
      .from('content_pages')
      .select('slug, title, last_reviewed_at')
      .lt('last_reviewed_at', ninetyDaysAgo.toISOString());

    // 2. Check for stale benchmarks
    const { data: staleBenchmarks } = await supabase
      .from('pricing_benchmarks')
      .select('category, tier, last_verified_at')
      .lt('last_verified_at', ninetyDaysAgo.toISOString());

    // 3. Overall stats
    const { count: totalPages } = await supabase.from('content_pages').select('*', { count: 'exact', head: true });
    const { count: totalBenchmarks } = await supabase.from('pricing_benchmarks').select('*', { count: 'exact', head: true });

    return NextResponse.json({
      ok: true,
      stats: {
        totalPages,
        totalBenchmarks,
        stalePagesCount: stalePages?.length || 0,
        staleBenchmarksCount: staleBenchmarks?.length || 0
      },
      alerts: {
        stalePages,
        staleBenchmarks
      }
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Audit failed' }, { status: 500 });
  }
}
