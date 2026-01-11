'use client';

import { createPortal } from 'react-dom';
import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CTA, navConfig } from '@/lib/navConfig';
import { useDropdownIntent } from './useDropdownIntent';
import { SearchNav } from './SearchNav';

const DROPDOWN_PANEL_CLASS =
  'absolute z-[9999] rounded-xl border border-slate-200 bg-white shadow-lg max-h-[70vh] overflow-auto focus:outline-none transition ease-out duration-150 transform';
const DROPDOWN_WIDTH = 300;

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

  const frameworksIntent = useDropdownIntent();
  const solutionsIntent = useDropdownIntent();
  const toolsIntent = useDropdownIntent();
  const resourcesIntent = useDropdownIntent();

  const [isMobileOpen, setMobileOpen] = useState(false);
  const [mobileFrameworksOpen, setMobileFrameworksOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const frameworksRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const closeAllDropdowns = useCallback((except?: string) => {
    if (except !== 'frameworks-menu') frameworksIntent.immediateClose();
    if (except !== 'solutions-menu') solutionsIntent.immediateClose();
    if (except !== 'tools-menu') toolsIntent.immediateClose();
    if (except !== 'resources-menu') resourcesIntent.immediateClose();
  }, [frameworksIntent, solutionsIntent, toolsIntent, resourcesIntent]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (isMobileOpen && (mobileMenuRef.current?.contains(target) || mobileToggleRef.current?.contains(target))) {
        return;
      }

      const isInside = [
        { anchor: frameworksRef, menuId: 'frameworks-menu' },
        { anchor: solutionsRef, menuId: 'solutions-menu' },
        { anchor: toolsRef, menuId: 'tools-menu' },
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
      
      // Focus trap for mobile menu
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || !mobileMenuRef.current) return;
        
        const focusableElements = mobileMenuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
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
      setMobileFrameworksOpen(false);
      setMobileSolutionsOpen(false);
      setMobileToolsOpen(false);
      setMobileResourcesOpen(false);
    }
  }, [isMobileOpen]);

  const menuItemClass = 'block px-4 py-2 text-sm text-slate-600 hover:text-brand-700 hover:bg-slate-50 transition-colors';
  const menuItemWithBadgeClass =
    'flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors';
  const sectionLabelClass = 'px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400';

  const Badge = ({ label }: { label?: string }) => (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
        label === 'Flagship' || label === 'Hub' ? 'text-blue-700 bg-blue-50' : 'text-brand-700 bg-brand-50'
      }`}
    >
      {label || 'Tool'}
    </span>
  );

  const NavLink = ({
    anchorRef,
    intent,
    config,
    id,
    label,
  }: {
    anchorRef: RefObject<HTMLDivElement>;
    intent: any;
    config: any;
    id: string;
    label: string;
  }) => (
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
        className={`flex items-center gap-1.5 px-3 py-2 text-base font-bold rounded-lg transition-colors ${
          intent.open ? 'text-brand-700 bg-brand-50' : 'text-slate-700 hover:text-brand-700 hover:bg-slate-50'
        }`}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${intent.open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      <DropdownPortal
        id={id}
        isOpen={intent.open}
        anchorRef={anchorRef}
        onMouseEnter={() => intent.scheduleOpen()}
        onMouseLeave={() => intent.scheduleClose()}
      >
        {'items' in config && (
          <>
            <div className={sectionLabelClass}>Featured</div>
            {config.items.map((item: any) => (
              <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">{item.label}</span>
                  {item.description && <span className="text-[11px] text-slate-500 leading-tight">{item.description}</span>}
                </div>
                {item.badge && <Badge label={item.badge} />}
              </Link>
            ))}
            <div className="my-1 border-t border-slate-100" />
          </>
        )}
        {config.sections.map((section: any, idx: number) => (
          <div key={section.title}>
            {idx > 0 && <div className="my-1 border-t border-slate-100" />}
            <div className={sectionLabelClass}>{section.title}</div>
            {section.items.map((item: any) => (
              <Link key={item.href} href={item.href} role="menuitem" className={menuItemWithBadgeClass}>
                <span className="font-medium text-slate-900">{item.label}</span>
                {item.badge && <Badge label={item.badge} />}
              </Link>
            ))}
          </div>
        ))}
      </DropdownPortal>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        isScrolled ? 'bg-white/95 backdrop-blur border-slate-200 shadow-sm' : 'bg-white border-slate-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 lg:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo/logo-wordmark.png"
            alt="RiscLens"
            width={280}
            height={84}
            priority
            className="h-[50px] lg:h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink
            anchorRef={frameworksRef}
            intent={frameworksIntent}
            config={navConfig.frameworks}
            id="frameworks-menu"
            label="Frameworks"
          />
          <NavLink
            anchorRef={solutionsRef}
            intent={solutionsIntent}
            config={navConfig.solutions}
            id="solutions-menu"
            label="Solutions"
          />
          <NavLink anchorRef={toolsRef} intent={toolsIntent} config={navConfig.tools} id="tools-menu" label="Tools" />
          <NavLink
            anchorRef={resourcesRef}
            intent={resourcesIntent}
            config={navConfig.resources}
            id="resources-menu"
            label="Resources"
          />
          <SearchNav />
        </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>

            <Link
              href={CTA.href}
              className="hidden lg:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              {CTA.label}
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

      {mounted &&
        showMobileMenu &&
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
              <div className="px-4 py-4 space-y-2 h-full overflow-y-auto overscroll-contain">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
                    <Image
                      src="/logo/logo-wordmark.png"
                      alt="RiscLens"
                      width={280}
                      height={82}
                      className="h-[50px] w-auto object-contain"
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

                {/* Mobile Sections */}
                {[
                  {
                    id: 'frameworks',
                    label: 'Frameworks',
                    config: navConfig.frameworks,
                    isOpen: mobileFrameworksOpen,
                    setOpen: setMobileFrameworksOpen,
                  },
                  {
                    id: 'solutions',
                    label: 'Solutions',
                    config: navConfig.solutions,
                    isOpen: mobileSolutionsOpen,
                    setOpen: setMobileSolutionsOpen,
                  },
                  {
                    id: 'tools',
                    label: 'Tools',
                    config: navConfig.tools,
                    isOpen: mobileToolsOpen,
                    setOpen: setMobileToolsOpen,
                  },
                  {
                    id: 'resources',
                    label: 'Resources',
                    config: navConfig.resources,
                    isOpen: mobileResourcesOpen,
                    setOpen: setMobileResourcesOpen,
                  },
                ].map((section) => (
                  <div key={section.id} className="rounded-xl border border-slate-200 overflow-hidden">
                    <div className="flex items-center justify-between bg-white pr-2">
                      <Link
                        href={section.config.href}
                        className="flex-grow px-4 py-3 text-base font-bold text-slate-900"
                        onClick={() => setMobileOpen(false)}
                      >
                        {section.label}
                      </Link>
                      <button
                        type="button"
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-50 transition-colors"
                        onClick={() => {
                          setMobileFrameworksOpen(false);
                          setMobileSolutionsOpen(false);
                          setMobileToolsOpen(false);
                          setMobileResourcesOpen(false);
                          section.setOpen(!section.isOpen);
                        }}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            section.isOpen ? 'rotate-180 text-brand-700' : 'text-slate-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    {section.isOpen && (
                      <div className="px-4 pb-4 pt-2 space-y-4 bg-slate-50 border-t border-slate-100">
                        {'items' in section.config && Array.isArray((section.config as any).items) && (
                          <div className="space-y-2">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Featured</p>
                            {(section.config as any).items.map((item: any) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between text-sm text-slate-700"
                                onClick={() => setMobileOpen(false)}
                              >
                                {item.label}
                                {item.badge && <Badge label={item.badge} />}
                              </Link>
                            ))}
                          </div>
                        )}
                          {Array.isArray((section.config as any).sections) && (section.config as any).sections.map((sub: any) => (
                            <div key={sub.title} className="space-y-2">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                              {sub.title}
                            </p>
                            {sub.items.map((item: any) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between text-sm text-slate-700"
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

                <Link
                  href="/search"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 text-base font-bold text-slate-900"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </Link>

                <Link
                  href={CTA.href}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-3 rounded-xl shadow-sm transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {CTA.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
