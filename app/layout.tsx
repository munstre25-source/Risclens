import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://risclens.com'),
  title: {
    default: 'RiscLens | SOC 2 Cost Calculator',
    template: '%s | RiscLens',
  },
  description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment. Free instant results with detailed PDF report.',
  keywords: ['SOC 2', 'compliance', 'cost calculator', 'audit', 'security', 'readiness assessment'],
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
    title: 'RiscLens | SOC 2 Cost Calculator',
    description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment. Free instant results with detailed PDF report.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'RiscLens - SOC 2 Cost Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RiscLens | SOC 2 Cost Calculator',
    description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
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
