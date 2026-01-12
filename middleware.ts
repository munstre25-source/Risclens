import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VARIANTS = ['default', 'v1', 'v2'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /compliance/compare/* to /compare/*
  if (pathname.startsWith('/compliance/compare/')) {
    const slug = pathname.replace('/compliance/compare/', '');
    return NextResponse.redirect(new URL(`/compare/${slug}`, request.url));
  }

  // Only run for the calculator page

  if (pathname === '/soc-2-readiness-calculator') {
    const variationId = request.cookies.get('variation_id')?.value;

    if (!variationId) {
      // Randomly assign a variant
      const randomVariant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
      
      const response = NextResponse.next();
      response.cookies.set('variation_id', randomVariant, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/soc-2-readiness-calculator', '/compliance/compare/:path*'],
};
