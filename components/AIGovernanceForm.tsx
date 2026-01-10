'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Cpu, Shield, Users, Database, Layout } from 'lucide-react';

const MODEL_COMPLEXITY = [
  { value: 'api_only', label: 'API-only (OpenAI/Anthropic)', icon: <Layout className="w-4 h-4" /> },
  { value: 'fine_tuned', label: 'Fine-tuned / RAG', icon: <Cpu className="w-4 h-4" /> },
  { value: 'custom_trained', label: 'Custom Trained Models', icon: <Database className="w-4 h-4" /> },
];

const RISK_PROFILE = [
  { value: 'internal', label: 'Internal Productivity only', icon: <Users className="w-4 h-4" /> },
  { value: 'customer_facing', label: 'Customer-facing AI', icon: <Layout className="w-4 h-4" /> },
  { value: 'high_stakes', label: 'High-stakes (Finance/Medical)', icon: <Shield className="w-4 h-4" /> },
];

const GOVERNANCE = [
  { value: 'none', label: 'No formal policy' },
  { value: 'policy_only', label: 'Acceptable Use Policy exists' },
  { value: 'full_aims', label: 'Integrated AIMS' },
];

export default function AIGovernanceForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    modelComplexity: '',
    aiRiskProfile: '',
    governanceMaturity: '',
    companySize: 10,
    dataPrivacy: 'anonymized',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/iso42001-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setResults(data.results);
        trackEvent('iso42001_completed', { score: data.results.readiness_score });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (results) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="text-center p-8 bg-brand-50 rounded-2xl border border-brand-100">
          <div className="text-6xl font-bold text-brand-600 mb-2">{results.readiness_score}%</div>
          <div className="text-xl font-bold text-slate-900">AI Readiness Index</div>
          <p className="text-slate-600 mt-2">Band: <span className="font-bold text-brand-700">{results.band}</span></p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-white border border-slate-200 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-600" />
              Strategic Recommendations
            </h3>
            <ul className="space-y-3">
              {results.recommendations.map((rec: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="text-brand-600 font-bold">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
            <div className="p-6 bg-slate-900 text-white rounded-xl">
              <h3 className="font-bold mb-4">Estimated Certification Cost</h3>
              <div className="text-3xl font-bold text-brand-400">
                ${results.estimated_cost_low.toLocaleString()} - ${results.estimated_cost_high.toLocaleString()}
              </div>
              <p className="text-slate-400 text-sm mt-2">Includes auditor engagement, platform readiness, and AIMS documentation.</p>
              <button 
                onClick={() => window.open(`/api/generate-pdf?lead_id=${results.lead_id}&type=iso42001`, '_blank')}
                className="w-full mt-6 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Get Full Roadmap PDF
              </button>
            </div>

        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900">Define your AI Stack</h2>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">AI Model Complexity</label>
            <div className="grid gap-3">
              {MODEL_COMPLEXITY.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, modelComplexity: opt.value })}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    formData.modelComplexity === opt.value 
                    ? 'border-brand-600 bg-brand-50 text-brand-700' 
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                  }`}
                >
                  {opt.icon}
                  <span className="font-bold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
          <button 
            type="button" 
            disabled={!formData.modelComplexity}
            onClick={() => setStep(2)}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl disabled:opacity-50"
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900">Risk & Governance</h2>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">AI Application Context</label>
            <div className="grid gap-3">
              {RISK_PROFILE.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, aiRiskProfile: opt.value })}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    formData.aiRiskProfile === opt.value 
                    ? 'border-brand-600 bg-brand-50 text-brand-700' 
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                  }`}
                >
                  {opt.icon}
                  <span className="font-bold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Existing Governance</label>
            <select 
              value={formData.governanceMaturity}
              onChange={(e) => setFormData({ ...formData, governanceMaturity: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 font-bold"
            >
              <option value="">Select maturity level</option>
              {GOVERNANCE.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-slate-200 text-slate-700 font-bold py-4 rounded-xl">Back</button>
            <button 
              type="button" 
              disabled={!formData.aiRiskProfile || !formData.governanceMaturity}
              onClick={() => setStep(3)}
              className="w-2/3 bg-slate-900 text-white font-bold py-4 rounded-xl disabled:opacity-50"
            >
              Final Step →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900">Final Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
              <input 
                type="text" 
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 font-bold"
                placeholder="Acme AI"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Work Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 font-bold"
                placeholder="you@acme.ai"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Company Size</label>
              <input 
                type="number" 
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: parseInt(e.target.value) })}
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-white text-slate-900 font-bold"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="w-1/3 bg-slate-200 text-slate-700 font-bold py-4 rounded-xl">Back</button>
            <button 
              type="submit" 
              disabled={isSubmitting || !formData.company_name || !formData.email}
              className="w-2/3 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? 'Calculating...' : 'Get My Index →'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
