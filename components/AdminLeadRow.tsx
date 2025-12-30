'use client';

import { useState } from 'react';

// Lead type definition
export interface Lead {
  id: string;
  company_name: string;
  email: string;
  industry: string;
  num_employees: number;
  lead_score: number;
  keep_or_sell: 'keep' | 'sell';
  readiness_score: number;
  estimated_cost_low: number;
  estimated_cost_high: number;
  pdf_url: string | null;
  email_sent: boolean;
  sold: boolean;
  sale_amount: number | null;
  created_at: string;
}

interface AdminLeadRowProps {
  lead: Lead;
  onResendEmail: (leadId: string) => Promise<void>;
  onMarkSold: (leadId: string, saleAmount: number, buyerEmail: string) => Promise<void>;
}

export default function AdminLeadRow({
  lead,
  onResendEmail,
  onMarkSold,
}: AdminLeadRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleAmount, setSaleAmount] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResendEmail(lead.id);
    } finally {
      setIsResending(false);
    }
  };

  const handleMarkSold = async () => {
    if (!saleAmount || !buyerEmail) return;
    await onMarkSold(lead.id, parseFloat(saleAmount), buyerEmail);
    setShowSaleModal(false);
    setSaleAmount('');
    setBuyerEmail('');
  };

  return (
    <>
      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <td className="font-medium text-gray-900">{lead.company_name}</td>
        <td className="text-gray-600">{lead.email}</td>
        <td className="capitalize">{lead.industry}</td>
        <td>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            lead.lead_score >= 7 ? 'bg-green-100 text-green-800' :
            lead.lead_score >= 4 ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {lead.lead_score}/10
          </span>
        </td>
        <td>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            lead.keep_or_sell === 'keep' ? 'bg-trust-500/10 text-trust-600' : 'bg-orange-100 text-orange-700'
          }`}>
            {lead.keep_or_sell}
          </span>
        </td>
        <td className="text-gray-600">{formatDate(lead.created_at)}</td>
        <td className="text-right" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-end gap-2">
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
            <button
              onClick={handleResend}
              disabled={isResending || !lead.pdf_url}
              className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              {isResending ? '...' : 'Resend'}
            </button>
            {!lead.sold && lead.keep_or_sell === 'sell' && (
              <button
                onClick={() => setShowSaleModal(true)}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Sell
              </button>
            )}
            {lead.sold && (
              <span className="text-xs text-green-600">
                Sold ${lead.sale_amount}
              </span>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Details Row */}
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Employees:</span>{' '}
                <span className="font-medium">{lead.num_employees}</span>
              </div>
              <div>
                <span className="text-gray-500">Readiness:</span>{' '}
                <span className="font-medium">{lead.readiness_score}%</span>
              </div>
              <div>
                <span className="text-gray-500">Est. Cost:</span>{' '}
                <span className="font-medium">
                  ${lead.estimated_cost_low.toLocaleString()} - ${lead.estimated_cost_high.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Email Sent:</span>{' '}
                <span className="font-medium">{lead.email_sent ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </td>
        </tr>
      )}

      {/* Sale Modal */}
      {showSaleModal && (
        <tr>
          <td colSpan={7}>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSaleModal(false)}>
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">Mark Lead as Sold</h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Sale Amount ($)</label>
                    <input
                      type="number"
                      value={saleAmount}
                      onChange={(e) => setSaleAmount(e.target.value)}
                      className="form-input"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="form-label">Buyer Email</label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="form-input"
                      placeholder="buyer@company.com"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowSaleModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMarkSold}
                    disabled={!saleAmount || !buyerEmail}
                    className="btn-primary"
                  >
                    Confirm Sale
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

