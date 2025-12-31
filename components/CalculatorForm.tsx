'use client';

import { useState, useEffect } from 'react';
import FreeResults from './FreeResults';

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
  company_name: string;
  industry: string;
  num_employees: string;
  data_types: string[];
  planned_audit_date: string;
  role: string;
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
  const [utmSource, setUtmSource] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    company_name: '',
    industry: '',
    num_employees: '',
    data_types: [],
    planned_audit_date: '',
    role: '',
  });

  // Track UTM parameters and variation on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || '');
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDataTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      data_types: prev.data_types.includes(value)
        ? prev.data_types.filter((t) => t !== value)
        : [...prev.data_types, value],
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
    if (validateStep(step) && step < TOTAL_STEPS) {
      setStep(step + 1);
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
      // Submit WITHOUT email - email will be collected on results page
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          num_employees: parseInt(formData.num_employees, 10),
          utm_source: utmSource,
          variation_id: variationId,
          // email and consent are NOT sent - collected later for PDF
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
      />
    );
  }

  return (
    <div className="card">
      {/* Progress Bar */}
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
        {/* Step 1: Company Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Tell us about your company
            </h2>
            <div className="space-y-4">
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
            </div>
          </div>
        )}

        {/* Step 3: Timeline & Role (NO email here - collected after results) */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Timeline and your role
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
            </div>
          </div>
        )}

        {/* Hidden fields */}
        <input type="hidden" name="utm_source" value={utmSource} />
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
