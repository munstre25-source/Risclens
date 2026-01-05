import { NextResponse } from 'next/server';
import { getBuyers, upsertBuyer } from '@/lib/supabase';
import { requireAdmin } from '@/lib/supabase-auth';

export async function GET(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const buyers = await getBuyers();
    return NextResponse.json({ buyers });
  } catch (err) {
    console.error('Failed to fetch buyers:', err);
    return NextResponse.json({ error: 'Failed to fetch buyers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const buyer = await upsertBuyer(body);
    return NextResponse.json({ buyer });
  } catch (err) {
    console.error('Failed to upsert buyer:', err);
    return NextResponse.json({ error: 'Failed to save buyer' }, { status: 500 });
  }
}
