'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  Search, 
  Play, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  BarChart3,
  Globe,
  ShieldCheck,
  Zap,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AnalysisResult {
  domain: string;
  status?: string;
  error?: string;
  final_score?: number;
  ai_summary?: string;
  markers?: Record<string, boolean>;
  detected_tools?: string[];
  detected_certifications?: string[];
  indexable?: boolean;
  discoveredUrls?: string[];
}

export default function MarketIntelDashboard() {
  const [domainsInput, setDomainsInput] = useState('');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const runAnalysis = async () => {
    const domains = domainsInput
      .split('\n')
      .map(d => d.trim())
      .filter(d => d.length > 0);

    if (domains.length === 0) return;

    setLoading(true);
    setResults([]);

    try {
      const response = await fetch('/api/admin/intelligence/market-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains }),
      });

      const data = await response.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
                Admin Intelligence
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Market Intelligence Dashboard
              </h1>
              <p className="text-slate-500 mt-2">
                Bulk scan vendor domains to detect security posture, tools, and pSEO indexability.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">System Status</p>
                <p className="text-sm font-bold text-emerald-500">Scraper Online (Browserless)</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm mb-12">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-brand-600" />
              Domain Input
            </h3>
            <textarea 
              value={domainsInput}
              onChange={(e) => setDomainsInput(e.target.value)}
              placeholder="vanta.com&#10;drata.com&#10;secureframe.com"
              className="w-full h-40 p-6 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all font-mono text-sm mb-6"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium">
                Enter one domain per line. Limit: 10 domains per batch.
              </p>
              <button 
                onClick={runAnalysis}
                disabled={loading || !domainsInput}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                Run Market Scan
              </button>
            </div>
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Scan Results ({results.length})</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-500" />
                    <span className="text-xs font-bold text-slate-500">Indexable</span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Company / Domain</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Postural Score</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Tools Detected</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Certs</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.map((res, idx) => (
                      <>
                        <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{res.domain}</span>
                              <span className="text-xs text-slate-400 truncate max-w-[200px]">{res.ai_summary || 'No summary'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="flex-grow w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    (res.final_score || 0) > 70 ? 'bg-emerald-500' : 
                                    (res.final_score || 0) > 40 ? 'bg-amber-500' : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${res.final_score || 0}%` }}
                                />
                              </div>
                              <span className="font-bold text-slate-900">{res.final_score || 0}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-wrap gap-1">
                              {res.detected_tools?.map(tool => (
                                <span key={tool} className="px-2 py-0.5 bg-brand-50 text-brand-600 text-[10px] font-bold rounded uppercase border border-brand-100">
                                  {tool}
                                </span>
                              )) || <span className="text-xs text-slate-300">None</span>}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-wrap gap-1">
                              {res.detected_certifications?.map(cert => (
                                <span key={cert} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase border border-blue-100">
                                  {cert}
                                </span>
                              )) || <span className="text-xs text-slate-300">None</span>}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            {res.indexable ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                                <ShieldCheck className="w-3 h-3" />
                                pSEO Ready
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                                <Info className="w-3 h-3" />
                                Low Intel
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => setExpandedRow(expandedRow === res.domain ? null : res.domain)}
                              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-900"
                            >
                              {expandedRow === res.domain ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          </td>
                        </tr>
                        {expandedRow === res.domain && (
                          <tr className="bg-slate-50/30">
                            <td colSpan={6} className="px-8 py-8 border-t border-slate-100">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Signal Breakdown</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(res.markers || {}).map(([key, val]) => (
                                      <div key={key} className="flex items-center gap-2">
                                        {val ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-slate-300" />}
                                        <span className={`text-xs font-medium ${val ? 'text-slate-900' : 'text-slate-400'}`}>
                                          {key.replace(/_/g, ' ')}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Discovered Assets</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {res.discoveredUrls?.map(url => (
                                      <a 
                                        key={url} 
                                        href={url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-semibold text-brand-600 hover:border-brand-500 hover:bg-brand-50 transition-all"
                                      >
                                        {new URL(url).pathname}
                                      </a>
                                    )) || <span className="text-xs text-slate-300">No security assets found</span>}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && results.length === 0 && (
            <div className="bg-white rounded-[2rem] border border-slate-200 border-dashed p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No active scan</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Input a list of vendor domains above to start gathering compliance and pricing intelligence.
              </p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
