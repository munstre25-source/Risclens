'use client';

import { useState } from 'react';
import Link from 'next/link';

type Platform = 'Vanta' | 'Drata' | 'Secureframe' | 'Thoropass' | 'Sprinto';

interface Recommendation {
  platform: Platform;
  reason: string;
  link: string;
}

export default function PlatformSelector() {
  const [step, setStep] = useState(1);
  const [employees, setEmployees] = useState('');
  const [priority, setPriority] = useState('');
  const [auditor, setAuditor] = useState('');
  const [result, setResult] = useState<Recommendation | null>(null);

  const handleCalculate = () => {
    let recommendation: Recommendation;

    if (auditor === 'bundled') {
      recommendation = {
        platform: 'Thoropass',
        reason: 'You want the simplest experience. Thoropass bundles the platform and auditor in one contract, removing the friction of finding a separate firm.',
        link: '/compare/thoropass-vs-vanta'
      };
    } else if (employees === '1-50' && priority === 'speed') {
      recommendation = {
        platform: 'Sprinto',
        reason: 'You are an early-stage team that needs to move fast. Sprinto specializes in rapid onboarding and highly automated evidence collection for SaaS startups.',
        link: '/compare/sprinto-vs-vanta'
      };
    } else if (employees === '500+' || priority === 'customization') {
      recommendation = {
        platform: 'Drata',
        reason: 'You need enterprise-grade scale and deep customization. Drata is preferred by larger organizations for its robust policy management and custom control mapping.',
        link: '/compare/vanta-vs-drata'
      };
    } else if (priority === 'support') {
      recommendation = {
        platform: 'Secureframe',
        reason: 'You want expert guidance. Secureframe is known for its "white-glove" support, providing dedicated compliance managers to help you through the audit.',
        link: '/compare/secureframe-vs-vanta'
      };
    } else {
      recommendation = {
        platform: 'Vanta',
        reason: 'The gold standard. Vanta offers the widest range of integrations and the most mature platform for teams that want a reliable, automation-first approach.',
        link: '/compare/vanta-vs-drata'
      };
    }

    setResult(recommendation);
    setStep(4);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-900">Compliance Platform Matcher</h3>
        <p className="text-sm text-slate-500">Find the right tool for your specific needs in 30 seconds.</p>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <p className="font-medium text-slate-900">How many employees are in your organization?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['1-50', '51-200', '201-500', '500+'].map((range) => (
                <button
                  key={range}
                  onClick={() => { setEmployees(range); setStep(2); }}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-left hover:border-brand-500 hover:bg-brand-50 transition-all text-slate-700 font-medium"
                >
                  {range} employees
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <p className="font-medium text-slate-900">What is your primary goal?</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'speed', label: 'Speed & Simplicity', desc: 'Get audit-ready as fast as possible' },
                { id: 'customization', label: 'Customization & Scale', desc: 'Complex controls and enterprise features' },
                { id: 'support', label: 'Expert Support', desc: 'Need hands-on help from compliance experts' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setPriority(p.id); setStep(3); }}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-left hover:border-brand-500 hover:bg-brand-50 transition-all"
                >
                  <p className="font-bold text-slate-900">{p.label}</p>
                  <p className="text-xs text-slate-500">{p.desc}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-brand-600">← Back</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <p className="font-medium text-slate-900">Do you already have an external auditor?</p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'none', label: 'No, I need one', desc: 'Help me find an auditor' },
                { id: 'bundled', label: 'I want it all bundled', desc: 'One contract for platform + auditor' },
                { id: 'yes', label: 'Yes, I have one', desc: 'I want to use my own firm' },
              ].map((a) => (
                <button
                  key={a.id}
                  onClick={() => { setAuditor(a.id); handleCalculate(); }}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-left hover:border-brand-500 hover:bg-brand-50 transition-all"
                >
                  <p className="font-bold text-slate-900">{a.label}</p>
                  <p className="text-xs text-slate-500">{a.desc}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="text-sm text-slate-500 hover:text-brand-600">← Back</button>
          </div>
        )}

        {step === 4 && result && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 text-3xl font-bold mb-2">
              {result.platform.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-600 uppercase tracking-widest">Your Best Match</p>
              <h4 className="text-3xl font-extrabold text-slate-900 mt-1">{result.platform}</h4>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">
              {result.reason}
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <Link 
                href={result.link}
                className="bg-brand-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200"
              >
                Compare {result.platform} →
              </Link>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-slate-500 hover:text-brand-600"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
