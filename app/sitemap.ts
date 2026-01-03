import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://risclens.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/soc-2-readiness-index`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soc-2-cost`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soc-2-cost/saas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/soc-2-cost/fintech`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/soc-2-readiness/saas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/soc-2-readiness/fintech`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/learn/soc-2-readiness`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/soc-2-timeline`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/soc-2-type-i-vs-type-ii`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/soc-2-readiness-checklist`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/soc-2-cost-breakdown`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/when-do-you-need-soc-2`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/soc-2-readiness/startups`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/soc-2-readiness/enterprise-sales`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/soc-2-vs-iso-27001`,
      lastModified: new Date(),
    },
  ];
}
