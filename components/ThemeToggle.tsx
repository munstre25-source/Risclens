'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-all ${
          theme === 'light'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        title="Light Mode"
      >
        <Sun size={14} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-all ${
          theme === 'dark'
            ? 'bg-slate-900 text-slate-100 shadow-sm'
            : 'text-slate-500 hover:text-slate-400'
        }`}
        title="Dark Mode"
      >
        <Moon size={14} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-all ${
          theme === 'system'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-400'
        }`}
        title="System Theme"
      >
        <Laptop size={14} />
      </button>
    </div>
  );
}
