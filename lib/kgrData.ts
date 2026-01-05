export interface KGRKeyword {
  id: string;
  keyword: string;
  monthlyVolume: number;
  allInTitle: number;
  lastUpdated: string;
}

export const initialKGRKeywords: KGRKeyword[] = [
  { id: '1', keyword: 'soc 2 cost for 5-10 employees', monthlyVolume: 150, allInTitle: 12, lastUpdated: '2026-01-05' },
  { id: '2', keyword: 'soc 2 timeline for fintech', monthlyVolume: 90, allInTitle: 8, lastUpdated: '2026-01-05' },
  { id: '3', keyword: 'vanta vs drata pricing', monthlyVolume: 400, allInTitle: 85, lastUpdated: '2026-01-05' },
  { id: '4', keyword: 'auditor fees explained soc 2', monthlyVolume: 110, allInTitle: 15, lastUpdated: '2026-01-05' },
  { id: '5', keyword: 'soc 2 compliance cost for small business', monthlyVolume: 250, allInTitle: 40, lastUpdated: '2026-01-05' },
];

export function calculateKGR(allInTitle: number, monthlyVolume: number): number {
  if (monthlyVolume === 0) return 0;
  return allInTitle / monthlyVolume;
}

export function getKGRColor(kgr: number): string {
  if (kgr < 0.25) return 'text-green-600 font-bold';
  if (kgr < 1.0) return 'text-amber-600';
  return 'text-red-600';
}

export function getKGRStatus(kgr: number): string {
  if (kgr < 0.25) return 'Great (Golden)';
  if (kgr < 1.0) return 'Maybe';
  return 'Bad';
}
