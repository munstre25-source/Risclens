import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { validateAdminAuth } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    const supabase = getSupabaseAdmin();

    // 1. Fetch all leads (excluding tests unless requested, but here we show live data)
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('created_at, industry, lead_status, utm_source, sold, sale_amount, lead_score, lead_type, variation_id')
      .eq('is_test', false);

    if (leadsError) throw leadsError;

    // 2. Fetch A/B variants for CTR/CRO
    const { data: variants, error: variantsError } = await supabase
      .from('AB_VARIANTS')
      .select('variation_id, name, impressions, submissions');

    if (variantsError) throw variantsError;

    // 3. Fetch Revenue Events for OODA (Gap #2)
    const { data: revenueEvents, error: revenueError } = await supabase
      .from('REVENUE_EVENTS')
      .select('calculator_page, event_type')
      .eq('event_type', 'monetization_cta_clicked');

    if (revenueError) throw revenueError;

    // --- Calculations ---
    const totalLeads = leads.length;
    const totalImpressions = variants.reduce((sum, v) => sum + (v.impressions || 0), 0);
    const totalSubmissions = variants.reduce((sum, v) => sum + (v.submissions || 0), 0);
    const totalRevenue = leads.reduce((sum, l) => sum + Number(l.sale_amount || 0), 0);
    const avgScore = totalLeads > 0 
      ? leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / totalLeads 
      : 0;

    const ctr = totalImpressions > 0 ? (totalSubmissions / totalImpressions) * 100 : 0;
    const cro = totalImpressions > 0 ? (totalLeads / totalImpressions) * 100 : 0;

    // Growth Metrics (Last 30 vs Previous 30)
    const now = new Date();
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(now.getDate() - 30);
    const sixtyDaysAgo = new Date(); sixtyDaysAgo.setDate(now.getDate() - 60);

    const last30Leads = leads.filter(l => new Date(l.created_at) >= thirtyDaysAgo).length;
    const prev30Leads = leads.filter(l => {
      const d = new Date(l.created_at);
      return d >= sixtyDaysAgo && d < thirtyDaysAgo;
    }).length;

    const growth = prev30Leads > 0 ? ((last30Leads - prev30Leads) / prev30Leads) * 100 : 0;

    // Time-series (last 30 days)
    const leadsByDay: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      leadsByDay[d.toISOString().split('T')[0]] = 0;
    }

    leads.forEach(l => {
      const date = l.created_at.split('T')[0];
      if (leadsByDay[date] !== undefined) {
        leadsByDay[date]++;
      }
    });

    const timeSeries = Object.entries(leadsByDay)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Breakdown helpers
    const getBreakdown = (field: keyof typeof leads[0]) => {
      const counts: Record<string, number> = {};
      leads.forEach(l => {
        const val = String(l[field] || 'Unknown');
        counts[val] = (counts[val] || 0) + 1;
      });
      return Object.entries(counts).map(([name, count]) => ({ name, count }));
    };

    const industryBreakdown = getBreakdown('industry');
    const sourceBreakdown = getBreakdown('utm_source');
    const statusBreakdown = getBreakdown('lead_status');
    const typeBreakdown = getBreakdown('lead_type');

    // Revenue by Source
    const sourceRevenue: Record<string, number> = {};
    leads.forEach(l => {
      const source = l.utm_source || 'Direct';
      sourceRevenue[source] = (sourceRevenue[source] || 0) + Number(l.sale_amount || 0);
    });
    const revenueBreakdown = Object.entries(sourceRevenue)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue);

    // Variation performance
    const variationStats = variants.map(v => {
      const vLeads = leads.filter(l => l.variation_id === v.variation_id).length;
      return {
        name: v.name,
        impressions: v.impressions || 0,
        submissions: v.submissions || 0,
        leads: vLeads,
        ctr: v.impressions ? ((v.submissions || 0) / v.impressions * 100).toFixed(1) + '%' : '0%',
        cro: v.impressions ? (vLeads / v.impressions * 100).toFixed(1) + '%' : '0%'
      };
    });

    // Funnel
    const qualifiedCount = leads.filter(l => l.lead_status !== 'new' && l.lead_status !== 'closed_lost').length;
    const closedWonCount = leads.filter(l => l.lead_status === 'closed_won').length;

    // Tool Performance (OODA Gap #2)
    const toolTypes = ['soc2-readiness', 'soc2-cost', 'pentest-estimator', 'vendor-risk-assessment', 'roi_calculator'];
    const toolPerformance = toolTypes.map(type => {
      const typeLeads = leads.filter(l => l.lead_type === type).length;
      
      // Real monetization clicks from REVENUE_EVENTS
      const monetizationClicks = (revenueEvents || [])
        .filter(e => e.calculator_page === type).length;

      // Map tool type to variation name for impressions
      const variationName = type === 'soc2-readiness' ? 'soc2-readiness-v1' : 
                          type === 'soc2-cost' ? 'soc2-cost-v1' :
                          type === 'pentest-estimator' ? 'pentest-v1' :
                          type === 'roi_calculator' ? 'roi-v1' :
                          'vra-v1';
      
      const variant = variants.find(v => v.name === variationName);
      const impressions = variant?.impressions || 1; // Avoid div by zero
      
      return {
        name: type,
        resultsViewed: impressions,
        leadsSubmitted: typeLeads,
        conversionRate: ((typeLeads / impressions) * 100).toFixed(1) + '%',
        monetizationClicks
      };
    });

    return NextResponse.json({
      success: true,
      summary: {
        totalLeads,
        totalImpressions,
        totalSubmissions,
        ctr: ctr.toFixed(2) + '%',
        cro: cro.toFixed(2) + '%',
        totalRevenue,
        avgScore: avgScore.toFixed(1),
        growth: growth.toFixed(0) + '%'
      },
      timeSeries,
      industryBreakdown,
      sourceBreakdown,
      statusBreakdown,
      typeBreakdown,
      revenueBreakdown,
      variationStats,
      toolPerformance, // Added for OODA Gap #2
      funnel: {
        impressions: totalImpressions,
        submissions: totalSubmissions,
        qualified: qualifiedCount,
        closedWon: closedWonCount
      }
    });

  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
