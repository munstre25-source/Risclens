import { createEmptySitemapResponse } from '@/lib/empty-sitemap';

export async function GET() {
  return createEmptySitemapResponse();
}
