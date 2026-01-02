import { NextResponse } from 'next/server';
import { logAuditEvent } from '@/lib/supabase';
import { requireAdmin } from '@/lib/supabase-auth';

export async function POST(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { event_type, payload } = body || {};
    if (!event_type) {
      return NextResponse.json({ error: 'event_type is required' }, { status: 400 });
    }

    await logAuditEvent(event_type, payload || {});
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to log audit event:', err);
    return NextResponse.json({ error: 'Failed to log audit' }, { status: 500 });
  }
}
