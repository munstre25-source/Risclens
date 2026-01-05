'use client';

import { createPortal } from 'react-dom';
import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CTA, industriesNav, navConfig } from '@/lib/navConfig';
import { useDropdownIntent } from './useDropdownIntent';
const DROPDOWN_PANEL_CLASS =
  'absolute z-[9999] rounded-xl border border-slate-200 bg-white shadow-md max-h-[70vh] overflow-auto focus:outline-none transition ease-out duration-150 transform';
const DROPDOWN_WIDTH = 224; // w-56

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
        top: rect.bottom + window.scrollY + 4, // tighter gap for easier hover travel
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
  const {
    open: isPentestOpen,
    scheduleOpen: schedulePentestOpen,
    scheduleClose: schedulePentestClose,
    immediateOpen: openPentest,
    immediateClose: closePentest,
    clearTimers: clearPentestTimers,
  } = useDropdownIntent();
  const {
    open: isVendorOpen,
    scheduleOpen: scheduleVendorOpen,
    scheduleClose: scheduleVendorClose,
    immediateOpen: openVendor,
    immediateClose: closeVendor,
    clearTimers: clearVendorTimers,
  } = useDropdownIntent();
  const {
    open: isSocOpen,
    scheduleOpen: scheduleSocOpen,
    scheduleClose: scheduleSocClose,
    immediateOpen: openSoc,
    immediateClose: closeSoc,
    clearTimers: clearSocTimers,
  } = useDropdownIntent();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [mobileSocOpen, setMobileSocOpen] = useState(false);
  const [mobilePentestOpen, setMobilePentestOpen] = useState(false);
  const [mobileGuidesOpen, setMobileGuidesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileVendorOpen, setMobileVendorOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  type MobileSection = 'soc' | 'pentest' | 'guides' | 'industries' | 'vendor';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const menusRef = useRef<HTMLDivElement>(null);
  const socRef = useRef<HTMLDivElement>(null);
  const vendorRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const primaryCtaHref = pathname.startsWith('/penetration-testing') ? '/penetration-testing/cost-estimator' : CTA.href;
  const handleMobilePrimaryCta = useCallback(() => {
    if (!primaryCtaHref) return;
    setMobileOpen(false);
    document.body.style.overflow = '';
    router.push(primaryCtaHref);
  }, [primaryCtaHref, router]);
  const menuItemClass =
    'block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600';
  const viewAllClass =
    'block px-4 py-2 text-sm text-brand-700 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600';
  const sectionLabelClass = 'px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500';
  const socMenu = navConfig.soc;
  const pentestMenu = navConfig.pentest;
  const vendorMenu = navConfig.vendor;
  const curatedGuides = navConfig.guides;
  const industries = industriesNav;
  const isSocActive =
    pathname === '/' ||
    pathname.startsWith('/soc-2') ||
    pathname.startsWith('/soc-2-') ||
    pathname.startsWith('/when-do-you-need-soc-2') ||
    pathname === '/soc-2-readiness-calculator';
  const isPentestActive = pathname.startsWith('/penetration-testing');
  const isVendorActive = pathname.startsWith('/vendor-risk-assessment');

  const closeAllDropdowns = useCallback(() => {
    closeGuides();
    closeIndustries();
    closePentest();
    closeSoc();
    closeVendor();
  }, [closeGuides, closeIndustries, closePentest, closeSoc, closeVendor]);

  const toggleMobileSection = (section: MobileSection) => {
    setMobileSocOpen(section === 'soc' ? !mobileSocOpen : false);
    setMobilePentestOpen(section === 'pentest' ? !mobilePentestOpen : false);
    setMobileGuidesOpen(section === 'guides' ? !mobileGuidesOpen : false);
    setMobileIndustriesOpen(section === 'industries' ? !mobileIndustriesOpen : false);
    setMobileVendorOpen(section === 'vendor' ? !mobileVendorOpen : false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (isMobileOpen && (mobileMenuRef.current?.contains(target) || mobileToggleRef.current?.contains(target))) {
        return;
      }

      const isInside = [
        { anchor: socRef, menuId: 'soc-menu' },
        { anchor: menusRef, menuId: 'pentest-menu' },
        { anchor: vendorRef, menuId: 'vendor-menu' },
        { anchor: guidesRef, menuId: 'guides-menu' },
        { anchor: dropdownRef, menuId: 'industries-menu' },
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
        closeIndustries();
        setMobileOpen(false);
        closeGuides();
        closeSoc();
        closePentest();
        closeVendor();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      clearGuidesTimers();
      clearIndustriesTimers();
      clearSocTimers();
      clearPentestTimers();
      clearVendorTimers();
    };
  }, [
    closeAllDropdowns,
    closeIndustries,
    closeGuides,
    closePentest,
    closeSoc,
    closeVendor,
    clearGuidesTimers,
    clearIndustriesTimers,
    clearPentestTimers,
    clearSocTimers,
    clearVendorTimers,
    isMobileOpen,
    mobileMenuRef,
    mobileToggleRef,
  ]);

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

  // Close mobile menu when route changes to avoid stale open drawer after navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) {
      setMobileSocOpen(false);
      setMobilePentestOpen(false);
      setMobileGuidesOpen(false);
      setMobileIndustriesOpen(false);
      setMobileVendorOpen(false);
    }
  }, [isMobileOpen]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!CTA.href || !CTA.href.startsWith('/')) {
      // eslint-disable-next-line no-console
      console.warn('Header CTA misconfigured: expected internal href, received', CTA.href);
    }
    if (!primaryCtaHref.startsWith('/')) {
      // eslint-disable-next-line no-console
      console.warn('Derived primary CTA href should be internal path; got', primaryCtaHref);
    }
  }, [primaryCtaHref]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const focusFirstItem = () => {
      const first = mobileMenuRef.current?.querySelector<HTMLElement>(focusableSelectors);
      first?.focus();
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !mobileMenuRef.current) return;
      const focusable = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!document.activeElement || !mobileMenuRef.current.contains(document.activeElement)) {
        first.focus();
        event.preventDefault();
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    };

    focusFirstItem();
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
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
              <div
                className="relative flex items-center gap-2"
                ref={socRef}
                onMouseEnter={() => {
                  closeGuides();
                  closeIndustries();
                  closePentest();
                  closeVendor();
                  scheduleSocOpen();
                }}
                onMouseLeave={() => scheduleSocClose()}
                onFocus={() => {
                  closeGuides();
                  closeIndustries();
                  closePentest();
                  closeVendor();
                  openSoc();
                }}
              >
                <Link
                  href="/"
                  className={`flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    isSocActive ? 'text-brand-700 underline underline-offset-4' : ''
                  }`}
                >
                  SOC 2
                </Link>
                <button
                  type="button"
                  className={`hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    isSocActive ? 'text-brand-700' : ''
                  }`}
                  aria-expanded={isSocOpen}
                  aria-haspopup="menu"
                  aria-controls="soc-menu"
                  onClick={() => {
                    if (isSocOpen) {
                      closeSoc();
                    } else {
                      closeAllDropdowns();
                      openSoc();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isSocOpen) {
                        closeSoc();
                      } else {
                        closeAllDropdowns();
                        openSoc();
                      }
                    }
                  }}
                >
                  <svg className={`w-4 h-4 transition-transform ${isSocOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <DropdownPortal
                  id="soc-menu"
                  isOpen={isSocOpen}
                  anchorRef={socRef}
                  onMouseEnter={() => {
                    closeGuides();
                    closeIndustries();
                    closePentest();
                    closeVendor();
                    scheduleSocOpen();
                  }}
                  onMouseLeave={() => scheduleSocClose()}
                >
                  <Link
                    href="/soc-2/guides"
                    role="menuitem"
                    className={`${sectionLabelClass} pt-4 pb-1 text-left`}
                  >
                    Tools
                  </Link>
                  <Link href={socMenu.overview.href} role="menuitem" className={`${menuItemClass}`}>
                    {socMenu.overview.label}
                  </Link>
                  <Link href={socMenu.primary.href} role="menuitem" className={menuItemClass}>
                    <span className="flex items-center gap-2">
                      {socMenu.primary.label}
                      {socMenu.primary.badge ? (
                        <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">{socMenu.primary.badge}</span>
                      ) : null}
                    </span>
                  </Link>
                  <div className="my-2 border-t border-slate-100" />
                  <div className={sectionLabelClass}>Guides</div>
                  {socMenu.guides.map((item) => (
                    <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-slate-100" />
                  <Link href={socMenu.viewAll.href} role="menuitem" className={viewAllClass + ' rounded-b-lg'}>
                    {socMenu.viewAll.label}
                  </Link>
                </DropdownPortal>
              </div>

              <div
                className="relative flex items-center gap-2"
                ref={menusRef}
                onMouseEnter={() => {
                  closeGuides();
                  closeIndustries();
                  closeSoc();
                  closeVendor();
                  schedulePentestOpen();
                }}
                onMouseLeave={() => schedulePentestClose()}
                onFocus={() => {
                  closeGuides();
                  closeIndustries();
                  closeSoc();
                  closeVendor();
                  openPentest();
                }}
              >
                <Link
                  href="/penetration-testing"
                  className={`flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    isPentestActive ? 'text-brand-700 underline underline-offset-4' : ''
                  }`}
                >
                  Penetration Testing
                </Link>
                <button
                  type="button"
                  className={`hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    isPentestActive ? 'text-brand-700' : ''
                  }`}
                  aria-expanded={isPentestOpen}
                  aria-haspopup="menu"
                  aria-controls="pentest-menu"
                  onClick={() => {
                    if (isPentestOpen) {
                      closePentest();
                    } else {
                      closeAllDropdowns();
                      openPentest();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isPentestOpen) {
                        closePentest();
                      } else {
                        closeAllDropdowns();
                        openPentest();
                      }
                    }
                  }}
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${isPentestOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <DropdownPortal
                  id="pentest-menu"
                  isOpen={isPentestOpen}
                  anchorRef={menusRef}
                  onMouseEnter={() => {
                    closeGuides();
                    closeIndustries();
                    closeSoc();
                    closeVendor();
                    schedulePentestOpen();
                  }}
                  onMouseLeave={() => schedulePentestClose()}
                >
                  <div className={`${sectionLabelClass} pt-4 pb-1 text-left`}>Tools</div>
                  <Link href={pentestMenu.overview.href} role="menuitem" className={menuItemClass}>
                    {pentestMenu.overview.label}
                  </Link>
                  <Link href={pentestMenu.primary.href} role="menuitem" className={menuItemClass}>
                    <span className="flex items-center gap-2">
                      {pentestMenu.primary.label}
                      <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">{pentestMenu.primary.badge}</span>
                    </span>
                  </Link>
                  <div className="my-2 border-t border-slate-100" />
                  <div className={sectionLabelClass}>Guides</div>
                  {pentestMenu.guides.map((item) => (
                    <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-slate-100" />
                  <Link href={pentestMenu.viewAll.href} role="menuitem" className={viewAllClass + ' rounded-b-lg'}>
                    {pentestMenu.viewAll.label}
                  </Link>
                </DropdownPortal>
              </div>

              <div
                className="relative flex items-center gap-2"
                ref={vendorRef}
                onMouseEnter={() => {
                  closeGuides();
                  closeIndustries();
                  closeSoc();
                  closePentest();
                  scheduleVendorOpen();
                }}
                onMouseLeave={() => scheduleVendorClose()}
                onFocus={() => {
                  closeGuides();
                  closeIndustries();
                  closeSoc();
                  closePentest();
                  openVendor();
                }}
              >
                <Link
                  href="/vendor-risk-assessment"
                  className={`flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    isVendorActive ? 'text-brand-700 underline underline-offset-4' : ''
                  }`}
                >
                  Vendor Risk
                </Link>
                <button
                  type="button"
                  className={`hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    isVendorActive ? 'text-brand-700' : ''
                  }`}
                  aria-expanded={isVendorOpen}
                  aria-haspopup="menu"
                  aria-controls="vendor-menu"
                  onClick={() => {
                    if (isVendorOpen) {
                      closeVendor();
                    } else {
                      closeAllDropdowns();
                      openVendor();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isVendorOpen) {
                        closeVendor();
                      } else {
                        closeAllDropdowns();
                        openVendor();
                      }
                    }
                  }}
                >
                  <svg className={`w-4 h-4 transition-transform ${isVendorOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <DropdownPortal
                  id="vendor-menu"
                  isOpen={isVendorOpen}
                  anchorRef={vendorRef}
                  onMouseEnter={() => {
                    closeGuides();
                    closeIndustries();
                    closeSoc();
                    closePentest();
                    scheduleVendorOpen();
                  }}
                  onMouseLeave={() => scheduleVendorClose()}
                >
                  <div className={`${sectionLabelClass} pt-4 pb-1 text-left`}>Tools</div>
                  <Link href={vendorMenu.overview.href} role="menuitem" className={menuItemClass}>
                    {vendorMenu.overview.label}
                  </Link>
                    <Link href={vendorMenu.primary.href} role="menuitem" className={menuItemClass}>
                      <span className="flex items-center gap-2">
                        {vendorMenu.primary.label}
                        <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">{vendorMenu.primary.badge}</span>
                      </span>
                    </Link>
                    {vendorMenu.roi && (
                      <Link href={vendorMenu.roi.href} role="menuitem" className={menuItemClass}>
                        <span className="flex items-center gap-2">
                          {vendorMenu.roi.label}
                          <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">{vendorMenu.roi.badge}</span>
                        </span>
                      </Link>
                    )}
                  <div className="my-2 border-t border-slate-100" />
                  <div className={sectionLabelClass}>Guides</div>
                  {vendorMenu.guides.map((item) => (
                    <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-slate-100" />
                  <Link href={vendorMenu.viewAll.href} role="menuitem" className={viewAllClass + ' rounded-b-lg'}>
                    {vendorMenu.viewAll.label}
                  </Link>
                </DropdownPortal>
              </div>

              <div
                className="relative flex items-center gap-2"
                ref={guidesRef}
                onMouseEnter={() => {
                  closeIndustries();
                  closeSoc();
                  closePentest();
                  closeVendor();
                  scheduleGuidesOpen();
                }}
                onMouseLeave={() => scheduleGuidesClose()}
                onFocus={() => {
                  closeIndustries();
                  closeSoc();
                  closePentest();
                  closeVendor();
                  openGuides();
                }}
              >
                <Link
                  href="/soc-2/guides"
                  className="flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                >
                  Guides
                </Link>
                <button
                  type="button"
                  className="hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                  aria-expanded={isGuidesOpen}
                  aria-haspopup="menu"
                  aria-controls="guides-menu"
                  onClick={() => {
                    if (isGuidesOpen) {
                      closeGuides();
                    } else {
                      closeAllDropdowns();
                      openGuides();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isGuidesOpen) {
                        closeGuides();
                      } else {
                        closeAllDropdowns();
                        openGuides();
                      }
                    }
                  }}
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${isGuidesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <DropdownPortal
                  id="guides-menu"
                  isOpen={isGuidesOpen}
                  anchorRef={guidesRef}
                  onMouseEnter={() => {
                    closeIndustries();
                    closeSoc();
                    closePentest();
                    closeVendor();
                    scheduleGuidesOpen();
                  }}
                  onMouseLeave={() => scheduleGuidesClose()}
                >
                  <div className={`${sectionLabelClass} pt-4 pb-1 text-left`}>Curated</div>
                  {curatedGuides.map((item, idx) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className={`${menuItemClass} ${idx === 0 ? 'rounded-t-lg' : ''}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-slate-100" />
                  <Link href="/soc-2/guides" role="menuitem" className={viewAllClass + ' rounded-b-lg'}>
                    View all guides →
                  </Link>
                </DropdownPortal>
              </div>

                <Link
                  href="/search"
                  className={`flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded ${
                    pathname === '/search' ? 'text-brand-700 underline underline-offset-4' : ''
                  }`}
                >
                  Search
                  <span className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-slate-400 border border-slate-200 rounded ml-1 bg-slate-50">
                    ⌘K
                  </span>
                </Link>

                <div
                  className="relative flex items-center gap-2"
                  ref={dropdownRef}

                onMouseEnter={() => {
                  closeGuides();
                  closeSoc();
                  closePentest();
                  closeVendor();
                  scheduleIndustriesOpen();
                }}
                onMouseLeave={() => scheduleIndustriesClose()}
                onFocus={() => {
                  closeGuides();
                  closeSoc();
                  closePentest();
                  closeVendor();
                  openIndustries();
                }}
              >
                <Link
                  href="/soc-2/industries"
                  className="flex items-center gap-2 hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                >
                  Industries
                </Link>
                <button
                  type="button"
                  className="hover:text-brand-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 rounded"
                  aria-expanded={isIndustriesOpen}
                  aria-haspopup="menu"
                  aria-controls="industries-menu"
                  onClick={() => {
                    if (isIndustriesOpen) {
                      closeIndustries();
                    } else {
                      closeAllDropdowns();
                      openIndustries();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isIndustriesOpen) {
                        closeIndustries();
                      } else {
                        closeAllDropdowns();
                        openIndustries();
                      }
                    }
                  }}
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <DropdownPortal
                  id="industries-menu"
                  isOpen={isIndustriesOpen}
                  anchorRef={dropdownRef}
                  onMouseEnter={() => {
                    closeGuides();
                    closeSoc();
                    closePentest();
                    closeVendor();
                    scheduleIndustriesOpen();
                  }}
                  onMouseLeave={() => scheduleIndustriesClose()}
                >
                  <div className={`${sectionLabelClass} pt-4 pb-1 text-left text-slate-500`}>SOC 2 Industries</div>
                  <Link href="/soc-2/industries" role="menuitem" className={menuItemClass + ' rounded-t-lg'}>
                    Overview
                  </Link>
                  {industries.map((item) => (
                    <Link key={item.href} href={item.href} role="menuitem" className={menuItemClass}>
                      {item.label}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-slate-100" />
                  <Link href="/soc-2/industries" role="menuitem" className={viewAllClass + ' rounded-b-lg'}>
                    View all industries →
                  </Link>
                </DropdownPortal>
            </div>
          </nav>

          <Link
            href={pathname.startsWith('/penetration-testing') ? '/penetration-testing/cost-estimator' : CTA.href}
            className="hidden md:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            {pathname.startsWith('/penetration-testing') ? 'Run Pentest Cost Estimator' : CTA.label}
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
              className={`md:hidden fixed inset-0 z-[9998] bg-slate-900/40 transition-opacity duration-200 ease-out ${
                isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setMobileOpen(false)}
            />

            <div
              ref={mobileMenuRef}
              className={`md:hidden fixed inset-0 w-full h-[100dvh] z-[9999] bg-white text-slate-900 shadow-2xl transition-all duration-200 ease-out ${
                isMobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="px-4 py-4 space-y-3 h-full overflow-y-auto overscroll-contain pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
                <div className="sticky top-0 flex items-center justify-between bg-white pb-3">
                  <Link href="/" className="text-base font-semibold text-slate-900" onClick={() => setMobileOpen(false)}>
                    RiscLens
                  </Link>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                  <div className="space-y-2 rounded-xl border border-slate-200">
                    <Link
                      href="/search"
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>Search</span>
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </Link>
                  </div>

                  <div className="space-y-2 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900"
                      aria-expanded={mobileSocOpen}
                      aria-controls="mobile-soc-menu"
                      onClick={() => toggleMobileSection('soc')}
                    >

                    <span>SOC 2</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileSocOpen ? 'rotate-180 text-brand-700' : 'text-slate-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileSocOpen && (
                    <div id="mobile-soc-menu" className="px-3 pb-3 space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block pt-1">Tools</span>
                      <Link
                        href={socMenu.overview.href}
                        className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {socMenu.overview.label}
                      </Link>
                    <Link
                      href={socMenu.primary.href}
                      className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {socMenu.primary.label}
                        {socMenu.primary.badge ? (
                          <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                            {socMenu.primary.badge}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                      <div className="border-t border-slate-200 my-2" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block">Guides</span>
                      {socMenu.guides.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-200 my-2" />
                      <Link
                        href={socMenu.viewAll.href}
                        className="block text-sm text-brand-700 hover:text-brand-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {socMenu.viewAll.label}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900"
                    aria-expanded={mobilePentestOpen}
                    aria-controls="mobile-pentest-menu"
                    onClick={() => toggleMobileSection('pentest')}
                  >
                    <span>Penetration Testing</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${mobilePentestOpen ? 'rotate-180 text-brand-700' : 'text-slate-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobilePentestOpen && (
                    <div id="mobile-pentest-menu" className="px-3 pb-3 space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block pt-1">Tools</span>
                      <Link
                        href={pentestMenu.overview.href}
                        className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {pentestMenu.overview.label}
                      </Link>
                    <Link
                      href={pentestMenu.primary.href}
                      className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {pentestMenu.primary.label}
                        {pentestMenu.primary.badge ? (
                          <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                            {pentestMenu.primary.badge}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                      <div className="border-t border-slate-200 my-2" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block">Guides</span>
                      {pentestMenu.guides.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-200 my-2" />
                      <Link
                        href={pentestMenu.viewAll.href}
                        className="block text-sm text-brand-700 hover:text-brand-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {pentestMenu.viewAll.label}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900"
                    aria-expanded={mobileVendorOpen}
                    aria-controls="mobile-vendor-menu"
                    onClick={() => toggleMobileSection('vendor')}
                  >
                    <span>Vendor Risk</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileVendorOpen ? 'rotate-180 text-brand-700' : 'text-slate-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileVendorOpen && (
                    <div id="mobile-vendor-menu" className="px-3 pb-3 space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block pt-1">Tools</span>
                      <Link
                        href={vendorMenu.overview.href}
                        className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {vendorMenu.overview.label}
                      </Link>
                      <Link
                        href={vendorMenu.primary.href}
                        className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="flex items-center gap-2">
                          {vendorMenu.primary.label}
                          {vendorMenu.primary.badge ? (
                            <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                              {vendorMenu.primary.badge}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                      {vendorMenu.roi && (
                        <Link
                          href={vendorMenu.roi.href}
                          className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="flex items-center gap-2">
                            {vendorMenu.roi.label}
                            {vendorMenu.roi.badge ? (
                              <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                                {vendorMenu.roi.badge}
                              </span>
                            ) : null}
                          </span>
                        </Link>
                      )}
                      <div className="border-t border-slate-200 my-2" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block">Guides</span>
                      {vendorMenu.guides.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-200 my-2" />
                      <Link
                        href={vendorMenu.viewAll.href}
                        className="block text-sm text-brand-700 hover:text-brand-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {vendorMenu.viewAll.label}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900"
                    aria-expanded={mobileGuidesOpen}
                    aria-controls="mobile-guides-menu"
                    onClick={() => toggleMobileSection('guides')}
                  >
                    <span>Guides</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileGuidesOpen ? 'rotate-180 text-brand-700' : 'text-slate-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileGuidesOpen && (
                    <div id="mobile-guides-menu" className="px-3 pb-3 space-y-2">
                      {curatedGuides.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href="/soc-2/guides"
                        className="block text-sm text-brand-700 hover:text-brand-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        View all guides →
                      </Link>
                    </div>
                  )}
                </div>

                <div className="space-y-2 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-900"
                    aria-expanded={mobileIndustriesOpen}
                    aria-controls="mobile-industries-menu"
                    onClick={() => toggleMobileSection('industries')}
                  >
                    <span>Industries</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${mobileIndustriesOpen ? 'rotate-180 text-brand-700' : 'text-slate-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileIndustriesOpen && (
                    <div id="mobile-industries-menu" className="px-3 pb-3 space-y-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 block pt-1">SOC 2 Industries</span>
                      <Link
                        href="/soc-2/industries"
                        className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        Overview
                      </Link>
                      {industries.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-slate-700 hover:text-brand-700 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href="/soc-2/industries"
                        className="block text-sm text-brand-700 hover:text-brand-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        View all industries →
                      </Link>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
                  onClick={handleMobilePrimaryCta}
                >
                  {pathname.startsWith('/penetration-testing') ? 'Run Pentest Cost Estimator' : CTA.label}
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
