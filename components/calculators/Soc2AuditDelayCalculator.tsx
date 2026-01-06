'use client';

import { useState } from 'react';
import { CalculatorCard } from './CalculatorCard';
import { calculateAuditDelay, AuditDelayInputs, AuditDelayResult } from '@/lib/calculators/audit-delay';

export function Soc2AuditDelayCalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<AuditDelayInputs>({
    companySize: '1–10',
    soc2Stage: 'Not started',
    avgDealSize: 25000,
    dealsBlocked: 2,
    expectedDelay: '1 month',
  });
  const [result, setResult] = useState<AuditDelayResult | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleCalculate = () => {
    const res = calculateAuditDelay(inputs);
    setResult(res);
    setStep(6);
  };

  const handleSubmitLead = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/soc2-audit-delay-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          inputs,
          result,
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Lead submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 6 && result) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Estimated Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-brand-50 rounded-xl">
              <p className="text-sm text-brand-600 font-semibold uppercase tracking-wider mb-1">Delayed Revenue Range</p>
              <p className="text-3xl font-bold text-gray-900">
                ${result.delayedRevenueLow.toLocaleString()} – ${result.delayedRevenueHigh.toLocaleString()}
              </p>
            </div>
            <div className="p-6 bg-orange-50 rounded-xl">
              <p className="text-sm text-orange-600 font-semibold uppercase tracking-wider mb-1">Monthly Revenue at Risk</p>
              <p className="text-3xl font-bold text-gray-900">
                ~${result.monthlyAtRisk.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-600 border-t border-gray-100 pt-6">
            <p className="italic">
              "Based on your inputs, SOC 2 delays may be slowing or deferring approximately ${result.delayedRevenueLow.toLocaleString()}–${result.delayedRevenueHigh.toLocaleString()} in potential revenue."
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm">
                <strong>Insight:</strong> Delays in SOC 2 often slow enterprise deals that require trust validation. Teams at this stage often benefit from clearer audit scoping and faster evidence readiness.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100">
            {submitted ? (
              <div className="bg-green-50 p-4 rounded-lg text-green-700 text-center font-medium">
                Thank you. We'll be in touch shortly to schedule your review.
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Want to accelerate your timeline?</h3>
                <p className="text-gray-600">Get a free SOC 2 readiness review to identify blockers and speed up your audit.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Work email (optional)" 
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button 
                      onClick={handleSubmitLead}
                      disabled={isSubmitting}
                      className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Get a free SOC 2 readiness review'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center sm:text-left">
                    No sales pitch — just clarity on what’s slowing your audit.
                  </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <CalculatorCard 
      title="SOC 2 Audit Delay Cost Calculator" 
      description="Calculate the revenue impact of audit delays on your enterprise deals."
      step={step}
      totalSteps={5}
    >
      {step === 1 && (
        <div className="space-y-4">
          <span className="text-gray-700 font-bold">Company Size</span>
          <div className="grid grid-cols-2 gap-3">
            {['1–10', '11–50', '51–200', '200+'].map(size => (
              <button
                key={size}
                onClick={() => { setInputs({ ...inputs, companySize: size }); handleNext(); }}
                className={`p-4 rounded-xl border-2 text-center transition-all ${inputs.companySize === size ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
              >
                <div className="font-bold text-gray-900">{size}</div>
                <div className="text-xs text-gray-500">Employees</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <span className="text-gray-700 font-bold">Current SOC 2 Stage</span>
          <div className="grid grid-cols-1 gap-3">
            {[
              'Not started',
              'Readiness / Gap assessment',
              'Evidence collection',
              'In audit (Type 1 or 2)'
            ].map(stage => (
              <button
                key={stage}
                onClick={() => { setInputs({ ...inputs, soc2Stage: stage }); handleNext(); }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${inputs.soc2Stage === stage ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
              >
                <div className="font-bold text-gray-900">{stage}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-bold">Average Deal Size (USD)</span>
            <input 
              type="number" 
              className="mt-4 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500"
              value={inputs.avgDealSize}
              onChange={(e) => setInputs({ ...inputs, avgDealSize: Number(e.target.value) })}
            />
          </label>
          <p className="text-sm text-gray-500 italic">Enter the typical contract value of your enterprise customers.</p>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-bold">Number of deals currently blocked or slowed</span>
            <input 
              type="number" 
              className="mt-4 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500"
              value={inputs.dealsBlocked}
              onChange={(e) => setInputs({ ...inputs, dealsBlocked: Number(e.target.value) })}
            />
          </label>
          <p className="text-sm text-gray-500 italic">How many sales are currently waiting on your SOC 2 report?</p>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <span className="text-gray-700 font-bold">Expected Audit Delay</span>
          <div className="grid grid-cols-2 gap-3">
            {['2 weeks', '1 month', '2 months', '3+ months'].map(delay => (
              <button
                key={delay}
                onClick={() => setInputs({ ...inputs, expectedDelay: delay })}
                className={`p-4 rounded-xl border-2 text-center transition-all ${inputs.expectedDelay === delay ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
              >
                <div className="font-bold text-gray-900">{delay}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button onClick={handleBack} className="text-gray-500 font-medium hover:text-gray-700">
            Back
          </button>
        )}
        <button 
          onClick={step === 5 ? handleCalculate : handleNext}
          className="ml-auto bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors"
        >
          {step === 5 ? 'Calculate Impact' : 'Next Step'}
        </button>
      </div>
    </CalculatorCard>
  );
}
