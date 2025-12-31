'use client';

import { useState, useEffect, useCallback } from 'react';

interface Lead {
  id: string;
  company_name: string;
  email: string;
  industry: string;
  num_employees: number;
  role: string;
  audit_date: string;
  data_types: string[];
  lead_score: number;
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  keep_or_sell: 'keep' | 'sell';
  email_sent: boolean;
  pdf_url: string | null;
  sold: boolean;
  sale_amount: number | null;
  buyer_email: string | null;
  utm_source: string | null;
  variation_id: string | null;
  created_at: string;
}

interface ABVariant {
  id: string;
  variation_id: string;
  name: string;
  headline: string;
  cta_text: string;
  impressions: number;
  submissions: number;
  active: boolean;
}

interface Stats {
  total: number;
  keep: number;
  sell: number;
  revenue: number;
}

const INDUSTRIES = [
  { value: '', label: 'All Industries' },
  { value: 'saas', label: 'SaaS' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [variants, setVariants] = useState<ABVariant[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, keep: 0, sell: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [keepOrSell, setKeepOrSell] = useState('');
  const [industry, setIndustry] = useState('');
  const [soldFilter, setSoldFilter] = useState('');

  // Modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellAmount, setSellAmount] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Get admin token from cookie for API calls
  const getAdminToken = () => {
    const match = document.cookie.match(/admin_token=([^;]+)/);
    return match ? match[1] : '';
  };

  const fetchData = useCallback(async () => {
    try {
      const token = getAdminToken();
      
      // Build query params
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (keepOrSell) params.append('keep_or_sell', keepOrSell);
      if (industry) params.append('industry', industry);
      if (soldFilter) params.append('sold', soldFilter);

      // Fetch leads
      const leadsRes = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });

      if (!leadsRes.ok) throw new Error('Failed to fetch leads');
      const leadsData = await leadsRes.json();
      setLeads(leadsData.leads || []);
      setStats(leadsData.stats || { total: 0, keep: 0, sell: 0, revenue: 0 });

      // Fetch A/B variants
      const variantsRes = await fetch('/api/admin/variants', {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });

      if (variantsRes.ok) {
        const variantsData = await variantsRes.json();
        setVariants(variantsData.variants || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [search, keepOrSell, industry, soldFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResendEmail = async (leadId: string) => {
    setActionLoading(true);
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/resend-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ lead_id: leadId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to resend email');
      }

      alert('Email resent successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to resend email');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkSold = async () => {
    if (!selectedLead || !sellAmount || !buyerEmail) return;

    setActionLoading(true);
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/mark-sold', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          lead_id: selectedLead.id,
          sale_amount: parseFloat(sellAmount),
          buyer_email: buyerEmail,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to mark as sold');
      }

      setShowSellModal(false);
      setSelectedLead(null);
      setSellAmount('');
      setBuyerEmail('');
      fetchData(); // Refresh data
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to mark as sold');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = getAdminToken();
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (keepOrSell) params.append('keep_or_sell', keepOrSell);
      if (industry) params.append('industry', industry);
      if (soldFilter) params.append('sold', soldFilter);
      params.append('secret', token);

      window.open(`/api/admin/export-csv?${params.toString()}`, '_blank');
    } catch (err) {
      alert('Failed to export CSV');
    }
  };

  const handleToggleVariant = async (variantId: string, active: boolean) => {
    try {
      const token = getAdminToken();
      const res = await fetch('/api/admin/toggle-variant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ variant_id: variantId, active }),
      });

      if (!res.ok) throw new Error('Failed to toggle variant');
      fetchData();
    } catch (err) {
      alert('Failed to toggle variant');
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            RiscLens Admin Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Total Leads</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Keep Leads</div>
            <div className="text-2xl font-bold text-trust-600">{stats.keep}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Sell Leads</div>
            <div className="text-2xl font-bold text-orange-600">{stats.sell}</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Revenue</div>
            <div className="text-2xl font-bold text-brand-600">{formatCurrency(stats.revenue)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Search</label>
              <input
                type="text"
                placeholder="Search by company or email..."
                className="form-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Type</label>
              <select
                className="form-input"
                value={keepOrSell}
                onChange={(e) => setKeepOrSell(e.target.value)}
              >
                <option value="">All</option>
                <option value="keep">Keep</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div>
              <label className="form-label">Industry</label>
              <select
                className="form-input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Sold</label>
              <select
                className="form-input"
                value={soldFilter}
                onChange={(e) => setSoldFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Sold</option>
                <option value="false">Not Sold</option>
              </select>
            </div>
            <button onClick={handleExportCSV} className="btn-secondary">
              Export CSV
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="card overflow-hidden p-0 mb-8">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Industry</th>
                  <th>Score</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="font-medium">{lead.company_name}</td>
                      <td className="text-gray-600">{lead.email}</td>
                      <td className="capitalize">{lead.industry}</td>
                      <td>
                        <span className="font-semibold">{lead.lead_score}</span>
                        <span className="text-gray-400">/10</span>
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead.keep_or_sell === 'keep' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {lead.keep_or_sell}
                        </span>
                      </td>
                      <td>
                        {lead.sold ? (
                          <span className="text-trust-600 font-medium">
                            Sold {lead.sale_amount ? formatCurrency(lead.sale_amount) : ''}
                          </span>
                        ) : lead.email_sent ? (
                          <span className="text-gray-500">Email sent</span>
                        ) : (
                          <span className="text-gray-400">Pending</span>
                        )}
                      </td>
                      <td className="text-gray-500">{formatDate(lead.created_at)}</td>
                      <td>
                        <div className="flex gap-2">
                          {lead.pdf_url && (
                            <a
                              href={lead.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-600 hover:text-brand-700 text-sm"
                            >
                              PDF
                            </a>
                          )}
                          {lead.email_sent && (
                            <button
                              onClick={() => handleResendEmail(lead.id)}
                              disabled={actionLoading}
                              className="text-brand-600 hover:text-brand-700 text-sm"
                            >
                              Resend
                            </button>
                          )}
                          {!lead.sold && lead.keep_or_sell === 'sell' && (
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setShowSellModal(true);
                              }}
                              className="text-trust-600 hover:text-trust-700 text-sm"
                            >
                              Sell
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* A/B Testing Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">A/B Variants</h2>
          <div className="card overflow-hidden p-0">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Name</th>
                  <th>Impressions</th>
                  <th>Submissions</th>
                  <th>Conv. Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {variants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No A/B variants configured.
                    </td>
                  </tr>
                ) : (
                  variants.map((variant) => (
                    <tr key={variant.id}>
                      <td className="font-mono text-sm">{variant.variation_id}</td>
                      <td>{variant.name}</td>
                      <td>{variant.impressions.toLocaleString()}</td>
                      <td>{variant.submissions.toLocaleString()}</td>
                      <td>
                        {variant.impressions > 0
                          ? `${((variant.submissions / variant.impressions) * 100).toFixed(1)}%`
                          : '0%'}
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          variant.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {variant.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleVariant(variant.variation_id, !variant.active)}
                          className="text-brand-600 hover:text-brand-700 text-sm"
                        >
                          {variant.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Sell Modal */}
      {showSellModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Mark Lead as Sold
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>{selectedLead.company_name}</strong> ({selectedLead.email})
            </p>
            <div className="space-y-4">
              <div>
                <label className="form-label">Sale Amount ($)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="500"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Buyer Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="buyer@company.com"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowSellModal(false);
                  setSelectedLead(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkSold}
                disabled={actionLoading || !sellAmount || !buyerEmail}
                className="btn-primary"
              >
                {actionLoading ? 'Saving...' : 'Confirm Sale'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

