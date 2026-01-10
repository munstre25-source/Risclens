'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Error Boundary:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Admin Console Error
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        We encountered an error while loading the admin interface. This might be a temporary connection issue.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Operation
        </button>
        
        <Link
          href="/admin"
          className="flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Admin Dashboard
        </Link>
      </div>

      {error.digest && (
        <div className="mt-12 p-3 bg-gray-100 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 font-mono">
            Debug ID: {error.digest}
          </p>
        </div>
      )}
    </div>
  );
}
