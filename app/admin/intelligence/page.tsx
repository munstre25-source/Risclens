'use client';

import { useState, useEffect } from 'react';

interface PainSignal {
  id: string;
  source: string;
  topic: string;
  signal_type: 'pain' | 'expectation' | 'objection' | 'experience';
  raw_text: string;
  normalized_theme: string;
  intensity_score: number;
  confidence_score: number;
  created_at: string;
}

export default function MarketIntelligencePage() {
  const [signals, setSignals] = useState<PainSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState('SOC 2');

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      const res = await fetch('/api/admin/intelligence');
      if (!res.ok) throw new Error('Failed to fetch signals');
      const data = await res.json();
      setSignals(data.signals || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleExtract = async () => {
    setExtracting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/intelligence/extract', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (!res.ok) throw new Error('Extraction failed');
      const data = await res.json();
      if (data.success) {
        alert(`Successfully extracted ${data.signals_extracted} pain signals for "${topic}".`);
        fetchSignals();
      } else {
        throw new Error(data.error || 'Extraction failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong during extraction');
    } finally {
      setExtracting(false);
    }
  };

  // Group by Asset Ideation (Clusters)
  const clusters = signals.reduce((acc, signal) => {
    if (!acc[signal.normalized_theme]) acc[signal.normalized_theme] = [];
    acc[signal.normalized_theme].push(signal);
    return acc;
  }, {} as Record<string, PainSignal[]>);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Market Intelligence...</div>;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Market Intelligence</h1>
          <p className="text-slate-500 mt-2 text-lg">Extracting pre-search pain signals from the edges of the internet.</p>
        </div>
        <div className="flex gap-4 items-center bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <input 
            type="text" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 w-48"
            placeholder="Topic (e.g. SOC 2)"
          />
          <button 
            onClick={handleExtract}
            disabled={extracting}
            className={`px-5 py-2.5 text-white rounded-lg transition-all text-sm font-bold shadow-sm ${
              extracting ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 active:scale-95'
            }`}
          >
            {extracting ? 'Extracting...' : 'Scan Reddit'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-brand-500 rounded-full"></span>
            Raw Pain Signals
          </h2>
          <div className="space-y-4">
            {signals.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400">No signals detected yet. Run a scan to find market pain.</p>
              </div>
            ) : (
              signals.map((signal) => (
                <div key={signal.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                        signal.signal_type === 'pain' ? 'bg-red-100 text-red-700' :
                        signal.signal_type === 'expectation' ? 'bg-blue-100 text-blue-700' :
                        signal.signal_type === 'objection' ? 'bg-orange-100 text-orange-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {signal.signal_type}
                      </span>
                      <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                        {signal.normalized_theme.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-3 rounded-full ${i < signal.intensity_score ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">
                    "{signal.raw_text}"
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                      Topic: {signal.topic}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(signal.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Asset Ideation
          </h2>
          <div className="space-y-4">
            {Object.entries(clusters).map(([theme, items]) => {
              const avgIntensity = items.reduce((a, b) => a + b.intensity_score, 0) / items.length;
              return (
                <div key={theme} className="bg-emerald-50/50 rounded-xl border border-emerald-100 p-5">
                  <h3 className="font-bold text-emerald-900 text-sm uppercase tracking-wide mb-1">
                    {theme.replace('_', ' ')}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                      {items.length} Signals
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Intensity: {avgIntensity.toFixed(1)}/5
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600 font-medium">Potential Assets to Build:</p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li className="flex gap-2 items-start">
                        <span className="text-emerald-400">→</span>
                        <span>{theme.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} ROI Calculator</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-emerald-400">→</span>
                        <span>Comparison: RiscLens vs. {theme.split('_')[0]}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
            {Object.keys(clusters).length === 0 && (
              <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-400 italic">Clusters will appear here once pain signals are scanned.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
