'use client';

import { useState } from 'react';

interface VendorRiskLeadMagnetProps {
  title: string;
  description: string;
  buttonText: string;
  templateId: string;
  resourceName: string;
}

export default function VendorRiskLeadMagnet({
  title,
  description,
  buttonText,
  templateId,
  resourceName,
}: VendorRiskLeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // 1. Capture Lead
      const leadRes = await fetch('/api/lead/partial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          lead_type: `vra_magnet_${templateId}`,
          source_url: window.location.href,
        }),
      });
      const leadData = await leadRes.json();
      const leadId = leadData.lead_id;

      // 2. Generate PDF/Template
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          email,
          company,
          template: templateId,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resourceName.replace(/\s+/g, '_')}.pdf`;
        a.click();
        setSubmitted(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">Success!</h3>
          <p className="text-slate-600">Your {resourceName} has been downloaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl my-12">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
            Premium Resource
          </div>
          <h2 className="text-3xl font-bold leading-tight">{title}</h2>
          <p className="text-slate-300 text-lg">
            {description}
          </p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Fully editable template
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Built for 2026 Audit Standards
            </li>
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Work Email</label>
              <input
                type="email"
                required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
                />
                <p className="text-[10px] text-slate-400 mt-1">We'll use this to send your resource and occasional security updates.</p>
              </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Company</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-500 outline-none transition"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-lg shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:transform-none"
            >
              {isSubmitting ? 'Preparing Download...' : buttonText}
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-500">
            By downloading, you agree to receive RiscLens updates. Secure 256-bit encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
