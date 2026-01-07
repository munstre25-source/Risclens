import { getSupabaseAdmin } from '../lib/supabase';
import pg from 'pg';

// SOURCE: External project (ugqklluhjdcztuwduesx)
const SOURCE_URL = process.env.SOURCE_SUPABASE_URL || 'https://ugqklluhjdcztuwduesx.supabase.co';
const SOURCE_KEY = process.env.SOURCE_SUPABASE_SERVICE_ROLE_KEY;

// DESTINATION: Current project (txbluzobjjlpbocpyygt)
const DEST_DB_URL = process.env.DATABASE_URL;

async function run() {
    console.log('Starting full sync to production...');

    if (!SOURCE_KEY) {
        console.error('Missing SOURCE_SUPABASE_SERVICE_ROLE_KEY');
        process.exit(1);
    }

    if (!DEST_DB_URL) {
        console.error('Missing DATABASE_URL');
        process.exit(1);
    }

    // 1. Connect to destination via PG
    const pool = new pg.Pool({
        connectionString: DEST_DB_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Checking connection to destination...');
        await pool.query('SELECT 1');
        console.log('Connected to destination database.');

        // 2. Create tables if they don't exist
        console.log('Ensuring company_signals table exists...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS company_signals (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                company_name TEXT NOT NULL,
                domain TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                indexable BOOLEAN NOT NULL DEFAULT FALSE,
                signal_score INTEGER NOT NULL DEFAULT 0,
                markers JSONB NOT NULL DEFAULT '{}',
                signals JSONB NOT NULL DEFAULT '{}',
                ai_summary TEXT,
                generated_at TIMESTAMPTZ,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                public_signals JSONB DEFAULT '{}',
                last_run_status TEXT,
                last_run_error TEXT,
                last_run_at TIMESTAMPTZ,
                score_breakdown JSONB DEFAULT '{}',
                indexable_locked BOOLEAN DEFAULT FALSE
            );
            CREATE INDEX IF NOT EXISTS idx_company_signals_slug ON company_signals(slug);
        `);

        // 3. Fetch data from source
        console.log('Fetching data from source...');
        const { createClient } = await import('@supabase/supabase-js');
        const sourceClient = createClient(SOURCE_URL, SOURCE_KEY);
        
        const { data: companies, error: fetchError } = await sourceClient.from('company_signals').select('*');
        if (fetchError) throw fetchError;
        console.log(`Fetched ${companies.length} companies.`);

        // 4. Sync data
        console.log('Syncing data...');
        for (const company of companies) {
            await pool.query(`
                INSERT INTO company_signals (
                    id, company_name, domain, slug, indexable, signal_score, 
                    markers, signals, ai_summary, generated_at, created_at, 
                    updated_at, public_signals, last_run_status, last_run_error, 
                    last_run_at, score_breakdown, indexable_locked
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
                ) ON CONFLICT (slug) DO UPDATE SET
                    company_name = EXCLUDED.company_name,
                    domain = EXCLUDED.domain,
                    signal_score = EXCLUDED.signal_score,
                    markers = EXCLUDED.markers,
                    signals = EXCLUDED.signals,
                    ai_summary = EXCLUDED.ai_summary,
                    public_signals = EXCLUDED.public_signals,
                    score_breakdown = EXCLUDED.score_breakdown,
                    updated_at = NOW();
            `, [
                company.id, company.company_name, company.domain, company.slug, 
                company.indexable, company.signal_score, company.markers, 
                company.signals, company.ai_summary, company.generated_at, 
                company.created_at, company.updated_at, company.public_signals, 
                company.last_run_status, company.last_run_error, company.last_run_at, 
                company.score_breakdown, company.indexable_locked
            ]);
        }
        console.log('Data sync complete!');

        // 5. Also ensure 'leads' table exists
        console.log('Ensuring leads table exists...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS leads (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                created_at TIMESTAMPTZ DEFAULT now(),
                email TEXT,
                company_name TEXT,
                industry TEXT,
                num_employees TEXT,
                status TEXT DEFAULT 'pending',
                score INTEGER DEFAULT 0,
                readiness_score INTEGER DEFAULT 0,
                estimated_cost_low INTEGER DEFAULT 0,
                estimated_cost_high INTEGER DEFAULT 0,
                is_partial BOOLEAN DEFAULT FALSE,
                pdf_url TEXT,
                pdf_path TEXT,
                updated_at TIMESTAMPTZ DEFAULT now()
            );
        `);

    } catch (err) {
        console.error('Error during sync:', err);
    } finally {
        await pool.end();
    }
}

run();
