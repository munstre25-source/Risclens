'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root Error Boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            An unexpected error occurred. We've been notified and are looking into it.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
        
        {error.digest && (
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
