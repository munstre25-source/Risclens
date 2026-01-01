import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { updateLeadStatus, LeadStatus } from '@/lib/supabase';

const ADMIN_SECRET = process.env.ADMIN_SECRET || '';

const VALID_STATUSES: LeadStatus[] = [
  'new',
  'qualified',
  'contacted',
  'in_conversation',
  'closed_won',
  'closed_lost',
];

function validateAuth(request: NextRequest): boolean {
  const headersList = headers();
  const authHeader = headersList.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  return token === ADMIN_SECRET;
}

// POST /api/admin/leads/[id]/status - Update lead status
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const updatedLead = await updateLeadStatus(params.id, status);
    
    if (!updatedLead) {
      return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }

    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error('Failed to update status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
