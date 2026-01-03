'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDropdownIntent } from './useDropdownIntent';

const CTA_HREF = '/soc-2-readiness-index';

export default function Header() {
  const {
    open: isGuidesOpen,
    scheduleOpen: scheduleGuidesOpen,
    scheduleClose: scheduleGuidesClose,
    immediateOpen: openGuides,
    immediateClose: closeGuides,
    clearTimers: clearGuidesTimers,
  } = useDropdownIntent();
  const {
    open: isIndustriesOpen,
    scheduleOpen: scheduleIndustriesOpen,
    scheduleClose: scheduleIndustriesClose,
    immediateOpen: openIndustries,
    immediateClose: closeIndustries,
    clearTimers: clearIndustriesTimers,
  } = useDropdownIntent();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const menusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeIndustries();
      }
      if (guidesRef.current && !guidesRef.current.contains(event.target as Node)) {
        closeGuides();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeIndustries();
        setMobileOpen(false);
        closeGuides();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      clearGuidesTimers();
      clearIndustriesTimers();
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 4);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      setShowMobileMenu(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setShowMobileMenu(false), 200);
      document.body.style.overflow = '';
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all relative ${
        isScrolled ? 'bg-white/80 backdrop-blur border-slate-200/80 shadow-sm' : 'bg-white/95 border-slate-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 md:h-[88px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center h-16 md:h-[88px]">
            <Image
  src="/logo/logo-wordmark.png"
  alt="RiscLens"
  width={242}
  height={115}
  priority
  className="h-full w-auto object-contain"
/>
          </div>
        </Link>


          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
              <Link href="/soc-2-cost" className="hover:text-brand-700 transition-colors">
                SOC 2 Cost
              </Link>
              <div className="relative" ref={guidesRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                  aria-expanded={isGuidesOpen}
                  aria-haspopup="menu"
                  aria-controls="guides-menu"
                  onClick={() => {
                    if (isGuidesOpen) {
                      closeGuides();
                    } else {
                      closeIndustries();
                      openGuides();
                    }
                  }}
                  onMouseEnter={() => {
                    closeIndustries();
                    scheduleGuidesOpen();
                  }}
                  onMouseLeave={() => scheduleGuidesClose()}
                  onFocus={() => {
                    closeIndustries();
                    openGuides();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isGuidesOpen) {
                        closeGuides();
                      } else {
                        closeIndustries();
                        openGuides();
                      }
                    }
                  }}
                >
                  Guides
                  <svg
                    className={`w-4 h-4 transition-transform ${isGuidesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id="guides-menu"
                  role="menu"
                  aria-hidden={!isGuidesOpen}
                  className={`absolute mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-md focus:outline-none transition ease-out duration-150 transform ${
                    isGuidesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                  onMouseEnter={() => {
                    closeIndustries();
                    scheduleGuidesOpen();
                  }}
                  onMouseLeave={() => scheduleGuidesClose()}
                >
                    <Link
                      href="/soc-2-cost"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded-t-lg"
                    >
                      SOC 2 Cost
                    </Link>
                    <Link
                      href="/soc-2-timeline"
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                    >
                      SOC 2 Timeline
                    </Link>
                    <Link
                    href="/soc-2-type-i-vs-type-ii"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    Type I vs Type II
                  </Link>
                  <Link
                    href="/soc-2-readiness-checklist"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    Readiness Checklist
                  </Link>
                  <Link
                    href="/soc-2-cost-breakdown"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    Cost Breakdown
                  </Link>
                  <Link
                    href="/when-do-you-need-soc-2"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    When Do You Need SOC 2?
                  </Link>
                  <Link
                    href="/soc-2-readiness/saas"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    SOC 2 for SaaS
                  </Link>
                  <Link
                    href="/soc-2-readiness/fintech"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    SOC 2 for Fintech
                  </Link>
                  <Link
                    href="/soc-2-readiness/startups"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    SOC 2 for Startups
                  </Link>
                  <Link
                    href="/soc-2-readiness/enterprise-sales"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    SOC 2 for Enterprise Sales
                  </Link>
                  <Link
                    href="/soc-2-vs-iso-27001"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded-b-lg"
                  >
                    SOC 2 vs ISO 27001
                  </Link>
                  </div>
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                  aria-expanded={isIndustriesOpen}
                  aria-haspopup="menu"
                  aria-controls="industries-menu"
                  onClick={() => {
                    if (isIndustriesOpen) {
                      closeIndustries();
                    } else {
                      closeGuides();
                      openIndustries();
                    }
                  }}
                  onMouseEnter={() => {
                    closeGuides();
                    scheduleIndustriesOpen();
                  }}
                  onMouseLeave={() => scheduleIndustriesClose()}
                  onFocus={() => {
                    closeGuides();
                    openIndustries();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isIndustriesOpen) {
                        closeIndustries();
                      } else {
                        closeGuides();
                        openIndustries();
                      }
                    }
                  }}
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
                <div
                  id="industries-menu"
                  role="menu"
                  aria-hidden={!isIndustriesOpen}
                  className={`absolute mt-2 w-40 rounded-xl border border-slate-200 bg-white shadow-md focus:outline-none transition ease-out duration-150 transform ${
                    isIndustriesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                  onMouseEnter={() => {
                    closeGuides();
                    scheduleIndustriesOpen();
                  }}
                  onMouseLeave={() => scheduleIndustriesClose()}
                >
                  <Link
                    href="/soc-2-readiness/saas"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded-t-lg"
                  >
                    SaaS
                  </Link>
                  <Link
                    href="/soc-2-readiness/fintech"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded-b-lg"
                  >
                    Fintech
                  </Link>
                </div>
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
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-brand-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
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

      {showMobileMenu && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className={`md:hidden fixed inset-0 bg-slate-900/30 transition-opacity duration-200 ease-out ${
              isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileOpen(false)}
          />

          <div
            className={`md:hidden absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out ${
              isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="px-4 py-3 space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Guides</p>
                <div className="pl-3 space-y-2">
                  <Link
                    href="/soc-2-cost"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 Cost
                  </Link>
                  <Link
                    href="/soc-2-timeline"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 Timeline
                  </Link>
                  <Link
                    href="/soc-2-type-i-vs-type-ii"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Type I vs Type II
                  </Link>
                  <Link
                    href="/soc-2-readiness-checklist"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Readiness Checklist
                  </Link>
                  <Link
                    href="/soc-2-cost-breakdown"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Cost Breakdown
                  </Link>
                  <Link
                    href="/when-do-you-need-soc-2"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    When Do You Need SOC 2?
                  </Link>
                  <Link
                    href="/soc-2-readiness/saas"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 for SaaS
                  </Link>
                  <Link
                    href="/soc-2-readiness/fintech"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 for Fintech
                  </Link>
                  <Link
                    href="/soc-2-readiness/startups"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 for Startups
                  </Link>
                  <Link
                    href="/soc-2-readiness/enterprise-sales"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 for Enterprise Sales
                  </Link>
                  <Link
                    href="/soc-2-vs-iso-27001"
                    className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    SOC 2 vs ISO 27001
                  </Link>
                </div>
              </div>
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
        </>
      )}
    </header>
  );
}
