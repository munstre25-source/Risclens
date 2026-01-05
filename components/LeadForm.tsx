'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface LeadFormProps {
  title: string;
  description: string;
  fields: Field[];
  endpoint: string;
  ctaLabel: string;
  successMessage: string;
  disclaimer?: string;
  analyticsEvent: string;
  initialData?: Record<string, string>;
}

export function LeadForm({
  title,
  description,
  fields,
  endpoint,
  ctaLabel,
  successMessage,
  disclaimer,
  analyticsEvent,
  initialData = {},
}: LeadFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      setIsSuccess(true);
      trackEvent(`${analyticsEvent}_submitted`, formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="card p-8 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field for spam protection */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </div>

        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="form-label">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="form-input"
                required={field.required}
              >
                <option value="">Select {field.label.toLowerCase()}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="form-input"
                rows={3}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                className="form-input"
                placeholder={field.placeholder}
                required={field.required}
                min={field.type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
              />
            )}
          </div>
        ))}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 text-lg"
        >
          {isSubmitting ? 'Submitting...' : ctaLabel}
        </button>

        {disclaimer && (
          <p className="text-xs text-gray-500 text-center mt-4">
            {disclaimer}
          </p>
        )}
      </form>
    </div>
  );
}
