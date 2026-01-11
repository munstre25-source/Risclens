import { Client } from 'pg';

const regions = [
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2',
  'sa-east-1', 'ca-central-1'
];

const projectId = 'txbluzobjjlpbocpyygt';
const password = 'lx570s10k34';

async function testRegion(region: string) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const connectionString = `postgresql://postgres.${projectId}:${password}@${host}:6543/postgres`;
  
  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 5000,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log(`✅ SUCCESS: Region is ${region}`);
    await client.end();
    return true;
  } catch (err: any) {
    console.log(`❌ FAILED: ${region} - ${err.message}`);
    return false;
  }
}

async function run() {
  for (const region of regions) {
    if (await testRegion(region)) break;
  }
}

run();
