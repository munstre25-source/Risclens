'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface CostLineItem {
  label: string;
  low: number;
  median: number;
  high: number;
  description: string;
}

export function Soc2CostCalculator() {
  const [employees, setEmployees] = useState<number>(25);
  const [auditType, setAuditType] = useState<'type1' | 'type2'>('type2');
  const [industry, setIndustry] = useState<string>('saas');
  const [tooling, setTooling] = useState<boolean>(true);

  const estimates = useMemo(() => {
    let baseAudit = auditType === 'type1' ? 15000 : 35000;
    let basePlatform = tooling ? 18000 : 0;
    let basePentest = 7500;
    let baseInternal = employees * 500; // Rough estimate of internal time value

    // Multipliers
    let multiplier = 1;
    if (industry === 'fintech' || industry === 'healthcare') multiplier = 1.25;
    if (employees > 100) multiplier *= 1.5;
    if (employees < 15) multiplier *= 0.8;

    const items: CostLineItem[] = [
      {
        label: `Audit Fee (SOC 2 ${auditType === 'type1' ? 'Type I' : 'Type II'})`,
        low: baseAudit * multiplier * 0.9,
        median: baseAudit * multiplier,
        high: baseAudit * multiplier * 1.3,
        description: 'CPA firm fees for readiness review and formal report.',
      },
      {
        label: 'Compliance Platform Subscription',
        low: basePlatform * 0.8,
        median: basePlatform,
        high: basePlatform * 1.2,
        description: 'Vanta, Drata, or similar automation software.',
      },
      {
        label: 'Penetration Testing',
        low: basePentest * 0.8,
        median: basePentest,
        high: basePentest * 1.5,
        description: 'Manual security assessment required by most auditors.',
      },
      {
        label: 'Internal Opportunity Cost',
        low: baseInternal * 0.7,
        median: baseInternal,
        high: baseInternal * 1.4,
        description: 'Estimated value of engineering and admin time spent on compliance.',
      },
    ];

    const total = {
      low: items.reduce((sum, item) => sum + item.low, 0),
      median: items.reduce((sum, item) => sum + item.median, 0),
      high: items.reduce((sum, item) => sum + item.high, 0),
    };

    return { items, total };
  }, [employees, auditType, industry, tooling]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Interactive Cost Estimator</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Company Size (Employees)</label>
            <input 
              type="range" 
              min="1" 
              max="500" 
              value={employees}
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>1</span>
              <span className="font-bold text-brand-600">{employees} employees</span>
              <span>500+</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Audit Type</label>
            <div className="flex bg-white rounded-lg p-1 border border-slate-200">
              <button 
                onClick={() => setAuditType('type1')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${auditType === 'type1' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Type I
              </button>
              <button 
                onClick={() => setAuditType('type2')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${auditType === 'type2' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Type II
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Industry</label>
            <select 
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="saas">Standard SaaS</option>
              <option value="fintech">Fintech / Payments</option>
              <option value="healthcare">Healthcare / MedTech</option>
              <option value="ecommerce">E-commerce</option>
              <option value="ai">AI / Machine Learning</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Automation Tooling</label>
            <div className="flex items-center gap-3 py-2">
              <button 
                onClick={() => setTooling(!tooling)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${tooling ? 'bg-brand-600' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tooling ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-slate-600">{tooling ? 'Using Vanta/Drata/etc.' : 'Manual Evidence Collection'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Estimated Annual Budget</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-2xl font-bold text-slate-400">
              ${Math.round(estimates.total.low / 1000)}k
            </div>
            <div className="text-5xl font-extrabold text-slate-900">
              ${Math.round(estimates.total.median / 1000)}k
            </div>
            <div className="text-2xl font-bold text-slate-400">
              ${Math.round(estimates.total.high / 1000)}k
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 italic">Based on 2026 market benchmarks</p>
        </div>

        <div className="space-y-4">
          {estimates.items.map((item) => (
            <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-b border-slate-100 last:border-0">
              <div className="max-w-md">
                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <div className="text-sm font-semibold text-slate-900 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                ${Math.round(item.low).toLocaleString()} – ${Math.round(item.high).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

          <div className="mt-10 p-6 rounded-xl bg-brand-50 border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-brand-900 font-bold mb-1">Have existing policies?</p>
              <p className="text-brand-800 text-sm">Use our AI Evidence Gap Analyzer to see how close your current documentation is to SOC 2 compliance.</p>
            </div>
            <Link 
              href="/evidence-gap-analyzer"
              className="whitespace-nowrap bg-white text-brand-700 border border-brand-200 px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-brand-50 transition-all"
            >
              Check for Gaps →
            </Link>
          </div>

          <div className="mt-6 p-6 rounded-xl bg-brand-600 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-white font-bold mb-1 text-lg">Get a verified quote</p>
              <p className="text-brand-50 text-sm">Download a full budget breakdown tailored to your environment.</p>
            </div>
            <Link 
              href="/soc-2-readiness-calculator"
              className="whitespace-nowrap bg-white text-brand-700 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-brand-50 transition-all"
            >
              Get tailored results →
            </Link>
          </div>
      </div>
    </div>
  );
}
