import { NextResponse } from 'next/server';
import { getLeadEnrichment } from '@/lib/supabase';
import { requireAdmin } from '@/lib/supabase-auth';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const enrichment = await getLeadEnrichment(id);
    return NextResponse.json({ enrichment });
  } catch (err) {
    console.error('Failed to fetch enrichment:', err);
    return NextResponse.json({ error: 'Failed to fetch enrichment' }, { status: 500 });
  }
}
