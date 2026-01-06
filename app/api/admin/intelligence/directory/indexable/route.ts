import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateAdminAuth } from '@/lib/validation';

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

    const { slug, indexable, indexable_locked } = await request.json();
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const updateData: any = { updated_at: new Date().toISOString() };
    
    if (indexable !== undefined) {
      updateData.indexable = indexable;
      updateData.indexable_locked = true; // Locking because admin changed it
    }
    
    if (indexable_locked !== undefined) {
      updateData.indexable_locked = indexable_locked;
    }

    const { data, error } = await supabase
      .from('company_signals')
      .update(updateData)
      .eq('slug', slug)
      .select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
