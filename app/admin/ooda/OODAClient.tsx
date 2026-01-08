'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  funnel: {
    impressions: number;
    submissions: number;
    qualified: number;
    closedWon: number;
  };
  typeBreakdown: { name: string; count: number }[];
    industryBreakdown: { name: string; count: number }[];
    toolPerformance: {
      name: string;
      resultsViewed: number;
      leadsSubmitted: number;
      conversionRate: string;
      monetizationClicks: number;
    }[];
  }


export function OODAClient() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const getAiSuggestions = async (tool: any) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/ooda/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPage: tool.name,
          currentPerformance: {
            views: tool.resultsViewed,
            leads: tool.leadsSubmitted,
            rate: tool.conversionRate
          }
        })
      });
      const json = await response.json();
      if (json.success) {
        setSuggestions(json.suggestions);
      }
    } catch (err) {
      console.error('Failed to get suggestions', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const applySuggestion = async (suggestion: any) => {
    try {
      const response = await fetch('/api/admin/variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(suggestion)
      });
      const json = await response.json();
      if (json.success) {
        alert('Variation created and saved to experiments!');
        setSuggestions([]);
      }
    } catch (err) {
      alert('Failed to apply suggestion');
    }
  };

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
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

  const dropOffRate = data.funnel.impressions > 0 
    ? ((1 - (data.funnel.submissions / data.funnel.impressions)) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Weekly OODA Loop</h1>
          <p className="text-slate-600 mt-1">
            Observe, Orient, Decide, Act. Drive conversion improvements through analytics.
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-slate-500 block uppercase tracking-wider">Loop Cycle</span>
          <span className="text-lg font-bold text-slate-900">Weekly (Mon-Sun)</span>
        </div>
      </div>

      {/* 1. OBSERVE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
          <h2 className="text-xl font-bold text-slate-900">Observe (Last 30 Days)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 text-center">Top Funnel Conversion (CTR)</p>
            <p className="text-4xl font-bold text-blue-600 text-center">{data.summary.ctr}</p>
            <p className="text-[10px] text-slate-400 mt-2 text-center">Submissions / Impressions</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 text-center">Lead Conversion (CRO)</p>
            <p className="text-4xl font-bold text-emerald-600 text-center">{data.summary.cro}</p>
            <p className="text-[10px] text-slate-400 mt-2 text-center">Qualified Leads / Impressions</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 text-center">Drop-off Rate</p>
            <p className="text-4xl font-bold text-rose-600 text-center">{dropOffRate}%</p>
            <p className="text-[10px] text-slate-400 mt-2 text-center">Users who didn&apos;t finish calculators</p>
          </div>
        </div>
      </section>

      {/* 2. ORIENT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-sm">2</span>
          <h2 className="text-xl font-bold text-slate-900">Orient (High Impact Areas)</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Top Converting Tools</h3>
            <div className="space-y-4">
              {data.typeBreakdown.sort((a, b) => b.count - a.count).map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 capitalize">{item.name.replace(/-/g, ' ')}</p>
                    <p className="text-xs text-slate-500">{item.count} conversions</p>
                  </div>
                  <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${(item.count / data.summary.totalLeads * 100) || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Active Buyer Verticals</h3>
            <div className="space-y-4">
              {data.industryBreakdown.sort((a, b) => b.count - a.count).slice(0, 5).map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 capitalize">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.count} leads</p>
                  </div>
                  <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${(item.count / data.summary.totalLeads * 100) || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>

        {/* 2.5 TOOL PERFORMANCE TABLE (Gap #2) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white font-bold text-sm">!</span>
              <h2 className="text-xl font-bold text-slate-900">Decisive Weekly Question</h2>
            </div>
            <p className="text-sm text-slate-500 italic">
              Which page has high buyer intent but low conversion?
            </p>
          </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-900">Page / Tool</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-right">Results Viewed</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-right">Leads Submitted</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-right">Conversion Rate</th>
                    <th className="px-6 py-4 font-bold text-slate-900 text-right">Monetization CTA Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.toolPerformance
                    .sort((a, b) => {
                      // Default sort: Highest traffic, then lowest conversion
                      const aRate = parseFloat(a.conversionRate);
                      const bRate = parseFloat(b.conversionRate);
                      if (b.resultsViewed !== a.resultsViewed) return b.resultsViewed - a.resultsViewed;
                      return aRate - bRate;
                    })
                    .map((tool, idx) => (
                      <tr key={tool.name} className={idx === 0 ? "bg-amber-50/30" : ""}>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-semibold text-slate-900 capitalize">
                                  {tool.name.replace(/-/g, ' ')}
                                </span>
                                {idx === 0 && (
                                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">
                                    Optimization Target
                                  </span>
                                )}
                              </div>
                              {idx === 0 && (
                                <button
                                  onClick={() => getAiSuggestions(tool)}
                                  disabled={isGenerating}
                                  className="text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                  {isGenerating ? 'Generating...' : 'AI Suggestions'}
                                </button>
                              )}
                            </div>
                          </td>
                        <td className="px-6 py-4 text-right text-slate-600">{tool.resultsViewed.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-slate-600 font-medium">{tool.leadsSubmitted.toLocaleString()}</td>
                        <td className={`px-6 py-4 text-right font-bold ${parseFloat(tool.conversionRate) < 5 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {tool.conversionRate}
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600 font-medium text-brand-600">{tool.monetizationClicks.toLocaleString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center font-medium">
                  Derived Metric: conversion_rate = lead_submitted / results_viewed. This page is the next optimization target.
                </p>
              </div>
            </div>
          </section>

          {suggestions.length > 0 && (
            <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">✨</span>
                  <h2 className="text-xl font-bold text-slate-900">AI Optimization Suggestions</h2>
                </div>
                <button 
                  onClick={() => setSuggestions([])}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Dismiss
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions.map((suggestion, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border-2 border-blue-100 shadow-md flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-blue-800 mb-2">{suggestion.name}</h3>
                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400">Headline</p>
                          <p className="text-sm text-slate-800 italic">"{suggestion.headline}"</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400">CTA Text</p>
                          <p className="text-sm text-slate-800 font-semibold">{suggestion.cta_text}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => applySuggestion(suggestion)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Apply Variation
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3 & 4. DECIDE & ACT */}


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-white font-bold text-sm">3</span>
            <h2 className="text-xl font-bold text-slate-900">Decide</h2>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl space-y-4">
            <p className="text-sm text-amber-900 leading-relaxed font-medium">
              Identify 1-3 changes to implement this week based on the Orient data.
            </p>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex gap-2">
                <span className="shrink-0 font-bold">□</span>
                <span>Update low-converting CTA on highest traffic page.</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-bold">□</span>
                <span>Tune scoring weights for high-volume industry.</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 font-bold">□</span>
                <span>Add specific guide for top-performing comparison segment.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">4</span>
            <h2 className="text-xl font-bold text-slate-900">Act</h2>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl space-y-4">
            <p className="text-sm text-emerald-900 leading-relaxed font-medium">
              Deploy changes immediately to the Messaging Pack or Component Logic.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/settings" className="flex items-center justify-center gap-2 bg-white border border-emerald-200 p-3 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                System Settings
              </Link>
              <Link href="/admin/experiments" className="flex items-center justify-center gap-2 bg-white border border-emerald-200 p-3 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
                A/B Variations
              </Link>
            </div>
            <p className="text-[10px] text-emerald-600 italic">Next review: Next Monday @ 9:00 AM</p>
          </div>
        </section>
      </div>

      <div className="bg-slate-100 rounded-xl p-6 text-center border border-slate-200">
        <p className="text-sm text-slate-600">
          Need deep dive data? View the <Link href="/admin/analytics" className="text-brand-600 font-bold underline">Detailed System Analytics →</Link>
        </p>
      </div>
    </div>
  );
}
