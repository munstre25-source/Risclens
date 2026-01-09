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
    const { id } = params;
    const enrichment = await getLeadEnrichment(id);
    return NextResponse.json({ enrichment });
  } catch (err) {
    console.error('Failed to fetch enrichment:', err);
    return NextResponse.json({ error: 'Failed to fetch enrichment' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;
    const { enrichLead } = await import('@/lib/enrichment');
    await enrichLead(id);
    
    const enrichment = await getLeadEnrichment(id);
    return NextResponse.json({ success: true, enrichment });
  } catch (err) {
    console.error('Failed to trigger enrichment:', err);
    return NextResponse.json({ error: 'Failed to trigger enrichment' }, { status: 500 });
  }
}
