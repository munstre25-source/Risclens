import { NextRequest, NextResponse } from 'next/server';
import { calculateLeadScore, generateRecommendations, ScoringInput } from '@/lib/scoring';

interface SubmitRequestBody {
  company_name: string;
  industry: string;
  num_employees: number;
  data_types: string[];
  planned_audit_date: string;
  role: string;
  utm_source?: string;
  variation_id?: string;
}

// POST /api/submit - Accept calculator form submission
export async function POST(request: NextRequest) {
  try {
    const body: SubmitRequestBody = await request.json();

    // Validate required fields
    if (
      !body.company_name ||
      !body.industry ||
      !body.num_employees ||
      !body.data_types ||
      !body.planned_audit_date ||
      !body.role
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build scoring input
    const scoringInput: ScoringInput = {
      num_employees: body.num_employees,
      audit_date: body.planned_audit_date,
      data_types: body.data_types,
      role: body.role,
    };

    // Calculate scores using lib/scoring.ts
    const scoringResult = calculateLeadScore(scoringInput);
    const recommendations = generateRecommendations(scoringInput, scoringResult);

    // Generate a simple lead ID (in production, this would be a database insert)
    const leadId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    return NextResponse.json({
      success: true,
      message: 'Submission processed successfully',
      lead_id: leadId,
      results: {
        readiness_score: scoringResult.readiness_score,
        estimated_cost_low: scoringResult.estimated_cost_low,
        estimated_cost_high: scoringResult.estimated_cost_high,
        recommendations: recommendations,
      },
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

