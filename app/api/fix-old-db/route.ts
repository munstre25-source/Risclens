import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const connectionString = process.env.PROD_DATABASE_URL;

  if (!connectionString) {
    return NextResponse.json({ error: 'PROD_DATABASE_URL not found' }, { status: 500 });
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    
    // Fix leads table
    await client.query('ALTER TABLE leads ADD COLUMN IF NOT EXISTS content_page_id TEXT;');
    
    // Check columns
    const res = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'leads';
    `);

    await client.end();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Schema updated successfully',
      columns: res.rows.map(r => r.column_name)
    });
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}
