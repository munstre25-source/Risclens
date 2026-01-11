'use client';

import Link from 'next/link';
import { FileSearch, ArrowRight, Sparkles } from 'lucide-react';

export default function GapAnalyzerCTA() {
  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <FileSearch className="w-32 h-32 rotate-12" />
      </div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3 h-3" />
          AI-Powered Analysis
        </div>
        
        <h3 className="text-3xl font-bold mb-4">Have an existing security policy?</h3>
        <p className="text-brand-100 text-lg mb-8 max-w-xl">
          Upload your existing PDF policies to our AI Evidence Gap Analyzer. We'll map your content directly to SOC 2 controls and identify exactly what's missing.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link
            href="/evidence-gap-analyzer"
            className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 font-bold px-6 py-3 rounded-xl transition-all"
          >
            Start Free Analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-brand-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            No account required
          </div>
        </div>
      </div>
    </div>
  );
}
