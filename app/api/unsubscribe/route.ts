import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, logAuditEvent } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/unsubscribe - Handle email unsubscribe requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email) {
      return new NextResponse(
        renderUnsubscribePage('Invalid unsubscribe link - email missing', false),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Validate token (simple base64 check)
    if (token) {
      try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [tokenEmail] = decoded.split(':');
        if (tokenEmail !== email) {
          console.warn('Token email mismatch:', { tokenEmail, email });
        }
      } catch {
        console.warn('Invalid token format');
      }
    }

    // Add email to unsubscribed list
    const supabase = getSupabaseAdmin();
    
    const { error } = await supabase
      .from('UNSUBSCRIBED_EMAILS')
      .upsert(
        { email: email.toLowerCase(), unsubscribed_at: new Date().toISOString() },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Failed to add to unsubscribe list:', error);
      return new NextResponse(
        renderUnsubscribePage('An error occurred. Please try again.', false),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Log the unsubscribe event
    await logAuditEvent('email_unsubscribed', {
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
    });

    console.log('Unsubscribe successful for:', email);

    return new NextResponse(
      renderUnsubscribePage('You have been unsubscribed successfully', true),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new NextResponse(
      renderUnsubscribePage('An error occurred', false),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

function renderUnsubscribePage(message: string, success: boolean): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Unsubscribe | RiscLens</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }
        .card {
          background: white;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
          text-align: center;
          max-width: 400px;
          margin: 1rem;
        }
        .icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }
        .success { color: #10b981; }
        .error { color: #ef4444; }
        h1 {
          font-size: 1.25rem;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }
        p {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .link {
          display: inline-block;
          margin-top: 1.5rem;
          color: #0369a1;
          text-decoration: none;
          font-weight: 500;
        }
        .link:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon ${success ? 'success' : 'error'}">
          ${success ? '✓' : '✗'}
        </div>
        <h1>${message}</h1>
        <p>${success 
          ? 'You will no longer receive emails from RiscLens. We\'re sorry to see you go!' 
          : 'Please try clicking the unsubscribe link in your email again.'
        }</p>
        <a href="/" class="link">← Return to RiscLens</a>
      </div>
    </body>
    </html>
  `;
}
