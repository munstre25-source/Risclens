import { MetadataRoute } from 'next';
import { ROUTES, getRouteBucket } from '@/src/seo/routes';

const baseUrl = 'https://risclens.com';

// Build date used as fallback for lastmod
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = ROUTES.map((path) => {
    const bucket = getRouteBucket(path);
    
    // Priority logic per bucket
    let priority = 0.7; // Default fallback
    let changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly';

    switch (bucket) {
      case 'flagship':
        priority = 1.0;
        changeFrequency = 'weekly';
        break;
      case 'calculator':
        priority = 0.95;
        changeFrequency = 'weekly';
        break;
      case 'hub':
        priority = 0.9;
        changeFrequency = 'weekly';
        break;
      case 'commercial':
        priority = 0.8; // 0.75-0.85 range
        changeFrequency = 'weekly';
        break;
      case 'learn':
        priority = 0.7; // 0.65-0.75 range
        changeFrequency = 'monthly';
        break;
      case 'legal':
        priority = 0.4;
        changeFrequency = 'monthly'; // "yearly or monthly" - using monthly as safer default
        break;
    }

    return {
      url: `${baseUrl}${path === '/' ? '' : path}`,
      lastModified: BUILD_DATE,
      changeFrequency,
      priority,
    };
  });

  // Sanity check summary in dev
  if (process.env.NODE_ENV !== 'production') {
    const summary = ROUTES.reduce((acc, path) => {
      const bucket = getRouteBucket(path);
      acc[bucket] = (acc[bucket] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('--- Sitemap Generation Summary ---');
    console.table(summary);
    console.log(`Total indexable routes: ${ROUTES.length}`);
    console.log('----------------------------------');
  }

  return entries;
}
