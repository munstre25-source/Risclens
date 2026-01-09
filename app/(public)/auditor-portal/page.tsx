'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Zap, Target, Lock, TrendingUp, AlertCircle, ChevronRight, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lead {
  id: string;
  company_name: string;
  industry: string;
  num_employees: number;
  readiness_score: number;
  lead_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  created_at: string;
  sold: boolean;
}

export default function AuditorPortal() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState<Record<string, string>>({});
  const [auditorEmail, setAuditorEmail] = useState('');
  const [showBidModal, setShowBidModal] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/admin/leads?keep_or_sell=sell&sold=false');
        const data = await res.json();
        if (data.success) {
          setLeads(data.leads || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const handlePlaceBid = async (leadId: string) => {
    if (!auditorEmail || !bidAmount[leadId]) {
      alert('Please provide your email and bid amount.');
      return;
    }

    try {
      const res = await fetch('/api/admin/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          auditor_email: auditorEmail,
          amount: parseFloat(bidAmount[leadId]),
        }),
      });

      if (res.ok) {
        alert('Bid placed successfully! We will contact you if accepted.');
        setShowBidModal(null);
      } else {
        alert('Failed to place bid.');
      }
    } catch (err) {
      alert('Error placing bid.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">Auditor Portal Beta</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Exclusive <span className="text-brand-600">Lead Auction</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Bid on pre-qualified, high-intent compliance leads. Anonymized data provided. Unlock contact info by winning the auction.
          </p>
        </div>

        <div className="grid gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))
          ) : leads.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No active auctions at the moment. Check back later.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">
                        ID: {lead.id.slice(0, 8)}
                      </span>
                      <span className="px-2 py-1 bg-brand-50 text-brand-700 text-[10px] font-bold uppercase rounded">
                        {lead.industry}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {lead.num_employees} Employee {lead.industry.toUpperCase()} Firm
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Readiness</p>
                        <p className="text-lg font-bold text-slate-900">{lead.readiness_score}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Intent Score</p>
                        <p className="text-lg font-bold text-emerald-600">{lead.lead_score}/10</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Budget Est.</p>
                        <p className="text-lg font-bold text-slate-900">${lead.estimated_cost_low.toLocaleString()}+</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                        <p className="text-lg font-bold text-brand-600">OPEN</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center gap-3 md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-6">
                    <button 
                      onClick={() => setShowBidModal(lead.id)}
                      className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <DollarSign className="w-4 h-4" />
                      Place Bid
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                      Winning bid unlocks full company profile & contact info.
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Enter Your Bid</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Auditor Email</label>
                <input 
                  type="email"
                  value={auditorEmail}
                  onChange={(e) => setAuditorEmail(e.target.value)}
                  placeholder="name@firm.com"
                  className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-500 outline-none transition-all font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bid Amount ($)</label>
                <input 
                  type="number"
                  value={bidAmount[showBidModal] || ''}
                  onChange={(e) => setBidAmount({ ...bidAmount, [showBidModal]: e.target.value })}
                  placeholder="500"
                  className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-brand-500 outline-none transition-all font-bold"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setShowBidModal(null)}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => handlePlaceBid(showBidModal)}
                className="flex-1 bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200"
              >
                Submit Bid
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </main>
  );
}
