import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const systemPrompt = `
      You are the RiscLens Compliance Copilot. Your goal is to help users understand compliance (SOC 2, ISO 27001, ISO 42001, HIPAA) and guide them towards using RiscLens calculators.
      
      Be professional, concise, and helpful. 
      If a user asks about readiness or costs, encourage them to use our specialized calculators.
      If the conversation goes on for more than 3 turns, suggest that you can generate a custom 15-page readiness report for them if they provide their email in the main calculator.
      
      RiscLens helps B2B teams:
      - Get an instant readiness score.
      - Estimate audit costs correctly.
      - Match with vetted auditors.
      - Build a technical roadmap for compliance.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Faster and cheaper for a public widget
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Copilot chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
