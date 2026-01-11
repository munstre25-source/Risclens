require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const roles = [
    ["CTO", "cto", "SOC 2 doesn't have to be a technical bottleneck. Learn how to architect for compliance, automate evidence collection, and maintain engineering velocity."],
    ["CISO", "ciso", "SOC 2 is more than a checkbox. Learn how to leverage the audit to build a mature security program that satisfies both auditors and customers."],
    ["Founder", "founders", "Building a startup is hard; SOC 2 shouldn't make it harder. Learn how to get certified fast to unblock enterprise deals and build trust from day one."],
    ["DevOps Lead", "devops", "Compliance is code. Learn how to integrate SOC 2 controls into your CI/CD pipelines and treat evidence collection as a first-class engineering task."],
    ["Product Manager", "product-manager", "Incorporate security and compliance into the product lifecycle without sacrificing roadmap speed or user experience."],
    ["HR Manager", "hr-manager", "Streamline employee onboarding, offboarding, and training to meet SOC 2 people-process requirements with minimal friction."],
    ["Compliance Officer", "compliance-officer", "Centralize your control framework and automate the evidence collection process to stay audit-ready year-round."],
    ["Security Architect", "security-architect", "Design secure-by-default systems that inherently satisfy SOC 2 Trust Services Criteria while supporting modern cloud scale."],
    ["Data Scientist", "data-scientist", "Protect sensitive training data and model parameters while maintaining the agility needed for advanced AI/ML research."],
    ["IT Director", "it-director", "Standardize fleet management and access control across the organization to ensure consistent compliance posture."],
    ["CFO", "cfo", "Manage the financial impact of compliance while ensuring that security investments translate directly into business value and risk reduction."],
    ["Legal Counsel", "legal-counsel", "Align your MSAs and vendor contracts with SOC 2 requirements to protect the company and streamline legal reviews."],
    ["QA Manager", "qa-manager", "Extend your testing framework to include security and compliance checks, ensuring that every release is audit-compliant."],
    ["Customer Success Lead", "customer-success-lead", "Use SOC 2 as a competitive advantage to build long-term trust and reduce security-related churn with enterprise clients."],
    ["Sales Director", "sales-director", "Shorten sales cycles by proactively providing security documentation and satisfying procurement requirements with a clean SOC 2 report."],
    ["Engineering Manager", "engineering-manager", "Balance team productivity with compliance obligations by embedding security rituals into your existing agile workflows."],
    ["Solution Architect", "solution-architect", "Bridge the gap between customer security requirements and technical implementation during the pre-sales and onboarding process."],
    ["Risk Manager", "risk-manager", "Identify, assess, and mitigate operational risks using the SOC 2 framework as a guide for organizational resilience."],
    ["Privacy Officer", "privacy-officer", "Ensure that data privacy requirements are met alongside security controls to satisfy both SOC 2 and global privacy regulations."],
    ["System Administrator", "system-administrator", "Maintain the integrity and availability of core systems through disciplined patching, monitoring, and access management."],
    ["Database Administrator", "database-administrator", "Secure the heart of the organization by implementing robust encryption, backup, and access controls for all data stores."],
    ["Cloud Engineer", "cloud-engineer", "Leverage cloud-native security tools to automate compliance in AWS, GCP, or Azure and eliminate manual security configurations."],
    ["Front-end Developer", "frontend-developer", "Build secure user interfaces that protect against common web vulnerabilities while maintaining a seamless user experience."],
    ["Back-end Developer", "backend-developer", "Implement secure APIs and service logic that handle data according to SOC 2 security and confidentiality standards."],
    ["Full-stack Developer", "fullstack-developer", "Own the security of the entire application stack by applying end-to-end encryption and robust authentication patterns."],
    ["Mobile Lead", "mobile-lead", "Secure mobile applications and the data they process on-device and in-transit to meet stringent security requirements."],
    ["Security Engineer", "security-engineer", "Deploy and manage the security tooling that provides the continuous monitoring and alerting required for SOC 2."],
    ["SRE", "sre", "Ensure the reliability and availability of systems through automated failover, disaster recovery, and incident response procedures."],
    ["Network Engineer", "network-engineer", "Implement secure network perimeters and internal segmentation to protect against unauthorized access and lateral movement."],
    ["SOC Analyst", "soc-analyst", "Monitor security events in real-time to detect and respond to threats before they impact compliance or customer data."],
    ["Pentester", "pentester", "Identify vulnerabilities through rigorous testing to help the organization remediate issues before they are found by malicious actors."],
    ["Business Analyst", "business-analyst", "Translate complex compliance requirements into actionable business processes that drive efficiency and security."],
    ["Scrum Master", "scrum-master", "Facilitate the inclusion of security and compliance tasks into sprints to ensure they are prioritized alongside feature work."],
    ["UX Designer", "ux-designer", "Design security features that are easy for users to understand and follow, reducing the risk of human error."],
    ["Content Manager", "content-manager", "Maintain accurate and up-to-date documentation of policies and procedures that are critical for audit success."],
    ["Operations Manager", "operations-manager", "Optimize day-to-day business operations to ensure that compliance is a natural byproduct of how the company works."],
    ["Marketing Director", "marketing-director", "Communicate the company's commitment to security and compliance to build brand authority and trust in the market."],
    ["Growth Lead", "growth-lead", "Scalably acquire new customers by using security as a value proposition for privacy-conscious users and organizations."],
    ["Account Executive", "account-executive", "Overcome security objections in the sales process by leveraging the company's SOC 2 report and security posture."],
    ["Office Manager", "office-manager", "Manage physical security and facilities access to protect on-site infrastructure and sensitive physical assets."],
    ["Facilities Manager", "facilities-manager", "Implement and maintain physical security controls for the office and data centers to satisfy SOC 2 physical access criteria."],
    ["Recruiter", "recruiter", "Integrate background checks and security training into the hiring process to ensure a secure and compliant workforce from day one."],
    ["Controller", "controller", "Ensure that financial systems and processes are secure and that compliance costs are accurately tracked and managed."],
    ["Auditor", "auditor", "Understand the SOC 2 framework from the perspective of an independent reviewer to better prepare the organization for external audits."],
    ["Consultant", "consultant", "Advise clients on the best practices for achieving and maintaining SOC 2 compliance in a fast-changing regulatory landscape."],
    ["Partner", "partner", "Build strategic alliances that leverage shared security and compliance standards to drive mutual business growth."],
    ["CEO", "ceo", "Set the tone from the top by making security and compliance a core part of the company's mission and culture."],
    ["COO", "coo", "Oversee the operational implementation of compliance programs to ensure they are effective, scalable, and aligned with business goals."],
    ["CMO", "cmo", "Incorporate security and trust messaging into the brand strategy to differentiate the company in a crowded marketplace."],
    ["CRO", "cro", "Drive revenue growth by ensuring that the sales and marketing teams can effectively leverage the company's compliance achievements."]
];

