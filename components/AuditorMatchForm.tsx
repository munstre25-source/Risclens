'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useSearchParams } from 'next/navigation';

interface AuditorMatchFormProps {
  source?: string;
}

const FRAMEWORKS = [
  { value: 'soc2_type1', label: 'SOC 2 Type I' },
  { value: 'soc2_type2', label: 'SOC 2 Type II' },
  { value: 'iso27001', label: 'ISO 27001' },
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'pentest', label: 'Penetration Test Only' },
];

const INDUSTRIES = [
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
];

const CLOUD_INFRA = [
  { value: 'aws', label: 'AWS' },
  { value: 'gcp', label: 'Google Cloud (GCP)' },
  { value: 'azure', label: 'Azure' },
  { value: 'hybrid', label: 'Hybrid / On-prem' },
];

const TIMELINES = [
  { value: 'urgent', label: 'Urgent (< 3 months)' },
  { value: 'standard', label: 'Standard (3-6 months)' },
  { value: 'planning', label: 'Planning (6+ months)' },
];

export function AuditorMatchForm({ source }: AuditorMatchFormProps) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: searchParams.get('email') || '',
    company: '',
    framework: searchParams.get('type') === 'pentest' ? 'pentest' : 'soc2_type2',
    industry: '',
    employees: '',
    cloud: '',
    timeline: 'standard',
    budget: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    trackEvent('auditor_match_submitted', { 
      framework: formData.framework,
      industry: formData.industry,
      timeline: formData.timeline 
    });

    try {
      const response = await fetch('/api/lead/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lead_type: 'auditor_match_rfp',
          source,
          source_url: window.location.href,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit request');
      
      setIsSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">RFP Generated & Sent!</h2>
        <p className="text-slate-600 max-w-md mx-auto">
          We&apos;ve generated your standardized RFP. You&apos;ll receive a copy via email shortly, along with introductions to 3 vetted auditors who match your specific criteria.
        </p>
        <div className="pt-6">
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-secondary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Work Email</label>
            <input
              type="email"
              name="email"
              required
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="raphael@company.com"
              />
          </div>
          <div>
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Acme Inc."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Primary Framework</label>
            <select
              name="framework"
              value={formData.framework}
              onChange={handleInputChange}
              className="form-input"
            >
              {FRAMEWORKS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Industry</label>
            <select
              name="industry"
              required
              value={formData.industry}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select industry</option>
              {INDUSTRIES.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Cloud Infrastructure</label>
            <select
              name="cloud"
              required
              value={formData.cloud}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select infrastructure</option>
              {CLOUD_INFRA.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Employee Count</label>
            <select
              name="employees"
              required
              value={formData.employees}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Desired Timeline</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="form-input"
            >
              {TIMELINES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Estimated Budget (Optional)</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="form-input"
              placeholder="e.g. $15k - $25k"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Specific Requirements / Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="form-input"
            rows={3}
            placeholder="e.g. Needs to be a Big 4 firm, or must have experience with crypto..."
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-4 text-lg shadow-xl hover:shadow-2xl transition-all"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating RFP...
          </span>
        ) : (
          'Generate Standardized RFP & Match Auditors →'
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        Standardizing your requirements ensures you get &quot;apples-to-apples&quot; quotes and avoids sales-heavy discovery calls.
      </p>
    </form>
  );
}

export default AuditorMatchForm;
