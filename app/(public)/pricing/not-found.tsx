import Link from 'next/link';
import { ArrowLeft, Calculator, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-brand-100 rounded-full">
              <Search className="w-12 h-12 text-brand-600" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Pricing Page Not Found</h1>
          <p className="text-slate-600 mb-10">
            We couldn't find the specific vendor pricing page you're looking for. It may have been moved or the vendor name might be misspelled.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/pricing"
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pricing Hub
            </Link>
            <Link 
              href="/soc-2-cost-calculator"
              className="flex items-center justify-center gap-2 w-full bg-white text-slate-700 font-bold py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Calculator className="w-5 h-5" />
              Use Cost Calculator
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">Popular Pricing Guides:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pricing/vanta" className="text-xs font-bold text-brand-600 hover:underline">Vanta</Link>
              <Link href="/pricing/drata" className="text-xs font-bold text-brand-600 hover:underline">Drata</Link>
              <Link href="/pricing/secureframe" className="text-xs font-bold text-brand-600 hover:underline">Secureframe</Link>
              <Link href="/pricing/sprinto" className="text-xs font-bold text-brand-600 hover:underline">Sprinto</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
