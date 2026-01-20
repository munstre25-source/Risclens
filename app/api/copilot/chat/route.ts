import { NextRequest, NextResponse } from 'next/server';

/**
 * PPC Chat (Pay-Per-Conversation) Engine
 * 
 * Implements micro-qualification to extract:
 * - Industry
 * - Employee count  
 * - Timeline/urgency
 * - Budget signals
 * 
 * Pattern interrupt at Turn 3 to offer lead magnet (15-page report)
 */

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface QualificationData {
  industry?: string;
  employeeCount?: number;
  timeline?: string;
  budgetSignal?: string;
  urgencyLevel?: 'low' | 'medium' | 'high';
  highIntentSignals?: string[];
}

// High-intent phrases that indicate buying intent
const HIGH_INTENT_PATTERNS = [
  /how much (does|will|would)/i,
  /what('s| is) the (cost|price|pricing)/i,
  /when (can|should|do) (we|i) (start|begin)/i,
  /need (by|before|within)/i,
  /deadline/i,
  /enterprise (customer|deal|contract)/i,
  /auditor (quote|recommendation)/i,
  /budget (for|to)/i,
  /timeline/i,
  /urgent/i,
  /asap/i,
  /quickly/i,
];

// Industry detection patterns
const INDUSTRY_PATTERNS: Record<string, RegExp[]> = {
  saas: [/saas/i, /software/i, /b2b/i, /platform/i, /cloud/i],
  fintech: [/fintech/i, /financial/i, /banking/i, /payments/i, /crypto/i],
  healthcare: [/health/i, /hipaa/i, /medical/i, /patient/i, /phi/i],
  ecommerce: [/ecommerce/i, /e-commerce/i, /retail/i, /store/i],
  ai: [/ai/i, /artificial intelligence/i, /machine learning/i, /llm/i, /gpt/i],
};

// Employee count extraction
const EMPLOYEE_PATTERNS = [
  /(\d+)\s*(employees|people|staff|team members)/i,
  /(small|startup|seed)/i, // ~1-20
  /(series a|growth)/i, // ~20-100
  /(series b|scale)/i, // ~100-500
  /(enterprise|large)/i, // 500+
];

function extractQualificationData(messages: ChatMessage[]): QualificationData {
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content).join(' ');
  const data: QualificationData = {
    highIntentSignals: [],
  };

  // Detect industry
  for (const [industry, patterns] of Object.entries(INDUSTRY_PATTERNS)) {
    if (patterns.some(p => p.test(userMessages))) {
      data.industry = industry;
      break;
    }
  }

  // Extract employee count
  const employeeMatch = userMessages.match(/(\d+)\s*(employees|people|staff|team)/i);
  if (employeeMatch) {
    data.employeeCount = parseInt(employeeMatch[1], 10);
  } else if (/small|startup|seed/i.test(userMessages)) {
    data.employeeCount = 15;
  } else if (/series a|growth/i.test(userMessages)) {
    data.employeeCount = 50;
  } else if (/series b|scale/i.test(userMessages)) {
    data.employeeCount = 200;
  } else if (/enterprise|large/i.test(userMessages)) {
    data.employeeCount = 500;
  }

  // Detect timeline/urgency
  if (/asap|urgent|immediately|this month/i.test(userMessages)) {
    data.timeline = '< 1 month';
    data.urgencyLevel = 'high';
  } else if (/next month|soon|2-3 months|quarter/i.test(userMessages)) {
    data.timeline = '1-3 months';
    data.urgencyLevel = 'medium';
  } else if (/next year|6 months|exploratory/i.test(userMessages)) {
    data.timeline = '6+ months';
    data.urgencyLevel = 'low';
  }

  // Detect high-intent signals
  for (const pattern of HIGH_INTENT_PATTERNS) {
    if (pattern.test(userMessages)) {
      data.highIntentSignals?.push(pattern.source);
    }
  }

  // Budget signals
  if (/budget|afford|cost/i.test(userMessages)) {
    const budgetMatch = userMessages.match(/\$?(\d{1,3}(?:,?\d{3})*(?:\.\d{2})?)\s*(?:k|K)?/);
    if (budgetMatch) {
      data.budgetSignal = budgetMatch[0];
    }
  }

  return data;
}

