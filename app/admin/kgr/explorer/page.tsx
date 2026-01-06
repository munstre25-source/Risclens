'use client';

import { useState, useEffect } from 'react';

interface ExploredKeyword {
  keyword: string;
  intent: string;
  revenue_score: number;
  category: string;
}

export default function KeywordExplorerPage() {
  const [seed, setSeed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ExploredKeyword[]>([]);
  const [savedKeywords, setSavedKeywords] = useState<Set<string>>(new Set());
  const [painSignals, setPainSignals] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/intelligence')
      .then(res => res.json())
      .then(data => setPainSignals(data.signals || []));
  }, []);

  const handleExplore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed) return;

    setIsLoading(true);
    setResults([]);
    try {
      const res = await fetch('/api/admin/keywords/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed }),
      });
      const data = await res.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Error exploring keywords:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (keyword: ExploredKeyword) => {
    try {
      const res = await fetch('/api/admin/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: keyword.keyword,
          category: keyword.category,
          intent_type: keyword.intent,
          revenue_score: keyword.revenue_score,
        }),
      });
      if (res.ok) {
        setSavedKeywords(prev => new Set(prev).add(keyword.keyword));
      }
    } catch (error) {
      console.error('Error saving keyword:', error);
    }
  };

  // Group by category
  const grouped = results.reduce((acc, curr) => {
    const cat = curr.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {} as Record<string, ExploredKeyword[]>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Keyword Explorer</h1>
          <p className="text-sm text-slate-500 italic">"AnswerThePublic" style discovery engine</p>
        </div>
      </div>

      <div className="card p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
        <form onSubmit={handleExplore} className="flex gap-4">
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder="Enter a seed keyword (e.g. SOC 2, Pentest, Compliance)"
          />
          <button
            type="submit"
            disabled={isLoading || !seed}
            className="px-6 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Exploring...' : 'Generate Ideas'}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
          <p className="text-slate-500 animate-pulse">AI is brainstorming and categorizing keywords...</p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">{category}</h3>
                <span className="text-xs text-slate-400 font-medium">{items.length} ideas</span>
              </div>
              <div className="p-2 space-y-1">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">
                    <div className="min-w-0">
                        <p className="text-sm text-slate-700 truncate font-medium">{item.keyword}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {painSignals.some(s => item.keyword.toLowerCase().includes(s.normalized_theme.replace('_', ' '))) && (
                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" title="Aligns with market pain"></span>
                          )}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${

                          item.intent === 'Commercial' || item.intent === 'Transactional' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.intent}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Score: {item.revenue_score}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSave(item)}
                      disabled={savedKeywords.has(item.keyword)}
                      className={`p-1.5 rounded-md transition-colors ${
                        savedKeywords.has(item.keyword)
                          ? 'text-emerald-500 bg-emerald-50'
                          : 'text-slate-400 hover:text-brand-600 hover:bg-brand-50 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {savedKeywords.has(item.keyword) ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && !seed && (
        <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-slate-900 font-semibold">Start your search</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">Enter a topic to discover what people are asking Google about compliance.</p>
        </div>
      )}
    </div>
  );
}
