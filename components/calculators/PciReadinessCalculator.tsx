'use client';

import { useState } from 'react';
import { CalculatorCard } from './CalculatorCard';
import { PciReadinessResult } from '@/lib/calculators/pci-scoring';

const PCI_REQUIREMENTS = [
  { id: 'req1', label: 'Network Security Controls', desc: 'Firewalls, routers, and network access controls.' },
  { id: 'req2', label: 'Secure Configurations', desc: 'No default passwords or insecure settings.' },
  { id: 'req3', label: 'Stored Data Protection', desc: 'Encryption/Hashing for cardholder data at rest.' },
  { id: 'req4', label: 'Transmission Encryption', desc: 'TLS/SSL for data in transit over public networks.' },
  { id: 'req5', label: 'Malware Protection', desc: 'Antivirus and anti-malware on all relevant systems.' },
  { id: 'req6', label: 'Secure Systems & Software', desc: 'Regular patching and secure coding practices.' },
  { id: 'req7', label: 'Access Restriction', desc: 'Cardholder data access restricted to "need-to-know".' },
  { id: 'req8', label: 'Identification & Authentication', desc: 'Unique IDs and Multi-Factor Authentication (MFA).' },
  { id: 'req9', label: 'Physical Security', desc: 'Restricted physical access to servers and records.' },
  { id: 'req10', label: 'Logging & Monitoring', desc: 'Audit trails and log monitoring for all access.' },
  { id: 'req11', label: 'Security Testing', desc: 'Regular ASV scans and penetration testing.' },
  { id: 'req12', label: 'Security Policies', desc: 'Formal security policy shared with all staff.' },
];

export function PciReadinessCalculator() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<PciReadinessResult | null>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    industry: 'fintech',
    transactionVolume: 'level4',
    requirements: PCI_REQUIREMENTS.reduce((acc, req) => ({ ...acc, [req.id]: false }), {} as Record<string, boolean>),
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleRequirement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [id]: !prev.requirements[id]
      }
    }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.companyName) {
      alert('Please provide your company name and work email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/pci-dss-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          company_name: formData.companyName,
          industry: formData.industry,
          transaction_volume: formData.transactionVolume,
          requirements: formData.requirements,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setResult(data.results);
        setStep(4);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 4 && result) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="inline-block relative mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                <circle
                  cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (364 * result.score) / 100}
                  className="text-brand-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{result.score}%</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Ready</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">PCI DSS Readiness Score</h2>
            <p className="text-gray-600">
              Merchant Level: <span className="font-bold text-brand-600 uppercase">{formData.transactionVolume}</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100">
              <h3 className="text-sm font-bold text-brand-900 uppercase tracking-widest mb-1">Readiness Band</h3>
              <p className="text-xl font-bold text-brand-700 capitalize">{result.readinessBand.replace('_', ' ')}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Est. Compliance Cost</h3>
              <p className="text-xl font-bold text-slate-700">
                ${result.estimatedCostLow.toLocaleString()} - ${result.estimatedCostHigh.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg border-b pb-2">Identified Technical Gaps</h3>
            {result.gaps.length > 0 ? (
              <div className="grid gap-3">
                {result.gaps.map((gap, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {gap}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-600 font-medium">✓ No major gaps identified across the 12 requirements!</p>
            )}
          </div>

          <div className="mt-10 p-8 bg-brand-600 rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-2">Download PCI 4.0 Checklist</h3>
            <p className="text-brand-100 mb-6">Get a detailed roadmap for your Merchant Level.</p>
            <button className="bg-white text-brand-600 px-8 py-3 rounded-lg font-bold hover:bg-brand-50 transition-colors">
              Send PDF Roadmap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CalculatorCard
      title="PCI DSS Readiness Scorecard"
      description="Score your technical environment against the 12 core PCI requirements."
      step={step}
      totalSteps={3}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="e.g. Acme Payments"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Transaction Volume (Merchant Level)</label>
            <select
              value={formData.transactionVolume}
              onChange={e => setFormData({ ...formData, transactionVolume: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option value="level1">Level 1 (Over 6M transactions/year)</option>
              <option value="level2">Level 2 (1M - 6M transactions/year)</option>
              <option value="level3">Level 3 (20k - 1M transactions/year)</option>
              <option value="level4">Level 4 (Less than 20k transactions/year)</option>
            </select>
          </div>
          <button onClick={handleNext} disabled={!formData.companyName} className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50">
            Next: Requirements Checklist
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-sm text-gray-500 mb-4">Select the requirements you currently have implemented:</p>
          {PCI_REQUIREMENTS.map(req => (
            <div
              key={req.id}
              onClick={() => toggleRequirement(req.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.requirements[req.id] ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.requirements[req.id] ? 'bg-brand-600 border-brand-600' : 'bg-white border-gray-300'}`}>
                  {formData.requirements[req.id] && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{req.label}</div>
                  <div className="text-xs text-gray-500">{req.desc}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4 pt-4">
            <button onClick={handleBack} className="flex-1 py-4 text-gray-500 font-bold hover:text-gray-700">Back</button>
            <button onClick={handleNext} className="flex-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors">
              Next: Get Results
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 mb-6">
            <p className="text-sm text-brand-800 font-medium">
              Great! We're ready to calculate your score. Please provide your work email to receive the full gap analysis report.
            </p>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="alex@company.com"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={handleBack} className="flex-1 py-4 text-gray-500 font-bold hover:text-gray-700">Back</button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.email.includes('@')}
              className="flex-2 bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Calculating...' : 'See My Score'}
            </button>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
