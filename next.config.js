/** @type {import('next').NextConfig} */
const nextConfig = {
      async redirects() {
        return [
          {
            source: '/start',
            destination: '/soc-2-readiness-calculator',
            permanent: true,
          },
          {
            source: '/compliance/directory/san-francisco',
            destination: '/auditor-directory/san-francisco',
            permanent: true,
          },
          {
            source: '/compliance/directory/fintech',
            destination: '/compliance/directory',
            permanent: true,
          },
          {
            source: '/compliance/directory/healthcare',
            destination: '/compliance/directory',
            permanent: true,
          },
          // Fix: Redirect old /compare/ framework comparison URLs to correct location
          // These were incorrectly advertised in sitemap, causing 404s
          {
            source: '/compare/timeline-and-effort',
            destination: '/soc-2-vs-iso-27001/timeline-and-effort',
            permanent: true,
          },
          {
            source: '/compare/cost-comparison',
            destination: '/soc-2-vs-iso-27001/cost-comparison',
            permanent: true,
          },
          {
            source: '/compare/which-to-choose',
            destination: '/soc-2-vs-iso-27001/which-to-choose',
            permanent: true,
          },
          {
            source: '/compare/for-startups',
            destination: '/soc-2-vs-iso-27001/for-startups',
            permanent: true,
          },
          {
            source: '/compare/for-enterprise-sales',
            destination: '/soc-2-vs-iso-27001/for-enterprise-sales',
            permanent: true,
          },
          {
            source: '/compare/mapping-controls-overview',
            destination: '/soc-2-vs-iso-27001/mapping-controls-overview',
            permanent: true,
          },
        ];
      },
  // Enable experimental server actions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configure for Playwright/Chromium binary on serverless
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize playwright-core and chromium for serverless
      config.externals.push({
        'playwright-core': 'commonjs playwright-core',
        '@sparticuz/chromium': 'commonjs @sparticuz/chromium',
      });
    }
    return config;
  },
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
