import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-auth';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  const authorized = await requireAdmin(req);
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    const supabase = getSupabaseAdmin();
  
    try {
      // 1. Get IDs of test leads
      const { data: testLeads, error: fetchError } = await supabase
        .from('leads')
        .select('id')
        .eq('is_test', true);
  
      if (fetchError) {
        console.error('Failed to fetch test leads:', fetchError);
        return NextResponse.json({ error: 'Failed to fetch test leads' }, { status: 500 });
      }
  
      const testLeadIds = testLeads?.map((l: { id: string }) => l.id) || [];
  
      if (testLeadIds.length > 0) {
        // 2. Delete from related tables first (foreign key constraints)
        const relatedTables = ['REVENUE_EVENTS', 'lead_enrichment'];
        for (const table of relatedTables) {
          const { error: relError } = await supabase
            .from(table)
            .delete()
            .in('lead_id', testLeadIds);
          
          if (relError) {
            console.error(`Failed to delete related data from ${table}:`, relError);
            // We continue even if one fails, or we could return error
          }
        }
      }
  
      // 3. Delete from leads
      const { error: deleteError } = await supabase
        .from('leads')
        .delete()
        .eq('is_test', true);
  
      if (deleteError) {
        console.error('Failed to delete test leads:', deleteError);
        return NextResponse.json({ error: 'Failed to delete test leads' }, { status: 500 });
      }
  
      return NextResponse.json({ success: true });
    } catch (err) {
    console.error('Failed to clear test data:', err);
    return NextResponse.json({ error: 'Failed to clear test data' }, { status: 500 });
  }
}
