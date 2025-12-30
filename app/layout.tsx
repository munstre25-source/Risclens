import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SOC 2 Cost Calculator | RiscLens',
  description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment. Free instant results with detailed PDF report.',
  keywords: ['SOC 2', 'compliance', 'cost calculator', 'audit', 'security'],
  openGraph: {
    title: 'SOC 2 Cost Calculator | RiscLens',
    description: 'Calculate your SOC 2 compliance costs and get a personalized readiness assessment.',
    type: 'website',
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

