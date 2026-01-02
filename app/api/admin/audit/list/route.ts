import { NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/supabase';
import { requireAdmin } from '@/lib/supabase-auth';

export async function GET(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get('limit') || '50');
    const offset = Number(url.searchParams.get('offset') || '0');

    const logs = await getAuditLogs({ limit, offset });
    return NextResponse.json({ logs });
  } catch (err) {
    console.error('Failed to fetch audit logs:', err);
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
  }
}
