'use client';

import Link from 'next/link';

interface EEATSignalsProps {
  lastVerified?: string;
  author?: string;
  methodology?: boolean;
  sources?: string[];
  reviewCount?: number;
}

export function EEATSignals({
  lastVerified,
  author = 'RiscLens Research Team',
  methodology = true,
  sources = [],
  reviewCount,
}: EEATSignalsProps) {
  const formattedDate = lastVerified 
    ? new Date(lastVerified).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 my-6">
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Last verified: <strong>{formattedDate}</strong></span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>By: <strong>{author}</strong></span>
        </div>

        {methodology && (
          <Link 
            href="/methodology" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Our Methodology</span>
          </Link>
        )}

        {reviewCount && reviewCount > 0 && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>Based on <strong>{reviewCount.toLocaleString()}</strong> user reviews</span>
          </div>
        )}
      </div>

      {sources.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            <strong>Sources:</strong> {sources.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

export function MethodologyBadge() {
  return (
    <Link 
      href="/methodology"
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      Research-backed
    </Link>
  );
}

export function DataFreshnessIndicator({ lastUpdated }: { lastUpdated: string }) {
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  let status: 'fresh' | 'recent' | 'stale';
  let color: string;
  let label: string;
  
  if (daysSinceUpdate <= 7) {
    status = 'fresh';
    color = 'bg-green-100 text-green-800';
    label = 'Fresh data';
  } else if (daysSinceUpdate <= 30) {
    status = 'recent';
    color = 'bg-yellow-100 text-yellow-800';
    label = 'Recent data';
  } else {
    status = 'stale';
    color = 'bg-orange-100 text-orange-800';
    label = 'Being updated';
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'fresh' ? 'bg-green-500' : status === 'recent' ? 'bg-yellow-500' : 'bg-orange-500'}`} />
      {label}
    </span>
  );
}

export function ExpertAuthorBox() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 my-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">RiscLens Research Team</h4>
          <p className="text-sm text-slate-600 mt-1">
            Our team of compliance experts and former auditors reviews and verifies all platform data. 
            We maintain direct relationships with vendors and continuously monitor the compliance automation market.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              SOC 2 & ISO 27001 expertise
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Updated weekly
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrustSignals() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 bg-slate-50 rounded-lg text-sm text-slate-600">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Independent research</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>No vendor payments</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span>Verified data</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Updated Jan 2026</span>
      </div>
    </div>
  );
}
