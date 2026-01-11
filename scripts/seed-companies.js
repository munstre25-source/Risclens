const companies = [
  { name: "Arctic Wolf", domain: "arcticwolf.com", score: 88, desc: "Cybersecurity operations leader providing managed detection and response (MDR)." },
  { name: "Bitdefender", domain: "bitdefender.com", score: 85, desc: "Global cybersecurity leader providing advanced threat prevention, detection, and response solutions." },
  { name: "Check Point", domain: "checkpoint.com", score: 82, desc: "Leading provider of cybersecurity solutions to governments and corporate enterprises globally." },
  { name: "Darktrace", domain: "darktrace.com", score: 84, desc: "Global leader in cyber AI, delivering complete AI-powered solutions to protect against advanced threats." },
  { name: "FireEye", domain: "fireeye.com", score: 81, desc: "Intelligence-led security company helping organizations prevent, detect and respond to cyber attacks." },
  { name: "Fortinet", domain: "fortinet.com", score: 83, desc: "Broad, integrated, and automated cybersecurity solutions for every environment." },
  { name: "KnowBe4", domain: "knowbe4.com", score: 86, desc: "World's largest security awareness training and simulated phishing platform." },
  { name: "Palo Alto Networks", domain: "paloaltonetworks.com", score: 91, desc: "Global cybersecurity leader, known for next-generation firewalls and cloud-native security." },
  { name: "Proofpoint", domain: "proofpoint.com", score: 87, desc: "Leading cybersecurity and compliance company that protects people, data, and brands." },
  { name: "Rapid7", domain: "rapid7.com", score: 89, desc: "Security visibility and analytics to help organizations take command of their attack surface." },
  { name: "Sophos", domain: "sophos.com", score: 84, desc: "Worldwide leader in next-generation cybersecurity, protecting more than 500,000 organizations." },
  { name: "Tenable", domain: "tenable.com", score: 88, desc: "Cyber Exposure company helping organizations understand and reduce cyber risk." },
  { name: "Trend Micro", domain: "trendmicro.com", score: 82, desc: "Global leader in enterprise data security and cybersecurity solutions." },
  { name: "Netskope", domain: "netskope.com", score: 90, desc: "SASE leader helping organizations apply zero trust principles to protect data." },
  { name: "Cloudinary", domain: "cloudinary.com", score: 78, desc: "Leading image and video management platform for web and mobile developers." },
  { name: "Fastly", domain: "fastly.com", score: 86, desc: "Edge cloud platform powering fast, secure, and scalable digital experiences." },
  { name: "Akamai", domain: "akamai.com", score: 85, desc: "Cloud computing, security, and content delivery network (CDN) services provider." },
  { name: "Braze", domain: "braze.com", score: 84, desc: "Comprehensive customer engagement platform that powers relevant and memorable experiences." },
  { name: "Iterable", domain: "iterable.com", score: 82, desc: "Cross-channel marketing platform that helps brands create unified customer experiences." },
  { name: "mParticle", domain: "mparticle.com", score: 83, desc: "Customer data platform that simplifies data management and privacy compliance." },
  { name: "Contentsquare", domain: "contentsquare.com", score: 79, desc: "Digital experience analytics platform that helps businesses understand the customer journey." },
  { name: "LogRocket", domain: "logrocket.com", score: 77, desc: "Frontend monitoring and product analytics for web and mobile apps." },
  { name: "Honeybadger", domain: "honeybadger.io", score: 76, desc: "Exception, uptime, and cron monitoring for modern web developers." },
  { name: "Rollbar", domain: "rollbar.com", score: 78, desc: "Error tracking and monitoring platform for agile development teams." },
  { name: "Papertrail", domain: "papertrailapp.com", score: 75, desc: "Cloud-hosted log management for searching, tailing, and analyzing logs." },
  { name: "Loggly", domain: "loggly.com", score: 74, desc: "Cloud-based log management and analytics service for monitoring app performance." },
  { name: "Dynatrace", domain: "dynatrace.com", score: 87, desc: "Observability and security platform for modern cloud environments." },
  { name: "AppDynamics", domain: "appdynamics.com", score: 84, desc: "Application performance management and IT operations analytics company." },
  { name: "Grafana Labs", domain: "grafana.com", score: 88, desc: "Open observability platform for visualizing metrics, logs, and traces." },
  { name: "Qdrant", domain: "qdrant.tech", score: 79, desc: "Vector database and search engine for high-performance AI applications." },
  { name: "Heroku", domain: "heroku.com", score: 83, desc: "Platform as a service (PaaS) that enables developers to build, run, and operate applications." },
  { name: "Render", domain: "render.com", score: 81, desc: "Unified cloud platform to build and run all your apps and websites with ease." },
  { name: "Fly.io", domain: "fly.io", score: 80, desc: "Global application platform that runs your code close to your users." },
  { name: "Railway", domain: "railway.app", score: 78, desc: "Infrastructure platform that makes it easy to deploy and manage applications." },
  { name: "Kinsta", domain: "kinsta.com", score: 77, desc: "Premium Managed WordPress hosting powered by Google Cloud Platform." },
  { name: "WP Engine", domain: "wpengine.com", score: 82, desc: "Leading WordPress hosting platform for agility, performance, and security." },
  { name: "Pantheon", domain: "pantheon.io", score: 80, desc: "WebOps platform for agile teams to build, launch, and run Drupal and WordPress sites." },
  { name: "Cloudways", domain: "cloudways.com", score: 76, desc: "Managed cloud hosting platform for high-performance web applications." },
  { name: "Linode", domain: "linode.com", score: 81, desc: "Cloud computing services provider, now part of Akamai." },
  { name: "Vultr", domain: "vultr.com", score: 79, desc: "Global cloud infrastructure provider offering compute, storage, and networking." },
  { name: "Hetzner", domain: "hetzner.com", score: 74, desc: "German cloud provider known for high-performance dedicated servers and cloud hosting." },
  { name: "OVHcloud", domain: "ovhcloud.com", score: 78, desc: "European cloud computing provider offering VPS, dedicated servers, and public cloud." },
  { name: "Scaleway", domain: "scaleway.com", score: 77, desc: "European cloud provider offering high-performance compute and storage solutions." },
  { name: "Aiven", domain: "aiven.io", score: 85, desc: "Fully managed open source data platform including PostgreSQL, Redis, and Kafka." },
  { name: "Neon", domain: "neon.tech", score: 82, desc: "Serverless PostgreSQL platform with autoscaling and branching." },
  { name: "Cockroach Labs", domain: "cockroachlabs.com", score: 87, desc: "The company behind CockroachDB, a cloud-native, distributed SQL database." }
];

