'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PostResultsCTA } from './PostResultsCTA';
import { companySizeBand, scoreBand, trackEvent } from '@/lib/analytics';

interface CalculatorResults {
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  recommendations: string[];
}

interface FreeResultsContext {
  numEmployees?: number;
  industry?: string;
  plannedAuditDate?: string;
  soc2Requirers?: string[];
}

interface FreeResultsProps {
  results: CalculatorResults;
  leadId: string | null;
  companyName: string;
  context?: FreeResultsContext;
}

export default function FreeResults({
  results,
  leadId,
  companyName,
  context,
}: FreeResultsProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isRequestingPdf, setIsRequestingPdf] = useState(false);
  const [pdfSent, setPdfSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewType, setReviewType] = useState<'auditor_intro' | 'gap_review'>('auditor_intro');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

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

const getAuditReason = (rec: string) => {
  const lower = rec.toLowerCase();
  if (lower.includes('access')) return 'Auditors look for proof of least-privilege and regular access reviews with evidence.';
  if (lower.includes('change')) return 'Change control with approvals and logs reduces the risk of untracked production changes.';
  if (lower.includes('vendor')) return 'Third-party risk is a common finding; tiering and evidence keep auditors comfortable.';
  if (lower.includes('logging') || lower.includes('monitor')) return 'Evidence of monitoring and alerting shows you can detect and respond to issues.';
  if (lower.includes('backup') || lower.includes('recovery')) return 'Documented backups with test results prove resilience for availability criteria.';
  return 'Auditors want this control documented, owned, and evidenced consistently.';
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
    trackEvent('soc2_roadmap_email_requested', { email });

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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) {
      setReviewStatus('Unable to submit request. Missing lead.');
      return;
    }
    setIsSubmittingReview(true);
    setReviewStatus(null);
    try {
      const resp = await fetch('/api/lead/request-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          review_type: reviewType,
          email: reviewEmail || undefined,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.success) {
        throw new Error(data.error || 'Request failed');
      }
      setReviewStatus('Request received. We’ll reach out shortly.');
    } catch (err) {
      setReviewStatus(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Show only top 2 recommendations
  const topRecommendations = results.recommendations.slice(0, 2);
  const topNextSteps = results.recommendations.slice(0, 5).map((rec) => ({
    title: rec,
    reason: getAuditReason(rec),
  }));

  const showReadinessCTA = useMemo(() => {
    if (results.readiness_score < 70) return true;
    
    // Check timeline (< 120 days)
    if (context?.plannedAuditDate) {
      const auditDate = new Date(context.plannedAuditDate);
      const now = new Date();
      const diffDays = Math.ceil((auditDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 120) return true;
    }

    // Check enterprise intent
    if (context?.soc2Requirers?.some(r => r === 'enterprise')) return true;

    return false;
  }, [results.readiness_score, context]);

  useEffect(() => {
    trackEvent('soc2_results_viewed', {
      score: results.readiness_score,
      score_band: scoreBand(results.readiness_score),
      company_size: context?.numEmployees ? companySizeBand(context.numEmployees) : 'unknown',
      industry: context?.industry || 'unknown',
    });
  }, [results.readiness_score, context]);

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
          <p className="text-sm text-gray-500 mb-4">
            There is no “pass” or “fail.” Higher scores mean fewer gaps and lower audit risk. Most early-stage companies score between 20–50.
          </p>
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-left text-sm text-gray-700 space-y-2 mb-4">
            <p className="font-semibold text-gray-900">How to interpret your score</p>
            <p className="text-gray-600">There is no official “pass/fail” score for SOC 2. This score reflects typical audit readiness patterns based on your answers.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>0–39: Early-stage — significant gaps; focus on fundamentals and evidence</li>
              <li>40–69: Near-ready — gaps remain; prioritize high-impact controls and consistency</li>
              <li>70–100: Strong — closer to audit-ready; validate scope and evidence quality</li>
            </ul>
            <p className="text-gray-600">In practice, auditors care most about whether controls exist, are documented, and can be evidenced consistently.</p>
            <p className="text-gray-600">Typically, scope and evidence quality drive both timeline and cost.</p>
          </div>

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

      <div className="card mb-6 bg-white border-slate-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Top next steps (highest impact first)
        </h3>
        <ul className="space-y-3">
          {topNextSteps.map((item, index) => (
            <li key={item.title} className="flex gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-700 text-sm font-semibold">
                {index + 1}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

        {showReadinessCTA && (
          <PostResultsCTA
            title="Avoid surprises during your SOC 2 audit"
            description="Based on your inputs, there are a few areas auditors commonly challenge at this stage. Get a focused readiness review to identify gaps before you commit to an audit timeline."
            primaryCtaLabel="Get a Readiness Review"
            primaryCtaHref="/readiness-review"
            primaryCtaOnClick={() => trackEvent('soc2_readiness_review_cta_clicked')}
            footnote="One-time review. We’ll email your summary so you can share internally."
          />
        )}

        {/* Cost Estimate */}
        <div className="card mb-6 bg-white border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Estimated SOC 2 Cost</h3>
            <a href="/soc-2-cost" className="btn-ghost text-sm">
              See cost breakdown guide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-1">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Low estimate</p>
            <p className="text-2xl font-bold text-brand-700">{formatCurrency(results.estimated_cost_low)}</p>
          </div>
          <div className="text-center text-3xl text-slate-300 font-light sm:col-span-1">–</div>
          <div className="sm:col-span-1 text-right sm:text-left">
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">High estimate</p>
            <p className="text-2xl font-bold text-brand-700">{formatCurrency(results.estimated_cost_high)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center sm:text-left mt-3">
          Use this to budget remediation and auditor prep; confirm exact scope with your auditor.
        </p>
      </div>

      <div className="card mb-6 border border-slate-200">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Need extra help?</p>
            <p className="text-sm text-gray-600">
              Optional: request a quick gap review or an intro to an auditor. Your score remains free and instant.
            </p>
          </div>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Choose one</label>
              <select
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={reviewType}
                onChange={(e) => setReviewType(e.target.value as 'auditor_intro' | 'gap_review')}
              >
                <option value="auditor_intro">Auditor introduction</option>
                <option value="gap_review">Gap review</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Work email (optional)</label>
              <input
                type="email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="you@company.com"
              />
              <p className="text-xs text-gray-500 mt-1">We’ll only use this to respond. No spam.</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-60"
              >
                {isSubmittingReview ? 'Submitting...' : 'Request help'}
              </button>
              {reviewStatus && (
                <p className="text-sm text-gray-600">{reviewStatus}</p>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card mb-6">

        <h3 className="text-base font-semibold text-gray-900 mb-2">About these estimates</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Cost and readiness ranges are directional, not guarantees. Typical variance is ±15–25%, depending on auditor, scope changes, and control maturity.
        </p>
      </div>

      <div className="card mb-6 bg-white">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Early results</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          This tool is actively being tested with founders and operators preparing for SOC 2. Early users consistently report clearer expectations around cost, timeline, and audit readiness.
        </p>
      </div>

      {/* Top Recommendations */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Recommendations
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          <a href="/soc-2-cost" className="underline underline-offset-2 text-brand-700 hover:text-brand-800">
            Learn how SOC 2 costs are calculated.
          </a>
        </p>
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
            Email me my SOC 2 roadmap (PDF)
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
                  <p className="text-gray-600 text-sm mb-4">
                    We’ll send it to your inbox so you can save or share it internally. The PDF includes a detailed timeline, compliance checklist, 
                    cost breakdown, and evidence templates.
                  </p>

                  <form id="pdf-form" onSubmit={handleGetPdf} className="max-w-sm mx-auto text-left">
                    <div className="mb-3">
                      <p className="text-xs text-brand-600 font-medium mb-1">We’ll send it to your inbox so you can save or share it internally.</p>
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

        <div className="flex justify-center mt-8">
          <Link
            href="/soc-2-cost"
            className="text-sm text-slate-500 hover:text-brand-600 transition"
          >
            ← Back to SOC 2 Cost Guide
          </Link>
        </div>
      </div>
    );
  }

