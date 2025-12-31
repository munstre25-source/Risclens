import { NextResponse } from 'next/server';

// POST /api/admin/logout - Admin logout handler
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear admin token cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}
