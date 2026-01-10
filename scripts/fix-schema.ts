import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

// Manual env parsing since dotenv might not be available
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

const connectionString = process.env.PROD_DATABASE_URL;

async function run() {
  if (!connectionString) {
    console.error('PROD_DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'leads';
    `);

    console.log('Current columns in leads table:');
    console.table(res.rows);

    const hasContentPageId = res.rows.some(row => row.column_name === 'content_page_id');

    if (!hasContentPageId) {
      console.log('Adding content_page_id column...');
      await client.query('ALTER TABLE leads ADD COLUMN content_page_id TEXT;');
      console.log('Column added successfully');
    } else {
      console.log('content_page_id column already exists');
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

run();
