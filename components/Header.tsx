'use client';

import { createPortal } from 'react-dom';
import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CTA, navConfig } from '@/lib/navConfig';
import { useDropdownIntent } from './useDropdownIntent';

const DROPDOWN_PANEL_CLASS =
  'absolute z-[9999] rounded-xl border border-slate-200 bg-white shadow-lg max-h-[70vh] overflow-auto focus:outline-none transition ease-out duration-150 transform';
const DROPDOWN_WIDTH = 240;

type DropdownPortalProps = {
  id: string;
  isOpen: boolean;
  anchorRef: RefObject<HTMLElement>;
  children: ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ariaLabel?: string;
};

function DropdownPortal({ id, isOpen, anchorRef, children, onMouseEnter, onMouseLeave, ariaLabel }: DropdownPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const centeredLeft = rect.left + rect.width / 2 - DROPDOWN_WIDTH / 2 + window.scrollX;
      const clampedLeft = Math.max(
        window.scrollX + 8,
        Math.min(centeredLeft, window.scrollX + window.innerWidth - DROPDOWN_WIDTH - 8),
      );
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: clampedLeft,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, anchorRef]);

  if (!mounted) return null;

  return createPortal(
    <div
      id={id}
      role="menu"
      aria-hidden={!isOpen}
      aria-label={ariaLabel}
      data-dropdown-panel="true"
      data-dropdown-id={id}
      ref={panelRef}
      style={{ top: position.top, left: position.left, width: DROPDOWN_WIDTH }}
      className={`${DROPDOWN_PANEL_CLASS} ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>,
    document.body,
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const socIntent = useDropdownIntent();
  const pentestIntent = useDropdownIntent();
  const vendorIntent = useDropdownIntent();
  const resourcesIntent = useDropdownIntent();

  const [isMobileOpen, setMobileOpen] = useState(false);
  const [mobileSocOpen, setMobileSocOpen] = useState(false);
  const [mobilePentestOpen, setMobilePentestOpen] = useState(false);
  const [mobileVendorOpen, setMobileVendorOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const socRef = useRef<HTMLDivElement>(null);
  const pentestRef = useRef<HTMLDivElement>(null);
  const vendorRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const socMenu = navConfig.soc;
  const pentestMenu = navConfig.pentest;
  const vendorMenu = navConfig.vendor;
  const resourcesMenu = navConfig.resources;

  const isSocActive =
    pathname === '/' ||
    pathname.startsWith('/soc-2') ||
    pathname.startsWith('/soc-2-') ||
    pathname.startsWith('/when-do-you-need-soc-2') ||
    pathname.startsWith('/compliance-roi') ||
    pathname === '/soc-2-readiness-calculator';
  const isPentestActive = pathname.startsWith('/penetration-testing');
  const isVendorActive = pathname.startsWith('/vendor-risk-assessment');

  const primaryCtaHref = isPentestActive
    ? '/penetration-testing/cost-estimator'
    : isVendorActive
    ? '/vendor-risk-assessment/roi-calculator'
    : CTA.href;

  const primaryCtaLabel = isPentestActive
    ? 'Pentest Cost Estimator'
    : isVendorActive
    ? 'VRA ROI Calculator'
    : CTA.label;

  const closeAllDropdowns = useCallback(() => {
    socIntent.immediateClose();
    pentestIntent.immediateClose();
    vendorIntent.immediateClose();
    resourcesIntent.immediateClose();
  }, [socIntent, pentestIntent, vendorIntent, resourcesIntent]);

  const handleMobilePrimaryCta = useCallback(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    router.push(primaryCtaHref);
  }, [primaryCtaHref, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (isMobileOpen && (mobileMenuRef.current?.contains(target) || mobileToggleRef.current?.contains(target))) {
        return;
      }

      const isInside = [
        { anchor: socRef, menuId: 'soc-menu' },
        { anchor: pentestRef, menuId: 'pentest-menu' },
        { anchor: vendorRef, menuId: 'vendor-menu' },
        { anchor: resourcesRef, menuId: 'resources-menu' },
      ].some(({ anchor, menuId }) => {
        const anchorMatch = anchor.current?.contains(target);
        const panel = document.getElementById(menuId);
        const panelMatch = panel?.contains(target);
        return anchorMatch || panelMatch;
      });

      if (!isInside) {
        closeAllDropdowns();
        setMobileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeAllDropdowns();
        setMobileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeAllDropdowns, isMobileOpen]);

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) {
      setMobileSocOpen(false);
      setMobilePentestOpen(false);
      setMobileVendorOpen(false);
      setMobileResourcesOpen(false);
    }
  }, [isMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        router.push('/search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const menuItemClass =
    'block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors';
  const menuItemWithBadgeClass =
    'flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors';
  const viewAllClass =
    'block px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors';
  const sectionLabelClass = 'px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400';

  const Badge = ({ label }: { label?: string }) => (
    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded">{label || 'Tool'}</span>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled ? 'bg-white/95 backdrop-blur border-slate-200 shadow-sm' : 'bg-white border-slate-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 lg:h-24 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <Image
                  src="/logo/logo-wordmark.png"
                  alt="RiscLens"
                  width={280}
                  height={84}
                  priority
                  className="h-16 lg:h-20 w-auto object-contain"
                />
              </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <div
            ref={socRef}
            className="relative"
            onMouseEnter={() => {
              pentestIntent.immediateClose();
              vendorIntent.immediateClose();
              resourcesIntent.immediateClose();
              socIntent.scheduleOpen();
            }}
            onMouseLeave={() => socIntent.scheduleClose()}
          >
            <Link
              href="/soc-2"
              className={`flex items-center gap-1.5 px-3 py-2 text-base font-bold rounded-lg transition-colors ${
                isSocActive ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
              }`}
            >
              SOC 2
              <svg className={`w-4 h-4 transition-transform ${socIntent.open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <DropdownPortal
              id="soc-menu"
              isOpen={socIntent.open}
              anchorRef={socRef}
              onMouseEnter={() => socIntent.scheduleOpen()}
              onMouseLeave={() => socIntent.scheduleClose()}
            >
              <Link href={socMenu.overview.href} role="menuitem" className={`${menuItemClass} rounded-t-xl font-medium`}>
                {socMenu.overview.label}
              </Link>
              <div className={sectionLabelClass}>Tools</div>
                <Link href={socMenu.primary.href} role="menuitem" className={menuItemWithBadgeClass}>
                  {socMenu.primary.label}
                  <Badge label={socMenu.primary.badge} />
                </Link>
                {socMenu.tools.map((item) => (
                  <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                    {item.label}
                    <Badge label={item.badge} />
                  </Link>
                ))}
              <div className="my-1 border-t border-slate-100" />
              <div className={sectionLabelClass}>Guides</div>
              {socMenu.guides.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <div className={sectionLabelClass}>By Industry</div>
              {socMenu.industries.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <Link href={socMenu.viewAll.href} role="menuitem" className={`${viewAllClass} rounded-b-xl`}>
                {socMenu.viewAll.label}
              </Link>
            </DropdownPortal>
          </div>

          <div
            ref={pentestRef}
            className="relative"
            onMouseEnter={() => {
              socIntent.immediateClose();
              vendorIntent.immediateClose();
              resourcesIntent.immediateClose();
              pentestIntent.scheduleOpen();
            }}
            onMouseLeave={() => pentestIntent.scheduleClose()}
          >
            <Link
              href="/penetration-testing"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                isPentestActive ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
              }`}
            >
              Penetration Testing
              <svg className={`w-4 h-4 transition-transform ${pentestIntent.open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <DropdownPortal
              id="pentest-menu"
              isOpen={pentestIntent.open}
              anchorRef={pentestRef}
              onMouseEnter={() => pentestIntent.scheduleOpen()}
              onMouseLeave={() => pentestIntent.scheduleClose()}
            >
              <Link href={pentestMenu.overview.href} role="menuitem" className={`${menuItemClass} rounded-t-xl font-medium`}>
                {pentestMenu.overview.label}
              </Link>
              <div className={sectionLabelClass}>Tools</div>
                <Link href={pentestMenu.primary.href} role="menuitem" className={menuItemWithBadgeClass}>
                  {pentestMenu.primary.label}
                  <Badge label={pentestMenu.primary.badge} />
                </Link>
                {pentestMenu.tools.map((item) => (
                  <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                    {item.label}
                    <Badge label={item.badge} />
                  </Link>
                ))}
              <div className="my-1 border-t border-slate-100" />
              <div className={sectionLabelClass}>Guides</div>
              {pentestMenu.guides.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <Link href={pentestMenu.viewAll.href} role="menuitem" className={`${viewAllClass} rounded-b-xl`}>
                {pentestMenu.viewAll.label}
              </Link>
            </DropdownPortal>
          </div>

            <div
              ref={vendorRef}
              className="relative"
              onMouseEnter={() => {
                socIntent.immediateClose();
                pentestIntent.immediateClose();
                resourcesIntent.immediateClose();
                vendorIntent.scheduleOpen();
              }}
              onMouseLeave={() => vendorIntent.scheduleClose()}
            >
              <Link
                href="/vendor-risk-assessment"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  isVendorActive ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
                }`}
              >
                Vendor Risk
                <svg className={`w-4 h-4 transition-transform ${vendorIntent.open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <DropdownPortal
                id="vendor-menu"
                isOpen={vendorIntent.open}
                anchorRef={vendorRef}
                onMouseEnter={() => vendorIntent.scheduleOpen()}
                onMouseLeave={() => vendorIntent.scheduleClose()}
              >
                <Link href={vendorMenu.overview.href} role="menuitem" className={`${menuItemClass} rounded-t-xl font-medium`}>
                  {vendorMenu.overview.label}
                </Link>
                <div className={sectionLabelClass}>Tools</div>
                  <Link href={vendorMenu.primary.href} role="menuitem" className={menuItemWithBadgeClass}>
                    {vendorMenu.primary.label}
                    <Badge label={vendorMenu.primary.badge} />
                  </Link>
                  {vendorMenu.tools.map((item) => (
                    <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                      {item.label}
                      <Badge label={item.badge} />
                    </Link>
                  ))}
                <div className="my-1 border-t border-slate-100" />
                <div className={sectionLabelClass}>Guides</div>
                {vendorMenu.guides.map((item) => (
                  <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                    {item.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <div className={sectionLabelClass}>By Industry</div>
                {vendorMenu.industries.map((item) => (
                  <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                    {item.label}
                  </Link>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <Link href={vendorMenu.viewAll.href} role="menuitem" className={`${viewAllClass} rounded-b-xl`}>
                  {vendorMenu.viewAll.label}
                </Link>
              </DropdownPortal>
            </div>

            <Link
              href="/compliance/directory"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname.startsWith('/compliance/directory') ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
              }`}
            >
              Directory
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold text-white bg-brand-500 rounded uppercase tracking-wider">New</span>
            </Link>


          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => {
              socIntent.immediateClose();
              pentestIntent.immediateClose();
              vendorIntent.immediateClose();
              resourcesIntent.scheduleOpen();
            }}
            onMouseLeave={() => resourcesIntent.scheduleClose()}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Resources
              <svg className={`w-4 h-4 transition-transform ${resourcesIntent.open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <DropdownPortal
              id="resources-menu"
              isOpen={resourcesIntent.open}
              anchorRef={resourcesRef}
              onMouseEnter={() => resourcesIntent.scheduleOpen()}
              onMouseLeave={() => resourcesIntent.scheduleClose()}
            >
              <Link href={resourcesMenu.about.href} role="menuitem" className={`${menuItemClass} rounded-t-xl font-medium`}>
                {resourcesMenu.about.label}
              </Link>
              <div className={sectionLabelClass}>Guides</div>
              {resourcesMenu.guides.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <div className={sectionLabelClass}>Comparisons</div>
              {resourcesMenu.comparisons.map((item) => (
                <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                  {item.label}
                </Link>
              ))}
              <div className="my-1 border-t border-slate-100" />
              <Link href={resourcesMenu.viewAll.href} role="menuitem" className={`${viewAllClass} rounded-b-xl`}>
                {resourcesMenu.viewAll.label}
              </Link>
            </DropdownPortal>
          </div>

          <Link
            href="/search"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden xl:inline text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50">
              ⌘K
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={primaryCtaHref}
            className="hidden lg:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            {primaryCtaLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            ref={mobileToggleRef}
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

      {showMobileMenu &&
        createPortal(
          <>
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className={`lg:hidden fixed inset-0 z-[9998] bg-slate-900/40 transition-opacity duration-200 ${
                isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setMobileOpen(false)}
            />

            <div
              ref={mobileMenuRef}
              className={`lg:hidden fixed inset-0 w-full h-[100dvh] z-[9999] bg-white shadow-2xl transition-all duration-200 ${
                isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="px-4 py-4 space-y-3 h-full overflow-y-auto overscroll-contain">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
                              <Image
                                src="/logo/logo-wordmark.png"
                                alt="RiscLens"
                                width={280}
                                height={82}
                                className="h-[100px] w-auto object-contain"
                              />
                          </Link>
                    <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-slate-900 bg-white"
                      onClick={() => {
                        setMobileSocOpen(!mobileSocOpen);
                      setMobilePentestOpen(false);
                      setMobileVendorOpen(false);
                      setMobileResourcesOpen(false);
                    }}
                  >
                    <span className={isSocActive ? 'text-brand-700' : ''}>SOC 2</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileSocOpen ? 'rotate-180 text-brand-700' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileSocOpen && (
                    <div className="px-4 pb-4 pt-2 space-y-2 bg-slate-50 border-t border-slate-100">
                      <Link href={socMenu.overview.href} className="block text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>
                        {socMenu.overview.label}
                      </Link>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Tools</p>
                        <Link href={socMenu.primary.href} className="flex items-center justify-between text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {socMenu.primary.label}
                          <Badge label={socMenu.primary.badge} />
                        </Link>
                        {socMenu.tools.map((item) => (
                          <Link key={item.href} href={item.href} className="flex items-center justify-between text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                            {item.label}
                            <Badge label={item.badge} />
                          </Link>
                        ))}
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Guides</p>
                      {socMenu.guides.map((item) => (
                        <Link key={item.href} href={item.href} className="block text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                      <Link href={socMenu.viewAll.href} className="block text-sm font-semibold text-brand-700 pt-2" onClick={() => setMobileOpen(false)}>
                        {socMenu.viewAll.label}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 bg-white"
                    onClick={() => {
                      setMobilePentestOpen(!mobilePentestOpen);
                      setMobileSocOpen(false);
                      setMobileVendorOpen(false);
                      setMobileResourcesOpen(false);
                    }}
                  >
                    <span className={isPentestActive ? 'text-brand-700' : ''}>Penetration Testing</span>
                    <svg className={`w-4 h-4 transition-transform ${mobilePentestOpen ? 'rotate-180 text-brand-700' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobilePentestOpen && (
                    <div className="px-4 pb-4 pt-2 space-y-2 bg-slate-50 border-t border-slate-100">
                      <Link href={pentestMenu.overview.href} className="block text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>
                        {pentestMenu.overview.label}
                      </Link>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Tools</p>
                        <Link href={pentestMenu.primary.href} className="flex items-center justify-between text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {pentestMenu.primary.label}
                          <Badge label={pentestMenu.primary.badge} />
                        </Link>
                        {pentestMenu.tools.map((item) => (
                          <Link key={item.href} href={item.href} className="flex items-center justify-between text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                            {item.label}
                            <Badge label={item.badge} />
                          </Link>
                        ))}
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Guides</p>
                      {pentestMenu.guides.map((item) => (
                        <Link key={item.href} href={item.href} className="block text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                      <Link href={pentestMenu.viewAll.href} className="block text-sm font-semibold text-brand-700 pt-2" onClick={() => setMobileOpen(false)}>
                        {pentestMenu.viewAll.label}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 bg-white"
                    onClick={() => {
                      setMobileVendorOpen(!mobileVendorOpen);
                      setMobileSocOpen(false);
                      setMobilePentestOpen(false);
                      setMobileResourcesOpen(false);
                    }}
                  >
                    <span className={isVendorActive ? 'text-brand-700' : ''}>Vendor Risk</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileVendorOpen ? 'rotate-180 text-brand-700' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileVendorOpen && (
                    <div className="px-4 pb-4 pt-2 space-y-2 bg-slate-50 border-t border-slate-100">
                      <Link href={vendorMenu.overview.href} className="block text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>
                        {vendorMenu.overview.label}
                      </Link>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Tools</p>
                        <Link href={vendorMenu.primary.href} className="flex items-center justify-between text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {vendorMenu.primary.label}
                          <Badge label={vendorMenu.primary.badge} />
                        </Link>
                        {vendorMenu.tools.map((item) => (
                          <Link key={item.href} href={item.href} className="flex items-center justify-between text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                            {item.label}
                            <Badge label={item.badge} />
                          </Link>
                        ))}
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Guides</p>
                      {vendorMenu.guides.map((item) => (
                        <Link key={item.href} href={item.href} className="block text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                      <Link href={vendorMenu.viewAll.href} className="block text-sm font-semibold text-brand-700 pt-2" onClick={() => setMobileOpen(false)}>
                        {vendorMenu.viewAll.label}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-900 bg-white"
                    onClick={() => {
                      setMobileResourcesOpen(!mobileResourcesOpen);
                      setMobileSocOpen(false);
                      setMobilePentestOpen(false);
                      setMobileVendorOpen(false);
                    }}
                  >
                    <span>Resources</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180 text-brand-700' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileResourcesOpen && (
                    <div className="px-4 pb-4 pt-2 space-y-2 bg-slate-50 border-t border-slate-100">
                      <Link href={resourcesMenu.about.href} className="block text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>
                        {resourcesMenu.about.label}
                      </Link>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Guides</p>
                      {resourcesMenu.guides.map((item) => (
                        <Link key={item.href} href={item.href} className="block text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 pt-2">Comparisons</p>
                        {resourcesMenu.comparisons.map((item) => (
                          <Link key={item.href} href={item.href} className="block text-sm text-slate-700" onClick={() => setMobileOpen(false)}>
                            {item.label}
                          </Link>
                        ))}
                        <Link href={resourcesMenu.viewAll.href} className="block text-sm font-semibold text-brand-700 pt-2" onClick={() => setMobileOpen(false)}>
                          {resourcesMenu.viewAll.label}
                        </Link>
                      </div>
                    )}
                  </div>


                  <Link
                    href="/compliance/directory"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Compliance Directory
                    <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold text-white bg-brand-500 rounded uppercase tracking-wider">New</span>
                  </Link>

                  <Link
                    href="/search"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700"
                    onClick={() => setMobileOpen(false)}
                  >

                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </Link>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-3 rounded-xl shadow-sm transition-all"
                  onClick={handleMobilePrimaryCta}
                >
                  {primaryCtaLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
