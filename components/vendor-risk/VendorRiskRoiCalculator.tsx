'use client';

import { useState, useMemo } from 'react';

export default function VendorRiskRoiCalculator() {
  const [vendors, setVendors] = useState<number>(20);
  const [manualHours, setManualHours] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(100);
  const [reduction, setReduction] = useState<number>(70); // 70% reduction

  const results = useMemo(() => {
    const annualManualHours = vendors * manualHours;
    const annualManualCost = annualManualHours * hourlyRate;
    
    const reducedHours = manualHours * (1 - reduction / 100);
    const annualAutomatedHours = vendors * reducedHours;
    const annualAutomatedCost = annualAutomatedHours * hourlyRate;
    
    const savingsCost = annualManualCost - annualAutomatedCost;
    const savingsHours = annualManualHours - annualAutomatedHours;

    return {
      annualManualCost,
      annualAutomatedCost,
      savingsCost,
      savingsHours,
      annualManualHours,
      annualAutomatedHours,
    };
  }, [vendors, manualHours, hourlyRate, reduction]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Your Current Process</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Number of vendors to assess per year
              </label>
              <input
                type="number"
                value={vendors}
                onChange={(e) => setVendors(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Hours spent per assessment (manual)
              </label>
              <input
                type="number"
                value={manualHours}
                onChange={(e) => setManualHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
              <p className="mt-1 text-xs text-slate-500">Includes questionnaire review, evidence validation, and reporting.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Average hourly rate ($)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-brand-50 p-6 rounded-xl border border-brand-100 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-900">Projected Savings</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-brand-100">
                <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Annual Savings</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  ${results.savingsCost.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-brand-100">
                <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider">Hours Saved</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {results.savingsHours.toLocaleString()}h
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="text-sm text-slate-600">Manual Cost (Annual)</p>
                <p className="text-sm font-medium text-slate-900">${results.annualManualCost.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-slate-600">Automated Cost (Annual)</p>
                <p className="text-sm font-medium text-brand-600">${results.annualAutomatedCost.toLocaleString()}</p>
              </div>
              <div className="h-px bg-brand-100" />
              <div className="flex justify-between items-end">
                <p className="text-sm font-semibold text-slate-900">Net Efficiency Gain</p>
                <p className="text-sm font-bold text-brand-700">{reduction}% Faster</p>
              </div>
            </div>

            <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-lg shadow-md transition">
              Get Detailed ROI Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-3">Where do the savings come from?</h4>
        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="space-y-1">
            <p className="font-medium text-slate-800">Auto-Questionnaires</p>
            <p className="text-slate-600 text-xs">AI-driven analysis of SOC 2 reports and security docs replaces manual reading.</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-slate-800">Risk Scoring</p>
            <p className="text-slate-600 text-xs">Standardized triage logic ensures you only spend deep-dive time on high-risk vendors.</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-slate-800">Evidence Vault</p>
            <p className="text-slate-600 text-xs">Centralized repository for vendor evidence makes re-assessments 90% faster.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
