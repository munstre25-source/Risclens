'use client';

import { useState, useEffect } from 'react';

interface Variant {
  id: string;
  variation_id: string;
  name: string;
  headline: string;
  cta_text: string;
  impressions: number;
  submissions: number;
  active: boolean;
  created_at: string;
}

export default function ExperimentsPage() {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const fetchVariants = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/variants');
      const data = await response.json();
      if (data.success) {
        setVariants(data.variants);
      } else {
        setError(data.error || 'Failed to fetch variants');
      }
    } catch (err) {
      setError('An error occurred while fetching variants');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const toggleVariant = async (variantId: string, currentStatus: boolean) => {
    setIsToggling(variantId);
    try {
      const response = await fetch('/api/admin/toggle-variant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variant_id: variantId, active: !currentStatus }),
      });

      const data = await response.json();
      if (data.success) {
        // Refresh variants to reflect changes (only one can be active)
        await fetchVariants();
      } else {
        alert(data.error || 'Failed to toggle variant');
      }
    } catch (err) {
      alert('An error occurred while toggling variant');
    } finally {
      setIsToggling(null);
    }
  };

  const calculateConversion = (impressions: number, submissions: number) => {
    if (impressions === 0) return '0%';
    return `${((submissions / impressions) * 100).toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">A/B Experiments</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage landing page variations and monitor real-time conversion metrics.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Variant Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Impressions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Submissions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Conv. Rate</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {variants.map((variant) => (
                <tr key={variant.variation_id} className={variant.active ? 'bg-blue-50/30' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {variant.active ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        Paused
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">{variant.name}</div>
                    <div className="text-xs text-slate-500 truncate max-w-xs">{variant.headline}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {variant.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {variant.submissions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-slate-900 mr-2">
                        {calculateConversion(variant.impressions, variant.submissions)}
                      </span>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full" 
                          style={{ width: calculateConversion(variant.impressions, variant.submissions) }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleVariant(variant.variation_id, variant.active)}
                      disabled={isToggling !== null}
                      className={`inline-flex items-center px-3 py-1.5 border rounded-md text-xs transition-colors ${
                        variant.active
                          ? 'border-red-200 text-red-600 hover:bg-red-50'
                          : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                      } ${isToggling === variant.variation_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isToggling === variant.variation_id 
                        ? 'Updating...' 
                        : variant.active ? 'Pause Variant' : 'Activate Variant'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="text-sm font-bold text-amber-900 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Pro Tip: Experiment Traffic
        </h3>
        <p className="text-xs text-amber-800 mt-1">
          When multiple variants are available, the system will soon support split-traffic distribution. 
          Currently, the "Active" variant receives 100% of the traffic.
        </p>
      </div>
    </div>
  );
}
