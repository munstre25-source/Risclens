'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  summary: {
    totalLeads: number;
    totalImpressions: number;
    totalSubmissions: number;
    ctr: string;
    cro: string;
    totalRevenue: number;
    avgScore: string;
    growth: string;
  };
  timeSeries: { date: string; count: number }[];
  industryBreakdown: { name: string; count: number }[];
  sourceBreakdown: { name: string; count: number }[];
  statusBreakdown: { name: string; count: number }[];
  typeBreakdown: { name: string; count: number }[];
  revenueBreakdown: { name: string; revenue: number }[];
  variationStats: {
    name: string;
    impressions: number;
    submissions: number;
    leads: number;
    ctr: string;
    cro: string;
  }[];
  funnel: {
    impressions: number;
    submissions: number;
    qualified: number;
    closedWon: number;
  };
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        const json = await response.json();
        if (json.success) {
          setData(json);
        } else {
          setError(json.error || 'Failed to fetch analytics');
        }
      } catch (err) {
        setError('An error occurred while fetching analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
        {error || 'No data available'}
      </div>
    );
  }

  const maxTimeSeries = Math.max(...data.timeSeries.map(d => d.count), 1);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Analytics</h1>
          <p className="text-sm text-slate-600 mt-1">
            Real-time performance metrics for conversions, A/B tests, and revenue growth.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          LIVE DATA
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CTR (Click-Through)</div>
            <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold">TOP FUNNEL</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">{data.summary.ctr}</div>
          <div className="text-xs text-slate-400 mt-2">Submissions / Impressions</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CRO (Conversion)</div>
            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded font-bold">LEAD GEN</span>
          </div>
          <div className="text-3xl font-bold text-emerald-600">{data.summary.cro}</div>
          <div className="text-xs text-slate-400 mt-2">Leads / Impressions</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Lead Quality</div>
            <span className="text-[10px] px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded font-bold">SCORING</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{data.summary.avgScore}/10</div>
          <div className="text-xs text-slate-400 mt-2">Average Readiness Score</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${data.summary.growth.startsWith('-') ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {data.summary.growth} MoM
            </span>
          </div>
          <div className="text-3xl font-bold text-indigo-600">{formatCurrency(data.summary.totalRevenue)}</div>
          <div className="text-xs text-slate-400 mt-2">Closed-won contract value</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            {[
              { label: 'Impressions', value: data.funnel.impressions, color: 'bg-slate-100' },
              { label: 'Submissions', value: data.funnel.submissions, color: 'bg-blue-100', parent: data.funnel.impressions },
              { label: 'Qualified Leads', value: data.funnel.qualified, color: 'bg-purple-100', parent: data.funnel.submissions },
              { label: 'Closed Won', value: data.funnel.closedWon, color: 'bg-emerald-100', parent: data.funnel.qualified },
            ].map((step, i) => {
              const percentage = step.parent ? (step.value / step.parent * 100).toFixed(1) + '%' : '100%';
              return (
                <div key={step.label} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700">{step.label}</span>
                    <span className="text-sm font-bold text-slate-900">{step.value.toLocaleString()}</span>
                  </div>
                  <div className="h-8 w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                    <div 
                      className={`h-full ${step.color} border-r-2 border-slate-200 transition-all duration-1000`}
                      style={{ width: `${(step.value / data.funnel.impressions * 100) || 0}%` }}
                    />
                  </div>
                  {i > 0 && (
                    <div className="text-[10px] text-slate-400 mt-1 text-right">
                      {percentage} conversion from previous step
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Volume over time */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Lead Volume (Last 30 Days)</h3>
          <div className="flex items-end gap-1 h-48 border-b border-l border-slate-100 pt-4 px-2">
            {data.timeSeries.map((d, i) => (
              <div 
                key={d.date} 
                className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-t-sm transition-all group relative"
                style={{ height: `${(d.count / maxTimeSeries * 100) || 2}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                  {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: {d.count} leads
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400">
            <span>{new Date(data.timeSeries[0].date).toLocaleDateString()}</span>
            <span>{new Date(data.timeSeries[Math.floor(data.timeSeries.length / 2)].date).toLocaleDateString()}</span>
            <span>{new Date(data.timeSeries[data.timeSeries.length - 1].date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Variation Performance Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">A/B Variation Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                <th className="px-6 py-3">Variant Name</th>
                <th className="px-6 py-3">Impressions</th>
                <th className="px-6 py-3">Submissions</th>
                <th className="px-6 py-3">Leads</th>
                <th className="px-6 py-3 text-center">CTR</th>
                <th className="px-6 py-3 text-center">CRO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.variationStats.map(v => (
                <tr key={v.name} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{v.name}</td>
                  <td className="px-6 py-4 text-slate-600">{v.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{v.submissions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600">{v.leads.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">{v.ctr}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">{v.cro}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Industry Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Top Industries</h3>
          <div className="space-y-3">
            {data.industryBreakdown.sort((a, b) => b.count - a.count).slice(0, 6).map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="capitalize text-slate-600">{item.name}</span>
                  <span className="font-bold text-slate-900">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500" 
                    style={{ width: `${(item.count / data.summary.totalLeads * 100) || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Revenue */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Revenue by Source</h3>
          <div className="space-y-3">
            {data.revenueBreakdown.slice(0, 6).map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{item.name === 'null' ? 'Direct' : item.name}</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(item.revenue)}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500" 
                    style={{ width: `${(item.revenue / (data.summary.totalRevenue || 1) * 100) || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Type Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Conversion by Tool</h3>
          <div className="space-y-3">
            {data.typeBreakdown.sort((a, b) => b.count - a.count).map(item => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="uppercase text-slate-600 tracking-tight">{item.name.replace(/-/g, ' ')}</span>
                  <span className="font-bold text-slate-900">{item.count}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ width: `${(item.count / data.summary.totalLeads * 100) || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
