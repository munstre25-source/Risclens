'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SearchIntentCTA } from '@/components/SearchIntentCTA';
import { search, SearchResult } from '@/src/search/search';
import { track } from '@/src/analytics/track';

const CATEGORIES = ['All', 'SOC 2', 'Pen Test', 'Vendor Risk', 'General'];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('c') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Perform search
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = search(query, category);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, category]);

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'All') params.set('c', category);
    
    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [query, category]);

  // Analytics tracking (debounced)
  useEffect(() => {
    if (query.length < 2) return;
    
    const timer = setTimeout(() => {
      track('search_performed', {
        query,
        category,
        resultsCount: results.length
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [query, category, results.length]);

  const handleResultClick = (result: SearchResult, position: number) => {
    track('search_result_clicked', {
      query,
      url: result.url,
      position,
      category: result.category
    });
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const tokens = highlight.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    if (tokens.length === 0) return text;

    const regex = new RegExp(`(${tokens.join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) => 
          tokens.some(t => part.toLowerCase() === t) ? (
            <mark key={i} className="bg-yellow-100 text-slate-900 rounded-sm px-0.5">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="container py-12 min-h-[70vh]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Search</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides, calculators, and controls..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-lg shadow-sm"

              autoFocus
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="w-full md:w-48">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-lg appearance-none bg-white shadow-sm"

              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <SearchIntentCTA query={query} />

        {query.length >= 2 ? (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-bottom border-slate-100">
              <p className="text-slate-500 font-medium">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </p>
            </div>

            {results.length > 0 ? (
              <div className="space-y-8">
                {results.map((result, index) => (
                  <div key={result.url} className="group">
                    <Link 
                      href={result.url}
                      onClick={() => handleResultClick(result, index + 1)}
                      className="block"
                    >
                      <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                            {result.category}
                          </span>
                          <span className="text-sm text-slate-400 font-mono">{result.url}</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-2">
                          {highlightText(result.title, query)}
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                          {highlightText(result.description, query)}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 text-lg mb-2">No results found for "{query}"</p>
                  <p className="text-slate-400">Try a different keyword or adjust your category filter.</p>
                </div>
              )}
            </div>
          ) : query.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 italic">Keep typing to search...</p>
            </div>
          ) : (
            <div>
              <h3 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-6">Popular Topics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'SOC 2 Cost Guide', q: 'cost' },
                  { label: 'Penetration Testing', q: 'pentest' },
                  { label: 'Readiness Calculator', q: 'readiness' },
                  { label: 'Vendor Risk Management', q: 'vendor' },
                ].map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => setQuery(topic.q)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-brand-500/30 hover:bg-brand-50 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-700">{topic.label}</span>
                  </button>
                ))}
              </div>
            </div>
        )}
      </div>
    </div>
  );
}
