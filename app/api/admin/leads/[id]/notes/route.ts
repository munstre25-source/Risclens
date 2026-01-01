import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getAdminNotes, addAdminNote } from '@/lib/supabase';

const ADMIN_SECRET = process.env.ADMIN_SECRET || '';

function validateAuth(request: NextRequest): boolean {
  const headersList = headers();
  const authHeader = headersList.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  return token === ADMIN_SECRET;
}

// GET /api/admin/leads/[id]/notes - Get notes for a lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const notes = await getAdminNotes(params.id);
    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Failed to get notes:', error);
    return NextResponse.json({ error: 'Failed to get notes' }, { status: 500 });
  }
}

// POST /api/admin/leads/[id]/notes - Add a note to a lead
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { note, author } = await request.json();
    
    if (!note || typeof note !== 'string' || note.trim().length === 0) {
      return NextResponse.json({ error: 'Note is required' }, { status: 400 });
    }

    const newNote = await addAdminNote(params.id, note.trim(), author || 'admin');
    
    if (!newNote) {
      return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
    }

    return NextResponse.json({ note: newNote });
  } catch (error) {
    console.error('Failed to add note:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}
