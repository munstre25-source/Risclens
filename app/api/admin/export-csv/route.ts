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
    const leadStatus = sanitizeString(searchParams.get('lead_status') || '');
    const urgency = sanitizeString(searchParams.get('urgency') || '');
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
    if (leadStatus) {
      query = query.eq('lead_status', leadStatus);
    }

    let { data: leads, error } = await query;

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

    if (error) {
      console.error('Failed to fetch leads for CSV:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    // Generate CSV content with enhanced columns including score breakdown and context
    const headers = [
      'id',
      'company_name',
      'email',
      'industry',
      'num_employees',
      'role',
      'audit_date',
      'days_until_audit',
      'data_types',
      'soc2_requirers',
      'lead_score',
      'readiness_score',
      'readiness_band',
      'estimated_cost_low',
      'estimated_cost_high',
      'keep_or_sell',
      'lead_status',
      'context_note',
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

    // Helper to get readiness band
    const getReadinessBand = (score: number): string => {
      if (score <= 30) return 'Pre-audit';
      if (score <= 60) return 'Early-stage';
      if (score <= 80) return 'Near-ready';
      return 'Audit-ready';
    };

    // Helper to get days until audit
    const getDaysUntilAudit = (auditDate: string): number => {
      const now = new Date();
      const audit = new Date(auditDate);
      return Math.ceil((audit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    };

    const rows = leads?.map((lead) => {
      return headers.map((header) => {
        // Handle computed fields
        if (header === 'days_until_audit') {
          return escapeCSV(lead.audit_date ? getDaysUntilAudit(lead.audit_date) : '');
        }
        if (header === 'readiness_band') {
          return escapeCSV(getReadinessBand(lead.readiness_score || 0));
        }
        
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
      filters: { keepOrSell, industry, search, sold, leadStatus, urgency, dateFrom, dateTo, scoreMin, scoreMax },
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
