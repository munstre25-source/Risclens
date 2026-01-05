import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/start',
          '/internal',
        ],
      },
    ],
    sitemap: `${process.env.APP_URL || 'https://risclens.com'}/sitemap.xml`,
  }
}
