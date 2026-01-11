-- pSEO Engine Migration
-- Created: 2026-01-11

-- 1. Frameworks Table
CREATE TABLE IF NOT EXISTS pseo_frameworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Industries Table
CREATE TABLE IF NOT EXISTS pseo_industries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Locations Table
CREATE TABLE IF NOT EXISTS pseo_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    country TEXT DEFAULT 'USA',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Vendors Table
CREATE TABLE IF NOT EXISTS pseo_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Pages Table (The Junction/Content Table)
CREATE TABLE IF NOT EXISTS pseo_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    meta_description TEXT,
    content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    framework_id UUID REFERENCES pseo_frameworks(id),
    industry_id UUID REFERENCES pseo_industries(id),
    location_id UUID REFERENCES pseo_locations(id),
    vendor_id UUID REFERENCES pseo_vendors(id),
    category TEXT NOT NULL, -- e.g., 'compliance', 'directory', 'comparison'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pseo_pages_updated_at
    BEFORE UPDATE ON pseo_pages
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- SEED DATA

-- Frameworks
INSERT INTO pseo_frameworks (name, slug, description) VALUES
('SOC 2', 'soc-2', 'Service Organization Control 2'),
('ISO 27001', 'iso-27001', 'International standard for information security management systems'),
('HIPAA', 'hipaa', 'Health Insurance Portability and Accountability Act'),
('GDPR', 'gdpr', 'General Data Protection Regulation'),
('PCI DSS', 'pci-dss', 'Payment Card Industry Data Security Standard'),
('NIST CSF', 'nist-csf', 'NIST Cybersecurity Framework')
ON CONFLICT (slug) DO NOTHING;

-- Industries
INSERT INTO pseo_industries (name, slug, description) VALUES
('Fintech', 'fintech', 'Financial Technology companies'),
('Healthcare', 'healthcare', 'Health and medical technology'),
('SaaS', 'saas', 'Software as a Service providers'),
('AI/ML', 'ai-ml', 'Artificial Intelligence and Machine Learning startups'),
('EdTech', 'edtech', 'Education technology companies'),
('E-commerce', 'ecommerce', 'Online retail and marketplaces')
ON CONFLICT (slug) DO NOTHING;

-- Locations
INSERT INTO pseo_locations (name, slug) VALUES
('San Francisco', 'san-francisco'),
('New York', 'new-york'),
('Austin', 'austin'),
('London', 'london'),
('Berlin', 'berlin'),
('Bangalore', 'bangalore')
ON CONFLICT (slug) DO NOTHING;

-- Vendors
INSERT INTO pseo_vendors (name, slug, category) VALUES
('Vanta', 'vanta', 'Compliance Automation'),
('Drata', 'drata', 'Compliance Automation'),
('Secureframe', 'secureframe', 'Compliance Automation'),
('Sprinto', 'sprinto', 'Compliance Automation')
ON CONFLICT (slug) DO NOTHING;
