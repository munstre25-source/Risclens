const cities = [
  { name: 'Seattle', state: 'WA', slug: 'seattle', industries: ['Cloud Computing', 'E-commerce', 'AI/ML', 'Biotech'] },
  { name: 'Los Angeles', state: 'CA', slug: 'los-angeles', industries: ['Media & Entertainment', 'Aerospace', 'Fintech', 'SaaS'] },
  { name: 'Chicago', state: 'IL', slug: 'chicago', industries: ['Logistics', 'Trading & Finance', 'Manufacturing Tech', 'FoodTech'] },
  { name: 'Houston', state: 'TX', slug: 'houston', industries: ['Energy Tech', 'Healthcare', 'Aerospace', 'B2B SaaS'] },
  { name: 'Dallas', state: 'TX', slug: 'dallas', industries: ['Telecommunications', 'Financial Services', 'Defense', 'Enterprise Software'] },
  { name: 'Boston', state: 'MA', slug: 'boston', industries: ['Biotech', 'Robotics', 'EdTech', 'Fintech'] },
  { name: 'Washington DC', state: 'DC', slug: 'washington-dc', industries: ['GovTech', 'Cybersecurity', 'Defense', 'SaaS'] },
  { name: 'San Diego', state: 'CA', slug: 'san-diego', industries: ['Life Sciences', 'Telecommunications', 'Defense', 'Cybersecurity'] },
  { name: 'San Jose', state: 'CA', slug: 'san-jose', industries: ['Semiconductors', 'SaaS', 'Hardware', 'Networking'] },
  { name: 'Philadelphia', state: 'PA', slug: 'philadelphia', industries: ['Healthcare', 'Biotech', 'Financial Services', 'Logistics'] },
  { name: 'Las Vegas', state: 'NV', slug: 'las-vegas', industries: ['Gaming Tech', 'Hospitality Tech', 'Logistics', 'Fintech'] },
  { name: 'Charlotte', state: 'NC', slug: 'charlotte', industries: ['Banking', 'Fintech', 'Energy', 'SaaS'] },
  { name: 'Tampa', state: 'FL', slug: 'tampa', industries: ['Cybersecurity', 'Fintech', 'Supply Chain', 'HealthTech'] },
  { name: 'Orlando', state: 'FL', slug: 'orlando', industries: ['Simulation & Training', 'Entertainment Tech', 'Space Tech', 'SaaS'] },
  { name: 'Indianapolis', state: 'IN', slug: 'indianapolis', industries: ['MarTech', 'SaaS', 'Logistics', 'HealthTech'] },
  { name: 'Columbus', state: 'OH', slug: 'columbus', industries: ['InsurTech', 'Fintech', 'Retail Tech', 'Logistics'] },
  { name: 'St. Louis', state: 'MO', slug: 'st-louis', industries: ['AgTech', 'Biotech', 'Financial Services', 'SaaS'] },
  { name: 'Pittsburgh', state: 'PA', slug: 'pittsburgh', industries: ['AI & Robotics', 'Autonomous Vehicles', 'Healthcare', 'EdTech'] },
  { name: 'Detroit', state: 'MI', slug: 'detroit', industries: ['AutoTech', 'Manufacturing', 'Fintech', 'SaaS'] },
  { name: 'Kansas City', state: 'MO', slug: 'kansas-city', industries: ['HealthTech', 'Telecommunications', 'Fintech', 'Animal Health'] },
  { name: 'Baltimore', state: 'MD', slug: 'baltimore', industries: ['Cybersecurity', 'Life Sciences', 'EdTech', 'HealthTech'] },
  { name: 'Sacramento', state: 'CA', slug: 'sacramento', industries: ['GovTech', 'AgTech', 'HealthTech', 'Clean Energy'] },
  { name: 'San Antonio', state: 'TX', slug: 'san-antonio', industries: ['Cybersecurity', 'Defense', 'Fintech', 'BioMed'] },
  { name: 'Jacksonville', state: 'FL', slug: 'jacksonville', industries: ['Fintech', 'Logistics', 'Healthcare', 'InsurTech'] },
  { name: 'Memphis', state: 'TN', slug: 'memphis', industries: ['Logistics', 'Biotech', 'Healthcare', 'Supply Chain Tech'] },
  { name: 'Louisville', state: 'KY', slug: 'louisville', industries: ['Logistics', 'Healthcare', 'Manufacturing Tech', 'SaaS'] },
  { name: 'Milwaukee', state: 'WI', slug: 'milwaukee', industries: ['Manufacturing Tech', 'Fintech', 'Healthcare', 'EdTech'] },
  { name: 'Albuquerque', state: 'NM', slug: 'albuquerque', industries: ['Space Tech', 'Energy Tech', 'Biotech', 'Defense'] },
  { name: 'Tucson', state: 'AZ', slug: 'tucson', industries: ['Aerospace', 'Defense', 'Optics', 'Biotech'] },
  { name: 'Fresno', state: 'CA', slug: 'fresno', industries: ['AgTech', 'FoodTech', 'Logistics', 'SaaS'] },
  { name: 'Mesa', state: 'AZ', slug: 'mesa', industries: ['Aerospace', 'Healthcare', 'Education Tech', 'Manufacturing'] },
  { name: 'Omaha', state: 'NE', slug: 'omaha', industries: ['Fintech', 'InsurTech', 'Logistics', 'AgTech'] },
  { name: 'Colorado Springs', state: 'CO', slug: 'colorado-springs', industries: ['Defense', 'Aerospace', 'Cybersecurity', 'SaaS'] },
  { name: 'Long Beach', state: 'CA', slug: 'long-beach', industries: ['Aerospace', 'Logistics', 'Clean Energy', 'HealthTech'] },
  { name: 'Virginia Beach', state: 'VA', slug: 'virginia-beach', industries: ['Defense', 'Cybersecurity', 'Logistics', 'SaaS'] },
  { name: 'Oakland', state: 'CA', slug: 'oakland', industries: ['CleanTech', 'Fintech', 'Healthcare', 'Logistics'] },
  { name: 'Tulsa', state: 'OK', slug: 'tulsa', industries: ['Energy Tech', 'Aerospace', 'Cybersecurity', 'Fintech'] },
  { name: 'Arlington', state: 'TX', slug: 'arlington', industries: ['Aerospace', 'E-commerce', 'Defense', 'SaaS'] },
  { name: 'New Orleans', state: 'LA', slug: 'new-orleans', industries: ['Clean Energy', 'Digital Media', 'Logistics', 'HealthTech'] },
  { name: 'Wichita', state: 'KS', slug: 'wichita', industries: ['Aerospace', 'Manufacturing', 'Logistics', 'AgTech'] },
  { name: 'Cleveland', state: 'OH', slug: 'cleveland', industries: ['HealthTech', 'Manufacturing', 'Financial Services', 'Biotech'] },
  { name: 'Bakersfield', state: 'CA', slug: 'bakersfield', industries: ['Energy Tech', 'AgTech', 'Logistics', 'SaaS'] },
  { name: 'Aurora', state: 'CO', slug: 'aurora', industries: ['Aerospace', 'Bioscience', 'Defense', 'SaaS'] },
  { name: 'Anaheim', state: 'CA', slug: 'anaheim', industries: ['Entertainment Tech', 'Manufacturing', 'Aerospace', 'HealthTech'] },
  { name: 'Honolulu', state: 'HI', slug: 'honolulu', industries: ['Clean Energy', 'Defense', 'GovTech', 'Hospitality Tech'] },
  { name: 'Santa Ana', state: 'CA', slug: 'santa-ana', industries: ['Fintech', 'Aerospace', 'Healthcare', 'SaaS'] },
  { name: 'Riverside', state: 'CA', slug: 'riverside', industries: ['Logistics', 'CleanTech', 'HealthTech', 'Manufacturing'] },
  { name: 'Corpus Christi', state: 'TX', slug: 'corpus-christi', industries: ['Energy Tech', 'Logistics', 'Manufacturing', 'Aerospace'] },
  { name: 'Lexington', state: 'KY', slug: 'lexington', industries: ['AgTech', 'Biotech', 'Manufacturing', 'SaaS'] },
  { name: 'Henderson', state: 'NV', slug: 'henderson', industries: ['HealthTech', 'Fintech', 'Manufacturing', 'Hospitality Tech'] },
  { name: 'Stockton', state: 'CA', slug: 'stockton', industries: ['Logistics', 'AgTech', 'Manufacturing', 'SaaS'] },
  { name: 'Saint Paul', state: 'MN', slug: 'saint-paul', industries: ['Healthcare', 'Manufacturing', 'Financial Services', 'EdTech'] },
  { name: 'Cincinnati', state: 'OH', slug: 'cincinnati', industries: ['Consumer Goods Tech', 'Fintech', 'Logistics', 'HealthTech'] },
  { name: 'Greensboro', state: 'NC', slug: 'greensboro', industries: ['Aviation', 'Supply Chain Tech', 'SaaS', 'Manufacturing'] },
  { name: 'Plano', state: 'TX', slug: 'plano', industries: ['Telecommunications', 'Fintech', 'Retail Tech', 'SaaS'] },
  { name: 'Newark', state: 'NJ', slug: 'newark', industries: ['Logistics', 'Fintech', 'Healthcare', 'Cybersecurity'] },
  { name: 'Lincoln', state: 'NE', slug: 'lincoln', industries: ['AgTech', 'InsurTech', 'Software Development', 'Manufacturing'] },
  { name: 'Toledo', state: 'OH', slug: 'toledo', industries: ['Manufacturing Tech', 'Energy', 'Logistics', 'HealthTech'] },
  { name: 'Irvine', state: 'CA', slug: 'irvine', industries: ['Cybersecurity', 'BioMed', 'Gaming Tech', 'SaaS'] },
  { name: 'Fort Wayne', state: 'IN', slug: 'fort-wayne', industries: ['Manufacturing', 'Logistics', 'InsurTech', 'SaaS'] },
  { name: 'Jersey City', state: 'NJ', slug: 'jersey-city', industries: ['Fintech', 'Financial Services', 'Data Centers', 'SaaS'] },
  { name: 'Durham', state: 'NC', slug: 'durham', industries: ['Life Sciences', 'CleanTech', 'EdTech', 'SaaS'] },
  { name: 'St. Petersburg', state: 'FL', slug: 'st-petersburg', industries: ['Fintech', 'Marine Tech', 'Data Analytics', 'SaaS'] },
  { name: 'Laredo', state: 'TX', slug: 'laredo', industries: ['Logistics', 'Trade Tech', 'Manufacturing', 'SaaS'] },
  { name: 'Lubbock', state: 'TX', slug: 'lubbock', industries: ['AgTech', 'Energy Tech', 'Healthcare', 'Education'] },
  { name: 'Madison', state: 'WI', slug: 'madison', industries: ['HealthTech', 'Biotech', 'InsurTech', 'EdTech'] },
  { name: 'Gilbert', state: 'AZ', slug: 'gilbert', industries: ['Aerospace', 'Clean Energy', 'Healthcare', 'SaaS'] },
  { name: 'Reno', state: 'NV', slug: 'reno', industries: ['Logistics', 'CleanTech', 'Fintech', 'Data Centers'] },
  { name: 'Buffalo', state: 'NY', slug: 'buffalo', industries: ['HealthTech', 'Fintech', 'Manufacturing Tech', 'Advanced Materials'] },
  { name: 'Glendale', state: 'AZ', slug: 'glendale', industries: ['Manufacturing', 'Healthcare', 'Aviation', 'SaaS'] },
  { name: 'North Las Vegas', state: 'NV', slug: 'north-las-vegas', industries: ['Logistics', 'Manufacturing', 'Renewable Energy', 'Fintech'] },
  { name: 'Winston-Salem', state: 'NC', slug: 'winston-salem', industries: ['Fintech', 'HealthTech', 'Biotech', 'Manufacturing'] },
  { name: 'Chesapeake', state: 'VA', slug: 'chesapeake', industries: ['Logistics', 'Defense', 'Manufacturing', 'Cybersecurity'] },
  { name: 'Norfolk', state: 'VA', slug: 'norfolk', industries: ['Maritime Tech', 'Defense', 'Logistics', 'Cybersecurity'] },
  { name: 'Fremont', state: 'CA', slug: 'fremont', industries: ['Hardware', 'Clean Energy', 'Manufacturing', 'BioMed'] },
  { name: 'Garland', state: 'TX', slug: 'garland', industries: ['Manufacturing', 'Logistics', 'Telecommunications', 'SaaS'] },
  { name: 'Irving', state: 'TX', slug: 'irving', industries: ['Fintech', 'Cybersecurity', 'Enterprise Software', 'Healthcare'] },
  { name: 'Hialeah', state: 'FL', slug: 'hialeah', industries: ['Manufacturing', 'Logistics', 'Healthcare', 'Supply Chain Tech'] },
  { name: 'Boise', state: 'ID', slug: 'boise', industries: ['Semiconductors', 'AgTech', 'SaaS', 'Healthcare'] },
  { name: 'Richmond', state: 'VA', slug: 'richmond', industries: ['Financial Services', 'Supply Chain Tech', 'Healthcare', 'SaaS'] },
];

