import { getSupabaseAdmin } from '@/lib/supabase';

async function countSitemapUrls() {
    const supabase = getSupabaseAdmin();

    const [
        { count: companiesCount },
        { count: migrationsCount },
        { count: pseoPagesCount },
        { count: frameworksCount },
        { count: decisionsCount },
        { count: industriesCount },
        { count: rolesCount },
        { count: locationsCount },
    ] = await Promise.all([
        supabase.from('company_signals').select('*', { count: 'exact', head: true }).eq('indexable', true),
        supabase.from('framework_migrations').select('*', { count: 'exact', head: true }),
        supabase.from('pseo_pages').select('*', { count: 'exact', head: true }),
        supabase.from('pseo_frameworks').select('*', { count: 'exact', head: true }),
        supabase.from('pseo_decision_types').select('*', { count: 'exact', head: true }),
        supabase.from('pseo_industries').select('*', { count: 'exact', head: true }),
        supabase.from('pseo_roles').select('*', { count: 'exact', head: true }),
        supabase.from('pseo_locations').select('*', { count: 'exact', head: true }),
    ]);

    console.log('=== SUPABASE TABLE COUNTS ===');
    console.log(`Companies (indexable): ${companiesCount}`);
    console.log(`Migrations: ${migrationsCount}`);
    console.log(`pSEO Pages: ${pseoPagesCount}`);
    console.log(`Frameworks: ${frameworksCount}`);
    console.log(`Decision Types: ${decisionsCount}`);
    console.log(`Industries: ${industriesCount}`);
    console.log(`Roles: ${rolesCount}`);
    console.log(`Locations: ${locationsCount}`);

    // Calculate matrix combinations
    const matrixFrameworks = 9; // soc-2, iso-27001, hipaa, gdpr, pci-dss, ai-governance, iso-42001, eu-ai-act, nist-ai-rmf
    const roleFrameworks = 5; // soc-2, iso-27001, pci-dss, hipaa, gdpr

    const frameworkMatrix = matrixFrameworks * (decisionsCount || 0) * (industriesCount || 0);
    const roleMatrix = roleFrameworks * (rolesCount || 0) * (industriesCount || 0);
    const compareMatrix = (companiesCount || 0) * (industriesCount || 0);

    console.log('\n=== CALCULATED URL COUNTS ===');
    console.log(`Framework Matrix (9 frameworks × ${decisionsCount} decisions × ${industriesCount} industries): ${frameworkMatrix}`);
    console.log(`Role Matrix (5 frameworks × ${rolesCount} roles × ${industriesCount} industries): ${roleMatrix}`);
    console.log(`Compare Matrix (${companiesCount} companies × ${industriesCount} industries): ${compareMatrix}`);
    console.log(`Directory: ${companiesCount}`);
    console.log(`Migrations: ${migrationsCount}`);
    console.log(`Locations: ${locationsCount}`);
    console.log(`pSEO Pages: ${pseoPagesCount}`);

    const total = frameworkMatrix + roleMatrix + compareMatrix + (companiesCount || 0) + (migrationsCount || 0) + (locationsCount || 0) + (pseoPagesCount || 0) + 158; // 158 static routes
    console.log(`\n=== ESTIMATED TOTAL: ${total} URLs ===`);
}

countSitemapUrls().catch(console.error);
