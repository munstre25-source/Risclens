import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { validateAdminAuth } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret));
    
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { targetPage, currentPerformance } = await request.json();
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({ success: false, error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const prompt = `
      You are an expert conversion rate optimization (CRO) specialist. 
      Analyze the performance of the following page and suggest 3 new A/B test variations (Headlines and CTA texts) to improve conversion.

      Page: ${targetPage}
      Current Performance: ${JSON.stringify(currentPerformance)}

      The goal is to increase the number of lead submissions from people viewing the results.
      
      Provide the suggestions in JSON format as an array of objects:
      [
        {
          "name": "Benefit-Driven Variant",
          "headline": "...",
          "cta_text": "..."
        },
        ...
      ]
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'system', content: 'You are a CRO expert.' }, { role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const result = await response.json();
    const suggestions = JSON.parse(result.choices[0].message.content).suggestions || JSON.parse(result.choices[0].message.content);

    return NextResponse.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('OODA Suggest error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate suggestions' }, { status: 500 });
  }
}
