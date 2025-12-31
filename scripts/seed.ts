/**
 * Seed Script - Insert test leads for development
 * 
 * Usage: npm run seed
 * 
 * This script inserts 10 test leads with varying characteristics
 * to test scoring, admin panel, and other features.
 */

import { createClient } from '@supabase/supabase-js';
import { calculateLeadScore, generateRecommendations } from '../lib/scoring';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables');
  console.error('Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test lead data
const testLeads = [
  {
    company_name: 'TechStart Inc',
    industry: 'saas',
    num_employees: 15,
    data_types: ['pii', 'customer_data'],
    audit_date: getFutureDate(4), // 4 months from now
    role: 'cto',
    email: 'test+1@example.com',
  },
  {
    company_name: 'FinanceApp LLC',
    industry: 'fintech',
    num_employees: 45,
    data_types: ['pii', 'financial'],
    audit_date: getFutureDate(6),
    role: 'ceo',
    email: 'test+2@example.com',
  },
  {
    company_name: 'HealthData Corp',
    industry: 'healthcare',
    num_employees: 80,
    data_types: ['pii', 'health', 'customer_data'],
    audit_date: getFutureDate(8),
    role: 'security',
    email: 'test+3@example.com',
  },
  {
    company_name: 'SmallShop Co',
    industry: 'ecommerce',
    num_employees: 3,
    data_types: ['pii'],
    audit_date: getFutureDate(12),
    role: 'other',
    email: 'test+4@example.com',
  },
  {
    company_name: 'ConsultPro',
    industry: 'consulting',
    num_employees: 25,
    data_types: ['intellectual_property', 'customer_data'],
    audit_date: getFutureDate(10),
    role: 'operations',
    email: 'test+5@example.com',
  },
  {
    company_name: 'MegaSaaS Enterprise',
    industry: 'saas',
    num_employees: 150,
    data_types: ['pii', 'financial', 'customer_data'],
    audit_date: getFutureDate(3),
    role: 'security',
    email: 'test+6@example.com',
  },
  {
    company_name: 'Startup Labs',
    industry: 'saas',
    num_employees: 8,
    data_types: ['pii'],
    audit_date: getFutureDate(5),
    role: 'cto',
    email: 'test+7@example.com',
  },
  {
    company_name: 'DataSecure Inc',
    industry: 'fintech',
    num_employees: 35,
    data_types: ['pii', 'financial', 'health'],
    audit_date: getFutureDate(2),
    role: 'security',
    email: 'test+8@example.com',
  },
  {
    company_name: 'Manufacturing Plus',
    industry: 'manufacturing',
    num_employees: 60,
    data_types: ['intellectual_property'],
    audit_date: getFutureDate(18),
    role: 'engineering',
    email: 'test+9@example.com',
  },
  {
    company_name: 'LocalBiz Shop',
    industry: 'other',
    num_employees: 5,
    data_types: ['customer_data'],
    audit_date: getFutureDate(24),
    role: 'other',
    email: 'test+10@example.com',
  },
];

function getFutureDate(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toISOString().split('T')[0];
}

async function seed() {
  console.log('🌱 Starting seed process...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const lead of testLeads) {
    try {
      // Calculate scores
      const scoringResult = calculateLeadScore({
        num_employees: lead.num_employees,
        audit_date: lead.audit_date,
        data_types: lead.data_types,
        role: lead.role,
      });

      // Prepare lead data
      const leadData = {
        ...lead,
        readiness_score: scoringResult.readiness_score,
        estimated_cost_low: scoringResult.estimated_cost_low,
        estimated_cost_high: scoringResult.estimated_cost_high,
        lead_score: scoringResult.lead_score,
        keep_or_sell: scoringResult.keep_or_sell,
        consent: true,
        utm_source: 'seed-script',
        variation_id: 'default',
      };

      // Insert into database
      const { data, error } = await supabase
        .from('SOC2_Leads')
        .insert(leadData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log(`✅ Created lead: ${lead.company_name}`);
      console.log(`   Score: ${scoringResult.lead_score}/10 (${scoringResult.keep_or_sell})`);
      console.log(`   Readiness: ${scoringResult.readiness_score}%`);
      console.log(`   Cost: $${scoringResult.estimated_cost_low.toLocaleString()} - $${scoringResult.estimated_cost_high.toLocaleString()}`);
      console.log('');

      successCount++;
    } catch (error) {
      console.error(`❌ Failed to create lead: ${lead.company_name}`);
      console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.log('');
      errorCount++;
    }
  }

  // Log audit event
  try {
    await supabase.from('AUDIT_LOGS').insert({
      event_type: 'seed_script_run',
      payload: {
        success_count: successCount,
        error_count: errorCount,
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    console.warn('Warning: Could not log seed event to AUDIT_LOGS');
  }

  console.log('─'.repeat(50));
  console.log(`\n🎉 Seed complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('');

  if (successCount > 0) {
    console.log('📊 View leads in admin panel: /admin');
    console.log('🔍 Test the calculator: /soc-2-readiness-index');
  }
}

// Run the seed
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });

