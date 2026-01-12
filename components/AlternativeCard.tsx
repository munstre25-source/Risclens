import Link from 'next/link';
import { Check, ArrowRight, Star } from 'lucide-react';
import { ComplianceTool } from '@/lib/compliance-tools';

interface AlternativeCardProps {
  tool: ComplianceTool;
  originalTool: ComplianceTool;
  rank: number;
}

export default function AlternativeCard({ tool, originalTool, rank }: AlternativeCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
              {rank}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{tool.name}</h3>
              <p className="text-slate-500">{tool.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tool.g2_rating && (
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {tool.g2_rating} / 5
              </div>
            )}
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Best for {tool.best_for || 'Enterprises'}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              Why choose {tool.name} over {originalTool.name}?
            </h4>
              <ul className="space-y-2">
                {(tool.pros || []).slice(0, 3).map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Key Differentiators</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Pricing Starting</span>
                <span className="font-medium text-slate-900">{tool.pricing_starting || 'Custom'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Integrations</span>
                <span className="font-medium text-slate-900">{tool.integrations_count || '100'}+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Expert Support</span>
                <span className="font-medium text-slate-900">Included</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100">
          <Link
            href={`/compare/${tool.slug}-vs-${originalTool.slug}`}
            className="flex-1 text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Compare {tool.name} vs {originalTool.name} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/pricing/${tool.slug}`}
            className="flex-1 text-center bg-white text-slate-700 font-bold py-3 px-6 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            View Pricing Details
          </Link>
        </div>
      </div>
    </div>
  );
}