function generateSystemPrompt(turnCount: number, qualification: QualificationData): string {
  const basePrompt = `You are the RiscLens Compliance Copilot - a helpful, professional AI assistant for B2B compliance questions.

CORE CAPABILITIES:
- SOC 2 Type I/II readiness and costs
- ISO 27001 certification guidance  
- ISO 42001 (AI Management System) roadmaps
- HIPAA compliance for healthcare tech
- PCI DSS for payment processing
- Auditor selection and matching

CONVERSATION RULES:
1. Be concise but thorough. Aim for 2-3 sentences per response unless detail is needed.
2. Always end with a relevant follow-up question OR a clear CTA to our tools.
3. If you don't know something specific, recommend our calculators.
4. Use markdown formatting for lists and emphasis.`;

  // Add qualification context
  let qualificationContext = '';
  if (qualification.industry) {
    qualificationContext += `\n\nUSER CONTEXT: They appear to be in the ${qualification.industry} industry.`;
  }
  if (qualification.employeeCount) {
    qualificationContext += ` Company size: ~${qualification.employeeCount} employees.`;
  }
  if (qualification.urgencyLevel) {
    qualificationContext += ` Urgency: ${qualification.urgencyLevel}.`;
  }

  // Pattern interrupt at Turn 3
  let turn3Interrupt = '';
  if (turnCount >= 3) {
    turn3Interrupt = `

🎯 PATTERN INTERRUPT (Turn ${turnCount}):
You've been chatting for a while. It's time to offer VALUE and CAPTURE.

Include this message naturally:
"I can see you're serious about getting this right. Our **Readiness Assessment** takes just 2 minutes and generates a **personalized 15-page PDF roadmap** with:
- Your exact readiness score
- Cost estimate range
- Top 3 gaps auditors will flag
- Recommended next steps

👉 [Take the Free Assessment](/soc-2-readiness-index)"

Make this feel helpful, not salesy.`;
  }

  // Inject high-intent CTAs
  let highIntentCTA = '';
  if (qualification.highIntentSignals && qualification.highIntentSignals.length >= 2) {
    highIntentCTA = `

🔥 HIGH INTENT DETECTED:
This user shows strong buying signals. Include a relevant CTA:
- For cost questions: "[SOC 2 Cost Calculator](/soc-2-cost-calculator)"
- For timeline questions: "[Audit Timeline Estimator](/soc-2-timeline/estimator)"
- For auditor questions: "[Find an Auditor](/auditor-directory)"
- For ROI questions: "[Compliance ROI Calculator](/compliance-roi-calculator)"`;
  }

  return basePrompt + qualificationContext + turn3Interrupt + highIntentCTA;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId } = await request.json();
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Count user turns (excluding system messages)
    const userTurns = messages.filter((m: ChatMessage) => m.role === 'user').length;
    
    // Extract qualification data from conversation
    const qualification = extractQualificationData(messages);
    
    // Generate dynamic system prompt based on context
    const systemPrompt = generateSystemPrompt(userTurns, qualification);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 600,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

    // Return response with qualification metadata for potential lead capture
    return NextResponse.json({ 
      reply,
      qualification: {
        industry: qualification.industry,
        employeeCount: qualification.employeeCount,
        urgencyLevel: qualification.urgencyLevel,
        turnCount: userTurns,
        highIntent: (qualification.highIntentSignals?.length || 0) >= 2,
      },
      suggestedCTA: userTurns >= 3 ? '/soc-2-readiness-index' : null,
    });

  } catch (error) {
    console.error('Copilot chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
