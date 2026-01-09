export type ContextualTopic = 
  | 'soc2-readiness'
  | 'soc2-cost'
  | 'soc2-timeline'
  | 'pentest'
  | 'iso27001'
  | 'vendor-risk'
  | 'ai-compliance';

export type ContextualLink = {
  href: string;
  label: string;
  description?: string;
};

const TOPIC_LINKS: Record<ContextualTopic, ContextualLink[]> = {
  'soc2-readiness': [
    { href: '/soc-2-readiness-checklist', label: 'SOC 2 Readiness Checklist' },
    { href: '/soc-2-readiness-calculator', label: 'SOC 2 Readiness Calculator' },
    { href: '/learn/soc-2-readiness', label: 'SOC 2 Readiness Hub' },
  ],
  'soc2-cost': [
    { href: '/soc-2-cost-calculator', label: 'SOC 2 Cost Calculator' },
    { href: '/soc-2-cost-breakdown', label: 'SOC 2 Cost Breakdown' },
    { href: '/soc-2-audit-delay-cost', label: 'Cost of Audit Delays' },
  ],
  'soc2-timeline': [
    { href: '/soc-2-timeline', label: 'SOC 2 Timeline Guide' },
    { href: '/soc-2-timeline/estimator', label: 'Timeline Estimator' },
  ],
  'pentest': [
    { href: '/penetration-testing', label: 'Pentest Overview' },
    { href: '/penetration-testing/cost-estimator', label: 'Pentest Cost Estimator' },
    { href: '/pentest-intro', label: 'Pentest for Startups' },
  ],
  'iso27001': [
    { href: '/iso-27001-checklist', label: 'ISO 27001 Checklist' },
    { href: '/soc-2-vs-iso-27001', label: 'SOC 2 vs ISO 27001' },
  ],
  'vendor-risk': [
    { href: '/vendor-risk-assessment', label: 'Vendor Risk Assessment' },
    { href: '/vendor-risk-program', label: 'Vendor Risk Program' },
  ],
  'ai-compliance': [
    { href: '/ai-compliance', label: 'AI Compliance Guide' },
    { href: '/iso-42001-calculator', label: 'ISO 42001 Calculator' },
  ],
};

export function getContextualLinks(topics: ContextualTopic[]): ContextualLink[] {
  const linksMap = new Map<string, ContextualLink>();
  
  topics.forEach(topic => {
    const topicLinks = TOPIC_LINKS[topic] || [];
    topicLinks.forEach(link => {
      linksMap.set(link.href, link);
    });
  });

  return Array.from(linksMap.values());
}
