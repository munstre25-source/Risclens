'use client';

import { useState } from 'react';
import { CalculatorCard } from '@/components/calculators/CalculatorCard';

interface VRAInputs {
  vendorName: string;
  serviceType: 'saas' | 'managed' | 'on-prem' | 'hardware';
  dataTypes: string[];
  criticality: 'high' | 'medium' | 'low';
}

export function VRAQuestionnaireBuilder() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<VRAInputs>({
    vendorName: '',
    serviceType: 'saas',
    dataTypes: [],
    criticality: 'medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleDataType = (type: string) => {
    setInputs((prev) => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(type)
        ? prev.dataTypes.filter((t) => t !== type)
        : [...prev.dataTypes, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Submit lead data
      const leadResponse = await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          lead_type: 'vra_questionnaire',
          source_url: window.location.href,
          ...inputs,
        }),
      });

      const leadData = await leadResponse.json();
      if (!leadData.ok) throw new Error(leadData.error || 'Failed to submit');

      // 2. Trigger PDF generation
      await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadData.lead_id,
          template: 'vra_questionnaire',
          data: {
            ...inputs,
          },
        }),
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-6 bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6 text-blue-600">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Questionnaire Ready!</h2>
        <p className="text-gray-600 mb-8">
          We've customized your VRA Questionnaire package for <span className="font-semibold text-gray-900">{inputs.vendorName || 'your vendor'}</span>. Check your inbox at <span className="font-semibold text-gray-900">{email}</span>.
        </p>
        <button
          onClick={() => {
            setStep(1);
            setSubmitted(false);
          }}
          className="text-brand-600 font-bold hover:text-brand-700 transition-colors"
        >
          ← Build another Questionnaire
        </button>
      </div>
    );
  }

  return (
    <CalculatorCard
      title="VRA Questionnaire Builder"
      description="Create a custom vendor risk questionnaire based on the service type and data sensitivity."
      step={step}
      totalSteps={3}
    >
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Vendor / Service Name</span>
              <input
                type="text"
                value={inputs.vendorName}
                onChange={(e) => setInputs({ ...inputs, vendorName: e.target.value })}
                placeholder="e.g. AWS, Slack, Acme Corp"
                className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Service Type</span>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  { id: 'saas', label: 'SaaS / Cloud' },
                  { id: 'managed', label: 'Managed Service' },
                  { id: 'on-prem', label: 'On-Prem Software' },
                  { id: 'hardware', label: 'Hardware/Physical' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setInputs({ ...inputs, serviceType: opt.id as any })}
                    className={`text-center p-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                      inputs.serviceType === opt.id
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-gray-100 hover:border-brand-200 text-gray-600'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Data Access</span>
              <p className="text-xs text-gray-500 mb-3">Select all data types the vendor will process.</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'pii', label: 'PII (Names, Emails, User Data)' },
                  { id: 'financial', label: 'Financial / Payment Data' },
                  { id: 'phi', label: 'Protected Health Info (PHI)' },
                  { id: 'ip', label: 'Core IP / Source Code' },
                  { id: 'auth', label: 'Authentication / Credentials' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleDataType(opt.id)}
                    className={`text-left p-3 rounded-xl border-2 transition-all text-sm ${
                      inputs.dataTypes.includes(opt.id)
                        ? 'border-brand-600 bg-brand-50 font-bold text-brand-900'
                        : 'border-gray-100 hover:border-brand-200 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        inputs.dataTypes.includes(opt.id) ? 'bg-brand-600 border-brand-600' : 'border-gray-300'
                      }`}>
                        {inputs.dataTypes.includes(opt.id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      {opt.label}
                    </div>
                  </button>
                ))}
              </div>
            </label>

            <label className="block pt-4">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Service Criticality</span>
              <select
                value={inputs.criticality}
                onChange={(e) => setInputs({ ...inputs, criticality: e.target.value as any })}
                className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm"
              >
                <option value="high">High (Business stops if offline)</option>
                <option value="medium">Medium (Significant impact)</option>
                <option value="low">Low (Minor impact / Supportive)</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Full Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Work Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-bold text-sm uppercase tracking-wide">Company</span>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="mt-2 block w-full rounded-xl border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 text-sm"
              />
            </label>
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <p className="text-xs text-gray-500 italic">
            By submitting, you'll receive the VRA Questionnaire, Scoring Model, and Evidence Checklist.
          </p>
        </form>
      )}

      <div className="mt-10 flex justify-between items-center">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="text-gray-500 font-bold hover:text-gray-700 transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="ml-auto">
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="bg-brand-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !email || !name || !company}
              className="bg-brand-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                'Get My VRA Package →'
              )}
            </button>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
}
