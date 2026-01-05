import type { Metadata } from 'next';
import './globals.css';
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { HashScrollFix } from '@/components/HashScrollFix';


export const metadata: Metadata = {
  metadataBase: new URL('https://risclens.com'),
  title: {
    default: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
    template: '%s | RiscLens',
  },
  description:
    'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://risclens.com',
    siteName: 'RiscLens',
    title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
    description:
      'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'RiscLens',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
    description:
      'Get a free SOC 2 readiness score and cost estimate in under 2 minutes. See gaps, what auditors will ask next, and a clear path forward.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
    icons: {
      icon: [{ url: '/favicon.ico' }],
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RiscLens",
    "url": "https://risclens.com",
    "logo": "https://risclens.com/logo.png",
    "sameAs": [
      "https://linkedin.com/company/risclens",
      "https://twitter.com/risclens"
    ],
    "description": "Deterministic SOC 2 readiness infrastructure for early-stage companies.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@risclens.com",
      "contactType": "customer support"
    }
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <head>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-7BR1HET2Y2"
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7BR1HET2Y2');
            `}
          </Script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body>
          <HashScrollFix />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    );
  }


