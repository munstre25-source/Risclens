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
    },
      {
        url: "/vendor-risk-assessment/triage",
        title: "Vendor Risk Triage Tool",
        description: "Instantly categorize vendors by risk level. Use our triage engine to decide which vendors need deep reviews and which are low risk.",
        category: "Vendor Risk",
        keywords: ["triage", "scoring", "prioritization", "vrm", "vendor assessment", "risk scoring", "third party risk assessment"]
      },
      {
        url: "/soc-2/industries/proptech",
        title: "SOC 2 for PropTech",
        description: "A specialized guide for PropTech companies. Learn how to secure tenant PII, manage property data, and satisfy institutional investors.",
        category: "SOC 2",
        keywords: ["real estate", "property management", "tenant data", "proptech"]
      },
      {
        url: "/soc-2/industries/logistics",
        title: "SOC 2 for Logistics & Supply Chain",
        description: "Operational resilience and data integrity for logistics platforms. Secure carrier integrations and warehouse management systems.",
        category: "SOC 2",
        keywords: ["supply chain", "shipping", "logistics", "wms"]
      },
      {
        url: "/compare/vanta-vs-drata",
        title: "Vanta vs Drata Comparison",
        description: "A deep dive comparison into the two giants of compliance automation. We compare features, integrations, pricing models, and audit support.",
        category: "SOC 2",
        keywords: ["vanta", "drata", "comparison", "compliance automation", "automation tools"]
      },
        {
          url: "/compare/secureframe-vs-vanta",
          title: "Secureframe vs Vanta Comparison",
          description: "Comparing Secureframe’s expert-led approach with Vanta’s automation-first platform.",
          category: "SOC 2",
          keywords: ["secureframe", "vanta", "comparison", "compliance automation", "soc 2 partner"]
        },
        {
          url: "/compare/drata-vs-secureframe",
          title: "Drata vs Secureframe Comparison",
          description: "A battle of the heavyweights. We compare Drata’s technical automation with Secureframe’s personalized guidance.",
          category: "SOC 2",
          keywords: ["drata", "secureframe", "comparison", "compliance automation"]
        },
        {
          url: "/compare/thoropass-vs-vanta",
          title: "Thoropass vs Vanta Comparison",
          description: "Should you bundle your software and auditor together? We compare Thoropass’s combined model with Vanta’s platform approach.",
          category: "SOC 2",
          keywords: ["thoropass", "vanta", "comparison", "laika", "bundled audit"]
        },
        {
          url: "/compare/sprinto-vs-vanta",
          title: "Sprinto vs Vanta Comparison",
          description: "Sprinto is challenging Vanta with deeper automation and faster onboarding. See how they stack up for SaaS startups.",
          category: "SOC 2",
          keywords: ["sprinto", "vanta", "comparison", "compliance automation", "saas compliance"]
        },
        {
          url: "/compare/drata-vs-thoropass",
          title: "Drata vs Thoropass Comparison",
          description: "Comparing the most powerful automation platform with the most comprehensive managed service.",
          category: "SOC 2",
          keywords: ["drata", "thoropass", "comparison", "compliance automation"]
        },
        {
          url: "/compare/vanta-vs-auditboard",
          title: "Vanta vs AuditBoard Comparison",
          description: "When does a company outgrow Vanta? We compare the leader in startup compliance with the leader in Enterprise GRC.",
          category: "SOC 2",
          keywords: ["vanta", "auditboard", "comparison", "enterprise grc", "compliance scale"]
        },
        {
          url: "/compliance-roi-calculator",
          title: "Compliance ROI Calculator",
          description: "Compare the total cost of Manual, Automation Platform, and All-in-One compliance approaches tailored to your company size.",
          category: "SOC 2",
          keywords: ["roi", "cost comparison", "vanta pricing", "drata pricing", "thoropass pricing", "compliance cost"]
        }
      ];

