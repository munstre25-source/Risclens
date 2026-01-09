'use client';

import React, { useState } from 'react';

interface CompanyActionButtonsProps {
  companySlug: string;
  companyName: string;
  isVerified?: boolean;
}

export function CompanyActionButtons({ companySlug, companyName, isVerified }: CompanyActionButtonsProps) {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/compliance/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companySlug, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit claim');
      setStatus('success');
      setMessage('Claim request submitted! Our team will verify your details and reach out via email.');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const handleFollow = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/compliance/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companySlug, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');
      setStatus('success');
      setMessage(`You're now following ${companyName}! We'll alert you to any security signal changes.`);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="space-y-3">
      {!isVerified && (
        <button 
          onClick={() => { setShowClaimModal(true); setStatus('idle'); setMessage(''); }}
          className="w-full py-3 bg-white text-blue-600 border border-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Claim This Profile
        </button>
      )}

      <button 
        onClick={() => { setShowFollowModal(true); setStatus('idle'); setMessage(''); }}
        className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Follow Intelligence Alerts
      </button>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-black text-gray-900">Claim {companyName} Profile</h3>
              <button onClick={() => setShowClaimModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{message}</p>
                <button onClick={() => setShowClaimModal(false)} className="mt-8 w-full py-3 bg-gray-100 rounded-xl font-bold">Close</button>
              </div>
            ) : (
              <form onSubmit={handleClaim} className="space-y-4">
                <p className="text-sm text-gray-500 mb-4">
                  Verify your company to manage your security signals and add a "Verified" badge to your profile.
                </p>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Work Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {status === 'error' && <p className="text-xs text-red-500 font-bold">{message}</p>}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-black shadow-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Verification →'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Follow Modal */}
      {showFollowModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-black text-gray-900">Intelligence Alerts</h3>
              <button onClick={() => setShowFollowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium">{message}</p>
                <button onClick={() => setShowFollowModal(false)} className="mt-8 w-full py-3 bg-gray-100 rounded-xl font-bold">Got it</button>
              </div>
            ) : (
              <form onSubmit={handleFollow} className="space-y-4">
                <p className="text-sm text-gray-500 mb-4">
                  Get notified whenever RiscLens AI detects a change in {companyName}'s security posture or compliance disclosures.
                </p>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@work.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {status === 'error' && <p className="text-xs text-red-500 font-bold">{message}</p>}
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-black shadow-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Activating...' : `Follow ${companyName} Alerts →`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
