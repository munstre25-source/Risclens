'use client';

import { useState } from 'react';
import { initialKGRKeywords, calculateKGR, getKGRColor, getKGRStatus, KGRKeyword } from '@/lib/kgrData';

export default function KGRTrackerPage() {
  const [keywords, setKeywords] = useState<KGRKeyword[]>(initialKGRKeywords);
  const [newKeyword, setNewKeyword] = useState('');
  const [volume, setVolume] = useState('');
  const [allInTitle, setAllInTitle] = useState('');

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword || !volume || !allInTitle) return;

    const newItem: KGRKeyword = {
      id: Math.random().toString(36).substr(2, 9),
      keyword: newKeyword,
      monthlyVolume: parseInt(volume),
      allInTitle: parseInt(allInTitle),
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setKeywords([newItem, ...keywords]);
    setNewKeyword('');
    setVolume('');
    setAllInTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">KGR Tracker</h1>
        <p className="text-sm text-slate-500">Keyword Golden Ratio Dashboard</p>
      </div>

      <div className="card p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Keyword</h2>
        <form onSubmit={handleAddKeyword} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Keyword</label>
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              placeholder="e.g. soc 2 for fintech startups"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Vol (Monthly)</label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              placeholder="150"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 uppercase mb-1">AllInTitle</label>
              <input
                type="number"
                value={allInTitle}
                onChange={(e) => setAllInTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                placeholder="10"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <div className="card overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-900">Keyword</th>
              <th className="px-6 py-3 font-semibold text-slate-900">Vol</th>
              <th className="px-6 py-3 font-semibold text-slate-900">AllInTitle</th>
              <th className="px-6 py-3 font-semibold text-slate-900">KGR</th>
              <th className="px-6 py-3 font-semibold text-slate-900">Status</th>
              <th className="px-6 py-3 font-semibold text-slate-900 text-right">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {keywords.map((item) => {
              const kgr = calculateKGR(item.allInTitle, item.monthlyVolume);
              return (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.keyword}</td>
                  <td className="px-6 py-4 text-slate-600">{item.monthlyVolume}</td>
                  <td className="px-6 py-4 text-slate-600">{item.allInTitle}</td>
                  <td className={`px-6 py-4 ${getKGRColor(kgr)}`}>{kgr.toFixed(3)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      kgr < 0.25 ? 'bg-green-100 text-green-700' : 
                      kgr < 1.0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {getKGRStatus(kgr)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-right">{item.lastUpdated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-100 p-4 rounded-xl space-y-1">
          <p className="text-xs font-bold text-green-800 uppercase">Golden Ratio (&lt; 0.25)</p>
          <p className="text-sm text-green-700">Highest priority. You should be able to rank for these keywords almost instantly with high-quality content.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl space-y-1">
          <p className="text-xs font-bold text-amber-800 uppercase">Potential (0.25 - 1.0)</p>
          <p className="text-sm text-amber-700">Moderate priority. These keywords require some backlinks or better content depth to rank on page 1.</p>
        </div>
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl space-y-1">
          <p className="text-xs font-bold text-red-800 uppercase">Competitive (&gt; 1.0)</p>
          <p className="text-sm text-red-700">Lowest priority for small sites. These terms have high competition and will be difficult to rank for initially.</p>
        </div>
      </div>
    </div>
  );
}
