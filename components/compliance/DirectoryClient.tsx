'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SignalScore } from './SignalScore';

interface Company {
  company_name: string;
  slug: string;
  signal_score: number;
  domain: string;
  public_signals: {
    has_security_page?: boolean;
    has_trust_page?: boolean;
    mentions_soc2?: boolean;
  };
}

interface DirectoryClientProps {
  initialCompanies: Company[];
}

export function DirectoryClient({ initialCompanies }: DirectoryClientProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'trust' | 'security' | 'soc2'>('all');

  const getSignalsSummary = (signals: any) => {
    const parts = [];
    if (signals.has_trust_page) parts.push("trust center");
    if (signals.has_security_page) parts.push("security page");
    if (signals.mentions_soc2) parts.push("SOC 2 mention (public)");
    
    if (parts.length === 0) return "Public security signals detected (public)";
    
    let text = "";
    if (parts.length === 1) {
      text = parts[0];
    } else if (parts.length === 2) {
      text = `${parts[0]} and ${parts[1]}`;
    } else {
      text = parts.join(", ");
    }
    
    const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
    return capitalized.includes("(public)") ? capitalized : `${capitalized} detected (public)`;
  };

  const filteredCompanies = useMemo(() => {
    return initialCompanies.filter((company) => {
      const matchesSearch = 
        company.company_name.toLowerCase().includes(search.toLowerCase()) ||
        company.domain.toLowerCase().includes(search.toLowerCase());
      
      const matchesFilter = 
        filter === 'all' ||
        (filter === 'trust' && company.public_signals.has_trust_page) ||
        (filter === 'security' && company.public_signals.has_security_page) ||
        (filter === 'soc2' && company.public_signals.mentions_soc2);
      
      return matchesSearch && matchesFilter;
    });
  }, [initialCompanies, search, filter]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search 100+ companies by name or domain..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('trust')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'trust' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Trust Centers
          </button>
          <button
            onClick={() => setFilter('security')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'security' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Security Pages
          </button>
          <button
            onClick={() => setFilter('soc2')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'soc2' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            SOC 2 Mentions
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center px-1">
        <p className="text-sm text-gray-500 font-medium">
          Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
          {search && ` matching "${search}"`}
          {filter !== 'all' && ` with ${filter === 'trust' ? 'Trust Center' : filter === 'security' ? 'Security Page' : 'SOC 2 mention'}`}
        </p>
        {(search || filter !== 'all') && (
          <button 
            onClick={() => { setSearch(''); setFilter('all'); }}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Link 
            key={company.slug} 
            href={`/compliance/directory/${company.slug}`}
            className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6 group h-full"
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {company.company_name} SOC 2 & Security Signals
                </h3>
                <p className="text-sm text-gray-500 mt-1">{company.domain}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic">
                  {getSignalsSummary(company.public_signals)}
                </p>
              </div>
              <div className="flex-shrink-0">
                <SignalScore score={company.signal_score} size="sm" minimal={true} />
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {company.public_signals.has_security_page && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Security Page</span>
                )}
                {company.public_signals.has_trust_page && (
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">Trust Center</span>
                )}
                {company.public_signals.mentions_soc2 && (
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">SOC 2 Mention</span>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center text-blue-600 text-sm font-medium">
              View Full Profile
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="mx-auto w-12 h-12 text-gray-300 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No companies found matching your criteria.</p>
          <button 
            onClick={() => { setSearch(''); setFilter('all'); }}
            className="mt-4 text-blue-600 hover:underline font-medium"
          >
            Clear all filters and search
          </button>
        </div>
      )}
    </div>
  );
}
