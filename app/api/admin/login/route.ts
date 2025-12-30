import { NextRequest, NextResponse } from 'next/server';

// POST /api/admin/login - Admin login handler
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const secret = formData.get('secret') as string;

    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      console.error('ADMIN_SECRET environment variable not set');
      return NextResponse.redirect(new URL('/admin?error=config', request.url));
    }

    if (secret !== adminSecret) {
      return NextResponse.redirect(new URL('/admin?error=invalid', request.url));
    }

    // Set admin token cookie
    const response = NextResponse.redirect(new URL('/admin', request.url));
    response.cookies.set('admin_token', adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.redirect(new URL('/admin?error=server', request.url));
  }
}

