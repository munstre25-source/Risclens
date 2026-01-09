'use client';

import { useState, useEffect, useRef } from 'react';
import FreeResults from '../FreeResults';
import { trackEvent } from '@/lib/analytics';

const INDUSTRIES = [
  { value: 'ai_saas', label: 'AI SaaS / Software' },
  { value: 'fintech_ai', label: 'Fintech with AI' },
  { value: 'healthcare_ai', label: 'Healthcare AI' },
  { value: 'enterprise_ai', label: 'Enterprise AI Solutions' },
  { value: 'other', label: 'Other' },
];

const AI_MATURITY = [
  { value: 'api', label: 'Using 3rd Party APIs (OpenAI, etc.)' },
  { value: 'fine_tuning', label: 'Fine-tuning existing models' },
  { value: 'custom', label: 'Building custom foundational models' },
  { value: 'embedded', label: 'AI embedded in internal processes' },
];

const AI_CONTROLS = [
  { value: 'risk_assessment', label: 'AI Risk Assessment Process' },
  { value: 'data_governance', label: 'AI Data Governance Policy' },
  { value: 'human_oversight', label: 'Human-in-the-loop for outputs' },
  { value: 'transparency', label: 'User disclosure of AI usage' },
  { value: 'bias_testing', label: 'Bias and Fairness testing' },
];

const ROLES = [
  { value: 'cto', label: 'CTO / VP Engineering' },
  { value: 'ai_lead', label: 'AI / ML Lead' },
  { value: 'security', label: 'Security / Compliance Lead' },
  { value: 'ceo', label: 'CEO / Founder' },
  { value: 'other', label: 'Other' },
];

interface FormData {
  email: string;
  company_name: string;
  industry: string;
  ai_maturity: string;
  ai_controls: string[];
  planned_audit_date: string;
  role: string;
  specific_requests: string;
}

interface CalculatorResults {
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  recommendations: string[];
}

const TOTAL_STEPS = 3;

export default function Iso42001CalculatorForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startedRef = useRef(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    company_name: '',
    industry: '',
    ai_maturity: '',
    ai_controls: [],
    planned_audit_date: '',
    role: '',
    specific_requests: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('calculator_started', { tool_id: 'iso42001_readiness' });
    }
  };

  const handleControlChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ai_controls: prev.ai_controls.includes(value)
        ? prev.ai_controls.filter((t) => t !== value)
        : [...prev.ai_controls, value],
    }));
  };

    const validateStep = (currentStep: number): boolean => {
      switch (currentStep) {
        case 1:
          return !!formData.company_name && !!formData.industry;
      case 2:
        return !!formData.ai_maturity && formData.ai_controls.length > 0;
      case 3:
        return !!formData.planned_audit_date && !!formData.role;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 1) {
        fetch('/api/lead/partial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            company: formData.company_name,
            industry: formData.industry,
            lead_type: 'iso42001_readiness_partial',
            source_url: typeof window !== 'undefined' ? window.location.href : '',
          }),
        }).catch(console.error);
      }
      
      if (step < TOTAL_STEPS) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(TOTAL_STEPS)) {
      setError('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lead_type: 'iso42001_readiness',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setLeadId(data.lead_id);
      
      // Calculate a mock score for now based on inputs
      const baseScore = 20;
      const controlScore = formData.ai_controls.length * 12;
      const maturityPenalty = formData.ai_maturity === 'custom' ? -10 : 0;
      const finalScore = Math.min(95, Math.max(10, baseScore + controlScore + maturityPenalty));

      setResults({
        readiness_score: finalScore,
        estimated_cost_low: 15000,
        estimated_cost_high: 45000,
        recommendations: [
          'Formalize your AI Risk Management framework',
          'Implement Human-in-the-loop for high-risk AI outputs',
          'Document data lineage for training datasets',
          'Perform bias testing on production models',
        ]
      });
      setShowResults(true);
      trackEvent('calculator_completed', { 
        tool_id: 'iso42001_readiness',
        score: finalScore
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults && results) {
    return (
      <FreeResults
        results={results}
        leadId={leadId}
        companyName={formData.company_name}
        email={formData.email}
      />
    );
  }

  return (
    <div className="card">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {step} of {TOTAL_STEPS}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}% Complete</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              AI Governance Readiness
            </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="form-label">
                    Work Email <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="alex@company.com"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Skip this if you just want a quick score. Enter it to get your full AI roadmap PDF later.
                  </p>
                </div>
              <div>
                <label htmlFor="company_name" className="form-label">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Acme AI Inc."
                  required
                />
              </div>
              <div>
                <label htmlFor="industry" className="form-label">
                  Industry / AI Use Case <span className="text-red-500">*</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select your use case</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              AI Maturity & Controls
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="ai_maturity" className="form-label">
                  AI Development Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="ai_maturity"
                  name="ai_maturity"
                  value={formData.ai_maturity}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select maturity level</option>
                  {AI_MATURITY.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">
                  Existing AI Controls <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 mt-2">
                  {AI_CONTROLS.map((ctrl) => (
                    <label
                      key={ctrl.value}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.ai_controls.includes(ctrl.value)}
                        onChange={() => handleControlChange(ctrl.value)}
                        className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                      />
                      <span className="ml-3 text-gray-700">{ctrl.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Audit Context
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="planned_audit_date" className="form-label">
                  Target Certification Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="planned_audit_date"
                  name="planned_audit_date"
                  value={formData.planned_audit_date}
                  onChange={handleInputChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="form-label">
                  Your Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select your role</option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="specific_requests" className="form-label">
                  Specific AI compliance concerns? <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>
                <textarea
                  id="specific_requests"
                  name="specific_requests"
                  value={formData.specific_requests}
                  onChange={handleInputChange}
                  className="form-input"
                  rows={3}
                  placeholder="e.g. EU AI Act alignment, custom model bias, customer training data usage..."
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
            disabled={step === 1}
          >
            Back
          </button>
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary"
              disabled={!validateStep(step)}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !validateStep(TOTAL_STEPS)}
            >
              {isSubmitting ? 'Calculating...' : 'Calculate AI Readiness'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
