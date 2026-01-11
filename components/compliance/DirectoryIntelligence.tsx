'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SignalScore } from './SignalScore';

interface Company {
  name: string;
  slug: string;
  signal_score: number;
  domain: string;
  public_signals: any;
  updated_at?: string;
}

interface DirectoryIntelligenceProps {
  companies: Company[];
}

export function DirectoryIntelligence({ companies }: DirectoryIntelligenceProps) {
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(1);
  const [filterSignals, setFilterSignals] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'updated' | 'name'>('score');

  const signalOptions = [
    { label: 'SOC 2 Mention', key: 'mentions_soc2' },
    { label: 'Trust Center', key: 'has_trust_page' },
    { label: 'Security Page', key: 'has_security_page' },
    { label: 'Compliance Tool', key: 'mentions_compliance_tool' },
  ];

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const toggleCompare = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCompanies(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((c) => {
        const matchesSearch = 
          c.name.toLowerCase().includes(search.toLowerCase()) || 
          c.domain.toLowerCase().includes(search.toLowerCase());
        
        const matchesScore = c.signal_score >= minScore;
        
        const matchesSignals = filterSignals.every(
          (s) => c.public_signals?.[s] === true
        );
        
        return matchesSearch && matchesScore && matchesSignals;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.signal_score - a.signal_score;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'updated') {
          const dateA = new Date(a.updated_at || 0).getTime();
          const dateB = new Date(b.updated_at || 0).getTime();
          return dateB - dateA;
        }
        return 0;
      });
  }, [companies, search, minScore, filterSignals, sortBy]);

  const toggleSignalFilter = (key: string) => {
    setFilterSignals((prev) => 
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const getSignalsSummary = (signals: any) => {
    const parts = [];
    if (signals.has_trust_page) parts.push("trust center");
    if (signals.has_security_page) parts.push("security page");
    if (signals.mentions_soc2) parts.push("SOC 2 mention");
    
    if (parts.length === 0) return "Public security signals detected";
    return parts.join(", ") + " detected";
  };

  return (
    <div className="space-y-8">
      {/* Search and Advanced Filters Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by company name or domain (e.g. Stripe, vanta.com)..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex-shrink-0 flex gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="block w-full pl-3 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl"
            >
              <option value="score">Highest Signal Score</option>
              <option value="updated">Recently Updated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-50">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Filters:</span>
          <div className="flex flex-wrap gap-2">
            {signalOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => toggleSignalFilter(opt.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filterSignals.includes(opt.key)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">Min Score:</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="10"
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs font-bold text-blue-600 w-6">{minScore}+</span>
          </div>
        </div>
      </div>

          {/* Results Density Header */}
          <div className="flex justify-between items-center px-2">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{filteredCompanies.length}</span> companies
            </p>
            {selectedCompanies.length > 0 && (
              <div className="hidden md:flex items-center gap-4 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-4">
                <span className="text-xs font-bold text-blue-700">{selectedCompanies.length} selected</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedCompanies([])}
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-600 uppercase"
                  >
                    Clear
                  </button>
                  <Link 
                    href={`/compliance/compare?slugs=${selectedCompanies.join(',')}`}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Compare Now →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Floating Compare Bar */}
          {selectedCompanies.length > 0 && (
            <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom-8">
              <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-xl bg-gray-900/90">
                <div>
                  <p className="text-sm font-bold">{selectedCompanies.length} companies selected</p>
                  <button 
                    onClick={() => setSelectedCompanies([])}
                    className="text-xs text-gray-400 font-bold uppercase hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <Link 
                  href={`/compliance/compare?slugs=${selectedCompanies.join(',')}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg active:scale-95 transition-transform"
                >
                  Compare Now
                </Link>
              </div>
            </div>
          )}

          {/* Intelligence-Grade Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Link 
              key={company.slug} 
              href={`/compliance/directory/${company.slug}`}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all p-6 group h-full relative"
            >
              {/* Selection Checkbox for Compare */}
              <div 
                onClick={(e) => toggleCompare(e, company.slug)}
                className={`absolute top-3 left-3 z-20 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  selectedCompanies.includes(company.slug) 
                    ? 'bg-blue-600 border-blue-600 shadow-lg scale-110' 
                    : 'bg-white/60 border-gray-200/80 md:opacity-40 md:group-hover:opacity-100 hover:border-blue-400 hover:bg-white shadow-sm'
                }`}
              >
                {selectedCompanies.includes(company.slug) ? (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-blue-200 transition-colors" />
                )}
              </div>

              <div className="flex justify-between items-start gap-4 mb-4 pl-8">
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>
                    {company.signal_score > 70 && (
                      <span className="flex-shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-tighter">
                        High Transparency
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{company.domain}</p>
                </div>
                <div className="flex-shrink-0">
                  <SignalScore score={company.signal_score} size="sm" minimal={true} />
                </div>
              </div>
              
              <div className="mt-2 space-y-3">
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 italic border-l-2 border-gray-100 pl-3">
                  {getSignalsSummary(company.public_signals)}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {company.public_signals.mentions_soc2 && (
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase border border-green-100">SOC 2</span>
                  )}
                  {company.public_signals.has_trust_page && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase border border-blue-100">Trust Center</span>
                  )}
                  {company.public_signals.has_security_page && (
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded uppercase border border-purple-100">Security</span>
                  )}
                  {company.public_signals.mentions_compliance_tool && (
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold rounded uppercase border border-orange-100">Automation</span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Last Update</span>
                  <span className="text-xs font-medium text-gray-600">
                    {company.updated_at ? new Date(company.updated_at).toLocaleDateString() : 'Active Discovery'}
                  </span>
                </div>
                
                <div className="flex items-center text-blue-600 text-xs font-bold group-hover:translate-x-1 transition-transform">
                  INTELLIGENCE
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      
      {filteredCompanies.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">No matching profiles found</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2">
            Try adjusting your filters or search terms to find the security intelligence you're looking for.
          </p>
          <button 
            onClick={() => { setSearch(''); setMinScore(0); setFilterSignals([]); }}
            className="mt-6 text-blue-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
