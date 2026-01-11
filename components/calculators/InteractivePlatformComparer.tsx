'use client';

import { useState } from 'react';
import { Check, X, Info, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';

interface PlatformData {
  id: string;
  vendor_id: string;
  vendor_name: string;
  pricing_json: {
    starting_at: string;
    average_contract: string;
    structure: string;
    hidden_costs: string[];
  };
  features_json: {
    total_frameworks: number;
    integrations: number;
    automation_depth: string;
    key_features: string[];
    best_for: string;
  };
  pros_cons_json: {
    pros: string[];
    cons: string[];
  };
}

interface InteractivePlatformComparerProps {
  platforms: PlatformData[];
}

export function InteractivePlatformComparer({ platforms }: InteractivePlatformComparerProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['vanta', 'drata']);

  const togglePlatform = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace the last one if we're at 3
        setSelectedIds([selectedIds[0], selectedIds[1], id]);
      }
    }
  };

  const selectedPlatforms = selectedIds.map(id => platforms.find(p => p.vendor_id === id)).filter(Boolean) as PlatformData[];

  return (
    <div className="space-y-8">
      {/* Platform Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-600" />
          Select Platforms to Pitch (Choose up to 3)
        </h3>
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <button
              key={platform.vendor_id}
              onClick={() => togglePlatform(platform.vendor_id)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                selectedIds.includes(platform.vendor_id)
                  ? 'bg-brand-600 border-brand-600 text-white shadow-md transform scale-105'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-slate-50'
              }`}
            >
              {platform.vendor_name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-6 text-left text-sm font-bold text-slate-500 uppercase tracking-wider w-1/4">Feature</th>
              {selectedPlatforms.map(platform => (
                <th key={platform.vendor_id} className="p-6 text-center w-1/4">
                  <div className="text-xl font-black text-slate-900">{platform.vendor_name}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">{platform.features_json.best_for}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Pricing Section */}
            <tr className="bg-slate-50/50">
              <td colSpan={selectedPlatforms.length + 1} className="px-6 py-3 text-xs font-black text-brand-600 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3 h-3" />
                  Pricing Transparency
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700">Starting Price</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 text-center text-slate-900 font-bold">
                  {platform.pricing_json.starting_at}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700">Average Contract</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 text-center text-slate-600">
                  {platform.pricing_json.average_contract}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700">Hidden Costs</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 text-center">
                  <div className="flex flex-col gap-1 items-center">
                    {platform.pricing_json.hidden_costs.map((cost, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-100 font-medium">
                        {cost}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Features Section */}
            <tr className="bg-slate-50/50">
              <td colSpan={selectedPlatforms.length + 1} className="px-6 py-3 text-xs font-black text-brand-600 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Capabilities
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700">Frameworks Supported</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 text-center text-slate-900 font-bold">
                  {platform.features_json.total_frameworks}+
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700">Integrations</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 text-center text-slate-900 font-bold">
                  {platform.features_json.integrations}+
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700">Automation Depth</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    platform.features_json.automation_depth === 'High' || platform.features_json.automation_depth === 'Deep'
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {platform.features_json.automation_depth}
                  </span>
                </td>
              ))}
            </tr>

            {/* Pros/Cons Section */}
            <tr className="bg-slate-50/50">
              <td colSpan={selectedPlatforms.length + 1} className="px-6 py-3 text-xs font-black text-brand-600 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  Market Sentiment
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700 align-top">Key Strengths</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 align-top">
                  <ul className="space-y-2">
                    {platform.pros_cons_json.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 text-sm font-bold text-slate-700 align-top">Common Complaints</td>
              {selectedPlatforms.map(platform => (
                <td key={platform.vendor_id} className="p-6 align-top">
                  <ul className="space-y-2">
                    {platform.pros_cons_json.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-500 italic">
                        <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action CTA */}
      <div className="bg-brand-900 rounded-2xl p-8 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))] pointer-events-none" />
        <h3 className="text-2xl font-black mb-4">Need a non-biased verification?</h3>
        <p className="text-brand-100 max-w-2xl mx-auto mb-8">
          The market changes fast. We help companies navigate these platforms without the sales pressure. 
          Get a detailed comparison of quotes and implementation timelines tailored to your stack.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-brand-900 px-8 py-4 rounded-xl font-black shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1">
            Get Verified Quote →
          </button>
          <button className="bg-brand-800 text-white border border-brand-700 px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all">
            Talk to an Expert
          </button>
        </div>
      </div>
    </div>
  );
}
