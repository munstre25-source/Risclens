import { MetadataRoute } from 'next';
import { ROUTES } from '@/src/seo/routes';

const baseUrl = 'https://risclens.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map((route) => {
    const isRoot = route === '/';
    const changeFrequency =
      route === '/privacy' || route === '/terms' || route === '/learn/soc-2-readiness'
        ? 'monthly'
        : 'weekly';

    return {
      url: `${baseUrl}${isRoot ? '' : route}`,
      lastModified: now,
      changeFrequency,
      priority: isRoot ? 1 : 0.8,
    };
  });
}
