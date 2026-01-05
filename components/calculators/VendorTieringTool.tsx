'use client';

import { useState } from 'react';
import { CalculatorCard } from './CalculatorCard';
import { calculateVendorTier, TieringInputs, TieringResult } from '@/lib/calculators/tiering';

export function VendorTieringTool() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<TieringInputs>({
    dataAccess: 'none',
    serviceCriticality: 'low',
    hostingModel: 'saas',
  });
  const [result, setResult] = useState<TieringResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculate = async () => {
    setIsSubmitting(true);
    const res = calculateVendorTier(inputs);
    setResult(res);
    setStep(4);
    setIsSubmitting(false);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !vendorName) {
      setEmailError('Please enter both vendor name and your email.');
      return;
    }

    setIsSending(true);
    setEmailError('');

    try {
      const response = await fetch('/api/vendor-risk-assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          vendor_name: vendorName,
          result,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setEmailSent(true);
      } else {
        setEmailError(data.error || 'Failed to send email. Please try again.');
      }
    } catch (err) {
      setEmailError('An error occurred. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  if (step === 4 && result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-50 rounded-full mb-6">
            <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Vendor Classification: {result.tier}</h2>
          <p className="text-gray-600 mb-8">Based on your inputs, this vendor should be managed with the following requirements.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-10">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-brand-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Required Evidence
              </h3>
              <ul className="space-y-3">
                {result.requirements.map(req => (
                  <li key={req} className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-brand-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Monitoring Cadence
              </h3>
              <p className="text-2xl font-bold text-brand-600 mb-2">{result.monitoringCadence}</p>
              <p className="text-sm text-gray-500">Regular reviews ensure the vendor's security posture remains aligned with your risk appetite.</p>
            </div>
          </div>

          <div className="bg-brand-50 p-8 rounded-3xl border border-brand-100 text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Send results to your email</h3>
            <p className="text-sm text-gray-600 mb-6">Get a copy of these results and the evidence checklist for your records.</p>
            
            {emailSent ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-xl flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Results sent successfully!
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Vendor Name (e.g. AWS, Slack)"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                  />
                </div>
                {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Email Me the Results'}
                </button>
              </form>
            )}
          </div>

          <button 
            onClick={() => setStep(1)} 
            className="mt-10 text-brand-600 font-bold hover:text-brand-700 transition-colors"
          >
            ← Score another vendor
          </button>
        </div>
      </div>
    );
  }

  return (
    <CalculatorCard 
      title="Vendor Tiering Logic Tool" 
      description="Instantly categorize your vendors into risk tiers to determine necessary security reviews."
      step={step}
      totalSteps={3}
    >
      {step === 1 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">What data will they access?</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'none', label: 'No Data Access', desc: 'Vendor does not touch any of our data.' },
                { id: 'pii', label: 'Personal Data (PII)', desc: 'Names, emails, or basic user info.' },
                { id: 'phi', label: 'Health Data (PHI)', desc: 'Sensitive medical or health records.' },
                { id: 'financial', label: 'Financial Data', desc: 'Banking, payments, or credit info.' },
                { id: 'critical', label: 'Customer IP', desc: 'Access to customer source code or secrets.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, dataAccess: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.dataAccess === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
                >
                  <div className="font-bold text-gray-900">{opt.label}</div>
                  <div className="text-sm text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">Service Criticality</span>
            <p className="text-sm text-gray-500 mb-4">How much would your business suffer if this vendor went offline for 24 hours?</p>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'high', label: 'Critical / Core', desc: 'Business stops. Core product depends on it.' },
                { id: 'medium', label: 'Important', desc: 'Major inconvenience, but business continues.' },
                { id: 'low', label: 'Supportive / Minor', desc: 'Minimal impact on core operations.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, serviceCriticality: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.serviceCriticality === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
                >
                  <div className="font-bold text-gray-900">{opt.label}</div>
                  <div className="text-sm text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">Hosting Model</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'saas', label: 'Cloud / SaaS', desc: 'Hosted on the vendor\'s infrastructure.' },
                { id: 'on-prem', label: 'On-Premise', desc: 'Installed on our own servers/network.' },
                { id: 'hybrid', label: 'Hybrid', desc: 'Combination of cloud and local components.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, hostingModel: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.hostingModel === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
                >
                  <div className="font-bold text-gray-900">{opt.label}</div>
                  <div className="text-sm text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </label>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button onClick={handleBack} className="text-gray-500 font-medium hover:text-gray-700">
            Back
          </button>
        )}
        <button 
          onClick={step === 3 ? calculate : handleNext}
          disabled={isSubmitting}
          className="ml-auto bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {step === 3 ? (isSubmitting ? 'Calculating...' : 'Categorize Vendor') : 'Next Step'}
        </button>
      </div>
    </CalculatorCard>
  );
}
