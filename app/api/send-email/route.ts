import { NextRequest, NextResponse } from 'next/server';

// POST /api/send-email - Send transactional email with PDF link
// Full implementation with SendGrid + SMTP fallback in Pass B
export async function POST(request: NextRequest) {
  try {
    const { lead_id, email, pdf_url } = await request.json();

    if (!lead_id || !email) {
      return NextResponse.json(
        { success: false, error: 'lead_id and email are required' },
        { status: 400 }
      );
    }

    // Placeholder response - will implement SendGrid/SMTP in Pass B
    return NextResponse.json({
      success: true,
      message: 'Email send endpoint placeholder',
      lead_id,
      email,
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

