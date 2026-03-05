import { NextResponse } from 'next/server';

const EMPTY_SITEMAP_XML = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';

export function createEmptySitemapResponse() {
  return new NextResponse(EMPTY_SITEMAP_XML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
