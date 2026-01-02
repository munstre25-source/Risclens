'use client';

import { useEffect, useState } from 'react';

export default function TestModePage() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    syncFromCookie();
  }, []);

  const syncFromCookie = () => {
    if (typeof document === 'undefined') return;
    const isOn = document.cookie.includes('rls_test_mode=1');
    setEnabled(isOn);
  };

  const emitChange = (next: boolean) => {
    document.dispatchEvent(
      new CustomEvent('rls-test-mode-changed', { detail: { enabled: next } })
    );
  };

  const toggle = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const next = !enabled;
      const res = await fetch('/api/admin/test-mode/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ enabled: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to toggle test mode');
      }
      setEnabled(next);
      emitChange(next);
      setMessage(next ? 'Test Mode enabled for this browser.' : 'Test Mode disabled.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle test mode');
    } finally {
      setLoading(false);
    }
  };

  const clearTestData = async () => {
    setError(null);
    setMessage(null);
    const confirmation = window.prompt('Type DELETE to remove all test data (is_test=true).');
    if (confirmation !== 'DELETE') return;

    setDeleting(true);
    try {
      const res = await fetch('/api/admin/test-mode/clear', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete test data');
      }
      setMessage('Test data deleted. Stats and tables refreshed.');
      emitChange(enabled);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete test data');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Test Mode</h1>
            <p className="text-sm text-slate-600">
              When Test Mode is on, new leads, events, and A/B metrics from this browser are marked
              as test data and excluded from live stats.
            </p>
          </div>
          <button
            onClick={toggle}
            disabled={loading}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition ${
              enabled
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            aria-pressed={enabled}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                enabled ? 'bg-amber-500' : 'bg-slate-300'
              }`}
            />
            {loading ? 'Saving…' : enabled ? 'Test Mode ON' : 'Test Mode OFF'}
          </button>
        </div>
      </div>

      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Delete Test Data</h2>
            <p className="text-sm text-slate-600">
              Removes rows where <code>is_test = true</code> from leads and revenue tables.
            </p>
          </div>
          <button
            onClick={clearTestData}
            disabled={deleting}
            className="btn-secondary"
          >
            {deleting ? 'Deleting…' : 'Delete Test Data'}
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Confirmation required (type DELETE). Real data (is_test=false) is never touched.
        </p>
      </div>

      {(message || error) && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            error ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
          }`}
        >
          {error || message}
        </div>
      )}
    </div>
  );
}
