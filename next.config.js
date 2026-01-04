/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/start',
        destination: '/soc-2-readiness-index',
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

