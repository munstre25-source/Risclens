import { Metadata } from 'next';
import { CostIndustryPage, CostIndustryContent } from '@/components/CostIndustryPage';

const content: CostIndustryContent = {
  industry: 'AI/Data',
  heroDescription: 'SOC 2 budgets for AI/data platforms handling sensitive datasets, model pipelines, and third-party data sources.',
  assumptions: [
    'Data pipelines and model training environments in scope.',
    'Mixed proprietary and third-party data; clear data lineage needed.',
    'Type I first; Type II once evidence across pipelines is stable.',
  ],
  costRanges: [
    'Typical AI/Data range: ~$40k–$105k depending on data sensitivity and pipeline complexity.',
    'Tooling: logging/monitoring for data pipelines, access control/SSO, vulnerability scanning, vendor/data source reviews.',
  ],
  timelineBands: [
    'Readiness: 8–14 weeks if data flows and access patterns are documented.',
    'Type I: 3–6 weeks once evidence is consistent.',
    'Type II: add 3–9 months observation with sampling across pipelines and environments.',
  ],
  scope: [
    'Data ingestion/storage, model training/serving environments.',
    'CI/CD for data/ML, feature stores, monitoring/alerting for model services.',
    'Vendors/data sources providing datasets or model services.',
  ],
  drivers: [
    'Data classification and retention for training/serving data.',
    'Access control and approvals for model/code and data stores.',
    'Logging/monitoring for pipelines and model endpoints.',
    'Vendor/data source due diligence and contracts.',
  ],
  auditorFocus: [
    'Access reviews for data stores, feature stores, and model repos.',
    'Change control for pipelines and model deployments.',
    'Monitoring for drift/incidents and evidence of response.',
    'Vendor/data source controls and contractual coverage.',
  ],
  changeCost: [
    'Unclear data lineage or retention requiring rework.',
    'Late-added data sources/vendors needing review.',
    'Sparse logging/monitoring on pipelines or model endpoints.',
  ],
  scenarios: [
    {
      title: 'ML API serving customer data',
      detail: 'Access control and monitoring depth drive evidence; mid-to-upper budget depending on data sensitivity.',
    },
    {
      title: 'Analytics platform using third-party datasets',
      detail: 'Vendor/data source reviews and contracts add effort; cost tied to data classification and retention.',
    },
    {
      title: 'Internal-only model training with limited PII',
      detail: 'Leaner scope if data is controlled; logging and access evidence still required for lower cost band.',
    },
  ],
    hubHref: '/soc-2/industries/ai-data',
    timelineHref: '/soc-2-timeline',
    readinessHref: '/soc-2-readiness-checklist/ai-ml',
    relatedLinks: [
      { href: '/soc-2-timeline', label: 'SOC 2 timeline (overview)' },
      { href: '/soc-2-readiness-checklist/ai-ml', label: 'Readiness for AI/ML teams' },
    ],
  };

export const metadata: Metadata = {
  title: 'SOC 2 Cost for AI/Data | RiscLens',
  description: 'SOC 2 budget guidance for AI/data platforms: data pipelines, model deployments, vendor/data sources, and timelines.',
  alternates: { canonical: 'https://risclens.com/soc-2-cost/ai-data' },
  openGraph: {
    type: 'website',
    url: 'https://risclens.com/soc-2-cost/ai-data',
    title: 'SOC 2 Cost for AI/Data | RiscLens',
    description: 'Estimate SOC 2 spend for AI/data teams with clear data lineage, logging, and vendor controls.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost for AI/Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost for AI/Data | RiscLens',
    description: 'Plan SOC 2 budgets for AI/data platforms handling sensitive datasets and pipelines.',
    images: ['/og.png'],
  },
};

export default function Soc2CostAiDataPage() {
  return <CostIndustryPage {...content} />;
}