async function insertRoles() {
  const dataToInsert = roles.map(([name, slug, desc]) => {
    let content = {
      roleName: name,
      heroDescription: desc,
      keyPriorities: [
        { title: `Priority 1 for ${name}`, description: `Detailed description of priority 1 for the ${name} role in the context of SOC 2.` },
        { title: `Priority 2 for ${name}`, description: `Detailed description of priority 2 for the ${name} role in the context of SOC 2.` },
        { title: `Priority 3 for ${name}`, description: `Detailed description of priority 3 for the ${name} role in the context of SOC 2.` },
        { title: `Priority 4 for ${name}`, description: `Detailed description of priority 4 for the ${name} role in the context of SOC 2.` }
      ],
      faqs: [
        { question: `Question 1 for ${name}?`, answer: `Answer 1 specifically tailored for the ${name} role.` },
        { question: `Question 2 for ${name}?`, answer: `Answer 2 specifically tailored for the ${name} role.` },
        { question: `Question 3 for ${name}?`, answer: `Answer 3 specifically tailored for the ${name} role.` }
      ],
      relatedLinks: [
        { label: "SOC 2 Cost Calculator", href: "/soc-2-cost-calculator" },
        { label: "Compliance Checklist", href: "/soc-2-readiness-checklist" }
      ]
    };

    if (slug === "cto") {
      content.keyPriorities = [
        { title: "Infrastructure as Code (IaC)", description: "Ensure all infrastructure changes are version-controlled and peer-reviewed. This provides the primary evidence for change management and configuration baseline controls." },
        { title: "Automated Access Reviews", description: "Manual access reviews are the #1 time-sink for engineering. Implement automated syncing between HRIS and GitHub/AWS to maintain least-privilege without the manual overhead." },
        { title: "SDLC Policy Alignment", description: "Map your existing GitHub PR workflows to SOC 2 change management requirements. Often, your current process is 90% there; it just needs formal documentation." },
        { title: "Vulnerability Management", description: "Set up automated dependency scanning (Dependabot/Snyk) and container scanning. Auditors look for the *process* of remediation, not just the tools." }
      ];
      content.faqs = [
        { question: "Will SOC 2 slow down our deployment frequency?", answer: "Not if implemented correctly. By using automated CI/CD checks for branch protection, peer reviews, and security scans, you can provide \"continuous evidence\" that satisfies auditors while maintaining a high deployment velocity." },
        { question: "How much engineering time does SOC 2 really take?", answer: "Without automation, expect 40-80 hours per year of pure \"busy work\" (screenshots, manual reviews). With a well-architected compliance stack, this can be reduced to less than 10 hours of oversight per year." },
        { question: "Do we need to rewrite our entire SDLC policy?", answer: "Usually no. Most CTOs find that their existing engineering culture (PRs, staging environments, testing) already meets SOC 2 standards. The gap is usually in formalizing these practices into a written policy that matches reality." }
      ];
    } else if (slug === "ciso") {
      content.keyPriorities = [
        { title: "Control Mapping & Reusability", description: "Don't treat SOC 2 in a vacuum. Map your controls to ISO 27001, HIPAA, or NIST CSF. A \"collect once, satisfy many\" approach saves hundreds of hours in the long run." },
        { title: "Risk Assessment Maturity", description: "SOC 2 requires a formal risk assessment. Use this as an opportunity to move beyond a static spreadsheet and implement a continuous risk monitoring process." },
        { title: "Vendor Governance", description: "Your SOC 2 report is only as strong as your subprocessors. Implement a robust vendor risk program that includes reviewing their SOC 2 reports (SOUPIEs)." },
        { title: "Continuous Compliance Monitoring", description: "Shift from \"point-in-time\" audits to continuous monitoring. Use automated tools to alert you when controls drift out of compliance *before* the auditor arrives." }
      ];
      content.faqs = [
        { question: "How do we handle \"Exceptions\" in our SOC 2 report?", answer: "Exceptions happen. The key is how you respond. Auditors look for management responses that show you identified the root cause and implemented a corrective action. A report with a few remediated exceptions is often viewed as more credible than a \"perfect\" report with no findings." },
        { question: "Can we use our SOC 2 controls for ISO 27001?", answer: "Yes. There is roughly an 80% overlap between SOC 2 Security criteria and ISO 27001 Annex A controls. By planning ahead, you can achieve \"Co-Audit\" status where one auditor reviews both frameworks simultaneously." },
        { question: "What is the most common reason for a Qualified Opinion?", answer: "The most common issues are related to change management (missing peer reviews) and access control (failure to offboard employees within the policy timeframe). These are operational failures, not technical ones." }
      ];
    }

    const title = `SOC 2 Compliance for ${name}s | RiscLens`;
    const meta = `A strategic guide to SOC 2 compliance for ${name}s. Learn how to manage the technical audit without slowing down development.`;
    
    return {
      slug,
      title,
      meta_description: meta,
      content_json: content,
      category: 'role'
    };
  });

  console.log(`Upserting ${dataToInsert.length} roles...`);
  
  const { error } = await supabase
    .from('pseo_pages')
    .upsert(dataToInsert, { onConflict: 'slug' });

  if (error) {
    console.error('Error upserting roles:', error);
  } else {
    console.log('Successfully upserted all roles!');
  }
}

insertRoles();
