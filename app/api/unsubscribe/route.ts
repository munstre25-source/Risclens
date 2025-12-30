import { NextRequest, NextResponse } from 'next/server';

// GET /api/unsubscribe - Handle email unsubscribe requests
// Full implementation in Pass B
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      return new NextResponse(
        renderUnsubscribePage('Invalid unsubscribe link', false),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Placeholder - will verify token and add to unsubscribed_emails in Pass B
    console.log('Unsubscribe request for:', email);

    return new NextResponse(
      renderUnsubscribePage('You have been unsubscribed', true),
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
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: #f3f4f6;
        }
        .card {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 400px;
        }
        .icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .success { color: #10b981; }
        .error { color: #ef4444; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon ${success ? 'success' : 'error'}">
          ${success ? '✓' : '✗'}
        </div>
        <h1>${message}</h1>
        <p>You will no longer receive emails from RiscLens.</p>
      </div>
    </body>
    </html>
  `;
}