function generateSQL(city) {
  const contentJson = {
    cityName: city.name,
    citySlug: city.slug,
    heroDescription: `Connect with top-tier SOC 2 auditors and CPA firms in ${city.name}. Specializing in ${city.industries.join(', ')} to help ${city.state} startups and enterprises scale securely.`,
    localInsights: [
      `${city.name}'s tech ecosystem is rapidly expanding, with a strong focus on ${city.industries[0]} and ${city.industries[1]}.`,
      `Local auditors are deeply familiar with ${city.state} regulatory requirements and regional business standards.`,
      `The average timeline for SOC 2 Type II in ${city.name} ranges from 3-6 months for established teams.`
    ],
    pricingNotes: [
      `Audit fees in ${city.name} typically follow standard ${city.state} market rates, often more competitive than coastal tech hubs.`,
      `Most firms offer fixed-fee engagements for Type I and Type II audits to provide budget certainty.`
    ],
    industries: city.industries,
    onsitePolicy: "Flexible: Many firms offer fully remote audits, though local firms can provide onsite walkthroughs if requested.",
    remoteVsOnsiteText: `While the majority of SOC 2 evidence collection is now handled through automated platforms, having a local ${city.name} auditor can be beneficial for on-site facility tours or in-person strategy sessions.`,
    firmReputationText: `We feature CPA firms with deep roots in the ${city.state} business community, known for their pragmatic approach to security compliance.`,
    automationText: `Our recommended auditors in ${city.name} are experts in modern compliance automation, significantly reducing the manual effort for your engineering team.`,
    faqs: [
      {
        question: `How much does a SOC 2 audit cost in ${city.name}?`,
        answer: `Costs vary based on scope, but ${city.name} startups typically see audit fees between $15,000 and $35,000, depending on the number of Trust Services Criteria selected.`
      },
      {
        question: `Are there auditors in ${city.name} who specialize in ${city.industries[0]}?`,
        answer: `Yes, ${city.name} has several specialized CPA firms that focus on ${city.industries[0]}, ensuring they understand your specific tech stack and operational risks.`
      },
      {
        question: `Can I use a remote auditor for my ${city.name} business?`,
        answer: "Absolutely. Many companies in the area use national firms. However, local auditors often have better availability for the 'readiness' phase."
      }
    ],
    nearbyCities: [
      // This will be filled by the frontend logic or we can add some common ones
    ]
  };

  const locationId = `uuid_generate_v4()`; // We'll use this in a CTE or similar
  
  const locationInsert = `INSERT INTO pseo_locations (name, slug, country) VALUES ('${city.name}', '${city.slug}', 'USA') RETURNING id;`;
  
  const pageInsert = `INSERT INTO pseo_pages (slug, title, meta_description, content_json, category, location_id)
SELECT 
  '${city.slug}', 
  'SOC 2 Auditors in ${city.name}, ${city.state} | RiscLens', 
  'Find the best SOC 2 auditors and CPA firms in ${city.name}. Get matched with vetted auditors serving ${city.name}\\'s ${city.industries.join(' and ')} sectors.',
  '${JSON.stringify(contentJson).replace(/'/g, "''")}',
  'directory',
  id
FROM latest_location;`;

  return { locationInsert, pageInsert };
}

console.log('-- Seed 80 more cities');
console.log('BEGIN;');

cities.forEach(city => {
  const { locationInsert, pageInsert } = generateSQL(city);
  console.log(`WITH latest_location AS (${locationInsert.replace(';', '')})`);
  console.log(`${pageInsert}`);
});

console.log('COMMIT;');
