import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, logAuditEvent } from '@/lib/supabase';
import { validateAdminAuth, sanitizeString } from '@/lib/validation';

// GET /api/admin/export-csv - Export leads to CSV
export async function GET(request: NextRequest) {
  try {
    // Admin auth check - supports cookie, header, and query param
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    const { searchParams } = new URL(request.url);
    const querySecret = searchParams.get('secret');
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret)) ||
      (adminSecret && querySecret === adminSecret);
    
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse query filters
    const keepOrSell = sanitizeString(searchParams.get('keep_or_sell') || '');
    const industry = sanitizeString(searchParams.get('industry') || '');
    const search = sanitizeString(searchParams.get('search') || '');
    const sold = searchParams.get('sold');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const scoreMin = searchParams.get('score_min');
    const scoreMax = searchParams.get('score_max');

    const supabase = getSupabaseAdmin();

    // Build query
    let query = supabase
      .from('SOC2_Leads')
      .select('*')
      .order('created_at', { ascending: false });

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
    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo);
    }
    if (scoreMin) {
      query = query.gte('lead_score', parseInt(scoreMin, 10));
    }
    if (scoreMax) {
      query = query.lte('lead_score', parseInt(scoreMax, 10));
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error('Failed to fetch leads for CSV:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Generate CSV content
    const headers = [
      'id',
      'company_name',
      'email',
      'industry',
      'num_employees',
      'role',
      'audit_date',
      'data_types',
      'lead_score',
      'readiness_score',
      'estimated_cost_low',
      'estimated_cost_high',
      'keep_or_sell',
      'email_sent',
      'sold',
      'sale_amount',
      'buyer_email',
      'utm_source',
      'variation_id',
      'created_at',
    ];

    const escapeCSV = (value: unknown): string => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = leads?.map((lead) => {
      return headers.map((header) => {
        const value = lead[header as keyof typeof lead];
        if (Array.isArray(value)) {
          return escapeCSV(value.join('; '));
        }
        return escapeCSV(value);
      }).join(',');
    }) || [];

    const csvContent = [headers.join(','), ...rows].join('\n');

    // Log export event
    await logAuditEvent('admin_export_csv', {
      record_count: leads?.length || 0,
      filters: { keepOrSell, industry, search, sold, dateFrom, dateTo, scoreMin, scoreMax },
      timestamp: new Date().toISOString(),
    });

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to export CSV' },
      { status: 500 }
    );
  }
}
