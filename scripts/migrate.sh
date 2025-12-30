#!/bin/bash
# =============================================================================
# Database Migration Script
# =============================================================================
# This script runs SQL migrations against your Supabase database.
#
# Usage:
#   npm run migrate
#   OR
#   bash scripts/migrate.sh
#
# Prerequisites:
#   - psql installed (PostgreSQL client)
#   - DATABASE_URL environment variable set
#   OR
#   - Supabase CLI installed and project linked
# =============================================================================

set -e

echo "🗃️  RiscLens SOC 2 Calculator - Database Migration"
echo "=================================================="
echo ""

# Check for required tools
check_psql() {
    if command -v psql &> /dev/null; then
        return 0
    else
        return 1
    fi
}

check_supabase_cli() {
    if command -v supabase &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Migration files directory
MIGRATIONS_DIR="sql"

# Check if migrations directory exists
if [ ! -d "$MIGRATIONS_DIR" ]; then
    echo "❌ Error: Migrations directory '$MIGRATIONS_DIR' not found"
    exit 1
fi

# Find migration files
MIGRATION_FILES=$(find "$MIGRATIONS_DIR" -name "*.sql" | sort)

if [ -z "$MIGRATION_FILES" ]; then
    echo "❌ No migration files found in $MIGRATIONS_DIR"
    exit 1
fi

echo "📁 Found migration files:"
for file in $MIGRATION_FILES; do
    echo "   - $file"
done
echo ""

# Method 1: Use DATABASE_URL with psql
if [ -n "$DATABASE_URL" ] && check_psql; then
    echo "🔌 Using psql with DATABASE_URL..."
    echo ""
    
    for file in $MIGRATION_FILES; do
        echo "⏳ Running: $file"
        psql "$DATABASE_URL" -f "$file"
        echo "✅ Completed: $file"
        echo ""
    done
    
    echo "🎉 All migrations completed successfully!"
    exit 0
fi

# Method 2: Use Supabase CLI
if check_supabase_cli; then
    echo "🔌 Using Supabase CLI..."
    echo ""
    echo "Note: Make sure you're linked to your Supabase project:"
    echo "  supabase link --project-ref YOUR_PROJECT_REF"
    echo ""
    
    for file in $MIGRATION_FILES; do
        echo "⏳ Running: $file"
        supabase db push --file "$file"
        echo "✅ Completed: $file"
        echo ""
    done
    
    echo "🎉 All migrations completed successfully!"
    exit 0
fi

# Method 3: Manual instructions
echo "⚠️  No automated method available."
echo ""
echo "Please run the migrations manually using one of these methods:"
echo ""
echo "Option 1: Supabase Dashboard"
echo "  1. Go to your Supabase project Dashboard"
echo "  2. Navigate to SQL Editor"
echo "  3. Copy and paste the contents of each migration file"
echo "  4. Run the SQL"
echo ""
echo "Option 2: Set DATABASE_URL"
echo "  1. Get your database URL from Supabase Dashboard > Settings > Database"
echo "  2. Export it: export DATABASE_URL='postgresql://...'"
echo "  3. Run this script again"
echo ""
echo "Option 3: Install Supabase CLI"
echo "  1. Install: npm install -g supabase"
echo "  2. Login: supabase login"
echo "  3. Link: supabase link --project-ref YOUR_PROJECT_REF"
echo "  4. Run this script again"
echo ""

exit 1

