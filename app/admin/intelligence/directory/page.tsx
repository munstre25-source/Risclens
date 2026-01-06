'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface CompanySignal {
  id: string;
  company_name: string;
  domain: string;
  slug: string;
  signal_score: number;
  markers: Record<string, boolean>;
  indexable: boolean;
  indexable_locked: boolean;
  last_run_status: 'idle' | 'running' | 'success' | 'error';
  last_run_error: string | null;
  last_run_at: string | null;
  updated_at: string;
  ai_summary: string;
}

function SignalDirectoryManager() {
  const [companies, setCompanies] = useState<CompanySignal[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [batchResults, setBatchResults] = useState<any[] | null>(null);

  const getAdminToken = () => {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(/admin_token=([^;]+)/);
    return match ? match[1] : '';
  };

  const fetchSignals = useCallback(async () => {
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/intelligence/directory/list', {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch signals');
      const data = await res.json();
      setCompanies(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load directory');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSignals();
  }, [fetchSignals]);

  const handleExtract = async (dryRun = false) => {
    const targetText = dryRun ? "stripe.com\nvanta.com\ndrata.com" : inputText;
    if (!targetText.trim() && !dryRun) return;
    
    setExtracting(true);
    setBatchResults(null);
    setError(null);

    const lines = targetText.split('\n').filter(line => line.trim());
    const companiesToExtract = lines.map(line => {
      const parts = line.split(/[|,]/).map(p => p.trim());
      if (parts.length > 1) {
        return { name: parts[0], domain: parts[1] };
      }
      return { domain: parts[0] };
    });

    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/intelligence/directory/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ companies: companiesToExtract, dryRun }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Extraction failed');
      
      setBatchResults(data.results);
      if (!dryRun) {
        setInputText('');
        fetchSignals();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Extraction failed');
    } finally {
      setExtracting(false);
    }
  };

  const toggleIndexable = async (slug: string, currentIndexable: boolean) => {
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/intelligence/directory/indexable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ slug, indexable: !currentIndexable }),
      });

      if (!res.ok) throw new Error('Failed to update');
      
      setCompanies(prev => prev.map(c => c.slug === slug ? { ...c, indexable: !currentIndexable, indexable_locked: true } : c));
    } catch (err) {
      alert('Failed to update indexable status');
    }
  };

  const unlockIndexable = async (slug: string) => {
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/intelligence/directory/indexable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ slug, indexable_locked: false }),
      });

      if (!res.ok) throw new Error('Failed to unlock');
      
      setCompanies(prev => prev.map(c => c.slug === slug ? { ...c, indexable_locked: false } : c));
    } catch (err) {
      alert('Failed to unlock');
    }
  };

  const reExtract = async (companyName: string, domain: string) => {
    setExtracting(true);
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/intelligence/directory/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ companies: [{ name: companyName, domain }] }),
      });

      if (!res.ok) throw new Error('Extraction failed');
      fetchSignals();
    } catch (err) {
      alert('Re-extraction failed');
    } finally {
      setExtracting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-gray-500">
        Loading directory...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Signal Directory Manager</h1>
          <p className="text-sm text-slate-500">Extract and manage public security signals for companies.</p>
        </div>
        <Link 
          href="/compliance/directory" 
          target="_blank"
          className="btn-secondary text-sm"
        >
          View Public Directory →
        </Link>
      </div>

      <div className="card shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Batch Extract Signals</h3>
          <button 
            onClick={() => handleExtract(true)}
            disabled={extracting}
            className="text-xs text-brand-600 hover:underline font-medium"
          >
            Test 3 domains (Dry Run)
          </button>
        </div>
        
        <div className="space-y-4">
          <textarea
            className="form-input min-h-[120px] font-mono text-sm border-slate-200 focus:border-brand-500"
            placeholder="stripe.com&#10;Vanta, vanta.com&#10;Drata | drata.com"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={extracting}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 italic">
              Format: "domain.com" or "Name, domain.com" (one per line).
            </p>
            <button
              onClick={() => handleExtract(false)}
              disabled={extracting || !inputText.trim()}
              className="btn-primary min-w-[140px]"
            >
              {extracting ? 'Processing...' : 'Extract Signals'}
            </button>
          </div>
        </div>

        {batchResults && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="text-sm font-bold mb-3 flex items-center justify-between">
              <span>Results:</span>
              <button onClick={() => setBatchResults(null)} className="text-[10px] text-slate-400 uppercase tracking-wider">Clear</button>
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {batchResults.map((r, i) => (
                <div key={i} className="text-xs p-2 bg-white rounded border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-700">{r.company} ({r.domain})</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${r.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {r.status}
                    </span>
                  </div>
                  {r.status === 'success' ? (
                    <div className="grid grid-cols-2 gap-2 text-slate-500">
                      <div>Score: <span className="text-slate-900 font-semibold">{r.final_score}</span></div>
                      <div>Indexable: <span className={r.indexable ? 'text-green-600' : 'text-slate-400'}>{r.indexable ? 'YES' : 'NO'}</span></div>
                      <div className="col-span-2 text-[10px] truncate">URLs: {r.discoveredUrls?.join(', ')}</div>
                    </div>
                  ) : (
                    <div className="text-red-500 italic">{r.error}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="card p-0 overflow-hidden shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="admin-table w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Domain</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Markers</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Indexable</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Run</th>
                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-500">
                    No companies in directory yet.
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 group transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center justify-center w-3 h-3 rounded-full ${
                          company.last_run_status === 'success' ? 'bg-green-500' : 
                          company.last_run_status === 'running' ? 'bg-brand-500 animate-pulse' :
                          company.last_run_status === 'error' ? 'bg-red-500' : 'bg-slate-300'
                        }`} title={company.last_run_status} />
                        {company.last_run_error && (
                          <div className="text-[10px] text-red-500 max-w-[80px] truncate" title={company.last_run_error}>
                            {company.last_run_error}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900 leading-tight">{company.company_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{company.slug}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{company.domain}</td>
                    <td className="px-4 py-4">
                      <span className={`font-bold text-base ${company.signal_score >= 50 ? 'text-green-600' : company.signal_score >= 30 ? 'text-amber-600' : 'text-slate-400'}`}>
                        {company.signal_score}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {Object.entries(company.markers || {}).map(([key, val]) => val ? (
                          <span key={key} className="px-1.5 py-0.5 rounded bg-brand-50 text-[10px] text-brand-700 uppercase font-bold border border-brand-100" title={key.replace(/_/g, ' ')}>
                            {key.split('_').map(w => w[0]).join('').toUpperCase()}
                          </span>
                        ) : null)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleIndexable(company.slug, company.indexable)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                            company.indexable ? 'bg-brand-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              company.indexable ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        {company.indexable_locked && (
                          <button 
                            onClick={() => unlockIndexable(company.slug)}
                            className="text-[10px] text-brand-600 font-bold uppercase hover:underline"
                            title="Admin manually set this. Click to unlock."
                          >
                            Locked
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">
                      {company.last_run_at ? new Date(company.last_run_at).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => reExtract(company.company_name, company.domain)}
                          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                          disabled={extracting}
                        >
                          Re-run
                        </button>
                        <Link
                          href={`/compliance/directory/${company.slug}`}
                          target="_blank"
                          className="text-xs font-semibold text-slate-600 hover:text-slate-700"
                        >
                          Public
                        </Link>
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
  );
}

export default SignalDirectoryManager;
