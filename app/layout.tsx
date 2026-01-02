import type { Metadata } from 'next';
import './globals.css';
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';


export const metadata: Metadata = {
  metadataBase: new URL('https://risclens.com'),
  title: {
    default: 'SOC 2 Readiness Index for Early-Stage Companies | RiscLens',
    template: '%s | RiscLens',
  },
  description: 'Get a clear readiness score, cost estimate, and gap analysis in minutes. Free instant results for startups preparing for SOC 2.',
  keywords: ['SOC 2', 'compliance', 'readiness', 'audit', 'security', 'startup', 'cost estimate', 'gap analysis'],
  authors: [{ name: 'RiscLens' }],
  creator: 'RiscLens',
  publisher: 'RiscLens',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://risclens.com',
    siteName: 'RiscLens',
    title: 'SOC 2 Readiness Index for Early-Stage Companies',
    description: 'Get a clear readiness score, cost estimate, and gap analysis in minutes. Free instant results for startups.',
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
    title: 'SOC 2 Readiness Index for Early-Stage Companies',
    description: 'Get a clear readiness score, cost estimate, and gap analysis in minutes.',
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
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

