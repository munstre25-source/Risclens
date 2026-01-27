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
        month: 'short'
      })
    : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short'
      });

  return (
    <div className="border-t border-slate-200 pt-4 mt-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
        <span>Last updated {formattedDate}</span>
        <span className="hidden sm:inline">·</span>
        <span>By {author}</span>
        {methodology && (
          <>
            <span className="hidden sm:inline">·</span>
            <Link 
              href="/methodology" 
              className="text-slate-600 hover:text-slate-900 hover:underline"
            >
              Our methodology
            </Link>
          </>
        )}
        {reviewCount && reviewCount > 0 && (
          <>
            <span className="hidden sm:inline">·</span>
            <span>{reviewCount.toLocaleString()} reviews analyzed</span>
          </>
        )}
      </div>

      {sources.length > 0 && (
        <p className="text-xs text-slate-400 mt-2">
          Sources: {sources.join(', ')}
        </p>
      )}
    </div>
  );
}

export function MethodologyBadge() {
  return (
    <Link 
      href="/methodology"
      className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
    >
      See methodology
    </Link>
  );
}

export function DataFreshnessIndicator({ lastUpdated }: { lastUpdated: string }) {
  const dateObj = new Date(lastUpdated);
  const formatted = dateObj.toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <span className="text-xs text-slate-500">
      Updated {formatted}
    </span>
  );
}

export function ExpertAuthorBox() {
  return (
    <div className="border-t border-slate-200 pt-6 mt-8">
      <p className="text-sm text-slate-600 leading-relaxed">
        <span className="font-medium text-slate-900">About this data:</span> Our research team reviews and verifies platform information through vendor relationships, public documentation, and market analysis. Data is updated regularly.
      </p>
      <Link 
        href="/methodology" 
        className="text-sm text-slate-500 hover:text-slate-700 hover:underline mt-2 inline-block"
      >
        Learn about our methodology →
      </Link>
    </div>
  );
}

export function TrustSignals() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
  
  return (
    <div className="text-sm text-slate-500 space-x-4">
      <span>Independent research</span>
      <span>·</span>
      <span>No vendor payments</span>
      <span>·</span>
      <span>Updated {currentDate}</span>
    </div>
  );
}
