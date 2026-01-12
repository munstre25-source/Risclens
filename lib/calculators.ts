export const getCalculatorUrl = (slug: string) => {
  const mapping: Record<string, string> = {
    'soc-2': '/soc-2-cost-calculator',
    'pci-dss': '/pci-dss-cost-calculator',
    'ai-governance': '/iso-42001-calculator',
    'iso-42001': '/iso-42001-calculator',
    'eu-ai-act': '/iso-42001-calculator',
    'nist-ai-rmf': '/iso-42001-calculator',
    'iso-27001': '/compliance-roi-calculator', // Or a specific one if available
  };
  
  // Return mapping or fallback to generic ROI calculator
  return mapping[slug] || '/compliance-roi-calculator';
};

export const getReadinessChecklistUrl = (slug: string) => {
  const mapping: Record<string, string> = {
    'soc-2': '/soc-2-readiness-checklist',
    'pci-dss': '/pci-dss-readiness-calculator',
    'ai-governance': '/ai-governance-readiness-index',
    'iso-42001': '/ai-governance-readiness-index',
    'iso-27001': '/iso-27001-checklist',
  };
  
  return mapping[slug] || '/compliance';
};
