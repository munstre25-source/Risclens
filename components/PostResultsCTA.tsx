'use client';

import Link from 'next/link';

interface PostResultsCTAProps {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref?: string;
  primaryCtaOnClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaOnClick?: () => void;
  footnote?: string;
}

export function PostResultsCTA({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  primaryCtaOnClick,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaOnClick,
  footnote,
}: PostResultsCTAProps) {
  const PrimaryButton = () => {
    if (primaryCtaHref) {
      return (
        <Link
          href={primaryCtaHref}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-brand-700 transition w-full sm:w-auto"
        >
          {primaryCtaLabel}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      );
    }
    return (
      <button
        onClick={primaryCtaOnClick}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-brand-700 transition w-full sm:w-auto"
      >
        {primaryCtaLabel}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    );
  };

  const SecondaryButton = () => {
    if (!secondaryCtaLabel) return null;
    if (secondaryCtaHref) {
      return (
        <Link
          href={secondaryCtaHref}
          className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition"
        >
          {secondaryCtaLabel}
        </Link>
      );
    }
    return (
      <button
        onClick={secondaryCtaOnClick}
        className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition"
      >
        {secondaryCtaLabel}
      </button>
    );
  };

  return (
    <div className="card my-8 border-2 border-brand-100 bg-gradient-to-br from-white to-brand-50/30 p-6 sm:p-8">
      <div className="max-w-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <PrimaryButton />
          <SecondaryButton />
        </div>
        
        {footnote && (
          <p className="text-xs text-gray-500 mt-4 italic">{footnote}</p>
        )}
      </div>
    </div>
  );
}

export function PostResultsDivider() {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-sm text-gray-400 uppercase tracking-widest font-medium">Next Steps</span>
      </div>
    </div>
  );
}
