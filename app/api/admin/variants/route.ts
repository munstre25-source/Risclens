import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { validateAdminAuth } from '@/lib/validation';
import { v4 as uuidv4 } from 'uuid';

// GET /api/admin/variants - Get A/B variants
export async function GET(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret));
    
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data: variants, error } = await supabase
      .from('AB_VARIANTS')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, variants: variants || [] });
  } catch (error) {
    console.error('Admin variants GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch variants' }, { status: 500 });
  }
}

// POST /api/admin/variants - Create a new A/B variant
export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret));
    
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { name, headline, cta_text } = await request.json();
    const supabase = getSupabaseAdmin();
    
    // Generate a unique variation_id (e.g., v-uuid)
    const variation_id = `v-${uuidv4().substring(0, 8)}`;

    const { data, error } = await supabase
      .from('AB_VARIANTS')
      .insert({
        variation_id,
        name,
        headline,
        cta_text,
        active: false // Start as inactive
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, variant: data });
  } catch (error) {
    console.error('Admin variants POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create variant' }, { status: 500 });
  }
}

