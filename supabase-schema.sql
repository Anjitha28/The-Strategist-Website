-- ==============================================================================
-- THE STRATEGIST — SUPABASE DATABASE SCHEMA (str_ Namespace)
-- Project: ebpshqcudrmykhybcitr
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ebpshqcudrmykhybcitr/sql/new
-- ==============================================================================

-- 1. Create str_website_sections table
CREATE TABLE IF NOT EXISTS public.str_website_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  status TEXT DEFAULT 'published',
  display_order INT DEFAULT 0,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create str_website_items table (Cards, Process Stages, Industry Items)
CREATE TABLE IF NOT EXISTS public.str_website_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.str_website_sections(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  label TEXT,
  image_url TEXT,
  icon TEXT,
  button_text TEXT,
  button_link TEXT,
  display_order INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create str_admin_users table
CREATE TABLE IF NOT EXISTS public.str_admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Site Administrator',
  role TEXT DEFAULT 'super-admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create str_settings table
CREATE TABLE IF NOT EXISTS public.str_settings (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  site_name TEXT DEFAULT 'The Strategist',
  tagline TEXT DEFAULT 'Gain the competitive edge',
  business_email TEXT DEFAULT 'hello@thestrategist.com',
  phone TEXT DEFAULT '+1 (555) 010-2030',
  whatsapp TEXT DEFAULT '15550102030',
  address TEXT DEFAULT 'One Analytics Way, Suite 400',
  social_links JSONB DEFAULT '{"linkedin":"https://linkedin.com","twitter":"https://twitter.com"}'::jsonb,
  seo_title TEXT DEFAULT 'The Strategist',
  seo_description TEXT DEFAULT 'Intelligent analytics & automation platforms.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create str_testimonials table
CREATE TABLE IF NOT EXISTS public.str_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT,
  company TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  display_order INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create str_faqs table
CREATE TABLE IF NOT EXISTS public.str_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  display_order INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.str_website_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.str_website_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.str_admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.str_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.str_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.str_faqs ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read str_website_sections') THEN
    CREATE POLICY "Public read str_website_sections" ON public.str_website_sections FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read str_website_items') THEN
    CREATE POLICY "Public read str_website_items" ON public.str_website_items FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read str_settings') THEN
    CREATE POLICY "Public read str_settings" ON public.str_settings FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read str_testimonials') THEN
    CREATE POLICY "Public read str_testimonials" ON public.str_testimonials FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read str_faqs') THEN
    CREATE POLICY "Public read str_faqs" ON public.str_faqs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read str_admin_users') THEN
    CREATE POLICY "Public read str_admin_users" ON public.str_admin_users FOR SELECT USING (true);
  END IF;
END $$;

-- Allow Full Access for App API
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow write str_website_sections') THEN
    CREATE POLICY "Allow write str_website_sections" ON public.str_website_sections FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow write str_website_items') THEN
    CREATE POLICY "Allow write str_website_items" ON public.str_website_items FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow write str_settings') THEN
    CREATE POLICY "Allow write str_settings" ON public.str_settings FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow write str_testimonials') THEN
    CREATE POLICY "Allow write str_testimonials" ON public.str_testimonials FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow write str_faqs') THEN
    CREATE POLICY "Allow write str_faqs" ON public.str_faqs FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow write str_admin_users') THEN
    CREATE POLICY "Allow write str_admin_users" ON public.str_admin_users FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ==============================================================================
-- INITIAL CONTENT SEEDING (The Strategist Website Data)
-- ==============================================================================

-- 1. Hero Section Seed
INSERT INTO public.str_website_sections (section_key, title, description, data)
VALUES (
  'hero',
  'Homepage Hero Section',
  'Transform Data Into Business Growth.',
  '{
    "eyebrow": "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
    "heading": "Transform Data Into",
    "tagline": "Business Growth.",
    "body": "We partner with businesses and enterprises to build intelligent analytics platforms, automate reporting workflows, modernize operations, and enable data-driven decision making.",
    "ctaLabel": "Schedule a Consultation",
    "ctaHref": "/contact"
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE
SET data = EXCLUDED.data, updated_at = NOW();

-- 2. Enterprise Solutions (6 Cards)
INSERT INTO public.str_website_sections (section_key, title, description, data)
VALUES (
  'solutions',
  'Enterprise Solutions That Drive Business Growth',
  'We help organizations transform data into strategic assets through intelligent analytics, report automation, and enterprise technology solutions.',
  '{
    "eyebrow": "Our Solutions",
    "heading": "Enterprise Solutions That Drive Business Growth",
    "description": "We help organizations transform data into strategic assets through intelligent analytics, report automation, and enterprise technology solutions.",
    "buttonLabel": "Explore All Solutions",
    "buttonLink": "/solutions/corporate",
    "cards": [
      {
        "title": "Business Analytics",
        "desc": "Turn raw data into actionable insights with enterprise BI, statistical modeling, and data pipelines.",
        "icon": "Business Analytics",
        "link": "/solutions/corporate"
      },
      {
        "title": "Report Automation",
        "desc": "Eliminate manual reporting with automated data extraction, consolidation, scheduled exports, and notifications.",
        "icon": "Report Automation",
        "link": "/solutions/corporate"
      },
      {
        "title": "Dashboard Development",
        "desc": "Interactive Power BI & Tableau dashboards tailored for executive decision-makers and functional teams.",
        "icon": "Dashboard Development",
        "link": "/solutions/corporate"
      },
      {
        "title": "Data Visualization",
        "desc": "Transform complex figures into intuitive infographics, visual dashboards, and performance scorecards.",
        "icon": "Data Visualization",
        "link": "/solutions/corporate"
      },
      {
        "title": "Process Automation",
        "desc": "Streamline multi-step business workflows with Robotic Process Automation and intelligent API integrations.",
        "icon": "Process Automation",
        "link": "/solutions/corporate"
      },
      {
        "title": "Application Development",
        "desc": "Custom database tools, web portals, and workflow management systems engineered for scalability.",
        "icon": "Application Development",
        "link": "/solutions/corporate"
      }
    ]
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE
SET data = EXCLUDED.data, updated_at = NOW();

-- 3. Proven Framework (4 Stages)
INSERT INTO public.str_website_sections (section_key, title, description, data)
VALUES (
  'framework',
  'A Proven Framework For Digital Transformation',
  'How we partner with organizations to turn complex data into clear, lasting business decisions and operational efficiency.',
  '{
    "eyebrow": "Our Approach",
    "heading": "A Proven Framework For Digital Transformation",
    "description": "How we partner with organizations to turn complex data into clear, lasting business decisions and operational efficiency.",
    "stages": [
      {
        "num": "01",
        "title": "Discover",
        "desc": "Identify key challenges, gather stakeholder requirements, and audit existing data assets to establish a clear digital roadmap."
      },
      {
        "num": "02",
        "title": "Design",
        "desc": "Co-create tailored analytics and automation blueprints aligned with your operational workflows and KPIs."
      },
      {
        "num": "03",
        "title": "Build & Deploy",
        "desc": "Develop and deploy high-performance dashboards, report automation pipelines, and platforms with precision."
      },
      {
        "num": "04",
        "title": "Optimize & Enable",
        "desc": "Provide continuous refinement, performance tuning, and hands-on team enablement for sustainable outcomes."
      }
    ]
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE
SET data = EXCLUDED.data, updated_at = NOW();

-- 4. Industries Section (8 Cards)
INSERT INTO public.str_website_sections (section_key, title, description, data)
VALUES (
  'industries',
  'Solutions Built For Every Industry',
  'Tailored analytics frameworks and automated systems engineered to solve industry-specific operations and workflows.',
  '{
    "eyebrow": "Industries",
    "heading": "Solutions Built For Every Industry",
    "description": "Tailored analytics frameworks and automated systems engineered to solve industry-specific operations and workflows.",
    "industries": [
      {"name": "Education", "desc": "K-12 & Higher Ed Analytics", "icon": "🎓"},
      {"name": "Healthcare", "desc": "Clinical & Operations Intelligence", "icon": "🏥"},
      {"name": "Manufacturing", "desc": "Supply Chain & IoT Tracking", "icon": "⚙️"},
      {"name": "Retail & E-Com", "desc": "Omnichannel & Customer Analytics", "icon": "🛍️"},
      {"name": "Financial Services", "desc": "Banking, Risk & Portfolio Analytics", "icon": "💳"},
      {"name": "Startups & Scaleups", "desc": "Seed to Series Growth Metrics", "icon": "🚀"},
      {"name": "SMEs & Mid-Market", "desc": "Operational Efficiency & Modernization", "icon": "📈"},
      {"name": "Large Enterprises", "desc": "Scalable Enterprise Automation", "icon": "🏢"}
    ]
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE
SET data = EXCLUDED.data, updated_at = NOW();

-- 5. Split Panels Section
INSERT INTO public.str_website_sections (section_key, title, description, data)
VALUES (
  'split-panels',
  'Technology & Education Split Panels',
  'Proprietary Platforms and Educational Solutions.',
  '{
    "products": {
      "eyebrow": "Technology Products",
      "title": "Proprietary Technology Platforms",
      "desc": "Purpose-built platforms — GradeScope, Proctrix, BeInTrack — designed to solve practical reporting, assessment, and institutional operations.",
      "linkText": "Explore Products",
      "linkHref": "/products",
      "items": [
        {"name": "GradeScope", "desc": "Academic reporting"},
        {"name": "Proctrix", "desc": "Exam assessment"},
        {"name": "BeInTrack", "desc": "Process analytics"}
      ]
    },
    "education": {
      "eyebrow": "Education & Enablement",
      "title": "Educational Solutions",
      "desc": "We bridge the gap between academic learning and industry requirements through practical analytics curriculum, certifications, and institutional platforms.",
      "linkText": "View Educational Solutions",
      "linkHref": "/solutions/educational",
      "tags": ["Academic Analytics", "Curriculum Dev", "Assessment Tools", "Industry Programs"]
    }
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE
SET data = EXCLUDED.data, updated_at = NOW();
