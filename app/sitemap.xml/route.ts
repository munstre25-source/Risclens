import { NextResponse } from 'next/server';

type ParsedUrlEntry = {
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: string;
};

function xmlEscape(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function readTag(block: string, tag: string): string | undefined {
    const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'));
    return match?.[1]?.trim();
}

function extractEntriesFromUrlset(xml: string): ParsedUrlEntry[] {
    const entries: ParsedUrlEntry[] = [];
    const blocks = xml.match(/<url>([\s\S]*?)<\/url>/gi) || [];

    for (const block of blocks) {
        const loc = readTag(block, 'loc');
        if (!loc) continue;

        entries.push({
            loc,
            lastmod: readTag(block, 'lastmod'),
            changefreq: readTag(block, 'changefreq'),
            priority: readTag(block, 'priority'),
        });
    }

    return entries;
}

export async function GET(request: Request) {
    const origin = new URL(request.url).origin;
    const sitemaps = [
        'sitemap-core.xml',
        'sitemap-frameworks.xml',
        'sitemap-compare.xml',
        'sitemap-directory.xml',
        'sitemap-roles.xml',
        'sitemap-pseo.xml',
        'sitemap-ai-governance.xml',
    ];

    const combinedEntries: ParsedUrlEntry[] = [];

    for (const sitemap of sitemaps) {
        const sitemapUrl = `${origin}/${sitemap}`;
        try {
            const response = await fetch(sitemapUrl, {
                headers: { accept: 'application/xml,text/xml;q=0.9,*/*;q=0.8' },
                next: { revalidate: 3600 },
            });

            if (!response.ok) {
                console.warn(`Sitemap: Failed to fetch ${sitemapUrl} (${response.status})`);
                continue;
            }

            const xml = await response.text();
            const entries = extractEntriesFromUrlset(xml);
            combinedEntries.push(...entries);
        } catch (err) {
            console.warn(`Sitemap: Error fetching ${sitemapUrl}`, err);
        }
    }

    const seen = new Set<string>();
    const uniqueEntries = combinedEntries.filter(entry => {
        if (seen.has(entry.loc)) return false;
        seen.add(entry.loc);
        return true;
    });

    const fallbackLastmod = new Date().toISOString().split('T')[0];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries.map(entry => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${xmlEscape(entry.lastmod || fallbackLastmod)}</lastmod>${entry.changefreq ? `
    <changefreq>${xmlEscape(entry.changefreq)}</changefreq>` : ''}${entry.priority ? `
    <priority>${xmlEscape(entry.priority)}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
