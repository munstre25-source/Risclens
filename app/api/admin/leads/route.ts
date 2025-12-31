import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { validateAdminAuth, sanitizeString } from '@/lib/validation';

// GET /api/admin/leads - Get leads with filters
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

    const { searchParams } = new URL(request.url);
    const keepOrSell = sanitizeString(searchParams.get('keep_or_sell') || '');
    const industry = sanitizeString(searchParams.get('industry') || '');
    const search = sanitizeString(searchParams.get('search') || '');
    const sold = searchParams.get('sold');
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const supabase = getSupabaseAdmin();

    // Build query
    let query = supabase
      .from('SOC2_Leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (keepOrSell && (keepOrSell === 'keep' || keepOrSell === 'sell')) {
      query = query.eq('keep_or_sell', keepOrSell);
    }
    if (industry) {
      query = query.eq('industry', industry);
    }
    if (search) {
      query = query.or(`company_name.ilike.%${search}%,email.ilike.%${search}%`);
    }
    if (sold !== null && sold !== '') {
      query = query.eq('sold', sold === 'true');
    }

    const { data: leads, error, count } = await query;

    if (error) {
      console.error('Failed to fetch leads:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Calculate stats
    const statsQuery = await supabase
      .from('SOC2_Leads')
      .select('keep_or_sell, sold, sale_amount');

    const allLeads = statsQuery.data || [];
    const stats = {
      total: allLeads.length,
      keep: allLeads.filter((l) => l.keep_or_sell === 'keep').length,
      sell: allLeads.filter((l) => l.keep_or_sell === 'sell').length,
      revenue: allLeads
        .filter((l) => l.sold && l.sale_amount)
        .reduce((sum, l) => sum + (l.sale_amount || 0), 0),
    };

    return NextResponse.json({
      success: true,
      leads: leads || [],
      total: count || 0,
      stats,
    });
  } catch (error) {
    console.error('Admin leads error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