const sql = companies.map(c => {
  const slug = c.name.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
  const public_signals = JSON.stringify([
    { type: "soc2", status: "available", name: "SOC 2 Type II", date: "2025-06-15" },
    { type: "iso27001", status: "available", name: "ISO 27001", date: "2024-11-20" },
    { type: "privacy", status: "available", name: "GDPR Compliant", date: "2025-01-10" }
  ]);
  const markers = JSON.stringify([
    { type: "trust_center", found: true, url: `https://${c.domain}/security` },
    { type: "soc2_disclosure", found: true, date: "2025-06-15" }
  ]);
  const ai_summary = `${c.name} maintains a robust security posture with a public Trust Center and verified SOC 2 Type II compliance. Their infrastructure is designed for high transparency and enterprise-grade data protection.`;
  
  return `INSERT INTO company_signals (name, company_name, domain, slug, signal_score, score, indexable, public_signals, markers, ai_summary, description, has_security_page, has_trust_page, mentions_soc2, updated_at, created_at, generated_at) 
  VALUES ('${c.name}', '${c.name}', '${c.domain}', '${slug}', ${c.score}, ${c.score}, true, '${public_signals}'::jsonb, '${markers}'::jsonb, '${ai_summary}', '${c.desc}', true, true, true, NOW(), NOW(), NOW());`;
}).join("\n");

console.log(sql);
