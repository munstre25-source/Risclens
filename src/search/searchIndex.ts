/**
 * Search Index for RiscLens
 * 
 * TO ADD NEW PAGES:
 * 1. Add an entry to the SEARCH_INDEX array below.
 * 2. Ensure the URL matches the route exactly.
 * 3. Provide a human-readable title and 1-2 sentence description.
 * 4. Assign a relevant category.
 */

export interface SearchDoc {
  url: string;
  title: string;
  description: string;
  category: "SOC 2" | "Pen Test" | "Vendor Risk" | "General";
  keywords?: string[];
}

export const SEARCH_INDEX: SearchDoc[] = [
  {
    url: "/",
    title: "RiscLens - Enterprise Security & Compliance",
    description: "Navigate SOC 2, Penetration Testing, and Vendor Risk Management with confidence. Expert guidance and tools for modern security teams.",
    category: "General",
    keywords: ["compliance", "security", "risk", "audit"]
  },
  {
    url: "/soc-2-cost",
    title: "SOC 2 Cost Guide",
    description: "The definitive guide to SOC 2 pricing. Learn about auditor fees, automation tool costs, and hidden expenses for your audit.",
    category: "SOC 2",
    keywords: ["pricing", "budget", "fees", "vanta", "drata"]
  },
  {
    url: "/soc-2-readiness-calculator",
    title: "SOC 2 Readiness Calculator",
    description: "Assess your SOC 2 readiness in minutes. Get an instant score and a custom gap analysis based on your current security controls.",
    category: "SOC 2",
    keywords: ["assessment", "score", "gap analysis", "calculator"]
  },
  {
    url: "/penetration-testing",
    title: "Penetration Testing Services",
    description: "Comprehensive penetration testing for web apps, APIs, and cloud infrastructure. High-quality reports designed for SOC 2 and enterprise buyers.",
    category: "Pen Test",
    keywords: ["pentest", "security assessment", "vulnerability scan"]
  },
  {
    url: "/penetration-testing/cost-estimator",
    title: "Pentest Cost Estimator",
    description: "Estimate the cost of your next penetration test. Adjust scope for web apps, APIs, and network size to get an instant quote.",
    category: "Pen Test",
    keywords: ["pricing", "estimate", "quote", "budget"]
  },
  {
    url: "/vendor-risk-assessment",
    title: "Vendor Risk Management Guide",
    description: "Master third-party risk management. Learn how to triage vendors, score questionnaires, and monitor security posture.",
    category: "Vendor Risk",
    keywords: ["vrm", "tprm", "third party risk", "questionnaire"]
  },
  {
    url: "/vendor-risk-assessment/roi-calculator",
    title: "Vendor Risk ROI Calculator",
    description: "Calculate the return on investment for your vendor risk program. Compare manual processes against automated risk management.",
    category: "Vendor Risk",
    keywords: ["business case", "savings", "efficiency"]
  },
  {
    url: "/soc-2-timeline",
    title: "SOC 2 Timeline & Process",
    description: "How long does SOC 2 take? A detailed breakdown of the preparation, observation, and reporting phases for Type 1 and Type 2.",
    category: "SOC 2",
    keywords: ["duration", "roadmap", "schedule"]
  },
  {
    url: "/soc-2-type-i-vs-type-ii",
    title: "SOC 2 Type 1 vs. Type 2",
    description: "Understand the key differences between SOC 2 Type 1 and Type 2. Which one do you need, and when should you switch?",
    category: "SOC 2",
    keywords: ["comparison", "audit type", "readiness"]
  },
  {
    url: "/soc-2-vs-iso-27001",
    title: "SOC 2 vs. ISO 27001",
    description: "The ultimate comparison between SOC 2 and ISO 27001. Learn which framework is right for your customers and how to map controls.",
    category: "General",
    keywords: ["iso", "framework", "comparison", "compliance"]
  },
  {
    url: "/vendor-risk-assessment/questionnaire",
    title: "Vendor Security Questionnaires",
    description: "Download or build the perfect vendor security questionnaire. Focus on what matters: access, data security, and sub-processors.",
    category: "Vendor Risk",
    keywords: ["vrm", "questionnaire", "template", "vsa"]
  },
  {
    url: "/soc-2-readiness-index",
    title: "SOC 2 Readiness Index",
    description: "A comprehensive library of SOC 2 controls, evidence requirements, and implementation guides for every trust service criterion.",
    category: "SOC 2",
    keywords: ["controls", "evidence", "framework", "index"]
  },
  {
    url: "/penetration-testing/sow",
    title: "Pentest Scope & SOW",
    description: "Define the scope for your penetration test. Learn how to draft a Statement of Work that satisfies auditors and enterprise clients.",
    category: "Pen Test",
    keywords: ["scope", "sow", "contract", "rules of engagement"]
  }
];
