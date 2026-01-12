'use client';

import { createPortal } from 'react-dom';
import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CTA, navConfig, type NavCategoryConfig, type NavItem, type NavSection } from '@/lib/navConfig';
import { useDropdownIntent } from './useDropdownIntent';
import { SearchNav } from './SearchNav';

const DROPDOWN_WIDTH = 320;

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
  const BRIDGE_HEIGHT = 12;

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
        top: rect.bottom + window.scrollY,
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
      style={{
        position: 'absolute',
        top: position.top - BRIDGE_HEIGHT,
        left: position.left,
        width: DROPDOWN_WIDTH,
        paddingTop: BRIDGE_HEIGHT,
        zIndex: 9999,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        id={id}
        role="menu"
        aria-hidden={!isOpen}
        aria-label={ariaLabel}
        data-dropdown-panel="true"
        data-dropdown-id={id}
        ref={panelRef}
        className={`rounded-xl border border-slate-200 bg-white shadow-lg max-h-[70vh] overflow-auto focus:outline-none transition-all duration-150 ease-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        }`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default function Header() {
  const pathname = usePathname();

  const platformIntent = useDropdownIntent();
  const frameworksIntent = useDropdownIntent();
  const marketIntelIntent = useDropdownIntent();
  const solutionsIntent = useDropdownIntent();
  const resourcesIntent = useDropdownIntent();

  const [isMobileOpen, setMobileOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const platformRef = useRef<HTMLDivElement>(null);
  const frameworksRef = useRef<HTMLDivElement>(null);
  const marketIntelRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const closeAllDropdowns = useCallback((except?: string) => {
    if (except !== 'platform-menu') platformIntent.immediateClose();
    if (except !== 'frameworks-menu') frameworksIntent.immediateClose();
    if (except !== 'market-intel-menu') marketIntelIntent.immediateClose();
    if (except !== 'solutions-menu') solutionsIntent.immediateClose();
    if (except !== 'resources-menu') resourcesIntent.immediateClose();
  }, [platformIntent, frameworksIntent, marketIntelIntent, solutionsIntent, resourcesIntent]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (isMobileOpen && (mobileMenuRef.current?.contains(target) || mobileToggleRef.current?.contains(target))) {
        return;
      }

      const isInside = [
        { anchor: platformRef, menuId: 'platform-menu' },
        { anchor: frameworksRef, menuId: 'frameworks-menu' },
        { anchor: marketIntelRef, menuId: 'market-intel-menu' },
        { anchor: solutionsRef, menuId: 'solutions-menu' },
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
    setMounted(true);
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
  }, [isMobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) {
      setMobileSectionOpen(null);
    }
  }, [isMobileOpen]);

  const menuItemWithBadgeClass =
    'flex items-center justify-between px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors group/item';
  const sectionLabelClass = 'px-4 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400';

  const Badge = ({ label }: { label?: string }) => {
    const isSpecial = label === 'Flagship' || label === 'Hub' || label === 'AI';
    return (
      <span
        className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
          isSpecial ? 'text-blue-700 bg-blue-50' : 'text-brand-700 bg-brand-50'
        }`}
      >
        {label || 'Tool'}
      </span>
    );
  };

  const NavLink = ({
    anchorRef,
    intent,
    config,
    id,
    label,
  }: {
    anchorRef: RefObject<HTMLDivElement>;
    intent: any;
    config: NavCategoryConfig;
    id: string;
    label: string;
  }) => {
    return (
    <div
      ref={anchorRef}
      className="relative"
      onMouseEnter={() => {
        closeAllDropdowns(id);
        intent.scheduleOpen();
      }}
      onMouseLeave={() => intent.scheduleClose()}
    >
      <Link
        href={config.href}
        aria-expanded={intent.open}
        aria-haspopup="true"
        aria-controls={id}
        className={`flex items-center gap-1.5 px-3 py-2 text-[15px] font-bold rounded-lg transition-all ${
          intent.open ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
        }`}
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${intent.open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      <DropdownPortal
        id={id}
        isOpen={intent.open}
        anchorRef={anchorRef}
        onMouseEnter={() => intent.scheduleOpen()}
        onMouseLeave={() => intent.scheduleClose()}
      >
        {config.items && (
          <div className="bg-slate-50/50 pb-2">
            <div className={sectionLabelClass}>Featured</div>
            {config.items.map((item: NavItem) => (
              <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 group-hover/item:text-brand-700 transition-colors">{item.label}</span>
                  {item.description && <span className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.description}</span>}
                </div>
                {item.badge && <Badge label={item.badge} />}
              </Link>
            ))}
          </div>
        )}
        {config.sections.map((section: NavSection, idx: number) => (
          <div key={section.title} className={idx > 0 || config.items ? 'border-t border-slate-100' : ''}>
            <div className={sectionLabelClass}>{section.title}</div>
            {section.items.map((item: NavItem) => (
              <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                <div className="flex flex-col">
                   <span className="font-semibold text-slate-800 group-hover/item:text-brand-700 transition-colors">{item.label}</span>
                   {item.description && <span className="text-[10px] text-slate-500 leading-tight">{item.description}</span>}
                </div>
                {item.badge && <Badge label={item.badge} />}
              </Link>
            ))}
          </div>
        ))}
      </DropdownPortal>
    </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur border-slate-200 shadow-sm' : 'bg-white border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo/logo-wordmark.png"
            alt="RiscLens"
            width={240}
            height={70}
            priority
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          <NavLink
            anchorRef={platformRef}
            intent={platformIntent}
            config={navConfig.platform}
            id="platform-menu"
            label="Platform"
          />
          <NavLink
            anchorRef={frameworksRef}
            intent={frameworksIntent}
            config={navConfig.frameworks}
            id="frameworks-menu"
            label="Frameworks"
          />
          <NavLink
            anchorRef={marketIntelRef}
            intent={marketIntelIntent}
            config={navConfig.marketIntel}
            id="market-intel-menu"
            label="Market Intel"
          />
          <NavLink
            anchorRef={solutionsRef}
            intent={solutionsIntent}
            config={navConfig.solutions}
            id="solutions-menu"
            label="Solutions"
          />
          <NavLink
            anchorRef={resourcesRef}
            intent={resourcesIntent}
            config={navConfig.resources}
            id="resources-menu"
            label="Resources"
          />
          <SearchNav />
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/search"
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>

          <Link
            href={CTA.href}
            className="hidden sm:inline-flex items-center gap-2 bg-slate-900 hover:bg-brand-700 text-white font-bold text-[13px] px-5 py-2.5 rounded-xl shadow-lg shadow-slate-200/50 transition-all active:scale-95"
          >
            {CTA.label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <button
            type="button"
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
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

      {mounted &&
        showMobileMenu &&
        createPortal(
          <>
            <div
              className={`xl:hidden fixed inset-0 z-[9998] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
                isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setMobileOpen(false)}
            />

            <div
              ref={mobileMenuRef}
              className={`xl:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[9999] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
                isMobileOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                 <Image
                    src="/logo/logo-wordmark.png"
                    alt="RiscLens"
                    width={180}
                    height={60}
                    className="h-8 w-auto object-contain"
                  />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {[
                  { id: 'platform', label: 'Platform', config: navConfig.platform },
                  { id: 'frameworks', label: 'Frameworks', config: navConfig.frameworks },
                  { id: 'marketIntel', label: 'Market Intel', config: navConfig.marketIntel },
                  { id: 'solutions', label: 'Solutions', config: navConfig.solutions },
                  { id: 'resources', label: 'Resources', config: navConfig.resources },
                ].map((section) => (
                  <div key={section.id} className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-4 text-left"
                      onClick={() => setMobileSectionOpen(mobileSectionOpen === section.id ? null : section.id)}
                    >
                      <span className="font-bold text-slate-900">{section.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileSectionOpen === section.id ? 'rotate-180 text-brand-600' : 'text-slate-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {mobileSectionOpen === section.id && (
                      <div className="px-4 pb-4 space-y-4">
                        {section.config.items && (
                          <div className="space-y-2.5">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured</p>
                            {section.config.items.map((item: NavItem) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between py-1 text-sm font-semibold text-slate-700"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                                {item.badge && <Badge label={item.badge} />}
                              </Link>
                            ))}
                          </div>
                        )}
                        {section.config.sections.map((sub: NavSection) => (
                          <div key={sub.title} className="space-y-2.5 pt-2 border-t border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub.title}</p>
                            {sub.items.map((item: NavItem) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between py-1 text-sm font-semibold text-slate-700"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                                {item.badge && <Badge label={item.badge} />}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 bg-white space-y-3">
                <Link
                  href="/search"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 font-bold text-slate-900"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Hub
                </Link>
                <Link
                  href={CTA.href}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 text-white font-bold"
                  onClick={() => setMobileOpen(false)}
                >
                  {CTA.label}
                </Link>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
