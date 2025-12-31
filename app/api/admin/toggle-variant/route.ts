import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, logAuditEvent } from '@/lib/supabase';
import { validateAdminAuth, sanitizeString, sanitizeBoolean } from '@/lib/validation';

// POST /api/admin/toggle-variant - Toggle A/B variant active status
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
    const variantId = sanitizeString(body.variant_id);
    const active = sanitizeBoolean(body.active);

    if (!variantId) {
      return NextResponse.json(
        { success: false, error: 'variant_id is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // If activating, first deactivate all other variants (only one active at a time)
    if (active) {
      await supabase
        .from('AB_VARIANTS')
        .update({ active: false })
        .neq('variation_id', variantId);
    }

    // Update the target variant
    const { error } = await supabase
      .from('AB_VARIANTS')
      .update({ active })
      .eq('variation_id', variantId);

    if (error) {
      console.error('Failed to toggle variant:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to toggle variant' },
        { status: 500 }
      );
    }

    // Log audit event
    await logAuditEvent('admin_toggle_variant', {
      variant_id: variantId,
      active,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      variant_id: variantId,
      active,
    });
  } catch (error) {
    console.error('Toggle variant error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to toggle variant' },
      { status: 500 }
    );
  }
}

