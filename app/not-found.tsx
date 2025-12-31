import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-brand-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mt-2">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors"
          >
            Go Home
          </Link>
          <div className="text-sm text-gray-500">
            or{' '}
            <Link
              href="/soc-2-readiness-index"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              try our SOC 2 Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

