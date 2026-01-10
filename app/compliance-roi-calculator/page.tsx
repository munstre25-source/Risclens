'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { MonetizationCTA } from '@/components/MonetizationCTA';
import { HumanCheckCTA } from '@/components/HumanCheckCTA';
import { ContentFeedback } from '@/components/ContentFeedback';
import { LastVerifiedBadge, AccuracyDisclaimer } from '@/components/AccuracyGuards';
import { PricingBenchmark } from '@/lib/content';

type ComplianceApproach = 'manual' | 'automation' | 'all_in_one';

interface ROIEstimate {
  low: number;
  median: number;
  high: number;
  citations: string[];
}

interface ROIResult {
  manualCost: ROIEstimate;
  automationCost: ROIEstimate;
  allInOneCost: ROIEstimate;
  manualTime: string;
  automationTime: string;
  allInOneTime: string;
  recommendation: ComplianceApproach;
  savings: number;
  lastVerified: string;
  breakdown: {
    manual: Record<string, ROIEstimate>;
    automation: Record<string, ROIEstimate>;
    allInOne: Record<string, ROIEstimate>;
  };
}

function calculateROI(
  employees: number,
  techStack: string,
  frameworks: string[],
  hasSecurityLead: boolean,
  benchmarks: PricingBenchmark[]
): ROIResult {
  const getBench = (cat: string, tier: string = 'startup') => {
    const b = benchmarks.find(b => b.category === cat && b.tier === tier) || benchmarks.find(b => b.category === cat);
    return b ? { low: b.low_estimate, median: b.median_estimate, high: b.high_estimate, citation: b.source_citation } : { low: 0, median: 0, high: 0, citation: '' };
  };

  const tier = employees <= 50 ? 'startup' : 'mid_market';
  const baseMultiplier = employees <= 50 ? 1 : employees <= 200 ? 1.5 : employees <= 500 ? 2 : 2.5;
  const frameworkMultiplier = frameworks.length === 1 ? 1 : frameworks.length === 2 ? 1.6 : 2;
  const techComplexity = techStack === 'simple' ? 0.9 : techStack === 'moderate' ? 1 : 1.2;

  const platformBench = getBench('compliance_platform', tier);
  const audit1Bench = getBench('audit_fee_type_1', tier);
  const audit2Bench = getBench('audit_fee_type_2', tier);
  const internalHoursBench = getBench('internal_effort_hours', tier);

  const applyMultipliers = (b: any, m: number) => ({
    low: Number(b.low) * m,
    median: Number(b.median) * m,
    high: Number(b.high) * m,
    citations: [b.citation].filter(Boolean) as string[]
  });

  const manual = {
    platform: { low: 0, median: 0, high: 0, citations: [] },
    auditor: applyMultipliers(audit2Bench, frameworkMultiplier),
    consultant: { low: 15000 * baseMultiplier * techComplexity, median: 25000 * baseMultiplier * techComplexity, high: 40000 * baseMultiplier * techComplexity, citations: ['Market average for boutique GRC firms'] },
    internal: { 
      low: Number(internalHoursBench.low) * (hasSecurityLead ? 50 : 100), 
      median: Number(internalHoursBench.median) * (hasSecurityLead ? 50 : 100), 
      high: Number(internalHoursBench.high) * (hasSecurityLead ? 50 : 100),
      citations: [internalHoursBench.citation].filter(Boolean) as string[]
    },
  };

  const automation = {
    platform: applyMultipliers(platformBench, frameworkMultiplier),
    auditor: applyMultipliers(audit2Bench, 0.8 * frameworkMultiplier),
    consultant: { low: 0, median: 0, high: 0, citations: [] },
    internal: {
      low: Number(internalHoursBench.low) * (hasSecurityLead ? 20 : 40),
      median: Number(internalHoursBench.median) * (hasSecurityLead ? 20 : 40),
      high: Number(internalHoursBench.high) * (hasSecurityLead ? 20 : 40),
      citations: [internalHoursBench.citation].filter(Boolean) as string[]
    },
  };

  const allInOne = {
    platform: applyMultipliers(platformBench, 1.8 * frameworkMultiplier),
    auditor: { low: 0, median: 0, high: 0, citations: [] },
    consultant: { low: 0, median: 0, high: 0, citations: [] },
    internal: {
      low: Number(internalHoursBench.low) * (hasSecurityLead ? 10 : 25),
      median: Number(internalHoursBench.median) * (hasSecurityLead ? 10 : 25),
      high: Number(internalHoursBench.high) * (hasSecurityLead ? 10 : 25),
      citations: [internalHoursBench.citation].filter(Boolean) as string[]
    },
  };

  const sumEstimates = (obj: any): ROIEstimate => {
    const res = { low: 0, median: 0, high: 0, citations: [] as string[] };
    Object.values(obj).forEach((v: any) => {
      res.low += v.low;
      res.median += v.median;
      res.high += v.high;
      v.citations.forEach((c: string) => { if (!res.citations.includes(c as never)) res.citations.push(c as never); });
    });
    return res;
  };

  const manualCost = sumEstimates(manual);
  const automationCost = sumEstimates(automation);
  const allInOneCost = sumEstimates(allInOne);

  const costs = [
    { approach: 'manual' as ComplianceApproach, cost: manualCost.median },
    { approach: 'automation' as ComplianceApproach, cost: automationCost.median },
    { approach: 'all_in_one' as ComplianceApproach, cost: allInOneCost.median },
  ];

  const sorted = costs.sort((a, b) => a.cost - b.cost);
  const recommendation = sorted[0].approach;
  const savings = sorted[2].cost - sorted[0].cost;

  return {
    manualCost,
    automationCost,
    allInOneCost,
    manualTime: employees <= 100 ? '4-6 months' : '6-9 months',
    automationTime: employees <= 100 ? '4-8 weeks' : '8-12 weeks',
    allInOneTime: employees <= 100 ? '3-6 weeks' : '6-10 weeks',
    recommendation,
    savings,
    lastVerified: benchmarks[0]?.last_verified_at || new Date().toISOString(),
    breakdown: { manual, automation, allInOne },
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRange(low: number, high: number): string {
  return `${formatCurrency(low)} - ${formatCurrency(high)}`;
}

export default function ComplianceROICalculator() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [employees, setEmployees] = useState<number>(50);
  const [techStack, setTechStack] = useState<string>('moderate');
  const [frameworks, setFrameworks] = useState<string[]>(['soc2']);
  const [hasSecurityLead, setHasSecurityLead] = useState<boolean>(false);
  const [result, setResult] = useState<ROIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [benchmarks, setBenchmarks] = useState<PricingBenchmark[]>([]);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/compliance/benchmarks')
      .then(res => res.json())
      .then(data => {
        if (data.ok) setBenchmarks(data.benchmarks);
      });
  }, []);

  const toggleFramework = (fw: string) => {
    setFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    );
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        const res = await fetch('/api/lead/partial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email || null,
            company: companyName,
            industry,
            lead_type: 'roi_calculator',
            source_url: typeof window !== 'undefined' ? window.location.href : '',
          }),
        });
        const data = await res.json();
        if (data.ok) setLeadId(data.lead_id);
      } catch (err) {
        console.error('Lead capture failed:', err);
      }
      setStep(2);
    }
  };

  const handleCalculate = async () => {
    setLoading(true);
    const roi = calculateROI(employees, techStack, frameworks, hasSecurityLead, benchmarks);
    setResult(roi);
    setStep(3);
    
    try {
      await fetch('/api/lead/partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company: companyName,
          industry,
          num_employees: employees,
          tech_stack: techStack,
          frameworks: frameworks,
          has_security_lead: hasSecurityLead,
          estimated_cost_low: Math.min(roi.manualCost.low, roi.automationCost.low, roi.allInOneCost.low),
          estimated_cost_high: Math.max(roi.manualCost.high, roi.automationCost.high, roi.allInOneCost.high),
          payload: { ...roi, step: 'completed' },
          lead_type: 'roi_calculator',
          source_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
    } catch (err) {
      console.error('Lead update failed:', err);
    }
    setLoading(false);
  };

  const handleGeneratePdf = async () => {
    if (!leadId) return;
    setPdfGenerating(true);
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      });
      const data = await res.json();
      if (data.success) {
        setPdfUrl(data.pdf_url);
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead_id: leadId }),
        }).catch(err => console.error('Failed to send ROI email:', err));
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setPdfGenerating(false);
    }
  };

  const getApproachLabel = (approach: ComplianceApproach) => {
    switch (approach) {
      case 'manual': return 'Manual (Consultant + Auditor)';
      case 'automation': return 'Automation Platform (Vanta, Drata, etc.)';
      case 'all_in_one': return 'All-in-One (Thoropass, Sprinto)';
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-4">
          {result && <LastVerifiedBadge date={result.lastVerified} framework="Market Benchmarks 2026" />}
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Cost Certainty</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Validate Your Compliance Budget & ROI</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eliminate cost ambiguity. Compare the total cost of ownership for Manual, Automation, and All-in-One compliance paths based on current market data.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {step === 1 && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-8 shadow-sm max-w-lg mx-auto">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Step 1: Basic Information</h2>
                <p className="text-slate-500">Provide basic details to start your ROI estimation.</p>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Company Name</span>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Acme Corp" className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500" required />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Industry</span>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:ring-brand-500" required>
                    <option value="">Select Industry</option>
                    <option value="saas">SaaS / Software</option>
                    <option value="fintech">Fintech</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Work Email <span className="text-gray-400 text-xs font-normal">(optional)</span></span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500" />
                  <p className="text-[10px] text-slate-400 mt-1">Skip this for a quick score. Enter it to get your full ROI roadmap PDF later.</p>
                </label>
              </div>
              <button onClick={handleNextStep} disabled={!companyName || !industry} className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50">Next: Configuration</button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-8 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Step 2: Compliance Configuration</h2>
                <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-brand-600">Back</button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Number of Employees</span>
                    <select value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:ring-brand-500">
                      <option value={25}>1-25 employees</option>
                      <option value={50}>26-50 employees</option>
                      <option value={100}>51-100 employees</option>
                      <option value={200}>101-200 employees</option>
                      <option value={500}>201-500 employees</option>
                      <option value={1000}>500+ employees</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Tech Stack Complexity</span>
                    <select value={techStack} onChange={(e) => setTechStack(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:ring-brand-500">
                      <option value="simple">Simple (Single cloud, few integrations)</option>
                      <option value="moderate">Moderate (Multi-service, standard SaaS stack)</option>
                      <option value="complex">Complex (Multi-cloud, microservices, on-prem hybrid)</option>
                    </select>
                  </label>
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="text-sm font-medium text-slate-700 block mb-2">Required Frameworks</span>
                    <div className="flex flex-wrap gap-2">
                      {['soc2', 'iso27001', 'hipaa', 'gdpr'].map((fw) => (
                        <button key={fw} onClick={() => toggleFramework(fw)} className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${frameworks.includes(fw) ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-slate-700 border-slate-300 hover:border-brand-300'}`}>{fw.toUpperCase()}</button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={hasSecurityLead} onChange={(e) => setHasSecurityLead(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                    <span className="text-sm text-slate-700">We have a dedicated security/compliance lead</span>
                  </label>
                </div>
              </div>
              <button onClick={handleCalculate} disabled={frameworks.length === 0 || loading} className="w-full bg-brand-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-brand-700 transition-colors disabled:opacity-50">{loading ? 'Calculating...' : 'Calculate My ROI'}</button>
            </div>
          )}

          {step === 3 && result && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <button onClick={() => setStep(2)} className="text-sm text-brand-700 hover:text-brand-800 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> Adjust Inputs
                </button>
                <div className="flex items-center gap-2">
                   <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                   <span className="text-sm font-medium text-slate-600 uppercase tracking-wider">Results Ready</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative">
                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <p className="text-brand-300 font-semibold uppercase tracking-widest text-sm">Recommended Approach</p>
                    <h2 className="text-4xl font-extrabold">{getApproachLabel(result.recommendation)}</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <p className="text-slate-300 text-sm mb-1">Estimated Annual Savings</p>
                      <p className="text-4xl font-bold text-green-400">~{formatCurrency(result.savings)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <p className="text-slate-300 text-sm mb-1">Estimated Timeline</p>
                      <p className="text-4xl font-bold text-brand-200">{result.recommendation === 'manual' ? result.manualTime : result.recommendation === 'automation' ? result.automationTime : result.allInOneTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: 'manual', label: 'Manual Route', cost: result.manualCost, time: result.manualTime, breakdown: result.breakdown.manual },
                  { id: 'automation', label: 'Automation Platform', cost: result.automationCost, time: result.automationTime, breakdown: result.breakdown.automation },
                  { id: 'all_in_one', label: 'All-in-One', cost: result.allInOneCost, time: result.allInOneTime, breakdown: result.breakdown.allInOne },
                ].map((item) => (
                  <div key={item.id} className={`relative border rounded-2xl p-6 space-y-4 transition-all ${result.recommendation === item.id ? 'border-brand-500 ring-2 ring-brand-500/20 bg-brand-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    {result.recommendation === item.id && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">Best Value</span>}
                    <div>
                      <h3 className="font-bold text-slate-900">{item.label}</h3>
                      <p className="text-xl font-extrabold text-slate-900 mt-2">{formatRange(item.cost.low, item.cost.high)}</p>
                      <p className="text-xs text-slate-500 mt-1">Timeline: {item.time}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      {Object.entries(item.breakdown).map(([key, val]) => (
                        (val as ROIEstimate).median > 0 && (
                          <div key={key} className="flex flex-col text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-500 capitalize">{key}:</span>
                              <span className="font-medium text-slate-700">{formatCurrency((val as ROIEstimate).median)}</span>
                            </div>
                            {(val as ROIEstimate).citations.length > 0 && (
                              <span className="text-[9px] text-slate-400 italic">Source: {(val as ROIEstimate).citations[0]}</span>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-8 text-center space-y-6">
                <div className="max-w-xl mx-auto space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900">Get Your Detailed Procurement Roadmap</h3>
                  <p className="text-slate-600">Download a full 12-page PDF breakdown including platform vendor comparisons, auditor selection criteria, and a month-by-month compliance budget for 2026.</p>
                </div>
                {!pdfUrl ? (
                  <div className="max-w-sm mx-auto space-y-4">
                    {!email && (
                      <div className="text-left space-y-2">
                        <label className="text-sm font-medium text-slate-700">Work Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500" />
                      </div>
                    )}
                    <button onClick={handleGeneratePdf} disabled={pdfGenerating || (!email && !pdfGenerating)} className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50">
                      {pdfGenerating ? 'Generating PDF...' : 'Download PDF Roadmap'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-green-600 font-bold flex items-center justify-center gap-2">Your Roadmap is Ready!</p>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white py-4 px-10 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg">Open PDF Report</a>
                  </div>
                )}
              </div>

                <div className="space-y-6">
                  <MonetizationCTA leadId={leadId} email={email} context="ROI Calculator" />
                  <HumanCheckCTA leadId={leadId} email={email} context="ROI Calculator" />
                </div>
                
                <ContentFeedback pageUrl="/compliance-roi-calculator" />

                <AccuracyDisclaimer />


              <div className="text-center pt-8 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Compare Platforms Mentioned Above</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/compare/vanta-vs-drata" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-brand-700 hover:border-brand-300">Vanta vs Drata</Link>
                  <Link href="/compare/thoropass-vs-vanta" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-brand-700 hover:border-brand-300">Thoropass vs Vanta</Link>
                  <Link href="/compare/sprinto-vs-vanta" className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-brand-700 hover:border-brand-300">Sprinto vs Vanta</Link>
                  <Link href="/compare" className="px-4 py-2 rounded-lg bg-brand-50 border border-brand-100 text-sm font-bold text-brand-700 hover:bg-brand-100 transition-colors">View all 15+ comparisons →</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
