'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Users, 
  Building2, 
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

interface MatrixExplorerProps {
  frameworks: { name: string; slug: string }[];
  roles: { name: string; slug: string }[];
  industries: { name: string; slug: string }[];
  decisions?: { name: string; slug: string }[];
}

export function MatrixExplorer({ frameworks, roles, industries, decisions = [] }: MatrixExplorerProps) {
  const router = useRouter();
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]?.slug || '');
  const [selectedRole, setSelectedRole] = useState(roles[0]?.slug || '');
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]?.slug || '');
  const [mode, setMode] = useState<'role' | 'decision'>('role');
  const [selectedDecision, setSelectedDecision] = useState(decisions[0]?.slug || '');

  const handleExplore = () => {
    let path = '';
    if (mode === 'role') {
      path = `/${selectedFramework}/for/${selectedRole}/${selectedIndustry}`;
    } else {
      path = `/${selectedFramework}/${selectedDecision}/${selectedIndustry}`;
    }
    router.push(path);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-4">
              <Sparkles className="w-3 h-3 text-brand-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-100">Matrix Explorer v2.0</span>
            </div>
            <h2 className="text-3xl font-black mb-2 tracking-tight">Generate Your Compliance Roadmap</h2>
            <p className="text-slate-400 font-medium">Configure your specific context to unlock tailored intelligence.</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Selection */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Shield className="w-4 h-4 text-brand-600" />
                1. Select Standard
              </label>
              <div className="grid grid-cols-1 gap-2">
                {frameworks.map((f) => (
                  <button
                    key={f.slug}
                    onClick={() => setSelectedFramework(f.slug)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all text-left ${
                      selectedFramework === f.slug
                        ? 'border-brand-600 bg-brand-50 text-brand-900 ring-4 ring-brand-500/5'
                        : 'border-slate-100 hover:border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold">{f.name}</span>
                    {selectedFramework === f.slug && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Context Selection (Role or Decision) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Users className="w-4 h-4 text-brand-600" />
                  2. Your Perspective
                </label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setMode('role')}
                    className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${mode === 'role' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                  >ROLE</button>
                  <button 
                    onClick={() => setMode('decision')}
                    className={`px-2 py-1 text-[10px] font-black rounded-md transition-all ${mode === 'decision' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                  >TOPIC</button>
                </div>
              </div>
              
              <select 
                value={mode === 'role' ? selectedRole : selectedDecision}
                onChange={(e) => mode === 'role' ? setSelectedRole(e.target.value) : setSelectedDecision(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 font-bold text-slate-900 appearance-none cursor-pointer"
              >
                {(mode === 'role' ? roles : decisions).map((item) => (
                  <option key={item.slug} value={item.slug}>{item.name}</option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 font-medium px-1">
                {mode === 'role' 
                  ? "Select your job function to see how compliance impacts your specific responsibilities." 
                  : "Select a specific business topic or decision point for deep-dive analysis."}
              </p>
            </div>

            {/* Industry Selection */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                <Building2 className="w-4 h-4 text-brand-600" />
                3. Market Segment
              </label>
              <div className="relative">
                <select 
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 font-bold text-slate-900 appearance-none cursor-pointer"
                >
                  {industries.map((i) => (
                    <option key={i.slug} value={i.slug}>{i.name}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {industries.slice(0, 4).map((i) => (
                  <button
                    key={i.slug}
                    onClick={() => setSelectedIndustry(i.slug)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${
                      selectedIndustry === i.slug
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {i.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleExplore}
            className="w-full mt-12 bg-brand-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 flex items-center justify-center gap-3 group"
          >
            Generate Custom Roadmap
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center mt-6 text-slate-400 text-sm font-medium">
            Instantly mapping over <span className="text-slate-900 font-bold">1,240+</span> contextual intelligence nodes.
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
        {[
          { label: 'Verified Auditors', val: '400+' },
          { label: 'Security Signals', val: '12k+' },
          { label: 'Role Contexts', val: '40+' },
          { label: 'Update Frequency', val: '24h' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-black text-slate-900">{stat.val}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
