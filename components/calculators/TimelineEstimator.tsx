'use client';

import { useState } from 'react';
import { CalculatorCard } from './CalculatorCard';
import { estimateTimeline, TimelineInputs, TimelineResult } from '@/lib/calculators/timeline';

export function TimelineEstimator() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<TimelineInputs>({
    companySize: 'small',
    cloudMaturity: 'medium',
    auditType: 'type1',
    teamAvailability: 'medium',
  });
  const [result, setResult] = useState<TimelineResult | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculate = async () => {
    setIsSubmitting(true);
    // Simulate API call for lead gen
    const res = estimateTimeline(inputs);
    setResult(res);
    setStep(5); // Result step
    setIsSubmitting(false);
  };

  if (step === 5 && result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Your SOC 2 Roadmap</h2>
          <p className="text-xl text-gray-600 mt-2">
            Estimated Total Time: <span className="text-brand-600 font-bold">{result.totalWeeks} Weeks</span>
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-12">
            {result.phases.map((phase, index) => (
              <div key={phase.name} className="relative pl-20">
                <div className="absolute left-6 top-0 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-brand-50" />
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{phase.name}</h3>
                      <p className="text-brand-600 font-medium text-sm">{phase.durationWeeks} Weeks</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{phase.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.tasks.map(task => (
                      <li key={task} className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-50 p-8 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Want a detailed PDF of this roadmap?</h3>
          <p className="text-gray-600 mb-6">We'll send you a custom project plan including all tasks and milestones.</p>
          <div className="flex max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors">
              Send PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CalculatorCard 
      title="SOC 2 Timeline Estimator" 
      description="Calculate exactly how long it will take to get your SOC 2 report based on your unique situation."
      step={step}
      totalSteps={4}
    >
      {step === 1 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">Company Size</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'small', label: '1-20 employees', desc: 'Fast remediation, fewer stakeholders.' },
                { id: 'medium', label: '21-100 employees', desc: 'Moderate complexity, structured teams.' },
                { id: 'large', label: '100+ employees', desc: 'Complex infrastructure, many stakeholders.' },
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

      {step === 2 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">Cloud Maturity</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'high', label: 'Cloud Native', desc: 'Everything on AWS/Azure/GCP with automated configs.' },
                { id: 'medium', label: 'Hybrid/Transitioning', desc: 'Mixing cloud with some legacy or manual processes.' },
                { id: 'low', label: 'Early Stage / Manual', desc: 'Many manual processes, minimal security tooling.' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, cloudMaturity: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.cloudMaturity === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
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
            <span className="text-gray-700 font-bold">Audit Type</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'type1', label: 'SOC 2 Type I', desc: 'Point-in-time assessment (Fastest).' },
                { id: 'type2', label: 'SOC 2 Type II', desc: 'Testing over a 3-12 month period (Gold Standard).' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, auditType: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.auditType === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
                >
                  <div className="font-bold text-gray-900">{opt.label}</div>
                  <div className="text-sm text-gray-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </label>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700 font-bold">Team Availability</span>
            <div className="mt-4 grid grid-cols-1 gap-4">
              {[
                { id: 'high', label: 'Dedicated Team', desc: 'Full-time compliance or ops person available.' },
                { id: 'medium', label: 'Part-time Focus', desc: 'Lead spends 5-10 hours/week on compliance.' },
                { id: 'low', label: 'As-available', desc: 'Compliance is done "off the side of the desk".' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setInputs({ ...inputs, teamAvailability: opt.id as any })}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${inputs.teamAvailability === opt.id ? 'border-brand-600 bg-brand-50' : 'border-gray-100 hover:border-brand-200'}`}
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
          onClick={step === 4 ? calculate : handleNext}
          disabled={isSubmitting}
          className="ml-auto bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors disabled:opacity-50"
        >
          {step === 4 ? (isSubmitting ? 'Calculating...' : 'Generate Roadmap') : 'Next Step'}
        </button>
      </div>
    </CalculatorCard>
  );
}
