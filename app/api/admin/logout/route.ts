import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/logout - Admin logout handler
export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin', request.url));
  
  // Clear admin token cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  });

  return response;
}

