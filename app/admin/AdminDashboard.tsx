'use client';

import { useState, useEffect, useCallback } from 'react';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type LeadStatus = 'new' | 'qualified' | 'contacted' | 'in_conversation' | 'closed_won' | 'closed_lost';

interface Lead {
  id: string;
  company_name: string;
  email: string | null;
  industry: string;
  num_employees: number;
  role: string;
  audit_date: string;
  data_types: string[];
  soc2_requirers: string[];
  context_note: string | null;
  lead_status: LeadStatus;
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

interface AdminNote {
  id: string;
  lead_id: string;
  note: string;
  author: string;
  created_at: string;
}

interface SavedFilter {
  id: string;
  name: string;
  filter_config: Record<string, string | number | boolean>;
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

interface EnhancedMetrics {
  total_leads: number;
  avg_readiness_score: number;
  avg_estimated_cost: number;
  pct_enterprise_driven: number;
  pct_urgent: number;
  lead_to_sale_rate: number;
  total_revenue: number;
}

interface Stats {
  total: number;
  keep: number;
  sell: number;
  revenue: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

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

const LEAD_STATUSES: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'in_conversation', label: 'In Conversation', color: 'bg-orange-100 text-orange-700' },
  { value: 'closed_won', label: 'Closed Won', color: 'bg-green-100 text-green-700' },
  { value: 'closed_lost', label: 'Closed Lost', color: 'bg-gray-100 text-gray-600' },
];

const URGENCY_BANDS = [
  { max: 90, label: 'Urgent', color: 'text-red-600 bg-red-50', badge: '🔴' },
  { max: 180, label: '90-180 days', color: 'text-yellow-600 bg-yellow-50', badge: '🟡' },
  { max: Infinity, label: 'Exploratory', color: 'text-gray-500 bg-gray-50', badge: '⚪' },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getDaysUntilAudit(auditDate: string): number {
  const now = new Date();
  const audit = new Date(auditDate);
  return Math.ceil((audit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyBand(auditDate: string) {
  const days = getDaysUntilAudit(auditDate);
  return URGENCY_BANDS.find(b => days < b.max) || URGENCY_BANDS[2];
}

function getReadinessBand(score: number): { label: string; color: string } {
  if (score <= 30) return { label: 'Pre-audit', color: 'text-red-600' };
  if (score <= 60) return { label: 'Early-stage', color: 'text-yellow-600' };
  if (score <= 80) return { label: 'Near-ready', color: 'text-blue-600' };
  return { label: 'Audit-ready', color: 'text-green-600' };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function isToday(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function formatRelativeTime(dateStr: string) {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function AdminDashboard() {
  // Data state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [variants, setVariants] = useState<ABVariant[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, keep: 0, sell: 0, revenue: 0 });
  const [metrics, setMetrics] = useState<EnhancedMetrics | null>(null);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [keepOrSell, setKeepOrSell] = useState('');
  const [industry, setIndustry] = useState('');
  const [soldFilter, setSoldFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');

  // Detail panel
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNotes, setLeadNotes] = useState<AdminNote[]>([]);
  const [leadEnrichment, setLeadEnrichment] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loadingEnrichment, setLoadingEnrichment] = useState(false);

  // Modals
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellAmount, setSellAmount] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Save filter modal
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');

  const getAdminToken = () => {
    const match = document.cookie.match(/admin_token=([^;]+)/);
    return match ? match[1] : '';
  };

  // ==========================================================================
  // DATA FETCHING
  // ==========================================================================

  const fetchData = useCallback(async () => {
    try {
      const token = getAdminToken();
      
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (keepOrSell) params.append('keep_or_sell', keepOrSell);
      if (industry) params.append('industry', industry);
      if (soldFilter) params.append('sold', soldFilter);
      if (statusFilter) params.append('lead_status', statusFilter);
      if (urgencyFilter) params.append('urgency', urgencyFilter);

      const leadsRes = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });

      if (!leadsRes.ok) throw new Error('Failed to fetch leads');
      const leadsData = await leadsRes.json();
      setLeads(leadsData.leads || []);
      setStats(leadsData.stats || { total: 0, keep: 0, sell: 0, revenue: 0 });
      if (leadsData.metrics) setMetrics(leadsData.metrics);

      // Fetch A/B variants
      const variantsRes = await fetch('/api/admin/variants', {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });

      if (variantsRes.ok) {
        const variantsData = await variantsRes.json();
        setVariants(variantsData.variants || []);
      }

      // Fetch saved filters
      const filtersRes = await fetch('/api/admin/filters', {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
      });

      if (filtersRes.ok) {
        const filtersData = await filtersRes.json();
        setSavedFilters(filtersData.filters || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [search, keepOrSell, industry, soldFilter, statusFilter, urgencyFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================================================
  // LEAD DETAIL PANEL
  // ==========================================================================

  const openLeadDetail = async (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailPanel(true);
    setLoadingEnrichment(true);
    
    // Fetch notes and enrichment for this lead
    const token = getAdminToken();
    try {
      const [notesRes, enrichmentRes] = await Promise.all([
        fetch(`/api/admin/leads/${lead.id}/notes`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch(`/api/admin/leads/${lead.id}/enrichment`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        })
      ]);

      if (notesRes.ok) {
        const data = await notesRes.json();
        setLeadNotes(data.notes || []);
      }
      if (enrichmentRes.ok) {
        const data = await enrichmentRes.json();
        setLeadEnrichment(data.enrichment || []);
      }
    } catch {
      // Ignore errors
    } finally {
      setLoadingEnrichment(false);
    }
  };

  const handleAddNote = async () => {
    if (!selectedLead || !newNote.trim()) return;
    
    const token = getAdminToken();
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ note: newNote.trim() }),
      });

      if (res.ok) {
        const data = await res.json();
        setLeadNotes([data.note, ...leadNotes]);
        setNewNote('');
      }
    } catch {
      alert('Failed to add note');
    }
  };

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    const token = getAdminToken();
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Update local state
        setLeads(leads.map(l => l.id === leadId ? { ...l, lead_status: status } : l));
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, lead_status: status });
        }
      }
    } catch {
      alert('Failed to update status');
    }
  };

  // ==========================================================================
  // ACTIONS
  // ==========================================================================

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
      fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to mark as sold');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = async () => {
    const token = getAdminToken();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (keepOrSell) params.append('keep_or_sell', keepOrSell);
    if (industry) params.append('industry', industry);
    if (soldFilter) params.append('sold', soldFilter);
    if (statusFilter) params.append('lead_status', statusFilter);
    if (urgencyFilter) params.append('urgency', urgencyFilter);
    params.append('secret', token);

    window.open(`/api/admin/export-csv?${params.toString()}`, '_blank');
  };

  const handleSaveFilter = async () => {
    if (!newFilterName.trim()) return;
    
    const filterConfig: Record<string, string> = {};
    if (search) filterConfig.search = search;
    if (keepOrSell) filterConfig.keep_or_sell = keepOrSell;
    if (industry) filterConfig.industry = industry;
    if (soldFilter) filterConfig.sold = soldFilter;
    if (statusFilter) filterConfig.lead_status = statusFilter;
    if (urgencyFilter) filterConfig.urgency = urgencyFilter;

    const token = getAdminToken();
    try {
      const res = await fetch('/api/admin/filters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ name: newFilterName, filter_config: filterConfig }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedFilters([...savedFilters, data.filter]);
        setShowSaveFilterModal(false);
        setNewFilterName('');
      }
    } catch {
      alert('Failed to save filter');
    }
  };

  const applyFilter = (filter: SavedFilter) => {
    const config = filter.filter_config;
    if (config.search) setSearch(config.search as string);
    if (config.keep_or_sell) setKeepOrSell(config.keep_or_sell as string);
    if (config.industry) setIndustry(config.industry as string);
    if (config.sold) setSoldFilter(config.sold as string);
    if (config.lead_status) setStatusFilter(config.lead_status as string);
    if (config.urgency) setUrgencyFilter(config.urgency as string);
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
    } catch {
      alert('Failed to toggle variant');
    }
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    } finally {
      window.location.href = '/admin';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 overflow-x-hidden flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Enhanced Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Leads</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{metrics.total_leads}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Readiness</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">{metrics.avg_readiness_score}%</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Value</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(metrics.avg_estimated_cost)}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enterprise</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{metrics.pct_enterprise_driven}%</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 rounded-lg">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Urgent</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{metrics.pct_urgent}%</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sold</span>
              </div>
              <div className="text-2xl font-bold text-indigo-600">{metrics.lead_to_sale_rate}%</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue</span>
              </div>
              <div className="text-2xl font-bold text-trust-600">{formatCurrency(metrics.total_revenue)}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">System Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <div className="text-xs text-slate-500">Distribution Engine</div>
                  <div className="text-sm font-medium text-slate-900">Active & Monitoring</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">PDFs Generated Today</div>
                <div className="text-sm font-medium text-slate-900">
                  {leads.filter((lead) => lead.pdf_url && isToday(lead.created_at)).length || 0}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Last Lead Received</div>
                <div className="text-sm font-medium text-slate-900">
                  {leads.length > 0 ? formatRelativeTime(leads[0].created_at) : '—'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-w-[300px]">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => window.location.href='/admin/buyers'} className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Manage Buyers
              </button>
              <button onClick={handleExportCSV} className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
              <button onClick={() => window.location.href='/admin/audit'} className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Audit Logs
              </button>
            </div>
          </div>
        </div>

        {/* Saved Filters */}
        {savedFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 py-1">Saved filters:</span>
            {savedFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => applyFilter(filter)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}

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
              <select className="form-input" value={keepOrSell} onChange={(e) => setKeepOrSell(e.target.value)}>
                <option value="">All</option>
                <option value="keep">Keep</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div>
              <label className="form-label">Industry</label>
              <select className="form-input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                {INDUSTRIES.map((ind) => (
                  <option key={ind.value} value={ind.value}>{ind.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                {LEAD_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Urgency</label>
              <select className="form-input" value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}>
                <option value="">All</option>
                <option value="urgent">Urgent (&lt;90d)</option>
                <option value="soon">90-180 days</option>
                <option value="later">180+ days</option>
              </select>
            </div>
            <button onClick={() => setShowSaveFilterModal(true)} className="btn-secondary text-sm">
              Save Filter
            </button>
            <button onClick={handleExportCSV} className="btn-secondary">
              Export CSV
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="card overflow-hidden p-0 mb-8">
          <div className="hidden md:block overflow-x-auto">
            <table className="admin-table min-w-[720px]">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Industry</th>
                  <th>Readiness</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-500">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => {
                    const urgency = getUrgencyBand(lead.audit_date);
                    const readiness = getReadinessBand(lead.readiness_score);
                    const status = LEAD_STATUSES.find(s => s.value === lead.lead_status) || LEAD_STATUSES[0];
                    const daysUntil = getDaysUntilAudit(lead.audit_date);

                    return (
                      <tr 
                        key={lead.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => openLeadDetail(lead)}
                      >
                        <td className="font-medium">{lead.company_name}</td>
                        <td className="text-gray-600 text-sm">
                          {lead.email || <span className="text-gray-400">No email</span>}
                        </td>
                        <td className="capitalize">{lead.industry}</td>
                        <td>
                          <div className="flex flex-col">
                            <span className={`font-semibold ${readiness.color}`}>
                              {lead.readiness_score}%
                            </span>
                            <span className="text-xs text-gray-400">{readiness.label}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`text-xs px-2 py-1 rounded ${urgency.color}`}>
                            {urgency.badge} {daysUntil}d
                          </span>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
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
                        <td className="text-gray-500 text-sm">{formatDate(lead.created_at)}</td>
                        <td onClick={(e) => e.stopPropagation()}>
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
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-gray-200">
            {leads.length === 0 ? (
              <p className="py-6 text-center text-gray-500">No leads found.</p>
            ) : (
              leads.map((lead) => {
                const urgency = getUrgencyBand(lead.audit_date);
                const readiness = getReadinessBand(lead.readiness_score);
                const status = LEAD_STATUSES.find(s => s.value === lead.lead_status) || LEAD_STATUSES[0];
                const daysUntil = getDaysUntilAudit(lead.audit_date);
                return (
                  <div key={lead.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{lead.company_name}</p>
                        <p className="text-xs text-gray-500">{lead.email || 'No email'}</p>
                        <p className="text-xs text-gray-500">Created {formatDate(lead.created_at)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                      <span className="capitalize">{lead.industry}</span>
                      <span className="text-gray-300">•</span>
                      <span className={readiness.color}>{lead.readiness_score}% {readiness.label}</span>
                      <span className="text-gray-300">•</span>
                      <span className={urgency.color}>{urgency.badge} {daysUntil}d</span>
                      <span className="text-gray-300">•</span>
                      <span className="capitalize">{lead.keep_or_sell}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <button onClick={() => openLeadDetail(lead)} className="text-brand-600 font-medium">
                        View details
                      </button>
                      {lead.pdf_url && (
                        <a
                          href={lead.pdf_url}
                          className="text-brand-600"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          PDF
                        </a>
                      )}
                      {lead.email_sent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResendEmail(lead.id);
                          }}
                          disabled={actionLoading}
                          className="text-brand-600"
                        >
                          Resend
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="md:hidden divide-y divide-gray-200">
            {leads.length === 0 ? (
              <p className="py-6 text-center text-gray-500">No leads found.</p>
            ) : (
              leads.map((lead) => {
                const urgency = getUrgencyBand(lead.audit_date);
                const readiness = getReadinessBand(lead.readiness_score);
                const status = LEAD_STATUSES.find(s => s.value === lead.lead_status) || LEAD_STATUSES[0];
                const daysUntil = getDaysUntilAudit(lead.audit_date);

                return (
                  <div key={lead.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{lead.company_name}</p>
                        <p className="text-xs text-gray-500">{lead.email || 'No email'}</p>
                        <p className="text-xs text-gray-500">Created {formatDate(lead.created_at)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                      <span className="capitalize">{lead.industry}</span>
                      <span className="text-gray-300">•</span>
                      <span className={readiness.color}>{lead.readiness_score}% {readiness.label}</span>
                      <span className="text-gray-300">•</span>
                      <span className={urgency.color}>{urgency.badge} {daysUntil}d</span>
                      <span className="text-gray-300">•</span>
                      <span className="capitalize">{lead.keep_or_sell}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <button onClick={() => openLeadDetail(lead)} className="text-brand-600 font-medium">
                        View details
                      </button>
                      {lead.pdf_url && (
                        <a
                          href={lead.pdf_url}
                          className="text-brand-600"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          PDF
                        </a>
                      )}
                      {lead.email_sent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResendEmail(lead.id);
                          }}
                          disabled={actionLoading}
                          className="text-brand-600"
                        >
                          Resend
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* A/B Testing Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">A/B Variants</h2>
          <div className="card overflow-hidden p-0">
            <div className="hidden md:block overflow-x-auto">
              <table className="admin-table min-w-[640px]">
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
        </div>
      </main>

      {/* Lead Detail Panel */}
      {showDetailPanel && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowDetailPanel(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedLead.company_name}</h2>
                  <p className="text-gray-500">{selectedLead.email || 'No email'}</p>
                </div>
                <button 
                  onClick={() => setShowDetailPanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Score Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Score Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Readiness Score</div>
                    <div className={`text-2xl font-bold ${getReadinessBand(selectedLead.readiness_score).color}`}>
                      {selectedLead.readiness_score}%
                    </div>
                    <div className="text-xs text-gray-400">{getReadinessBand(selectedLead.readiness_score).label}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Lead Score</div>
                    <div className="text-2xl font-bold text-gray-900">{selectedLead.lead_score}/10</div>
                    <div className="text-xs text-gray-400">{selectedLead.keep_or_sell === 'keep' ? 'Keep' : 'Sell'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Cost Estimate</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedLead.estimated_cost_low)} - {formatCurrency(selectedLead.estimated_cost_high)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Days Until Audit</div>
                    <div className={`text-lg font-semibold ${getUrgencyBand(selectedLead.audit_date).color.split(' ')[0]}`}>
                      {getDaysUntilAudit(selectedLead.audit_date)} days
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Drivers */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Score Drivers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees</span>
                    <span className="font-medium">{selectedLead.num_employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium capitalize">{selectedLead.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Types</span>
                    <span className="font-medium">{selectedLead.data_types.join(', ').toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role</span>
                    <span className="font-medium capitalize">{selectedLead.role}</span>
                  </div>
                  {selectedLead.soc2_requirers && selectedLead.soc2_requirers.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Required By</span>
                      <span className="font-medium capitalize">{selectedLead.soc2_requirers.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

                {/* User Context Note */}
                {selectedLead.context_note && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">User Context</h3>
                    <p className="text-sm text-gray-700">{selectedLead.context_note}</p>
                  </div>
                )}

                {/* Enrichment Data */}
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                    Enrichment Data
                    {loadingEnrichment && <span className="text-xs font-normal text-purple-600 animate-pulse">Loading...</span>}
                  </h3>
                  {leadEnrichment.length === 0 ? (
                    <p className="text-sm text-gray-500">{loadingEnrichment ? 'Fetching social data...' : 'No enrichment data found.'}</p>
                  ) : (
                    <div className="space-y-3">
                      {leadEnrichment.map((enrich) => (
                        <div key={enrich.id} className="text-sm">
                          <div className="grid grid-cols-2 gap-y-2">
                            {Object.entries(enrich.enriched_fields || {}).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-xs text-purple-600 uppercase font-bold tracking-tighter">{key.replace(/_/g, ' ')}</div>
                                <div className="truncate font-medium text-gray-800">
                                  {typeof value === 'string' && value.startsWith('http') ? (
                                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                                      {value.replace('https://', '')}
                                    </a>
                                  ) : String(value)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Distribution Status */}
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Distribution Status</h3>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${selectedLead.sold ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm font-medium">
                      {selectedLead.sold 
                        ? `Sold to ${selectedLead.buyer_email || 'Buyer'} for ${formatCurrency(selectedLead.sale_amount || 0)}` 
                        : selectedLead.keep_or_sell === 'sell' ? 'Waiting for buyer' : 'Internal Lead (Keep)'}
                    </span>
                  </div>
                </div>

                {/* Status */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Lead Status</h3>
                <div className="flex flex-wrap gap-2">
                  {LEAD_STATUSES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleStatusChange(selectedLead.id, s.value)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedLead.lead_status === s.value
                          ? s.color + ' ring-2 ring-offset-1 ring-gray-400'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Admin Notes</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="form-input flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  />
                  <button onClick={handleAddNote} className="btn-primary">
                    Add
                  </button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {leadNotes.length === 0 ? (
                    <p className="text-sm text-gray-400">No notes yet.</p>
                  ) : (
                    leadNotes.map((note) => (
                      <div key={note.id} className="bg-gray-50 rounded p-3">
                        <p className="text-sm text-gray-700">{note.note}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {note.author} • {formatDate(note.created_at)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedLead.pdf_url && (
                  <a
                    href={selectedLead.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    View PDF
                  </a>
                )}
                {!selectedLead.sold && selectedLead.keep_or_sell === 'sell' && (
                  <button
                    onClick={() => setShowSellModal(true)}
                    className="btn-primary"
                  >
                    Mark as Sold
                  </button>
                )}
              </div>
            </div>
            <div className="md:hidden divide-y divide-gray-200">
              {variants.length === 0 ? (
                <p className="py-6 text-center text-gray-500">No A/B variants configured.</p>
              ) : (
                variants.map((variant) => (
                  <div key={variant.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{variant.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{variant.variation_id}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          variant.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {variant.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                      <span>{variant.impressions.toLocaleString()} impressions</span>
                      <span className="text-gray-300">•</span>
                      <span>{variant.submissions.toLocaleString()} submissions</span>
                      <span className="text-gray-300">•</span>
                      <span>
                        {variant.impressions > 0
                          ? `${((variant.submissions / variant.impressions) * 100).toFixed(1)}%`
                          : '0%'}{' '}
                        conversion
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleToggleVariant(variant.variation_id, !variant.active)}
                        className="text-brand-600 text-sm"
                      >
                        {variant.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="md:hidden divide-y divide-gray-200">
              {variants.length === 0 ? (
                <p className="py-6 text-center text-gray-500">No A/B variants configured.</p>
              ) : (
                variants.map((variant) => (
                  <div key={variant.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900">{variant.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{variant.variation_id}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          variant.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {variant.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                      <span>{variant.impressions.toLocaleString()} impressions</span>
                      <span className="text-gray-300">•</span>
                      <span>{variant.submissions.toLocaleString()} submissions</span>
                      <span className="text-gray-300">•</span>
                      <span>
                        {variant.impressions > 0
                          ? `${((variant.submissions / variant.impressions) * 100).toFixed(1)}%`
                          : '0%'}{' '}
                        conversion
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleToggleVariant(variant.variation_id, !variant.active)}
                        className="text-brand-600 text-sm"
                      >
                        {variant.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Mark Lead as Sold</h3>
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
                  setSellAmount('');
                  setBuyerEmail('');
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

      {/* Save Filter Modal */}
      {showSaveFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Current Filter</h3>
            <div>
              <label className="form-label">Filter Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Enterprise + Urgent"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowSaveFilterModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveFilter} disabled={!newFilterName.trim()} className="btn-primary">
                Save Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
