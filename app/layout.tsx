import type { Metadata } from 'next';
import './globals.css';

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
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'RiscLens - SOC 2 Readiness Index',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Index for Early-Stage Companies',
    description: 'Get a clear readiness score, cost estimate, and gap analysis in minutes.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
