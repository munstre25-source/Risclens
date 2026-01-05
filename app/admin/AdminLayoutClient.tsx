'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type AuthState = 'loading' | 'unauthenticated' | 'authenticated';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/kgr', label: 'KGR Tracker' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/buyers', label: 'Buyers' },
  { href: '/admin/audit', label: 'Audit Logs' },
  { href: '/admin/test-mode', label: 'Test Mode' },
  { href: '/admin/experiments', label: 'Experiments' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
    syncTestModeFromCookie();

    const handleTestModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ enabled: boolean }>;
      if (typeof customEvent.detail?.enabled === 'boolean') {
        setTestMode(customEvent.detail.enabled);
      } else {
        syncTestModeFromCookie();
      }
    };

    document.addEventListener('rls-test-mode-changed', handleTestModeChange);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('rls-test-mode-changed', handleTestModeChange);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      setShowMobileNav(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setShowMobileNav(false), 200);
      document.body.style.overflow = '';
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileNavOpen]);

  const syncTestModeFromCookie = () => {
    if (typeof document === 'undefined') return;
    const enabled = document.cookie.includes('rls_test_mode=1');
    setTestMode(enabled);
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/leads', {
        credentials: 'include',
      });
      setAuthState(res.ok ? 'authenticated' : 'unauthenticated');
    } catch {
      setAuthState('unauthenticated');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ secret }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthState('authenticated');
        setSecret('');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMobileNavOpen(false);
    }
  };

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Access
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="secret" className="form-label">
                  Admin Secret
                </label>
                <input
                  type="password"
                  id="secret"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter admin secret"
                  autoComplete="off"
                  disabled={isLoggingIn}
                />
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoggingIn || !secret}
                className="btn-primary w-full"
              >
                {isLoggingIn ? 'Logging in...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <aside className="w-56 bg-white border-r border-slate-200 hidden md:flex flex-col">
          <div className="px-4 py-5 border-b border-slate-200">
            <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Image
                src="/logo/logo-wordmark.png"
                alt="RiscLens"
                width={140}
                height={60}
                className="w-auto"
                style={{ height: '4.5rem' }}
              />
              <span className="text-sm text-slate-700">Admin</span>
            </Link>
          </div>
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                          active
                            ? 'bg-brand-50 text-brand-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={async () => {
                  await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
                  window.location.href = '/admin';
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </aside>


        <div className="flex-1">
          {/* Mobile top nav */}
          <header className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 relative">
            <div className="px-4 py-3 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src="/logo/logo-wordmark.png"
                  alt="RiscLens"
                  width={140}
                  height={60}
                  className="w-auto"
                  style={{ height: '4.5rem' }}
                />
                <span className="text-sm font-semibold text-slate-900">Admin</span>
              </Link>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileNavOpen}
                onClick={() => setIsMobileNavOpen((open) => !open)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileNavOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {showMobileNav && (
              <>
                <button
                  type="button"
                  aria-hidden="true"
                  tabIndex={-1}
                  className={`fixed inset-0 bg-slate-900/30 transition-opacity duration-200 ease-out ${
                    isMobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  onClick={() => setIsMobileNavOpen(false)}
                />
                <div
                  className={`absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out ${
                    isMobileNavOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="px-3 pb-4 pt-3">
                    <div className="flex flex-wrap gap-2">
                      {NAV_ITEMS.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                              active
                                ? 'bg-brand-50 text-brand-700 border border-brand-100'
                                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                            onClick={() => setIsMobileNavOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </header>
          <main className="p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <div className="max-w-5xl mx-auto w-full space-y-4">
              {testMode && (
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 border border-amber-100">
                  <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                  Test Mode ON
                </div>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
