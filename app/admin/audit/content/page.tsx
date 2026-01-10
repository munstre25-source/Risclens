'use client';

import { useState, useEffect } from 'react';
import { 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  RefreshCcw,
  FileText,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AuditStats {
  totalPages: number;
  totalBenchmarks: number;
  stalePagesCount: number;
  staleBenchmarksCount: number;
}

interface StalePage {
  slug: string;
  title: string;
  last_reviewed_at: string;
}

interface StaleBenchmark {
  category: string;
  tier: string;
  last_verified_at: string;
}

interface AuditData {
  ok: boolean;
  stats: AuditStats;
  alerts: {
    stalePages: StalePage[];
    staleBenchmarks: StaleBenchmark[];
  };
}

export default function ContentAuditPage() {
  const [data, setData] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content-audit');
      if (!res.ok) throw new Error('Failed to fetch content audit');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error running audit');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <RefreshCcw className="h-8 w-8 text-brand-500 animate-spin" />
        <p className="text-slate-500 font-medium tracking-tight">Analyzing database health...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Database className="h-8 w-8 text-brand-500" />
            Content Integrity Audit
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Monitoring data freshness and regulatory compliance standards.</p>
        </div>
        <button 
          onClick={fetchAudit}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Run Audit
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">{error}</span>
        </div>
      )}

      {data && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                Total Pages
              </div>
              <div className="text-3xl font-black text-slate-900">{data.stats.totalPages}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <BarChart3 className="h-3 w-3" />
                Benchmarks
              </div>
              <div className="text-3xl font-black text-slate-900">{data.stats.totalBenchmarks}</div>
            </div>
            <div className={`p-6 rounded-2xl border shadow-sm ${data.stats.stalePagesCount > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
              <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5 ${data.stats.stalePagesCount > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
                <Clock className="h-3 w-3" />
                Stale Pages
              </div>
              <div className={`text-3xl font-black ${data.stats.stalePagesCount > 0 ? 'text-amber-700' : 'text-slate-900'}`}>{data.stats.stalePagesCount}</div>
            </div>
            <div className={`p-6 rounded-2xl border shadow-sm ${data.stats.staleBenchmarksCount > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
              <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5 ${data.stats.staleBenchmarksCount > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                <AlertTriangle className="h-3 w-3" />
                Stale Benchmarks
              </div>
              <div className={`text-3xl font-black ${data.stats.staleBenchmarksCount > 0 ? 'text-red-700' : 'text-slate-900'}`}>{data.stats.staleBenchmarksCount}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stale Pages Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" />
                Critical: Content Review Needed
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Page Title</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.alerts.stalePages.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center">
                          <div className="flex flex-col items-center gap-2 text-emerald-600">
                            <CheckCircle className="h-8 w-8" />
                            <span className="text-sm font-bold uppercase tracking-tighter">All content is fresh</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data.alerts.stalePages.map((page) => (
                        <tr key={page.slug} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 text-sm">{page.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">/{page.slug}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-tighter">
                              <Clock className="h-3 w-3" />
                              {new Date(page.last_reviewed_at).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stale Benchmarks Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-slate-400" />
                Critical: Pricing Data Stale
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Benchmark</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Verified</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.alerts.staleBenchmarks.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center">
                          <div className="flex flex-col items-center gap-2 text-emerald-600">
                            <CheckCircle className="h-8 w-8" />
                            <span className="text-sm font-bold uppercase tracking-tighter">Pricing is up to date</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data.alerts.staleBenchmarks.map((b, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 text-sm capitalize">{b.category}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{b.tier} Tier</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-tighter">
                              <AlertTriangle className="h-3 w-3" />
                              {new Date(b.last_verified_at).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
