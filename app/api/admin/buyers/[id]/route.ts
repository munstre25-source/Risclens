import { NextResponse } from 'next/server';
import { deleteBuyer } from '@/lib/supabase';
import { requireAdmin } from '@/lib/supabase-auth';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteBuyer(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to delete buyer:', err);
    return NextResponse.json({ error: 'Failed to delete buyer' }, { status: 500 });
  }
}
