'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CTA_HREF = '/soc-2-readiness-index';

export default function Header() {
  const [isIndustriesOpen, setIndustriesOpen] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIndustriesOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
  src="/logo/logo-wordmark.png"
  alt="RiscLens"
  width={360}
  height={164}
  priority
  className="h-28 md:h-32 w-auto object-contain"
/>

        </Link>


        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/soc-2-cost" className="hover:text-brand-700 transition-colors">
              SOC 2 Cost
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                aria-expanded={isIndustriesOpen}
                aria-haspopup="true"
                onClick={() => setIndustriesOpen((open) => !open)}
              >
                Industries
                <svg
                  className={`w-4 h-4 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isIndustriesOpen && (
                <div className="absolute mt-2 w-40 rounded-lg border border-slate-200 bg-white shadow-md focus:outline-none">
                  <Link
                    href="/soc-2-readiness/saas"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded-t-lg"
                  >
                    SaaS
                  </Link>
                  <Link
                    href="/soc-2-readiness/fintech"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded-b-lg"
                  >
                    Fintech
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <Link
            href={CTA_HREF}
            className="hidden md:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            Get Readiness Score
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/soc-2-cost"
              className="block text-sm font-medium text-slate-800 hover:text-brand-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              SOC 2 Cost
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">Industries</p>
              <div className="pl-3 space-y-2">
                <Link
                  href="/soc-2-readiness/saas"
                  className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  SaaS
                </Link>
                <Link
                  href="/soc-2-readiness/fintech"
                  className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Fintech
                </Link>
              </div>
            </div>
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Get Readiness Score
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
