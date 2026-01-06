'use client';

import { useState } from 'react';
import { CalculatorCard } from './CalculatorCard';
import { calculateGap, GapInputs, GapResult } from '@/lib/calculators/gap';

export function GapCalculator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<GapInputs>({
    currentFramework: 'none',
    targetFramework: 'soc2',
    companySize: 'small',
  });
  const [result, setResult] = useState<GapResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculate = async () => {
    setIsSubmitting(true);
    const res = calculateGap(inputs);
    setResult(res);
    setStep(4);
    setIsSubmitting(false);
  };

  if (step === 4 && result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="text-center mb-10">
            <div className="inline-block relative mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (364 * result.readinessPercentage) / 100}
                  className="text-brand-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{result.readinessPercentage}%</span>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ready</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Gap Analysis Results</h2>
            <p className="text-gray-600">
              Estimated effort to bridge the gap: <span className="text-brand-600 font-bold">{result.estimatedEffortMonths} Months</span>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg border-b pb-2">Key Gap Areas</h3>
            {result.gapAreas.map((area) => (
              <div key={area.name} className="flex items-start p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className={`mt-1 w-3 h-3 rounded-full mr-4 shrink-0 ${
                  area.status === 'covered' ? 'bg-green-500' : area.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{area.name}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${
                      area.effort === 'high' ? 'bg-red-50 text-red-600' : area.effort === 'medium' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {area.effort} Effort
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              </div>
            ))}
          </div>

            <div className="mt-10 bg-brand-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Want a full mapping document?</h3>
              <p className="text-brand-100 mb-6">Download our SOC 2 to ISO 27001 mapping spreadsheet (Excel/CSV).</p>
              <button className="bg-white text-brand-600 px-8 py-3 rounded-lg font-bold hover:bg-brand-50 transition-colors">
                Download Mapping Guide
              </button>
            </div>
            <p className="mt-6 text-[10px] text-gray-400 text-center leading-relaxed italic">
              Estimates are for planning purposes only and do not constitute a legal audit opinion or guarantee of compliance.
            </p>
          </div>
        </div>
      );
    }

    return (
      <CalculatorCard 
        title="ISO 27001 vs SOC 2 Gap Calculator" 
        description="Already have one framework? Identify potential gaps to achieve the next one."
        step={step}
        totalSteps={3}
      >
      {step === 1 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">What is your current status?</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'none', label: 'No existing framework', desc: 'Starting from scratch.' },
                { id: 'soc2', label: 'SOC 2 Compliant', desc: 'Already have a Type I or Type II report.' },
                { id: 'iso27001', label: 'ISO 27001 Certified', desc: 'Already have an active certification.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, currentFramework: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.currentFramework === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
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
            <span className="text-gray-700 font-bold">What is your target framework?</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'soc2', label: 'SOC 2', desc: 'Targeting the Trust Services Criteria.' },
                { id: 'iso27001', label: 'ISO 27001', desc: 'Targeting the ISMS certification.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  disabled={inputs.currentFramework === opt.id}
                  onClick={() => setInputs({ ...inputs, targetFramework: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.targetFramework === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'} ${inputs.currentFramework === opt.id ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            <span className="text-gray-700 font-bold">Company Size</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'small', label: 'Small (<50 employees)', desc: 'Simplified controls, fewer assets.' },
                { id: 'medium', label: 'Medium (50-250 employees)', desc: 'Multiple departments, growing infrastructure.' },
                { id: 'large', label: 'Large (250+ employees)', desc: 'Complex operations, global presence.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, companySize: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.companySize === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
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
          {step === 3 ? (isSubmitting ? 'Calculating Gap...' : 'Show Gap Analysis') : 'Next Step'}
        </button>
      </div>
    </CalculatorCard>
  );
}
