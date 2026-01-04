import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';

export async function POST(request: NextRequest) {
  try {
    const samples = [
      {
        leadType: 'soc2_readiness',
        email: 'soc2-test@example.com',
        company: 'Test Co',
        payload: { source: 'test-mode', tool: 'soc2' },
        derived: { readinessScore: 72, estimatedCostLow: 18000, estimatedCostHigh: 32000, leadScore: 70, keepOrSell: 'keep' as const, isTest: true },
      },
      {
        leadType: 'pentest_estimate',
        email: 'pentest-test@example.com',
        company: 'Pentest Testers',
        payload: { source: 'test-mode', tool: 'pentest' },
        derived: { isTest: true },
      },
      {
        leadType: 'vendor_risk_assessment',
        email: 'vra-test@example.com',
        company: 'Vendor Test LLC',
        payload: { source: 'test-mode', tool: 'vra' },
        derived: { score: 58, leadScore: 58, isTest: true },
      },
    ];

    for (const sample of samples) {
      const res = await createLead({
        email: sample.email,
        company: sample.company,
        leadType: sample.leadType,
        payload: sample.payload,
        derivedFields: { ...sample.derived, contextNote: 'Test mode seed' },
      });
      if (!res.ok) {
        throw new Error(`Failed to seed ${sample.leadType}: ${res.error}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Test seed error', error);
    return NextResponse.json({ success: false, error: 'seed_failed' }, { status: 500 });
  }
}
