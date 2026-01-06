'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ChecklistDownloadForm() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checklist-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company_name: company,
          source_url: window.location.href,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

        setIsSuccess(true);
        trackEvent('checklist_download_submitted', { email, company });
        
        // NEW: Trigger automatic PDF generation and email for the checklist
        if (data.lead_id) {
          try {
            const pdfRes = await fetch('/api/generate-pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                lead_id: data.lead_id,
                template: 'readiness' // Or a specific checklist template if you have one
              }),
            });
            
            if (pdfRes.ok) {
              await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lead_id: data.lead_id }),
              });
            }
          } catch (pdfErr) {
            console.error('Failed to trigger checklist PDF email:', pdfErr);
          }
        }
      } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Checklist is on its way!</h3>
          <p className="text-slate-600 mb-6">
            We've sent the 2026 SOC 2 Readiness Checklist to <strong>{email}</strong>.
          </p>
          
          <div className="bg-white border border-emerald-200 rounded-lg p-6 mb-6 text-left shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs">NEXT</span>
              Want a 10-minute readiness sanity check?
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              The checklist helps you prep, but a sanity check tells you what auditors will flag first. Get a quick expert review of your current setup.
            </p>
            <a 
              href="/readiness-review"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-brand-600 text-white rounded-md font-semibold hover:bg-brand-700 transition-colors"
            >
              Get a Readiness Review →
            </a>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="text-emerald-700 text-sm font-semibold hover:underline"
          >
            Download another copy
          </button>
        </div>
      );
    }
  
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Download the PDF Checklist</h3>
          <p className="text-slate-600">
            Get the portable, offline version of our 2026 SOC 2 readiness expert guide.
          </p>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for spam protection */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
  
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                />
                <p className="text-[10px] text-slate-400 mt-1">We'll use this to send your checklist and occasional compliance guides.</p>
              </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              />
            </div>
          </div>
  
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
  
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing your PDF...
              </>
            ) : (
              <>
                Email Me the 2026 Checklist
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </>
            )}
          </button>
  
          <p className="text-[11px] text-slate-500 text-center">
            Used by early-stage SaaS teams. Vendor-neutral, auditor-informed. Unsubscribe anytime.
          </p>
      </form>
    </div>
  );
}
