/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/soc-2-readiness-index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/start',
        destination: '/soc-2-readiness-calculator',
        permanent: true,
      },
      {
        source: '/soc-2-audit-delays-cost',
        destination: '/soc-2-audit-delay-cost',
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
