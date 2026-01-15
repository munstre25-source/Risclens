import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'Logistics',
  heroDescription: 'Estimate SOC 2 spend for logistics and supply chain companies managing carrier data, shipment tracking, and warehouse integrations.',
  assumptions: [
    'Carrier and shipper data in scope; API security and data integrity critical.',
    'Real-time tracking and warehouse management system integrations.',
    'Third-party carrier networks and freight broker partnerships.',
  ],
  costRanges: [
    'Typical Logistics first-year range: ~$35k–$90k depending on integration complexity and data sensitivity.',
    'Recurring tooling: API monitoring, logging, availability/uptime tracking, vendor risk management.',
  ],
  timelineBands: [
    'Readiness: 8–14 weeks if scope is defined and API documentation is current.',
    'Type I: 3–6 weeks once evidence is stable and integration points are mapped.',
    'Type II: add 3–12 months observation with consistent uptime and data integrity evidence.',
  ],
  scope: [
    'Transportation management systems (TMS) and warehouse management systems (WMS).',
    'Carrier API integrations for tracking, rating, and booking.',
    'Customer portals and shipper dashboards.',
  ],
  drivers: [
    'Number and complexity of carrier/partner API integrations.',
    'Real-time data processing and availability requirements.',
    'Geographic scope and multi-region data handling.',
    'Customer data sensitivity (B2B vs B2C shipments).',
  ],
  auditorFocus: [
    'API authentication and authorization controls.',
    'Data integrity across carrier handoffs and tracking updates.',
    'Uptime monitoring and incident response for critical systems.',
    'Vendor/carrier security assessment processes.',
  ],
  changeCost: [
    'Adding new carrier integrations mid-audit.',
    'Expanding geographic scope with new data residency requirements.',
    'Late discovery of legacy warehouse system connections.',
  ],
  scenarios: [
    {
      title: 'Last-mile delivery platform',
      detail: 'High transaction volume with real-time tracking; availability and API security are primary audit focus.',
    },
    {
      title: 'Freight brokerage SaaS',
      detail: 'Carrier network management and rate data protection; vendor risk and contract reviews critical.',
    },
    {
      title: 'Supply chain visibility platform',
      detail: 'Multi-tier supplier data aggregation; data integrity and access controls across partner network.',
    },
  ],
  hubHref: '/soc-2/industries/logistics',
  timelineHref: '/soc-2-timeline',
  readinessHref: '/soc-2-readiness-checklist',
  relatedLinks: [
    { href: '/soc-2-cost/saas', label: 'Cost for SaaS' },
    { href: '/soc-2-cost/b2b-saas', label: 'Cost for B2B SaaS' },
    { href: '/soc-2-cost/enterprise', label: 'Cost for Enterprise' },
  ],
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost for Logistics | RiscLens',
  description: 'SOC 2 budget guidance for Logistics: carrier integrations, data integrity, and supply chain compliance costs.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/logistics' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/logistics',
    title: 'SOC 2 Cost for Logistics | RiscLens',
    description: 'Estimate SOC 2 spend for logistics and supply chain companies with realistic timelines and budgets.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for Logistics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for Logistics | RiscLens',
    description: 'Plan SOC 2 budgets for Logistics: auditor fees, tooling, and compliance effort.',
    images: ['/og.png'],
  },
};

export default function Soc2CostLogisticsPage() {
  return <CostIndustryPage {...content} />;
}
