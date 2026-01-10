'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

interface ContentFeedbackProps {
  pageUrl: string;
  className?: string;
}

export function ContentFeedback({ pageUrl, className = '' }: ContentFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (helpful: boolean) => {
    setIsHelpful(helpful);
    setLoading(true);
    
    try {
      const res = await fetch('/api/compliance/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: pageUrl,
          is_helpful: helpful,
          metadata: { timestamp: new Date().toISOString() }
        }),
      });
      
      if (res.ok) {
        if (!helpful) {
          // Stay on the state to allow adding text feedback
          setLoading(false);
        } else {
          setSubmitted(true);
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Feedback failed:', err);
      setLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    setLoading(true);
    try {
      await fetch('/api/compliance/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: pageUrl,
          is_helpful: isHelpful,
          feedback_text: feedback,
          metadata: { timestamp: new Date().toISOString(), type: 'text_correction' }
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Text feedback failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`flex items-center gap-2 text-green-700 bg-green-50 p-4 rounded-lg border border-green-100 ${className}`}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">Thank you for your feedback! It helps us improve our data accuracy.</span>
      </div>
    );
  }

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl p-6 ${className}`}>
      {isHelpful === null ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-900">Was this guide helpful and accurate?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-brand-300 hover:text-brand-700 transition-all"
            >
              <ThumbsUp className="w-4 h-4" />
              Yes
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-red-300 hover:text-red-700 transition-all"
            >
              <ThumbsDown className="w-4 h-4" />
              No
            </button>
          </div>
        </div>
      ) : isHelpful === false ? (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-900">What could we improve? (e.g., pricing seems outdated, missing a key factor)</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your insights help other founders..."
            className="w-full min-h-[100px] p-3 rounded-lg border border-slate-300 text-sm focus:ring-brand-500 focus:border-brand-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsHelpful(null)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleTextSubmit}
              disabled={loading || !feedback.trim()}
              className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-bold hover:bg-brand-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
