'use client';

import { useState } from 'react';

interface CalculatorResults {
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  recommendations: string[];
}

interface FreeResultsProps {
  results: CalculatorResults;
  leadId: string | null;
  companyName: string;
}

export default function FreeResults({
  results,
  leadId,
  companyName,
}: FreeResultsProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isRequestingPdf, setIsRequestingPdf] = useState(false);
  const [pdfSent, setPdfSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-trust-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return 'stroke-trust-500';
    if (score >= 40) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Good Progress';
    if (score >= 40) return 'Early-stage readiness';
    return 'Needs Attention';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGetPdf = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leadId) {
      setError('Unable to generate PDF. Please try again.');
      return;
    }

    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setError('Please agree to receive the PDF report.');
      return;
    }

    setIsRequestingPdf(true);
    setError(null);

    try {
      // Step 1: Set email on the lead
      const setEmailRes = await fetch('/api/lead/set-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          email: email,
          consent: consent,
        }),
      });

      if (!setEmailRes.ok) {
        const data = await setEmailRes.json();
        throw new Error(data.error || 'Failed to save email');
      }

      // Step 2: Generate PDF
      const pdfResponse = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      });

      if (!pdfResponse.ok) {
        const pdfData = await pdfResponse.json();
        throw new Error(pdfData.error || 'Failed to generate PDF');
      }

      // Step 3: Send email with PDF
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      });

      if (!emailResponse.ok) {
        const emailData = await emailResponse.json();
        throw new Error(emailData.error || 'Failed to send email');
      }

      setPdfSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRequestingPdf(false);
    }
  };

  // Show only top 2 recommendations
  const topRecommendations = results.recommendations.slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Score Card - Primary Focus */}
      <div className="card mb-6 border-2 border-brand-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Your SOC 2 Readiness Score
          </h2>
          <p className="text-gray-500 mb-6">
            Results for {companyName}
          </p>

          {/* Score Circle */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                className="text-gray-100"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(results.readiness_score / 100) * 402} 402`}
                strokeLinecap="round"
                className={getScoreBgColor(results.readiness_score)}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-5xl font-bold ${getScoreColor(results.readiness_score)}`}>
                {results.readiness_score}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">out of 100</span>
            </div>
          </div>

          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
            results.readiness_score >= 70 ? 'bg-green-100 text-green-700' :
            results.readiness_score >= 40 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {getScoreLabel(results.readiness_score)}
          </div>
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Estimated Compliance Cost
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          See what drives these numbers in the <a href="/soc-2-cost" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">SOC 2 cost guide</a>.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-600">
              {formatCurrency(results.estimated_cost_low)}
            </div>
            <div className="text-sm text-gray-500">Low</div>
          </div>
          <div className="text-gray-300 text-2xl font-light">–</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-600">
              {formatCurrency(results.estimated_cost_high)}
            </div>
            <div className="text-sm text-gray-500">High</div>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          Based on company size, data types, and timeline
        </p>
        <p className="text-xs text-gray-500 text-center mt-2">
          Includes auditor fees, tooling, and internal preparation effort.
        </p>
      </div>

      {/* Top Recommendations */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Recommendations
        </h3>
        <ul className="space-y-3">
          {topRecommendations.map((rec, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mid-page secondary CTA - same flow */}
      <div className="card mb-6 text-center">
        <button
          type="submit"
          form="pdf-form"
          className="btn-primary"
          disabled={isRequestingPdf || pdfSent}
        >
          Email me the PDF roadmap
        </button>
      </div>

      {/* PDF CTA Section - Email Gate */}
      <div className="card bg-gradient-to-br from-brand-50 via-white to-brand-50 border-brand-100">
        <div className="text-center">
          {!pdfSent ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Your Full SOC 2 Roadmap PDF
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                The PDF includes a detailed timeline, compliance checklist, 
                cost breakdown, and evidence templates.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Used by auditors, founders, and security leads preparing for SOC 2.
              </p>

              <form id="pdf-form" onSubmit={handleGetPdf} className="max-w-sm mx-auto text-left">
                <div className="mb-3">
                  <label htmlFor="pdf-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="pdf-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 mt-0.5"
                    />
                    <span className="text-xs text-gray-500">
                      I agree to receive my PDF report and occasional compliance tips. 
                      Unsubscribe anytime.
                    </span>
                  </label>
                </div>

                <ul className="text-sm text-gray-600 mb-3 list-disc list-inside space-y-1">
                  <li>Instant readiness score + cost range</li>
                  <li>Auditor-style, prioritized recommendations</li>
                </ul>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isRequestingPdf || !email || !consent}
                  className="btn-primary w-full"
                >
                  {isRequestingPdf ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Send Me the Full PDF
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  No spam. One PDF roadmap + occasional SOC 2 insights. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="py-2">
              <div className="inline-flex items-center text-trust-600 mb-2">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-semibold">PDF Sent!</span>
              </div>
              <p className="text-gray-600 mb-1">
                Check your inbox at <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-gray-500">
                (Usually arrives within 1-2 minutes)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
