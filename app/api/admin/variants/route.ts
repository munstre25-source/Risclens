import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { validateAdminAuth } from '@/lib/validation';

// GET /api/admin/variants - Get A/B variants
export async function GET(request: NextRequest) {
  try {
    // Admin auth check - supports both cookie and header auth
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret));
    
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: variants, error } = await supabase
      .from('AB_VARIANTS')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Failed to fetch variants:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch variants' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      variants: variants || [],
    });
  } catch (error) {
    console.error('Admin variants error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch variants' },
      { status: 500 }
    );
  }
}

