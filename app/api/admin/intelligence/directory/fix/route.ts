
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    console.log('Fixing indexable status for all companies...');
    
    const { data, error } = await supabase
      .from('company_signals')
      .update({ indexable: true })
      .filter('id', 'neq', '00000000-0000-0000-0000-000000000000'); // Update all
    
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'All companies updated to indexable=true' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
