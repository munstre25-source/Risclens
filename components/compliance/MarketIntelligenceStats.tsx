'use client';

import React from 'react';

interface StatsProps {
  totalCompanies: number;
  avgScore: number;
  highTrustCount: number;
  lastUpdated: string;
}

export function MarketIntelligenceStats({ totalCompanies, avgScore, highTrustCount, lastUpdated }: StatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Market Coverage</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-gray-900">{totalCompanies}</span>
          <span className="text-xs text-green-600 font-bold mb-1">Profiles</span>
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ecosystem Avg</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-blue-600">{Math.round(avgScore)}</span>
          <span className="text-xs text-gray-500 font-bold mb-1">Signal Score</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">High Transparency</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-black text-green-600">{highTrustCount}</span>
          <span className="text-xs text-gray-500 font-bold mb-1">Elite Tier</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Intelligence Feed</p>
        <div className="flex items-end gap-2">
          <span className="text-sm font-bold text-gray-700">Live Updates</span>
          <span className="text-[10px] text-gray-400 font-medium mb-0.5 ml-auto">Updated {new Date(lastUpdated).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
