import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, getEnhancedMetrics } from '@/lib/supabase';
import { validateAdminAuth, sanitizeString } from '@/lib/validation';

// GET /api/admin/leads - Get leads with filters and enhanced metrics
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
    const leadStatus = sanitizeString(searchParams.get('lead_status') || '');
    const urgency = sanitizeString(searchParams.get('urgency') || '');
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const supabase = getSupabaseAdmin();

    // Build query
    let query = supabase
      .from('leads')
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
    if (leadStatus) {
      query = query.eq('lead_status', leadStatus);
    }

    // Urgency filter requires post-filtering
    let { data: leads, error, count } = await query;

    if (error) {
      console.error('Failed to fetch leads:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Apply urgency filter (requires date calculation)
    if (urgency && leads) {
      const now = new Date();
      leads = leads.filter((lead) => {
        if (!lead.audit_date) return false;
        const audit = new Date(lead.audit_date);
        const daysUntil = (audit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        
        switch (urgency) {
          case 'urgent':
            return daysUntil < 90;
          case 'soon':
            return daysUntil >= 90 && daysUntil < 180;
          case 'later':
            return daysUntil >= 180;
          default:
            return true;
        }
      });
    }

    // Calculate basic stats
    const statsQuery = await supabase
      .from('leads')
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

    // Get enhanced metrics
    const metrics = await getEnhancedMetrics();

    return NextResponse.json({
      success: true,
      leads: leads || [],
      total: count || 0,
      stats,
      metrics,
    });
  } catch (error) {
    console.error('Admin leads error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

