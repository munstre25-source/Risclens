import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/validation';
import { getSupabaseAdmin } from '@/lib/supabase';
import { extractSignalsForCompany, normalizeDomain } from '@/lib/intelligence';

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

    const { companies, dryRun = false } = await request.json();
    
    if (!Array.isArray(companies)) {
      return NextResponse.json({ error: 'Companies must be an array' }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({ error: 'Missing OpenAI configuration' }, { status: 500 });
    }

    const supabase = getSupabaseAdmin();
    const results = [];

    for (const company of companies) {
      const domain = normalizeDomain(company.domain);
      if (!domain) continue;

      const name = company.name || domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      if (!dryRun) {
        await supabase.from('company_signals').upsert({
          company_name: name,
          domain: domain,
          slug,
          last_run_status: 'running',
          last_run_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });
      }

      const extraction = await extractSignalsForCompany(domain, openaiApiKey);

      if (dryRun) {
        results.push({ company: name, domain, ...extraction });
        continue;
      }

      const { data: existing } = await supabase
        .from('company_signals')
        .select('indexable_locked, indexable')
        .eq('slug', slug)
        .single();

      const updateData: any = {
        last_run_status: extraction.status,
        last_run_error: null,
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (extraction.status === 'success') {
        updateData.signal_score = extraction.final_score;
        updateData.markers = extraction.markers;
        updateData.public_signals = extraction.markers;
        updateData.signals = extraction.markers;
        updateData.score_breakdown = extraction.score_breakdown;
        updateData.ai_summary = extraction.ai_summary;
        updateData.detected_tools = extraction.detected_tools;
        updateData.detected_certifications = extraction.detected_certifications;
        
        if (!existing?.indexable_locked) {
          updateData.indexable = extraction.indexable;
        }
      }

      await supabase.from('company_signals').update(updateData).eq('slug', slug);
      results.push({ company: name, domain, success: extraction.status === 'success', ...extraction });
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
