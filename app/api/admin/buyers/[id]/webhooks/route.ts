import { NextResponse } from 'next/server';
import { getBuyerWebhooks, upsertBuyerWebhook, deleteBuyerWebhook } from '@/lib/supabase';
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
    const webhooks = await getBuyerWebhooks(id);
    return NextResponse.json({ webhooks });
  } catch (err) {
    console.error('Failed to fetch webhooks:', err);
    return NextResponse.json({ error: 'Failed to fetch webhooks' }, { status: 500 });
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
    const { id: buyerId } = await params;
    const body = await req.json();
    const webhook = await upsertBuyerWebhook({ ...body, buyer_id: buyerId });
    return NextResponse.json({ webhook });
  } catch (err) {
    console.error('Failed to upsert webhook:', err);
    return NextResponse.json({ error: 'Failed to save webhook' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    
    await deleteBuyerWebhook(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to delete webhook:', err);
    return NextResponse.json({ error: 'Failed to delete webhook' }, { status: 500 });
  }
}
