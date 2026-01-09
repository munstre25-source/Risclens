'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  LayoutDashboard, 
  Target, 
  RotateCcw, 
  TrendingUp, 
  Search, 
  Users, 
  ShieldCheck, 
  Zap, 
  Library, 
  FlaskConical, 
  Settings, 
  LogOut,
  MoreHorizontal,
  Menu,
  X,
  History,
  Terminal,
  Search as SearchIcon
} from 'lucide-react';

type AuthState = 'loading' | 'unauthenticated' | 'authenticated';

const PRIMARY_NAV = [
  { href: '/admin', label: 'Intelligence', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Targets', icon: Target },
  { href: '/admin/ooda', label: 'Response', icon: RotateCcw },
  { href: '/admin/intelligence', label: 'Signals', icon: Zap },
];

const SECONDARY_NAV = [
  { href: '/admin/kgr', label: 'KGR Tracker', icon: TrendingUp },
  { href: '/admin/kgr/explorer', label: 'Signal Explorer', icon: Search },
  { href: '/admin/analytics', label: 'Metrics', icon: ShieldCheck },
  { href: '/admin/buyers', label: 'Partners', icon: Users },
  { href: '/admin/audit', label: 'Audit Logs', icon: History },
  { href: '/admin/intelligence/directory', label: 'Repository', icon: Library },
  { href: '/admin/test-mode', label: 'Dev Console', icon: Terminal },
  { href: '/admin/experiments', label: 'A/B Labs', icon: FlaskConical },
  { href: '/admin/settings', label: 'Config', icon: Settings },
];

const ALL_NAV_ITEMS = [...PRIMARY_NAV, ...SECONDARY_NAV];

function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  
  const filteredItems = useMemo(() => {
    if (!query) return ALL_NAV_ITEMS;
    return ALL_NAV_ITEMS.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 ring-1 ring-black/5">
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <SearchIcon className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            className="flex-1 ml-3 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            placeholder="Search commands... (Esc to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
          />
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          {filteredItems.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
    syncTestModeFromCookie();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsMoreDrawerOpen(false);
      }
    };

    const handleTestModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ enabled: boolean }>;
      if (typeof customEvent.detail?.enabled === 'boolean') {
        setTestMode(customEvent.detail.enabled);
      } else {
        syncTestModeFromCookie();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('rls-test-mode-changed', handleTestModeChange);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('rls-test-mode-changed', handleTestModeChange);
    };
  }, []);

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

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <div className="text-slate-500 dark:text-slate-400 font-medium">Initializing Command Center...</div>
        </div>
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col items-center mb-8">
              <Image src="/logo/logo-wordmark.png" alt="RiscLens" width={180} height={60} className="dark:invert mb-4" />
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Risk Intelligence Access
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Authorized Operators Only</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="secret" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Security Secret
                </label>
                <input
                  type="password"
                  id="secret"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  placeholder="Enter access code"
                  autoComplete="off"
                  disabled={isLoggingIn}
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                  <ShieldCheck size={16} />
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoggingIn || !secret}
                className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isLoggingIn ? 'Verifying...' : 'Establish Session'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500/30">
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col sticky top-0 h-screen">
          <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800/50">
            <Link href="/admin" className="block">
              <Image src="/logo/logo-wordmark.png" alt="RiscLens" width={140} height={40} className="dark:invert" />
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Operator Console</span>
              </div>
            </Link>
          </div>
          
          <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-8 custom-scrollbar">
            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Primary Systems</div>
              <ul className="space-y-1">
                {PRIMARY_NAV.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all ${
                          active
                            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/10 dark:shadow-slate-100/10'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <item.icon size={18} strokeWidth={active ? 2.5 : 2} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Support Modules</div>
              <ul className="space-y-1">
                {SECONDARY_NAV.slice(0, 6).map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all ${
                          active
                            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold shadow-lg shadow-slate-900/10 dark:shadow-slate-100/10'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <item.icon size={18} strokeWidth={active ? 2.5 : 2} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="p-4 space-y-4 border-t border-slate-100 dark:border-slate-800/50">
            <div className="px-3">
              <ThemeToggle />
            </div>
            <button
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
                window.location.href = '/admin';
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all group"
            >
              <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
              Sign Out
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="px-4 h-14 flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-2">
                <Image src="/logo/logo-wordmark.png" alt="RiscLens" width={100} height={30} className="dark:invert h-6 w-auto" />
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="p-2 text-slate-500 dark:text-slate-400"
                >
                  <SearchIcon size={20} />
                </button>
                <button
                  onClick={() => setIsMoreDrawerOpen(true)}
                  className="p-2 text-slate-500 dark:text-slate-400"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 pb-24 lg:pb-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {ALL_NAV_ITEMS.find(i => i.href === pathname)?.label || 'Intelligence Center'}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {pathname === '/admin' ? 'Monitoring real-time risk landscape' : 'Operator Mode Activated'}
                  </p>
                </div>
                {testMode && (
                  <div className="flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-500 border border-amber-500/20 uppercase tracking-widest">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Simulated Environment
                  </div>
                )}
              </div>
              {children}
            </div>
          </main>

          {/* Mobile Bottom Nav */}
          <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pb-safe pt-2 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around">
              {PRIMARY_NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                      active
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={() => setIsMoreDrawerOpen(true)}
                className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500"
              >
                <MoreHorizontal size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">More</span>
              </button>
            </div>
          </nav>

          {/* More Drawer (Mobile) */}
          {isMoreDrawerOpen && (
            <>
              <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMoreDrawerOpen(false)} />
              <div className="fixed inset-x-0 bottom-0 z-[70] bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-bottom duration-300">
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6" />
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {SECONDARY_NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreDrawerOpen(false)}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                    >
                      <item.icon size={20} className="text-slate-600 dark:text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase text-center">{item.label}</span>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">System Theme</span>
                  <ThemeToggle />
                </div>
                <button
                  onClick={async () => {
                    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
                    window.location.href = '/admin';
                  }}
                  className="w-full mt-6 flex items-center justify-center gap-2 p-4 text-red-600 font-bold bg-red-50 dark:bg-red-900/10 rounded-2xl"
                >
                  <LogOut size={20} />
                  Terminate Session
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
