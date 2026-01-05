'use client';

import { useState, useMemo } from 'react';

export default function VendorRiskRoiCalculator() {
  const [step, setStep] = useState<1 | 2>(1);
  const [vendors, setVendors] = useState<number>(20);
  const [manualHours, setManualHours] = useState<number>(15);
  const [hourlyRate, setHourlyRate] = useState<number>(100);
  const [reduction, setReduction] = useState<number>(70); // 70% reduction
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [complianceDriver, setComplianceDriver] = useState('');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const COMPLIANCE_DRIVERS = [
    { value: 'soc2', label: 'SOC 2' },
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'hipaa', label: 'HIPAA' },
    { value: 'gdpr', label: 'GDPR / Privacy' },
    { value: 'enterprise_sales', label: 'Enterprise Sales / Security Questionnaires' },
    { value: 'other', label: 'Other' },
  ];

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }
    if (!company) {
      setError('Please enter your company name.');
      return;
    }
    if (!complianceDriver) {
      setError('Please select a primary compliance driver.');
      return;
    }
    setError('');
    
    // Capture partial lead
    try {
      fetch('/api/lead/partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          industry: complianceDriver,
          lead_type: 'vra_roi_partial',
          source_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      }).catch(console.error);
      
      setStep(2);
    } catch (err) {
      console.error(err);
      setStep(2); // Continue anyway
    }
  };

  const handleDownloadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Capture Full Lead
      const leadRes = await fetch('/api/lead/partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          lead_type: 'vra_roi_calculator',
          source_url: window.location.href,
          payload: { vendors, manualHours, hourlyRate, results, complianceDriver }
        }),
      });
      const leadData = await leadRes.json();
      const currentLeadId = leadData.lead_id;
      if (currentLeadId) setLeadId(currentLeadId);

      // 2. Generate PDF
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: currentLeadId,
          email,
          company,
          template: 'vra_roi',
          data: { vendors, manualHours, hourlyRate, results, complianceDriver }
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VRA_ROI_Report_${company.replace(/\s+/g, '_')}.pdf`;
        a.click();
        setSubmitted(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (step === 1) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-fade-in">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Get your ROI analysis</h3>
        <form onSubmit={handleNextStep} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-600 outline-none"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              We&apos;ll use this to send your report and occasional VRA insights.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Compliance Driver</label>
            <select
              required
              value={complianceDriver}
              onChange={(e) => setComplianceDriver(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-brand-600 outline-none"
            >
              <option value="">Select driver...</option>
              {COMPLIANCE_DRIVERS.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg shadow transition"
          >
            Calculate ROI
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-900">Your Process</h3>
            <button 
              onClick={() => setStep(1)}
              className="text-xs text-brand-600 font-medium hover:underline"
            >
              Edit Company Info
            </button>
          </div>
          
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

            <button
              onClick={handleDownloadReport}
              disabled={isSubmitting}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Report...
                </>
              ) : submitted ? (
                'Report Downloaded ✓'
              ) : (
                <>
                  Download ROI Report (PDF)
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </>
              )}
            </button>
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}

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
