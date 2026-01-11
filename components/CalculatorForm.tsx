'use client';

import { useState, useEffect, useRef } from 'react';
import FreeResults from './FreeResults';
import { trackEvent } from '@/lib/analytics';

// Industry options
const INDUSTRIES = [
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'fintech', label: 'Fintech / Financial Services' },
  { value: 'healthcare', label: 'Healthcare / HealthTech' },
  { value: 'ecommerce', label: 'E-commerce / Retail' },
  { value: 'consulting', label: 'Consulting / Professional Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

// Data types for multi-select
const DATA_TYPES = [
  { value: 'pii', label: 'Personal Identifiable Information (PII)' },
  { value: 'financial', label: 'Financial Data' },
  { value: 'health', label: 'Health / PHI Data' },
  { value: 'intellectual_property', label: 'Intellectual Property' },
  { value: 'customer_data', label: 'Customer Business Data' },
];

// SOC 2 requirement sources (optional)
const SOC2_REQUIRERS = [
  { value: 'enterprise', label: 'Enterprise customers' },
  { value: 'midmarket', label: 'Mid-market customers' },
  { value: 'investors', label: 'Investors' },
  { value: 'exploratory', label: 'Not required yet / exploratory' },
];

// Role options
const ROLES = [
  { value: 'cto', label: 'CTO / VP Engineering' },
  { value: 'ceo', label: 'CEO / Founder' },
  { value: 'security', label: 'Security / Compliance Lead' },
  { value: 'engineering', label: 'Engineering Manager' },
  { value: 'operations', label: 'Operations / IT' },
  { value: 'other', label: 'Other' },
];

interface FormData {
  email: string;
  company_name: string;
  industry: string;
  num_employees: string;
  data_types: string[];
  soc2_requirers: string[];
  planned_audit_date: string;
  role: string;
  specific_requests: string;
  phone: string;
  budget_range: string;
  consent: boolean;
}

interface CalculatorResults {
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  recommendations: string[];
}

const TOTAL_STEPS = 3;

export default function CalculatorForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hidden fields for A/B testing and UTM tracking
  const [variationId, setVariationId] = useState<string>('default');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const startedRef = useRef(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    company_name: '',
    industry: '',
    num_employees: '',
    data_types: [],
    soc2_requirers: [],
    planned_audit_date: '',
    role: '',
    specific_requests: '',
    phone: '',
    budget_range: '',
    consent: true,
  });

  // Track UTM parameters and variation on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
      const val = params.get(key);
      if (val) utm[key] = val;
    });
    setUtmParams(utm);
    
    const variation = params.get('v') || 'default';
    setVariationId(variation);

    // Record A/B impression
    fetch('/api/ab/impression', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variation_id: variation }),
    }).catch(console.error);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('calculator_started', { tool_id: 'soc2_readiness' });
    }
  };

  const handleDataTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      data_types: prev.data_types.includes(value)
        ? prev.data_types.filter((t) => t !== value)
        : [...prev.data_types, value],
    }));
  };

  const handleRequirerChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      soc2_requirers: prev.soc2_requirers.includes(value)
        ? prev.soc2_requirers.filter((r) => r !== value)
        : [...prev.soc2_requirers, value],
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.company_name && !!formData.industry;
      case 2:
        return !!formData.num_employees && formData.data_types.length > 0;
      case 3:
        return !!formData.planned_audit_date && !!formData.role;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 1) {
        // Send partial lead info
        fetch('/api/lead/partial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              phone: formData.phone,
              company: formData.company_name,
              industry: formData.industry,
              lead_type: 'soc2_readiness_partial',
              source_url: typeof window !== 'undefined' ? window.location.href : '',
              utm_source: utmParams.utm_source,
              utm_medium: utmParams.utm_medium,
              utm_campaign: utmParams.utm_campaign,
              utm_content: utmParams.utm_content,
              utm_term: utmParams.utm_term,
              variation_id: variationId,
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
      const response = await fetch('/api/soc2-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            company_name: formData.company_name,
            industry: formData.industry,
            num_employees: parseInt(formData.num_employees, 10),
            data_types: formData.data_types,
            budget_range: formData.budget_range,
            budget_comfort: formData.budget_range,
            audit_date: formData.planned_audit_date,
            role: formData.role,
            consent: formData.consent,
            specific_requests: formData.specific_requests,
            utm_source: utmParams.utm_source,
            utm_medium: utmParams.utm_medium,
            utm_campaign: utmParams.utm_campaign,
            utm_content: utmParams.utm_content,
            utm_term: utmParams.utm_term,
            variation_id: variationId,
          }),

      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      // Record A/B submission if not default
      if (variationId !== 'default') {
        fetch('/api/ab/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variation_id: variationId }),
        }).catch(console.error);
      }

      setLeadId(data.lead_id);
      setResults(data.results);
      setShowResults(true);
      trackEvent('calculator_completed', { 
        tool_id: 'soc2_readiness',
        score: data.results.readiness_score,
        industry: formData.industry 
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
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
              Live readiness check active
            </span>
            <span className="font-medium">Step {step} of {TOTAL_STEPS} • {Math.round((step / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="progress-bar h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="progress-bar-fill h-full bg-brand-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Get your readiness score
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
                      placeholder="raphael@company.com"
                    />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Skip this if you just want a quick score. Enter it to get your full roadmap PDF later.
                  </p>
                </div>
                <div>
                  <label htmlFor="phone" className="form-label font-bold text-brand-900">
                    Phone Number <span className="text-brand-600 text-xs font-bold">(required for 1-hour shortlist)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                  <p className="mt-1.5 text-xs text-brand-700 font-medium bg-brand-50 p-2 rounded border border-brand-100">
                    ⚡ <strong>The "1-Hour" Promise:</strong> We'll text/email you a vetted auditor shortlist within 60 minutes of submission.
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
                  placeholder="Acme Inc."
                  required
                />
              </div>
              <div>
                <label htmlFor="industry" className="form-label">
                  Industry <span className="text-red-500">*</span>
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-gray-500">
                  Used to calibrate audit scope and control depth.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Company Size & Data */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Size and data handling
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="num_employees" className="form-label">
                  Number of Employees <span className="text-red-500">*</span>
                </label>
                <select
                  id="num_employees"
                  name="num_employees"
                  value={formData.num_employees}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Select range</option>
                  <option value="3">1-5 employees</option>
                  <option value="13">6-20 employees</option>
                  <option value="35">21-50 employees</option>
                  <option value="75">51-100 employees</option>
                  <option value="150">100+ employees</option>
                </select>
              </div>
              <div>
                <label className="form-label">
                  What types of data do you handle? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 mt-2">
                  {DATA_TYPES.map((dt) => (
                    <label
                      key={dt.value}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.data_types.includes(dt.value)}
                        onChange={() => handleDataTypeChange(dt.value)}
                        className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                      />
                      <span className="ml-3 text-gray-700">{dt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
                <div>
                  <label htmlFor="budget_range" className="form-label">
                    What is your approximate budget for SOC 2? <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>
                  <select
                    id="budget_range"
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="">Select budget comfort</option>
                    <option value="under_10k">Under $10k (Very tight)</option>
                    <option value="10k_20k">$10k - $20k (Standard startup)</option>
                    <option value="20k_50k">$20k - $50k (Mid-market)</option>
                    <option value="over_50k">$50k+ (Enterprise/Complex)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">
                    Who requires SOC 2 from you? <span className="text-gray-400 text-xs font-normal">(optional)</span>
                  </label>

                <div className="space-y-2 mt-2">
                  {SOC2_REQUIRERS.map((req) => (
                    <label
                      key={req.value}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.soc2_requirers.includes(req.value)}
                        onChange={() => handleRequirerChange(req.value)}
                        className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                      />
                      <span className="ml-3 text-gray-700">{req.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Timeline & Role (NO email here - collected after results) */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Audit timing and responsibility
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="planned_audit_date" className="form-label">
                  Planned Audit Date <span className="text-red-500">*</span>
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
                  Anything specific an auditor, customer, or investor has already asked for?{" "}
                  <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>
                <textarea
                  id="specific_requests"
                  name="specific_requests"
                  value={formData.specific_requests}
                  onChange={handleInputChange}
                  className="form-input"
                  rows={3}
                  placeholder="e.g. security questionnaire, enterprise deal requirement, due diligence request, tight deadline…"
                  />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <label className="flex items-start cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      className="mt-1 w-4 h-4 text-brand-600 rounded border-gray-300 focus:ring-brand-500"
                    />
                    <span className="ml-3 text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                      By calculating my score, I agree to receive a SOC 2 roadmap PDF and 1-hour auditor shortlist. 
                      I consent to Risclens sharing my requirements with verified auditors to facilitate my search.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}


        {/* Hidden fields */}
        <input type="hidden" name="utm_source" value={utmParams.utm_source || ''} />
        <input type="hidden" name="variation_id" value={variationId} />

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Navigation buttons */}
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
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Calculating...
                </>
              ) : (
                'Calculate My Score'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
