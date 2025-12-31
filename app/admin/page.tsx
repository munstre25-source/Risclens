'use client';

import { useState, useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

type AuthState = 'loading' | 'unauthenticated' | 'authenticated';

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check authentication on mount by calling /api/admin/leads
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/leads', {
        credentials: 'include',
      });

      if (res.ok) {
        setAuthState('authenticated');
      } else {
        setAuthState('unauthenticated');
      }
    } catch {
      setAuthState('unauthenticated');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ secret }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAuthState('authenticated');
        setSecret('');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore logout errors
    }
    setAuthState('unauthenticated');
  };

  // Loading state
  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Login form
  if (authState === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Admin Access
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="secret" className="form-label">
                  Admin Secret
                </label>
                <input
                  type="password"
                  id="secret"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Enter admin secret"
                  autoComplete="off"
                  disabled={isLoggingIn}
                />
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoggingIn || !secret}
                className="btn-primary w-full"
              >
                {isLoggingIn ? 'Logging in...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - render dashboard
  return <AdminDashboard onLogout={handleLogout} />;
}
