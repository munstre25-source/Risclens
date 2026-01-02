import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-auth';

export async function POST(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { enabled } = await req.json();
    const res = NextResponse.json({ success: true, enabled });
    if (enabled) {
      res.cookies.set('rls_test_mode', '1', {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
    } else {
      res.cookies.set('rls_test_mode', '', { path: '/', maxAge: 0 });
    }
    return res;
  } catch (err) {
    console.error('Failed to toggle test mode:', err);
    return NextResponse.json({ error: 'Failed to toggle' }, { status: 500 });
  }
}
