
const domains = [
  "vanta.com", "drata.com", "secureframe.com", "laika.com", "vGS.io", "clerk.dev", "auth0.com", "okta.com", "slack.com", "zoom.us",
  "notion.so", "airtable.com", "figma.com", "linear.app", "postman.com", "vercel.com", "netlify.com", "supabase.com", "planetscale.com", "hashicorp.com",
  "datadoghq.com", "sentry.io", "logdna.com", "newrelic.com", "pagerduty.com", "atlassian.com", "github.com", "gitlab.com", "bitbucket.org", "circleci.com",
  "travis-ci.com", "jenkins.io", "docker.com", "kubernetes.io", "aws.amazon.com", "google.com", "microsoft.com", "apple.com", "meta.com", "netflix.com",
  "spotify.com", "uber.com", "lyft.com", "airbnb.com", "door_dash.com", "instacart.com", "robinhood.com", "coinbase.com", "kraken.com", "binance.com"
];

const ADMIN_SECRET = "a8e2567986da30c57f73f12fec9f2ac030b6cfe42b90b68d88902507a54994ccfdmin";
const BATCH_SIZE = 5;

async function processBatch(batch) {
  console.log(`Processing batch of ${batch.length}: ${batch.join(', ')}`);
  try {
    const response = await fetch("http://localhost:3000/api/admin/intelligence/directory/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ADMIN_SECRET}`
      },
      body: JSON.stringify({
        companies: batch.map(d => ({ domain: d }))
      })
    });
    const result = await response.json();
    console.log(`Batch finished. Success: ${result.success}`);
    if (result.results) {
        result.results.forEach(r => {
            console.log(`- ${r.domain}: ${r.success ? 'OK (Score: ' + r.final_score + ')' : 'FAIL (' + JSON.stringify(r.error) + ')'}`);
        });
    }
  } catch (error) {
    console.error("Batch failed:", error);
  }
}

async function run() {
  for (let i = 0; i < domains.length; i += BATCH_SIZE) {
    const batch = domains.slice(i, i + BATCH_SIZE);
    await processBatch(batch);
    // Add a small delay between batches
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  console.log("50 domains processed!");
}

run();
