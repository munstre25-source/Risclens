'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Shield, 
  Zap, 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  FileText, 
  Search,
  ChevronRight,
  Filter,
  Download,
  Save,
  CheckCircle2,
  Lock,
  Eye,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function LeadSkeleton() {
  return (
    <div className="p-4 animate-pulse space-y-3">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="h-3 w-24 bg-slate-50 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded-full" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="h-3 w-10 bg-slate-50 dark:bg-slate-800 rounded" />
          <div className="h-3 w-10 bg-slate-50 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-4 w-4 bg-slate-100 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

function RiskHeatmap() {
  const grid = Array.from({ length: 5 }, (_, r) => 
    Array.from({ length: 5 }, (_, c) => Math.floor(Math.random() * 5))
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
          <Shield className="h-4 w-4 text-brand-500" />
          Risk Exposure Heatmap
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Impact vs Probability</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5 aspect-square">
        {grid.flat().map((val, i) => {
          const intensity = val === 0 ? 'bg-slate-50 dark:bg-slate-800/50' :
                           val === 1 ? 'bg-emerald-500/20 dark:bg-emerald-500/10' :
                           val === 2 ? 'bg-yellow-500/30 dark:bg-yellow-500/20' :
                           val === 3 ? 'bg-orange-500/40 dark:bg-orange-500/30' :
                           'bg-red-500/50 dark:bg-red-500/40';
          return (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`rounded-sm ${intensity} hover:ring-2 ring-brand-500/50 transition-all cursor-crosshair relative group`}
            >
              {val > 3 && <div className="absolute inset-0 animate-pulse bg-red-500/20 rounded-sm" />}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        <span>Low Probability</span>
        <span>High Impact</span>
      </div>
    </div>
  );
}

function LivePulse({ leads }: { leads: Lead[] }) {
  const events = useMemo(() => {
    return leads.slice(0, 8).map(lead => ({
      id: lead.id,
      type: lead.lead_score > 7 ? 'CRITICAL' : 'INFO',
      message: `New intelligence target identified: ${lead.company_name}`,
      time: formatRelativeTime(lead.created_at),
      industry: lead.industry
    }));
  }, [leads]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
          <Activity className="h-4 w-4 text-emerald-500" />
          Live Pulse
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Streaming</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {events.map((event, i) => (
          <motion.div
            key={event.id + i}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                event.type === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-300 dark:bg-slate-600'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {event.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                    {event.time}
                  </span>
                  <span className="text-[10px] font-bold text-brand-500/80 uppercase tracking-tighter">
                    #{event.industry}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ 
  label, 
  value, 
  trend, 
  icon: Icon, 
  colorClass 
}: { 
  label: string; 
  value: string | number; 
  trend?: { val: string, positive: boolean }; 
  icon: any; 
  colorClass: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
          <Icon className={`h-5 w-5 ${colorClass.replace('bg-', 'text-')}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
            trend.positive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' : 'text-red-600 bg-red-50 dark:bg-red-500/10'
          }`}>
            {trend.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {trend.val}
          </div>
        )}
      </div>
      <div>
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{value}</div>
      </div>
    </div>
  );
}

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

function MetricSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="w-12 h-5 bg-slate-50 dark:bg-slate-800 rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[350px] animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="flex gap-4">
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
        </div>
      </div>
      <div className="h-[80%] w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl mt-4" />
    </div>
  );
}

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
  const [leadMatches, setLeadMatches] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loadingEnrichment, setLoadingEnrichment] = useState(false);
  const [loadingMatches, setLoadingMatches] = useState(false);

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
    setLoadingMatches(true);
    
    // Fetch notes, enrichment and matches for this lead
    const token = getAdminToken();
    try {
      const [notesRes, enrichmentRes, matchesRes] = await Promise.all([
        fetch(`/api/admin/leads/${lead.id}/notes`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch(`/api/admin/leads/${lead.id}/enrichment`, {
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include',
        }),
        fetch(`/api/admin/leads/${lead.id}/best-match`, {
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
      if (matchesRes.ok) {
        const data = await matchesRes.json();
        setLeadMatches(data.matches || []);
      }
    } catch {
      // Ignore errors
    } finally {
      setLoadingEnrichment(false);
      setLoadingMatches(false);
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
      <div className="max-w-7xl mx-auto py-4">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Enhanced Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading || !metrics ? (
            Array.from({ length: 4 }).map((_, i) => <MetricSkeleton key={i} />)
          ) : (
            <>
              <MetricCard 
                label="Intelligence Targets" 
                value={metrics.total_leads} 
                trend={{ val: '12%', positive: true }}
                icon={Target}
                colorClass="bg-blue-500"
              />
              <MetricCard 
                label="Compliance Index" 
                value={`${metrics.avg_readiness_score}%`} 
                trend={{ val: '5%', positive: true }}
                icon={ShieldCheck}
                colorClass="bg-emerald-500"
              />
              <MetricCard 
                label="Mitigation Value" 
                value={formatCurrency(metrics.total_revenue)} 
                trend={{ val: '8%', positive: true }}
                icon={TrendingUp}
                colorClass="bg-brand-500"
              />
              <MetricCard 
                label="Urgent Risks" 
                value={`${metrics.pct_urgent}%`} 
                trend={{ val: '2%', positive: false }}
                icon={AlertCircle}
                colorClass="bg-red-500"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <ChartSkeleton />
            ) : (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-[350px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-brand-500" />
                    Readiness Trend
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-brand-500" />
                      Target Score
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                      Actual Score
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={[
                    { name: 'Jan', score: 45, target: 50 },
                    { name: 'Feb', score: 52, target: 55 },
                    { name: 'Mar', score: 48, target: 60 },
                    { name: 'Apr', score: 61, target: 65 },
                    { name: 'May', score: 68, target: 70 },
                    { name: 'Jun', score: 75, target: 75 },
                  ]}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f033" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                      itemStyle={{ color: '#0ea5e9' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#0ea5e9" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#cbd5e1" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="none"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RiskHeatmap />
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Zap className="h-4 w-4 text-amber-500" />
                  System Health
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Intelligence Engine', status: 'Optimal', val: 98 },
                    { label: 'PDF Generator', status: 'Standby', val: 100 },
                    { label: 'Market API', status: 'Active', val: 94 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">{item.status}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.val}%` }}
                          className="h-full bg-brand-500" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* A/B Testing Section */}
            <div className="mt-8">
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
          </div>

          <div className="space-y-6">
            <LivePulse leads={leads} />
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-brand-500" />
                  A/B Performance
                </h3>
              </div>
              <div className="space-y-4">
                {variants.length === 0 ? (
                  <p className="text-gray-500">No A/B variants configured.</p>
                ) : (
                  variants.map((variant) => (
                    <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-xs font-bold text-gray-900 uppercase">{variant.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase">{variant.variation_id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-brand-600">
                          {variant.impressions > 0
                            ? `${((variant.submissions / variant.impressions) * 100).toFixed(1)}%`
                            : '0%'}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase">Conv. Rate</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

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

                {/* Context Note */}
                {selectedLead.context_note && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Context Note</h3>
                    <p className="text-sm text-blue-800 italic">"{selectedLead.context_note}"</p>
                  </div>
                )}

                {/* Lead Enrichment */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Market Intelligence (Enrichment)</h3>
                  {loadingEnrichment ? (
                    <div className="flex gap-2 animate-pulse">
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                      <div className="h-4 w-20 bg-gray-100 rounded" />
                    </div>
                  ) : leadEnrichment.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">No external signals found.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {leadEnrichment.map((signal, idx) => (
                        <span key={idx} className="px-2 py-1 bg-brand-50 text-brand-700 text-[10px] font-bold uppercase rounded border border-brand-100">
                          {signal.signal_type}: {signal.signal_value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Best Matches */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Top Buyer Matches</h3>
                  {loadingMatches ? (
                    <div className="space-y-2">
                      <div className="h-10 w-full bg-gray-50 rounded animate-pulse" />
                      <div className="h-10 w-full bg-gray-50 rounded animate-pulse" />
                    </div>
                  ) : leadMatches.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">No buyer matches found for this profile.</p>
                  ) : (
                    <div className="space-y-3">
                      {leadMatches.map((match, idx) => (
                        <div key={idx} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-brand-200 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-xs font-bold text-gray-400 uppercase">Buyer {idx + 1}</span>
                              <div className="text-sm font-semibold text-gray-900">{match.buyer_name || 'Anonymous Buyer'}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-emerald-600 uppercase">Match Score</div>
                              <div className="text-lg font-black text-emerald-600">{(match.match_score * 100).toFixed(0)}%</div>
                            </div>
                          </div>
                          <ul className="text-[10px] text-gray-500 space-y-0.5 mb-3">
                            {match.match_reasons.map((reason: string, rIdx: number) => (
                              <li key={rIdx} className="flex items-center gap-1">
                                <span className="text-emerald-500">✓</span> {reason}
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => {
                              setBuyerEmail(match.buyer_id);
                              setSellAmount(match.max_price.toString());
                              setShowSellModal(true);
                            }}
                            className="w-full py-1.5 bg-brand-600 text-white text-[10px] font-bold rounded-lg hover:bg-brand-700 transition-colors"
                          >
                            Sell Lead for ${match.max_price}
                          </button>
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
    </div>
  );
}


