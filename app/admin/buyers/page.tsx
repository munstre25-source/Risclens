'use client';

import { useState, useEffect } from 'react';
import { Buyer, BuyerWebhook } from '@/lib/supabase';

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [webhooks, setWebhooks] = useState<BuyerWebhook[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWebhookModalOpen, setIsWebhookModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Buyer>>({
    name: '',
    contact_email: '',
    company_name: '',
    active: true,
    lead_types: ['soc2'],
    min_score: 0,
    max_price_per_lead: 0,
  });
  const [webhookFormData, setWebhookFormData] = useState<Partial<BuyerWebhook>>({
    url: '',
    secret_header: 'X-Lead-Secret',
    secret_value: '',
    is_active: true,
  });

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const res = await fetch('/api/admin/buyers');
      if (!res.ok) throw new Error('Failed to fetch buyers');
      const data = await res.json();
      setBuyers(data.buyers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading buyers');
    } finally {
      setLoading(false);
    }
  };

  const fetchWebhooks = async (buyerId: string) => {
    try {
      const res = await fetch(`/api/admin/buyers/${buyerId}/webhooks`);
      if (!res.ok) throw new Error('Failed to fetch webhooks');
      const data = await res.json();
      setWebhooks(data.webhooks || []);
    } catch (err) {
      console.error('Webhook fetch error:', err);
    }
  };

  const handleSaveBuyer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/buyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to save buyer');
      await fetchBuyers();
      setIsModalOpen(false);
      setFormData({ name: '', contact_email: '', company_name: '', active: true, lead_types: ['soc2'], min_score: 0, max_price_per_lead: 0 });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error saving buyer');
    }
  };

  const handleDeleteBuyer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this buyer?')) return;
    try {
      const res = await fetch(`/api/admin/buyers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete buyer');
      await fetchBuyers();
      if (selectedBuyer?.id === id) setSelectedBuyer(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting buyer');
    }
  };

  const handleSaveWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuyer) return;
    try {
      const res = await fetch(`/api/admin/buyers/${selectedBuyer.id}/webhooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookFormData),
      });
      if (!res.ok) throw new Error('Failed to save webhook');
      await fetchWebhooks(selectedBuyer.id);
      setIsWebhookModalOpen(false);
      setWebhookFormData({ url: '', secret_header: 'X-Lead-Secret', secret_value: '', is_active: true });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error saving webhook');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading buyers...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Buyer Management</h1>
        <button
          onClick={() => {
            setFormData({ name: '', contact_email: '', company_name: '', active: true, lead_types: ['soc2'], min_score: 0, max_price_per_lead: 0 });
            setIsModalOpen(true);
          }}
          className="btn-primary"
        >
          Add New Buyer
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Buyer List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card overflow-hidden p-0">
            <table className="admin-table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Lead types</th>
                  <th>Min Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buyers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">No buyers found.</td>
                  </tr>
                ) : (
                  buyers.map((buyer) => (
                    <tr
                      key={buyer.id}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedBuyer?.id === buyer.id ? 'bg-brand-50' : ''}`}
                      onClick={() => {
                        setSelectedBuyer(buyer);
                        fetchWebhooks(buyer.id);
                      }}
                    >
                      <td className="font-medium">{buyer.name}</td>
                      <td className="text-sm text-gray-600">{buyer.contact_email}</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${buyer.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {buyer.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-xs">{buyer.lead_types?.join(', ') || 'None'}</td>
                      <td>{buyer.min_score}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setFormData(buyer);
                              setIsModalOpen(true);
                            }}
                            className="text-brand-600 hover:text-brand-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBuyer(buyer.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Webhook & Detail Panel */}
        <div className="space-y-4">
          {selectedBuyer ? (
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-900">{selectedBuyer.name} Webhooks</h2>
                <button
                  onClick={() => setIsWebhookModalOpen(true)}
                  className="text-sm text-brand-600 font-medium"
                >
                  + Add Webhook
                </button>
              </div>
              
              <div className="space-y-3">
                {webhooks.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No webhooks configured.</p>
                ) : (
                  webhooks.map((webhook) => (
                    <div key={webhook.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-1">
                        <div className="truncate flex-1 pr-2">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${webhook.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-sm font-mono text-gray-600">{webhook.url}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">Header: {webhook.secret_header}</span>
                        <button
                          onClick={async () => {
                            if (!confirm('Delete this webhook?')) return;
                            await fetch(`/api/admin/buyers/${selectedBuyer.id}/webhooks?id=${webhook.id}`, { method: 'DELETE' });
                            fetchWebhooks(selectedBuyer.id);
                          }}
                          className="text-xs text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Pricing & Filters</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Max Price:</span>
                    <span className="ml-2 font-medium">${selectedBuyer.max_price_per_lead}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Min Score:</span>
                    <span className="ml-2 font-medium">{selectedBuyer.min_score}/10</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card h-full flex items-center justify-center text-gray-400 p-8 text-center">
              Select a buyer to view webhooks and configuration.
            </div>
          )}
        </div>
      </div>

      {/* Buyer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold mb-6">{formData.id ? 'Edit Buyer' : 'Add New Buyer'}</h2>
            <form onSubmit={handleSaveBuyer} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Company (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.company_name || ''}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Min Lead Score</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.min_score}
                    onChange={(e) => setFormData({ ...formData, min_score: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="form-label">Max Price ($)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.max_price_per_lead}
                    onChange={(e) => setFormData({ ...formData, max_price_per_lead: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    />
                    <span className="text-sm font-medium text-gray-700">Active (Accepting leads)</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Buyer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Webhook Modal */}
      {isWebhookModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-6">Add Delivery Webhook</h2>
            <form onSubmit={handleSaveWebhook} className="space-y-4">
              <div>
                <label className="form-label">Endpoint URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://api.partner.com/leads"
                  className="form-input"
                  value={webhookFormData.url}
                  onChange={(e) => setWebhookFormData({ ...webhookFormData, url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Secret Header</label>
                  <input
                    type="text"
                    className="form-input"
                    value={webhookFormData.secret_header}
                    onChange={(e) => setWebhookFormData({ ...webhookFormData, secret_header: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Secret Value</label>
                  <input
                    type="password"
                    className="form-input"
                    value={webhookFormData.secret_value || ''}
                    onChange={(e) => setWebhookFormData({ ...webhookFormData, secret_value: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setIsWebhookModalOpen(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Add Webhook</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
