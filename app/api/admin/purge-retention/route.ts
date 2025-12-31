import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, logAuditEvent } from '@/lib/supabase';
import { validateAdminAuth, sanitizeNumber } from '@/lib/validation';

// POST /api/admin/purge-retention - Delete leads older than X days
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
    const days = sanitizeNumber(body.days) || 90; // Default 90 days
    const excludeSold = body.exclude_sold !== false; // Default true

    if (days < 30) {
      return NextResponse.json(
        { success: false, error: 'Minimum retention period is 30 days' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffISO = cutoffDate.toISOString();

    // Build delete query
    let query = supabase
      .from('SOC2_Leads')
      .delete()
      .lt('created_at', cutoffISO);

    // Optionally exclude sold leads
    if (excludeSold) {
      query = query.eq('sold', false);
    }

    // First count how many will be affected
    const countQuery = supabase
      .from('SOC2_Leads')
      .select('id', { count: 'exact', head: true })
      .lt('created_at', cutoffISO);
    
    if (excludeSold) {
      countQuery.eq('sold', false);
    }

    const { count: affectedCount } = await countQuery;

    // Execute delete
    const { error } = await query.select();

    if (error) {
      console.error('Purge error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to purge records' },
        { status: 500 }
      );
    }

    // Log purge event
    await logAuditEvent('admin_purge_retention', {
      days,
      exclude_sold: excludeSold,
      cutoff_date: cutoffISO,
      records_deleted: affectedCount || 0,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Purged records older than ${days} days`,
      records_deleted: affectedCount || 0,
      cutoff_date: cutoffISO,
    });
  } catch (error) {
    console.error('Purge error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to purge records' },
      { status: 500 }
    );
  }
}

