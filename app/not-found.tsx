import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-10 flex justify-center">
          <Link href="/">
            <Image
              src="/logo/logo-wordmark.png"
              alt="RiscLens"
              width={240}
              height={72}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="mb-8">
            <h1 className="text-9xl font-bold text-slate-100">404</h1>
            <div className="relative -mt-16">
              <h2 className="text-3xl font-bold text-slate-900">
                Lost in Compliance?
              </h2>
              <p className="text-slate-600 mt-4 text-lg">
                The page you're looking for doesn't exist, but your compliance roadmap does. Let's get you back on track.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Link
              href="/soc-2-readiness-index"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-xl hover:shadow-brand-200/50"
            >
              Start Free Readiness Assessment →
            </Link>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Return Home
              </Link>
              <Link
                href="/tools"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Explore Tools
              </Link>
            </div>
          </div>

        <div className="mt-12 text-sm text-slate-400">
          Need help? <Link href="/about" className="text-brand-600 hover:underline">Contact our support team</Link>
        </div>
      </div>
    </div>
  );
}

