'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  accessLevelOptions,
  calculateVendorRisk,
  dataSensitivityOptions,
  dataVolumeOptions,
  incidentHistoryOptions,
  integrationTypeOptions,
  vendorCriticalityOptions,
  VendorRiskInput,
  VendorRiskResult,
} from '@/lib/vendorRisk';
import { VendorRiskResults } from './VendorRiskResults';

const COMPLIANCE_DRIVERS = [
  { value: 'soc2', label: 'SOC 2' },
  { value: 'iso27001', label: 'ISO 27001' },
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'gdpr', label: 'GDPR / Privacy' },
  { value: 'enterprise_sales', label: 'Enterprise Sales / Security Questionnaires' },
  { value: 'other', label: 'Other' },
];

const defaultInput: VendorRiskInput = {
  dataSensitivity: 'pii',
  accessLevel: 'api_scoped',
  vendorCriticality: 'important',
  integrationType: 'one_way',
  dataVolume: 'medium',
  hasSubprocessors: false,
  incidentHistory: 'none',
};

export function VendorRiskTriageForm() {
  const [inputs, setInputs] = useState<VendorRiskInput>(defaultInput);
  const [result, setResult] = useState<VendorRiskResult | null>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [complianceDriver, setComplianceDriver] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const calculated = useMemo(() => (result ? result : null), [result]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = calculateVendorRisk(inputs);
    setResult(next);
    setSubmitState('idle');
    setErrorMsg('');

    // Only capture if we have email/company (unlikely at this stage now)
    if (email && company) {
      try {
        fetch('/api/vendor-risk-assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            company,
            industry: complianceDriver,
            inputs,
            result: next,
            source_url: typeof window !== 'undefined' ? window.location.href : '',
          }),
        }).catch(console.error);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Data sensitivity</label>
            <select
              value={inputs.dataSensitivity}
              onChange={(e) => setInputs((prev) => ({ ...prev, dataSensitivity: e.target.value as VendorRiskInput['dataSensitivity'] }))}
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {dataSensitivityOptions.map((opt) => (
                <option key={opt.value as string} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Access level</label>
            <select
              value={inputs.accessLevel}
              onChange={(e) => setInputs((prev) => ({ ...prev, accessLevel: e.target.value as VendorRiskInput['accessLevel'] }))}
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {accessLevelOptions.map((opt) => (
                <option key={opt.value as string} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Vendor criticality</label>
            <select
              value={inputs.vendorCriticality}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, vendorCriticality: e.target.value as VendorRiskInput['vendorCriticality'] }))
              }
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {vendorCriticalityOptions.map((opt) => (
                <option key={opt.value as string} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Integration type</label>
            <select
              value={inputs.integrationType}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, integrationType: e.target.value as VendorRiskInput['integrationType'] }))
              }
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {integrationTypeOptions.map((opt) => (
                <option key={opt.value as string} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Data volume</label>
            <select
              value={inputs.dataVolume}
              onChange={(e) => setInputs((prev) => ({ ...prev, dataVolume: e.target.value as VendorRiskInput['dataVolume'] }))}
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {dataVolumeOptions.map((opt) => (
                <option key={opt.value as string} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Subprocessors involved?</label>
            <div className="flex gap-3">
              <button
                type="button"
                className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                  inputs.hasSubprocessors ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-700'
                }`}
                onClick={() => setInputs((prev) => ({ ...prev, hasSubprocessors: true }))}
              >
                Yes
              </button>
              <button
                type="button"
                className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                  !inputs.hasSubprocessors ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-700'
                }`}
                onClick={() => setInputs((prev) => ({ ...prev, hasSubprocessors: false }))}
              >
                No
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900">Incident history disclosed?</label>
            <select
              value={inputs.incidentHistory}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, incidentHistory: e.target.value as VendorRiskInput['incidentHistory'] }))
              }
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            >
              {incidentHistoryOptions.map((opt) => (
                <option key={opt.value as string} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
          >
            {calculated ? 'Update Triage' : 'Calculate Risk Score'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="text-xs text-slate-500">Guidance only — not legal advice or a guarantee.</p>
        </div>
      </form>

      {calculated && (
        <div className="space-y-4 animate-fade-in">
          <VendorRiskResults result={calculated} inputs={inputs} email={email} />
        </div>
      )}
    </div>
  );
}
