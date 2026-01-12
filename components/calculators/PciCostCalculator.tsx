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

export function PciCostCalculator() {
  const [level, setLevel] = useState<'level1' | 'level2' | 'level3' | 'level4'>('level4');
  const [saqType, setSaqType] = useState<'A' | 'D'>('D');
  const [employees, setEmployees] = useState<number>(25);
  const [tooling, setTooling] = useState<boolean>(true);

  const estimates = useMemo(() => {
    let baseQSA = 0;
    let baseASV = 3000;
    let basePentest = 8000;
    let baseInternal = employees * 400;
    let basePlatform = tooling ? 15000 : 0;

    // Adjust based on Level
    if (level === 'level1') {
      baseQSA = 60000; // ROC (Report on Compliance)
      baseASV = 8000;
      basePentest = 15000;
    } else if (level === 'level2') {
      baseQSA = 25000; // SAQ Validation
    } else {
      baseQSA = 5000; // Minimal QSA support for SAQ
    }

    // SAQ-A is much simpler than SAQ-D
    const complexityMultiplier = saqType === 'A' ? 0.4 : 1.0;

    const items: CostLineItem[] = [
      {
        label: level === 'level1' ? 'QSA ROC Assessment' : 'QSA Validation / SAQ Support',
        low: baseQSA * complexityMultiplier * 0.8,
        median: baseQSA * complexityMultiplier,
        high: baseQSA * complexityMultiplier * 1.5,
        description: level === 'level1' ? 'On-site Report on Compliance (ROC) by a QSA.' : 'Expert help filling out and validating your SAQ.',
      },
      {
        label: 'ASV Quarterly Scanning',
        low: baseASV * 0.7,
        median: baseASV,
        high: baseASV * 1.3,
        description: 'Approved Scanning Vendor (ASV) fees for quarterly external scans.',
      },
      {
        label: 'Penetration Testing (Annual)',
        low: basePentest * 0.8,
        median: basePentest,
        high: basePentest * 1.4,
        description: 'Required manual assessment of your cardholder data environment.',
      },
      {
        label: 'Compliance Automation Platform',
        low: basePlatform * 0.8,
        median: basePlatform,
        high: basePlatform * 1.2,
        description: 'Software to automate evidence collection and monitoring.',
      },
      {
        label: 'Internal Engineering Effort',
        low: baseInternal * complexityMultiplier * 0.7,
        median: baseInternal * complexityMultiplier,
        high: baseInternal * complexityMultiplier * 1.4,
        description: 'Estimated value of staff time dedicated to PCI controls.',
      },
    ];

    const total = {
      low: items.reduce((sum, item) => sum + item.low, 0),
      median: items.reduce((sum, item) => sum + item.median, 0),
      high: items.reduce((sum, item) => sum + item.high, 0),
    };

    return { items, total };
  }, [level, saqType, employees, tooling]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Interactive PCI Cost Estimator</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">Merchant Level</label>
            <select 
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="level1">Level 1 (6M+ tx/year) - ROC Required</option>
              <option value="level2">Level 2 (1M-6M tx/year)</option>
              <option value="level3">Level 3 (20k-1M tx/year)</option>
              <option value="level4">Level 4 (Under 20k tx/year)</option>
            </select>
            <p className="text-[10px] text-slate-500 italic">Level dictates whether you need an on-site audit (ROC) or SAQ.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">Scope Type (SAQ)</label>
            <div className="flex bg-white rounded-xl p-1 border border-slate-200">
              <button 
                onClick={() => setSaqType('A')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${saqType === 'A' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                SAQ-A (Redirect)
              </button>
              <button 
                onClick={() => setSaqType('D')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${saqType === 'D' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                SAQ-D (Direct API)
              </button>
            </div>
            <p className="text-[10px] text-slate-500 italic">SAQ-A is much cheaper as it outsources data handling to Stripe/etc.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">Company Size: {employees} Employees</label>
            <input 
              type="range" 
              min="1" 
              max="500" 
              value={employees}
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">Automation Platform</label>
            <div className="flex items-center gap-3 py-1">
              <button 
                onClick={() => setTooling(!tooling)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${tooling ? 'bg-brand-600' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${tooling ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm text-slate-600 font-medium">{tooling ? 'Using Compliance Software' : 'Manual Spreadsheets'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Estimated PCI Compliance Budget</p>
          <div className="flex items-baseline justify-center gap-4">
            <div className="text-xl font-bold text-slate-400">
              ${Math.round(estimates.total.low / 1000)}k
            </div>
            <div className="text-6xl font-black text-slate-900 tracking-tight">
              ${Math.round(estimates.total.median / 1000)}k
            </div>
            <div className="text-xl font-bold text-slate-400">
              ${Math.round(estimates.total.high / 1000)}k
            </div>
          </div>
          <p className="text-xs text-brand-600 mt-3 font-bold bg-brand-50 inline-block px-3 py-1 rounded-full border border-brand-100 uppercase tracking-tighter">
            Merchant {level.toUpperCase()} Estimation
          </p>
        </div>

        <div className="space-y-2">
          {estimates.items.map((item) => (
            <div key={item.label} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all">
              <div className="max-w-md">
                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <div className="text-sm font-bold text-brand-700 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap">
                ${Math.round(item.low).toLocaleString()} – ${Math.round(item.high).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold mb-2">Ready to start your PCI journey?</p>
            <p className="text-slate-400 text-sm max-w-sm">Use our scorecard to see if you meet the 12 requirements today.</p>
          </div>
          <Link 
            href="/pci-dss-readiness-calculator"
            className="whitespace-nowrap bg-brand-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-brand-500 transition-all transform hover:scale-105"
          >
            Check Readiness Score →
          </Link>
        </div>
      </div>
    </div>
  );
}
