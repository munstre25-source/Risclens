import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fnlneyelpbfkypkdevdz.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubG5leWVscGJma3lwa2RldmR6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkxMjA5OSwiZXhwIjoyMDgzNDg4MDk5fQ.R6wGgsIDc8X5LDj2J5uIoNSsrk7Wl_z88y-WZXWX2qI';

const supabase = createClient(supabaseUrl, supabaseKey);

interface CityPageData {
  slug: string;
  title: string;
  meta_description: string;
  content_json: {
    cityName: string;
    citySlug: string;
    heroDescription: string;
    localInsights: string[];
    pricingNotes: string[];
    onsitePolicy: string;
    industries: string[];
    remoteVsOnsiteText: string;
    firmReputationText: string;
    automationText: string;
    faqs: { question: string; answer: string }[];
    nearbyCities: { name: string; href: string }[];
  };
}

const cityPages: CityPageData[] = [
  {
    slug: 'denver',
    title: 'SOC 2 Auditors in Denver, CO | RiscLens',
    meta_description: 'Find vetted SOC 2 auditors serving Denver\'s tech ecosystem. Expert CPA firms for fintech, cleantech, and AI startups navigating Colorado compliance.',
    content_json: {
      cityName: 'Denver',
      citySlug: 'denver',
      heroDescription: 'Denver\'s tech ecosystem is booming across fintech, cleantech, and AI. Navigate Colorado\'s unique compliance landscape—including SB205 AI regulations—with auditors who understand the local market.',
      localInsights: [
        'Auditors experienced with Colorado Privacy Act (CPA) alignment.',
        'Growing pool of firms serving fintech and cleantech verticals.',
        'Strong expertise in AI/ML compliance as Colorado leads on AI regulation (SB205).',
      ],
      pricingNotes: [
        'Type I: ~$12k-$18k; competitive rates compared to coastal hubs.',
        'Type II: $18k-$32k depending on scope and Trust Service Criteria.',
        'Denver firms often bundle Colorado Privacy Act assessments with SOC 2.',
      ],
      onsitePolicy: 'Most Denver audits are fully remote. Firms with physical data centers or hybrid cloud setups may request a half-day walkthrough for physical security controls.',
      industries: ['Fintech', 'Cleantech', 'AI/ML', 'Healthcare', 'Real Estate Tech'],
      remoteVsOnsiteText: 'Denver auditors have embraced remote-first operations. However, startups processing sensitive financial or healthcare data may benefit from selecting a local firm that can conduct periodic on-site control reviews, especially if you maintain physical infrastructure in the Denver Tech Center or Boulder.',
      firmReputationText: 'Denver\'s VC ecosystem increasingly demands SOC 2 reports as a baseline for Series A and beyond. A report from a recognized regional or national firm can accelerate your fundraising timeline and enterprise sales cycles.',
      automationText: 'Colorado\'s compliance costs are projected to rise 25% in 2025. Denver startups leveraging Vanta, Drata, or Hyperproof can reduce audit timelines by 40% and cut manual evidence collection significantly.',
      faqs: [
        {
          question: 'How does Colorado\'s AI regulation (SB205) affect SOC 2?',
          answer: 'SB205 focuses on AI-driven discrimination. While separate from SOC 2, auditors familiar with both can help you implement controls that satisfy enterprise buyers concerned about algorithmic fairness and data governance.',
        },
        {
          question: 'Are Denver audit prices lower than SF or NYC?',
          answer: 'Generally yes—Denver firms charge 15-25% less than coastal counterparts for comparable scope, while maintaining high expertise in emerging tech verticals.',
        },
        {
          question: 'What industries do Denver auditors specialize in?',
          answer: 'Denver has strong auditor expertise in fintech, cleantech, real estate tech, and healthcare IT—reflecting the city\'s dominant startup sectors.',
        },
      ],
      nearbyCities: [
        { name: 'Salt Lake City', href: '/auditor-directory/salt-lake-city' },
        { name: 'Austin', href: '/auditor-directory/austin' },
        { name: 'Phoenix', href: '/auditor-directory/phoenix' },
      ],
    },
  },
  {
    slug: 'miami',
    title: 'SOC 2 Auditors in Miami, FL | RiscLens',
    meta_description: 'Connect with SOC 2 auditors serving Miami\'s fintech and crypto ecosystem. CPA firms experienced with Latin American expansion and Florida regulations.',
    content_json: {
      cityName: 'Miami',
      citySlug: 'miami',
      heroDescription: 'Miami has become a fintech and crypto capital, attracting startups from around the world. Find auditors who understand Florida\'s regulatory landscape and can support your Latin American expansion.',
      localInsights: [
        'Expertise in fintech, crypto, and BNPL compliance requirements.',
        'Auditors familiar with Florida Office of Financial Regulation standards.',
        'Bilingual firms supporting LATAM market expansion.',
      ],
      pricingNotes: [
        'Type I: ~$13k-$19k; premium for crypto-specialized audits.',
        'Type II: $22k-$38k depending on regulatory complexity.',
        'Multi-jurisdiction audits (US + LATAM) available from select firms.',
      ],
      onsitePolicy: 'Miami audits are predominantly remote. Firms with physical offices in Wynwood, Brickell, or Miami Beach may request brief on-site visits for physical security validation.',
      industries: ['Fintech', 'Crypto/Web3', 'E-commerce', 'Real Estate Tech', 'Logistics'],
      remoteVsOnsiteText: 'Miami\'s international business community means many auditors are comfortable with remote, cross-border engagements. If you\'re expanding into Latin America, choose a firm with multi-jurisdiction experience.',
      firmReputationText: 'In Miami\'s competitive fintech scene, a SOC 2 report from a firm recognized by major banks and payment processors can open doors with institutional partners and accelerate your money transmitter licensing process.',
      automationText: 'Miami fintechs handling real-time payments and crypto transactions benefit enormously from continuous compliance automation. Ensure your auditor can ingest evidence from modern platforms to avoid manual bottlenecks.',
      faqs: [
        {
          question: 'Do Miami auditors specialize in crypto compliance?',
          answer: 'Yes—Miami\'s emergence as a crypto hub has attracted auditors with deep expertise in digital asset custody, DeFi protocols, and blockchain-based financial services.',
        },
        {
          question: 'How does Florida regulation affect SOC 2 requirements?',
          answer: 'While SOC 2 is not Florida-specific, the state\'s Office of Financial Regulation requires money services businesses to demonstrate robust security controls. SOC 2 reports satisfy many of these requirements.',
        },
        {
          question: 'Can Miami auditors support LATAM expansion?',
          answer: 'Many Miami firms offer bilingual services and understand the compliance requirements for expanding into Brazil, Mexico, Colombia, and other Latin American markets.',
        },
      ],
      nearbyCities: [
        { name: 'Atlanta', href: '/auditor-directory/atlanta' },
        { name: 'Houston', href: '/auditor-directory/houston' },
        { name: 'Dallas', href: '/auditor-directory/dallas' },
      ],
    },
  },
  {
    slug: 'atlanta',
    title: 'SOC 2 Auditors in Atlanta, GA | RiscLens',
    meta_description: 'Find SOC 2 auditors in Atlanta serving fintech, logistics, and enterprise SaaS. CPA firms experienced with high-growth startups and Fortune 500 vendors.',
    content_json: {
      cityName: 'Atlanta',
      citySlug: 'atlanta',
      heroDescription: 'Atlanta is a fintech powerhouse and logistics hub, home to major payment processors and enterprise software companies. Get matched with auditors who understand the demands of Atlanta\'s Fortune 500 buyers.',
      localInsights: [
        'Strong presence of Big 4 and mid-market CPA firms with fintech expertise.',
        'Auditors experienced with payment processing and PCI DSS alignment.',
        'Deep bench of firms serving Fortune 500 vendor compliance requirements.',
      ],
      pricingNotes: [
        'Type I: ~$11k-$17k; competitive Southeast pricing.',
        'Type II: $18k-$30k depending on scope and buyer requirements.',
        'Combined SOC 2 + PCI DSS engagements available from specialized firms.',
      ],
      onsitePolicy: 'Atlanta auditors typically work remotely but can accommodate on-site visits for physical data center reviews or headquarters walkthroughs, particularly for companies serving financial institutions.',
      industries: ['Fintech', 'Payments', 'Logistics', 'Enterprise SaaS', 'Healthcare'],
      remoteVsOnsiteText: 'Atlanta\'s concentration of payment processors and financial institutions means some buyers expect on-site control validation. Choose a local firm if your customers include major banks or payment networks.',
      firmReputationText: 'Atlanta is home to some of the largest payment processors in the world. A SOC 2 report from a firm recognized by Visa, Mastercard, and major banks can dramatically accelerate your partnership discussions.',
      automationText: 'Atlanta\'s fast-growing fintechs and logistics companies benefit from continuous compliance monitoring. Modern auditors familiar with real-time evidence collection can help you maintain always-audit-ready status.',
      faqs: [
        {
          question: 'Why is Atlanta a major fintech hub?',
          answer: 'Atlanta processes over 70% of all US payment transactions. This concentration of payment infrastructure creates strong demand for SOC 2-compliant vendors and auditors with deep payments expertise.',
        },
        {
          question: 'Do Atlanta auditors understand PCI DSS requirements?',
          answer: 'Yes—many Atlanta CPA firms offer combined SOC 2 and PCI DSS assessments, which is ideal for payment-adjacent startups.',
        },
        {
          question: 'What timeline should I expect for an Atlanta SOC 2 audit?',
          answer: 'Typical Type II timelines run 12-16 weeks. Atlanta\'s large pool of qualified auditors means you can often find availability within 4-6 weeks of engagement.',
        },
      ],
      nearbyCities: [
        { name: 'Miami', href: '/auditor-directory/miami' },
        { name: 'Nashville', href: '/auditor-directory/nashville' },
        { name: 'Raleigh', href: '/auditor-directory/raleigh' },
      ],
    },
  },
  {
    slug: 'phoenix',
    title: 'SOC 2 Auditors in Phoenix, AZ | RiscLens',
    meta_description: 'Connect with SOC 2 auditors serving Phoenix\'s semiconductor, fintech, and real estate tech ecosystem. CPA firms for Arizona\'s fastest-growing tech market.',
    content_json: {
      cityName: 'Phoenix',
      citySlug: 'phoenix',
      heroDescription: 'Phoenix ranks 7th among US cities with the most startups, with $34B+ in new investment. Find auditors who understand the unique compliance needs of Arizona\'s semiconductor, fintech, and real estate tech sectors.',
      localInsights: [
        'Growing pool of auditors serving semiconductor and defense contractors.',
        'Expertise in real estate tech and proptech compliance.',
        'Competitive pricing with strong technical capabilities.',
      ],
      pricingNotes: [
        'Type I: ~$10k-$15k; among the most competitive in major metros.',
        'Type II: $16k-$28k depending on industry complexity.',
        'Defense-adjacent audits may require specialized CMMC-aware firms.',
      ],
      onsitePolicy: 'Phoenix audits are typically remote-first. Companies with semiconductor manufacturing or defense contracts may require auditors with appropriate clearances for on-site reviews.',
      industries: ['Real Estate Tech', 'Fintech', 'Semiconductor', 'Healthcare', 'Cleantech'],
      remoteVsOnsiteText: 'Phoenix\'s sprawling metro means most auditors prefer remote engagements. However, the semiconductor boom has brought specialized firms capable of on-site assessments for sensitive manufacturing environments.',
      firmReputationText: 'With Intel, TSMC, and other semiconductor giants establishing major facilities, Phoenix startups in the supply chain benefit from SOC 2 reports that meet the stringent requirements of these enterprise buyers.',
      automationText: 'Phoenix\'s fast-growing tech scene benefits from automation-forward auditors. With compliance costs rising 25% in 2025, automation tools can help maintain margins while meeting enterprise buyer requirements.',
      faqs: [
        {
          question: 'How does the semiconductor industry affect Phoenix SOC 2 requirements?',
          answer: 'Semiconductor supply chain vendors often face stringent security requirements. SOC 2 reports demonstrate the controls necessary to work with Intel, TSMC, and other major manufacturers.',
        },
        {
          question: 'Is Phoenix more affordable than other tech hubs for audits?',
          answer: 'Yes—Phoenix audit fees typically run 20-30% lower than coastal markets while delivering comparable quality, reflecting the city\'s lower cost structure.',
        },
        {
          question: 'What industries dominate Phoenix\'s tech scene?',
          answer: 'Real estate tech, fintech, semiconductor/manufacturing tech, and healthcare IT are the dominant sectors, with strong growth in cleantech and sustainability.',
        },
      ],
      nearbyCities: [
        { name: 'Denver', href: '/auditor-directory/denver' },
        { name: 'Los Angeles', href: '/auditor-directory/los-angeles' },
        { name: 'Salt Lake City', href: '/auditor-directory/salt-lake-city' },
      ],
    },
  },
  {
    slug: 'salt-lake-city',
    title: 'SOC 2 Auditors in Salt Lake City, UT | RiscLens',
    meta_description: 'Find SOC 2 auditors in Salt Lake City\'s Silicon Slopes. CPA firms serving Utah\'s AI, SaaS, and enterprise software ecosystem.',
    content_json: {
      cityName: 'Salt Lake City',
      citySlug: 'salt-lake-city',
      heroDescription: 'Silicon Slopes is home to Qualtrics, Domo, and a thriving AI/SaaS ecosystem. Connect with auditors who understand Utah\'s enterprise software market and can support your growth trajectory.',
      localInsights: [
        'Strong concentration of auditors serving enterprise SaaS and AI companies.',
        '22.9% tech job growth—well above national average.',
        'Expertise in serving companies scaling to enterprise buyers.',
      ],
      pricingNotes: [
        'Type I: ~$11k-$16k; competitive mountain region pricing.',
        'Type II: $18k-$30k for comprehensive enterprise-ready audits.',
        'Volume discounts available for multi-product SaaS companies.',
      ],
      onsitePolicy: 'Salt Lake City auditors work primarily remote. Companies along the Wasatch Front (Lehi, Provo, SLC) can arrange on-site visits if needed for physical security reviews.',
      industries: ['Enterprise SaaS', 'AI/ML', 'Fintech', 'E-commerce', 'Healthcare Tech'],
      remoteVsOnsiteText: 'Utah\'s concentrated tech corridor makes local auditors accessible for in-person meetings when needed, but most engagements proceed fully remotely with automated evidence collection.',
      firmReputationText: 'Silicon Slopes companies often sell to Fortune 500 enterprises. A SOC 2 report from a recognized firm is table stakes for closing enterprise deals and satisfying procurement requirements.',
      automationText: 'Utah\'s SaaS-heavy ecosystem means most startups already use modern tech stacks. Auditors comfortable with API-based evidence collection and continuous monitoring can significantly accelerate your audit timeline.',
      faqs: [
        {
          question: 'Why is Salt Lake City called Silicon Slopes?',
          answer: 'The nickname reflects the concentration of tech companies along the Wasatch Front, from Salt Lake City through Lehi and Provo, combined with Utah\'s famous skiing.',
        },
        {
          question: 'What makes SLC auditors different?',
          answer: 'SLC auditors have deep experience with enterprise SaaS companies and understand the specific controls enterprise buyers demand, including SSO integration, audit logging, and data residency.',
        },
        {
          question: 'How competitive is SLC audit pricing?',
          answer: 'Salt Lake City offers 10-20% lower pricing than coastal markets while maintaining high quality, thanks to Utah\'s strong CPA talent pipeline and lower operating costs.',
        },
      ],
      nearbyCities: [
        { name: 'Denver', href: '/auditor-directory/denver' },
        { name: 'Phoenix', href: '/auditor-directory/phoenix' },
        { name: 'Seattle', href: '/auditor-directory/seattle' },
      ],
    },
  },
  {
    slug: 'raleigh',
    title: 'SOC 2 Auditors in Raleigh-Durham, NC | RiscLens',
    meta_description: 'Connect with SOC 2 auditors in the Research Triangle. CPA firms serving healthcare, biotech, and enterprise software companies in Raleigh-Durham.',
    content_json: {
      cityName: 'Raleigh-Durham',
      citySlug: 'raleigh',
      heroDescription: 'The Research Triangle combines world-class universities, major tech employers like Red Hat, and a thriving startup scene. Find auditors who understand the compliance demands of healthcare, biotech, and enterprise software.',
      localInsights: [
        '4th highest concentration of PhDs supporting sophisticated compliance needs.',
        'Strong expertise in healthcare/biotech regulatory alignment.',
        'Defense tech concentration near Fort Bragg requires specialized auditors.',
      ],
      pricingNotes: [
        'Type I: ~$11k-$16k; competitive Southeast pricing.',
        'Type II: $18k-$32k depending on regulatory complexity.',
        'Healthcare-adjacent audits may include HIPAA alignment at additional cost.',
      ],
      onsitePolicy: 'Research Triangle auditors typically work remotely. Companies with clinical trial data or defense contracts may require auditors capable of specialized on-site reviews.',
      industries: ['Healthcare IT', 'Biotech/Pharma', 'Enterprise Software', 'Defense Tech', 'Fintech'],
      remoteVsOnsiteText: 'The Triangle\'s strong healthcare and defense presence means some auditors specialize in on-site assessments for sensitive environments. Choose accordingly based on your customer requirements.',
      firmReputationText: 'With major enterprises like Red Hat, Cisco, and SAS headquartered nearby, Triangle startups benefit from auditors who understand enterprise procurement cycles and can deliver reports that meet Fortune 500 standards.',
      automationText: 'Research Triangle companies often have sophisticated engineering teams. Ensure your auditor can integrate with your existing CI/CD pipelines and cloud infrastructure for seamless evidence collection.',
      faqs: [
        {
          question: 'How does the Research Triangle\'s healthcare focus affect SOC 2?',
          answer: 'Healthcare IT companies often need combined SOC 2 + HIPAA assessments. Many Triangle auditors offer bundled engagements that address both frameworks efficiently.',
        },
        {
          question: 'Are there auditors experienced with defense contracts?',
          answer: 'Yes—the Triangle\'s proximity to Fort Bragg and defense contractors means several firms specialize in CMMC, FedRAMP, and SOC 2 for government-adjacent companies.',
        },
        {
          question: 'What\'s the Triangle\'s advantage for compliance?',
          answer: 'North Carolina\'s business-friendly environment and corporate tax phase-out (2.25% in 2025, eliminating by 2030) make it attractive for compliance-conscious startups.',
        },
      ],
      nearbyCities: [
        { name: 'Atlanta', href: '/auditor-directory/atlanta' },
        { name: 'Washington DC', href: '/auditor-directory/washington-dc' },
        { name: 'Nashville', href: '/auditor-directory/nashville' },
      ],
    },
  },
  {
    slug: 'nashville',
    title: 'SOC 2 Auditors in Nashville, TN | RiscLens',
    meta_description: 'Find SOC 2 auditors in Nashville, America\'s healthcare IT capital. CPA firms serving healthtech, fintech, and enterprise software startups.',
    content_json: {
      cityName: 'Nashville',
      citySlug: 'nashville',
      heroDescription: 'Nashville ranks in the top 30 global startup ecosystems with 11 unicorns and leads in healthcare IT. Find auditors who understand the unique compliance requirements of healthtech and fintech.',
      localInsights: [
        'Healthcare IT expertise—home to CareBridge, Monogram Health, and major health systems.',
        '36.1% tech workforce growth since 2015—fastest in the nation.',
        'Strong fintech presence with firms like Built Technologies and Wealth Access.',
      ],
      pricingNotes: [
        'Type I: ~$10k-$15k; excellent value for healthcare-specialized audits.',
        'Type II: $17k-$28k with HIPAA alignment available.',
        'Average tech salary of $72,645 keeps operating costs competitive.',
      ],
      onsitePolicy: 'Nashville auditors primarily work remotely. Healthcare companies with physical patient data handling may benefit from auditors who can conduct on-site PHI security reviews.',
      industries: ['Healthcare IT', 'Fintech', 'Enterprise SaaS', 'Logistics', 'Music/Entertainment Tech'],
      remoteVsOnsiteText: 'Nashville\'s healthcare focus means many auditors understand the specific physical security requirements for companies handling PHI. Remote-first is standard, but on-site capabilities exist for healthcare environments.',
      firmReputationText: 'With Vanderbilt Medical Center, HCA Healthcare, and numerous health systems headquartered here, a SOC 2 report from a healthcare-savvy auditor can accelerate partnership discussions across the ecosystem.',
      automationText: 'Nashville\'s healthtech companies benefit from auditors who understand HIPAA-SOC 2 integration. Modern GRC platforms can help maintain continuous compliance across both frameworks.',
      faqs: [
        {
          question: 'Why is Nashville called the "Healthcare IT Capital"?',
          answer: 'Nashville is home to HCA Healthcare, Vanderbilt University Medical Center, and dozens of healthtech startups. The city\'s healthcare expertise creates strong demand for compliance-savvy auditors.',
        },
        {
          question: 'Do Nashville auditors combine SOC 2 with HIPAA?',
          answer: 'Yes—many Nashville firms specialize in combined SOC 2 + HIPAA assessments, which is efficient for healthtech startups serving covered entities.',
        },
        {
          question: 'How does Nashville pricing compare to other hubs?',
          answer: 'Nashville offers 25-35% lower audit costs than coastal markets while providing deep healthcare domain expertise unavailable in most other cities.',
        },
      ],
      nearbyCities: [
        { name: 'Atlanta', href: '/auditor-directory/atlanta' },
        { name: 'Raleigh', href: '/auditor-directory/raleigh' },
        { name: 'Chicago', href: '/auditor-directory/chicago' },
      ],
    },
  },
  {
    slug: 'minneapolis',
    title: 'SOC 2 Auditors in Minneapolis, MN | RiscLens',
    meta_description: 'Connect with SOC 2 auditors serving Minneapolis\'s healthtech, fintech, and enterprise software ecosystem. CPA firms for Minnesota\'s growing tech scene.',
    content_json: {
      cityName: 'Minneapolis',
      citySlug: 'minneapolis',
      heroDescription: 'Minneapolis shows a 68% startup success rate and employs 12.4% of Minnesota\'s workforce in tech. Find auditors who understand the compliance needs of healthtech, fintech, and enterprise software.',
      localInsights: [
        'Ranks #22 globally for healthtech startups.',
        'Strong fintech presence including Branch ($638M+ raised) and Sezzle.',
        'Deep expertise in data protection and enterprise security.',
      ],
      pricingNotes: [
        'Type I: ~$11k-$16k; competitive Midwest pricing.',
        'Type II: $18k-$30k depending on complexity.',
        'Healthcare-adjacent audits available with HIPAA integration.',
      ],
      onsitePolicy: 'Minneapolis auditors work primarily remotely. Companies with Fortune 500 clients like Target, UnitedHealth, or Best Buy may benefit from local auditors who understand enterprise requirements.',
      industries: ['Healthcare Tech', 'Fintech', 'Enterprise Software', 'Retail Tech', 'Medical Devices'],
      remoteVsOnsiteText: 'Minneapolis\'s concentration of Fortune 500 headquarters means local auditors understand enterprise procurement requirements. Remote audits are standard, but local presence can help with client relationship building.',
      firmReputationText: 'With UnitedHealth, Target, and Best Buy headquartered in the Twin Cities, Minneapolis startups benefit from auditors who understand the specific vendor security requirements of these enterprise buyers.',
      automationText: 'Minneapolis companies like Code42 and Perforce specialize in data protection and security. Local auditors are often well-versed in enterprise security tooling and can efficiently validate modern DevSecOps practices.',
      faqs: [
        {
          question: 'What industries drive Minneapolis tech?',
          answer: 'Healthcare tech, fintech (especially BNPL and digital wallets), and enterprise software serving Fortune 500 companies headquartered in the Twin Cities.',
        },
        {
          question: 'Are Minneapolis auditors familiar with medical device compliance?',
          answer: 'Yes—the Twin Cities have a strong medtech presence (Medtronic nearby). Many auditors understand FDA and healthcare regulatory alignment.',
        },
        {
          question: 'How do Fortune 500 buyers affect auditor selection?',
          answer: 'Minneapolis\'s concentration of major retailers and healthcare companies means auditors here often have deep experience satisfying enterprise security questionnaires and vendor risk assessments.',
        },
      ],
      nearbyCities: [
        { name: 'Chicago', href: '/auditor-directory/chicago' },
        { name: 'Denver', href: '/auditor-directory/denver' },
        { name: 'Detroit', href: '/auditor-directory/detroit' },
      ],
    },
  },
  {
    slug: 'portland',
    title: 'SOC 2 Auditors in Portland, OR | RiscLens',
    meta_description: 'Find SOC 2 auditors in Portland serving cleantech, cybersecurity, and SaaS startups. CPA firms for Oregon\'s growing tech ecosystem.',
    content_json: {
      cityName: 'Portland',
      citySlug: 'portland',
      heroDescription: 'Portland\'s startup ecosystem grew 14.3% in 2025 with 723+ startups. Find auditors who understand the compliance needs of cleantech, cybersecurity, and SaaS companies.',
      localInsights: [
        'Ranks #34 globally for energy and environment startups.',
        'Growing cybersecurity sector with companies like ConductorOne.',
        'Strong sustainability and cleantech focus unique to the region.',
      ],
      pricingNotes: [
        'Type I: ~$11k-$17k; competitive Pacific Northwest pricing.',
        'Type II: $19k-$32k depending on scope.',
        'Cleantech-focused audits available from specialized firms.',
      ],
      onsitePolicy: 'Portland auditors work remotely by default. Companies with physical manufacturing or cleantech operations may benefit from auditors capable of facility walkthroughs.',
      industries: ['Cleantech', 'Cybersecurity', 'SaaS', 'E-commerce', 'EdTech'],
      remoteVsOnsiteText: 'Portland\'s remote-friendly culture extends to audits. Most engagements proceed fully remotely, though cleantech companies with manufacturing may need occasional on-site reviews.',
      firmReputationText: 'Portland\'s emphasis on sustainability means buyers increasingly expect vendors to demonstrate strong governance. A SOC 2 report signals operational maturity that aligns with Portland\'s values-driven business culture.',
      automationText: 'Portland\'s cybersecurity focus (ConductorOne, etc.) means local auditors understand modern identity and access management. They can efficiently validate sophisticated permission management and zero-trust architectures.',
      faqs: [
        {
          question: 'What makes Portland\'s tech scene unique?',
          answer: 'Portland combines sustainability focus, strong cybersecurity expertise, and a creative culture that attracts companies building mission-driven products.',
        },
        {
          question: 'Are Portland auditors experienced with cleantech?',
          answer: 'Yes—Portland ranks #34 globally for energy/environment startups, and local auditors understand the unique compliance needs of IoT-enabled sustainability solutions.',
        },
        {
          question: 'How does Portland pricing compare to Seattle?',
          answer: 'Portland typically offers 10-15% lower audit fees than Seattle while providing comparable expertise, reflecting lower operating costs.',
        },
      ],
      nearbyCities: [
        { name: 'Seattle', href: '/auditor-directory/seattle' },
        { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
        { name: 'Salt Lake City', href: '/auditor-directory/salt-lake-city' },
      ],
    },
  },
  {
    slug: 'washington-dc',
    title: 'SOC 2 Auditors in Washington DC | RiscLens',
    meta_description: 'Connect with SOC 2 auditors serving DC\'s govtech and cybersecurity ecosystem. CPA firms experienced with FedRAMP, CMMC, and federal contractor requirements.',
    content_json: {
      cityName: 'Washington DC',
      citySlug: 'washington-dc',
      heroDescription: 'Washington DC\'s tech scene is dominated by government contracts, cybersecurity, and govtech. Find auditors who understand FedRAMP, CMMC, and the unique requirements of federal buyers.',
      localInsights: [
        'Deep expertise in FedRAMP and CMMC compliance pathways.',
        'Strong concentration of cleared auditors for defense contractors.',
        'Government procurement experience critical for DC-based startups.',
      ],
      pricingNotes: [
        'Type I: ~$14k-$22k; premium for government-experienced firms.',
        'Type II: $25k-$45k for comprehensive federal-ready audits.',
        'FedRAMP readiness assessments available at additional cost.',
      ],
      onsitePolicy: 'DC auditors often require security clearances for on-site reviews. Many engagements can proceed remotely, but defense contractors may need auditors with appropriate access.',
      industries: ['GovTech', 'Cybersecurity', 'Defense Tech', 'Healthcare IT', 'Fintech'],
      remoteVsOnsiteText: 'DC\'s security-conscious environment means auditors understand classified and controlled environments. Choose firms with appropriate clearances if you handle government data.',
      firmReputationText: 'Federal procurement teams have specific requirements for vendor security reports. A SOC 2 from a firm recognized by GSA and major agencies can streamline your Authority to Operate (ATO) process.',
      automationText: 'DC\'s compliance requirements are among the most demanding in the country. Continuous compliance automation is essential for maintaining the always-audit-ready posture federal buyers expect.',
      faqs: [
        {
          question: 'How does FedRAMP relate to SOC 2?',
          answer: 'SOC 2 and FedRAMP have overlapping controls. Many DC auditors help companies use SOC 2 as a stepping stone to FedRAMP authorization, reducing overall compliance burden.',
        },
        {
          question: 'Do DC auditors need security clearances?',
          answer: 'For some engagements—particularly those involving classified systems or CUI—auditors may need appropriate clearances. Many DC firms maintain cleared staff.',
        },
        {
          question: 'Is DC pricing higher than other markets?',
          answer: 'Yes—DC audit fees run 15-30% higher than average due to the specialized expertise required for government-adjacent work and the premium on cleared personnel.',
        },
      ],
      nearbyCities: [
        { name: 'Raleigh', href: '/auditor-directory/raleigh' },
        { name: 'New York', href: '/auditor-directory/new-york' },
        { name: 'Boston', href: '/auditor-directory/boston' },
      ],
    },
  },
  {
    slug: 'san-diego',
    title: 'SOC 2 Auditors in San Diego, CA | RiscLens',
    meta_description: 'Find SOC 2 auditors in San Diego serving biotech, defense, and software startups. CPA firms for Southern California\'s diverse tech ecosystem.',
    content_json: {
      cityName: 'San Diego',
      citySlug: 'san-diego',
      heroDescription: 'San Diego combines biotech leadership, a strong defense presence, and a growing software scene. Find auditors who understand the compliance needs of Southern California\'s diverse tech ecosystem.',
      localInsights: [
        'Biotech and life sciences expertise from proximity to major research institutions.',
        'Defense tech concentration near military installations.',
        'Growing software and SaaS scene with lower costs than LA/SF.',
      ],
      pricingNotes: [
        'Type I: ~$12k-$18k; more affordable than other California markets.',
        'Type II: $20k-$35k depending on industry complexity.',
        'Biotech-focused audits may include GxP alignment considerations.',
      ],
      onsitePolicy: 'San Diego auditors work primarily remotely. Biotech companies with lab environments or defense contractors may require specialized on-site assessments.',
      industries: ['Biotech', 'Defense Tech', 'SaaS', 'Healthcare', 'Cleantech'],
      remoteVsOnsiteText: 'San Diego\'s biotech and defense sectors sometimes require on-site audits. Choose firms familiar with laboratory environments and controlled facilities if applicable to your business.',
      firmReputationText: 'San Diego\'s research institutions and defense presence mean buyers often have sophisticated compliance requirements. A report from a firm with relevant domain expertise signals credibility to discerning buyers.',
      automationText: 'San Diego\'s tech companies benefit from California\'s strong engineering talent pool. Ensure your auditor can work with modern infrastructure and automated evidence collection to minimize disruption.',
      faqs: [
        {
          question: 'How does San Diego pricing compare to San Francisco?',
          answer: 'San Diego audit fees typically run 20-30% lower than San Francisco while maintaining high quality, reflecting lower operating costs.',
        },
        {
          question: 'Are there auditors experienced with biotech compliance?',
          answer: 'Yes—San Diego\'s biotech cluster has attracted auditors who understand GxP, FDA requirements, and the unique controls needed for life sciences companies.',
        },
        {
          question: 'What about defense contractor requirements?',
          answer: 'San Diego\'s military presence means several firms specialize in CMMC, ITAR, and DoD-specific compliance requirements in addition to SOC 2.',
        },
      ],
      nearbyCities: [
        { name: 'Los Angeles', href: '/auditor-directory/los-angeles' },
        { name: 'Phoenix', href: '/auditor-directory/phoenix' },
        { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
      ],
    },
  },
];

async function seedCityPages() {
  console.log('Starting city page seeding...');

  for (const city of cityPages) {
    const pageData = {
      slug: city.slug,
      title: city.title,
      meta_description: city.meta_description,
      content_json: city.content_json,
      category: 'directory',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('pseo_pages')
      .upsert(pageData, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error seeding ${city.slug}:`, error.message);
    } else {
      console.log(`✓ Seeded: ${city.slug}`);
    }
  }

  console.log('City page seeding complete!');
}

seedCityPages().catch(console.error);
