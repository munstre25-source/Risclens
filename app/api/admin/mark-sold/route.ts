import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, recordRevenueEvent, logAuditEvent } from '@/lib/supabase';
import { validateAdminAuth, isValidUUID, sanitizeNumber, sanitizeString } from '@/lib/validation';

// POST /api/admin/mark-sold - Mark a lead as sold
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const leadId = body.lead_id;
    const saleAmount = sanitizeNumber(body.sale_amount);
    const buyerEmail = sanitizeString(body.buyer_email);

    if (!leadId || !isValidUUID(leadId)) {
      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    if (!saleAmount || saleAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid sale_amount is required' },
        { status: 400 }
      );
    }

    if (!buyerEmail || !buyerEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid buyer_email is required' },
        { status: 400 }
      );
    }

    // Fetch lead
    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    if (lead.sold) {
      return NextResponse.json(
        { success: false, error: 'Lead is already sold' },
        { status: 400 }
      );
    }

    // Update lead
    await updateLead(leadId, {
      sold: true,
      sale_amount: saleAmount,
      buyer_email: buyerEmail,
    });

    const isTest = request.cookies.get('rls_test_mode')?.value === '1';

    // Record revenue event
    await recordRevenueEvent({
      is_test: isTest,
      lead_id: leadId,
      keyword_id: null,
      calculator_page: '/soc-2-readiness-calculator',
      event_type: 'lead_sold',
      event_value: saleAmount,
      event_date: new Date().toISOString(),
      notes: `Sold to ${buyerEmail}`,
    });

    // Log audit event
    await logAuditEvent('admin_mark_sold', {
      lead_id: leadId,
      company_name: lead.company_name,
      sale_amount: saleAmount,
      buyer_email: buyerEmail,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      sale_amount: saleAmount,
    });
  } catch (error) {
    console.error('Mark sold error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to mark as sold' },
      { status: 500 }
    );
  }
}

