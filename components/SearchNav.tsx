'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { search, SearchResult } from '@/src/search/search';
import { track } from '@/src/analytics/track';

export function SearchNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search logic
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = search(query, 'All').slice(0, 6); // Limit to top 6 for nav
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(query.length > 0);
    }
    setActiveIndex(-1);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
          e.preventDefault();
          const selected = results[activeIndex];
          if (selected) {
            router.push(selected.url);
            setIsOpen(false);
            setQuery('');
          }
        } else if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex, router]);

  const handleResultClick = (result: SearchResult) => {
    track('search_nav_click', { query, url: result.url });
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[200px] xl:max-w-[280px]">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Quick search..."
          className="block w-full pl-9 pr-12 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/10 focus:border-brand-500 focus:bg-white transition-all placeholder:text-slate-400"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
          <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-medium text-slate-400 bg-white">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full min-w-[320px] right-0 lg:right-auto bg-white border border-slate-200 rounded-xl shadow-xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Top Results
                </div>
                {results.map((result, index) => (
                  <Link
                    key={result.url}
                    href={result.url}
                    onClick={() => handleResultClick(result)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                      index === activeIndex ? 'bg-brand-50 text-brand-700' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold truncate">{result.title}</span>
                        <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded shrink-0">
                          {result.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{result.description}</p>
                    </div>
                  </Link>
                ))}
                <div className="mt-1 pt-1 border-t border-slate-100">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center p-2 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    View all results for "{query}"
                  </Link>
                </div>
              </div>
            ) : query.length >= 2 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-500">No results for "{query}"</p>
                <Link 
                  href="/search" 
                  className="text-xs text-brand-600 hover:underline mt-2 inline-block"
                  onClick={() => setIsOpen(false)}
                >
                  Try advanced search
                </Link>
              </div>
            ) : (
              <div className="p-3">
                <div className="px-1 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Popular Searches
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { label: 'SOC 2 Cost Guide', q: 'cost' },
                    { label: 'Readiness Checklist', q: 'checklist' },
                    { label: 'Penetration Testing', q: 'pentest' },
                    { label: 'Vendor Risk ROI', q: 'roi' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setQuery(item.q)}
                      className="flex items-center gap-2 w-full p-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-colors text-left"
                    >
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
