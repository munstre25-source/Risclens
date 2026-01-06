import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getSavedFilters, createSavedFilter, deleteSavedFilter } from '@/lib/supabase';

import { validateAdminAuth } from '@/lib/validation';

const ADMIN_SECRET = process.env.ADMIN_SECRET || '';

function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
  const cookieToken = request.cookies.get('admin_token')?.value;
  
  return (
    (Boolean(ADMIN_SECRET) && cookieToken === ADMIN_SECRET) ||
    (Boolean(ADMIN_SECRET) && validateAdminAuth(authHeader, ADMIN_SECRET))
  );
}

// GET /api/admin/filters - Get all saved filters
export async function GET(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const filters = await getSavedFilters();
    return NextResponse.json({ filters });
  } catch (error) {
    console.error('Failed to get filters:', error);
    return NextResponse.json({ error: 'Failed to get filters' }, { status: 500 });
  }
}

// POST /api/admin/filters - Create a saved filter
export async function POST(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, filter_config } = await request.json();
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Filter name is required' }, { status: 400 });
    }

    if (!filter_config || typeof filter_config !== 'object') {
      return NextResponse.json({ error: 'Filter config is required' }, { status: 400 });
    }

    const filter = await createSavedFilter(name.trim(), filter_config);
    
    if (!filter) {
      return NextResponse.json({ error: 'Failed to create filter' }, { status: 500 });
    }

    return NextResponse.json({ filter });
  } catch (error) {
    console.error('Failed to create filter:', error);
    return NextResponse.json({ error: 'Failed to create filter' }, { status: 500 });
  }
}

// DELETE /api/admin/filters - Delete a saved filter
export async function DELETE(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Filter ID is required' }, { status: 400 });
    }

    const success = await deleteSavedFilter(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete filter' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete filter:', error);
    return NextResponse.json({ error: 'Failed to delete filter' }, { status: 500 });
  }
}
