// scripts/sync_kvj_content.ts
import { saveSupabaseSection } from "../src/lib/supabase-cms.ts";

/**
 * Overwrites The Strategist homepage content to exactly match KVJ Analytics
 * order and coverage while preserving the existing visual design.
 * Uses the existing Supabase CMS helper `saveSupabaseSection`.
 */

async function main() {
  // 1️⃣ Hero Section – adapted wording
  await saveSupabaseSection("hero", "Hero", {
    eyebrow: "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
    heading: "Transform Data Into",
    tagline: "Business Growth.",
    body: "The Strategist partners with businesses, enterprises, and institutions to build intelligent analytics platforms, automate processes, modernize operations, and enable data‑driven decision making. We combine technology, strategy, and innovation to create measurable outcomes.",
    ctaLabel: "Schedule a Consultation",
    ctaHref: "/contact"
  });

// Existing Solutions section unchanged (kept for branding)
await saveSupabaseSection("solutions", "Our Solutions", {
  eyebrow: "Enterprise Solutions That Drive Business Growth",
  heading: "Enterprise Solutions That Drive Business Growth",
  description: "We help organizations transform data into strategic assets through intelligent analytics, automation and enterprise technology solutions.",
  cards: [
    {
      title: "Corporate Analytics",
      desc: "Business Intelligence, Executive Dashboards, Data Visualization, Performance Analytics, Decision Support",
      icon: "CorporateAnalytics"
    },
    {
      title: "Digital Transformation",
      desc: "Business Process Automation, Workflow Optimization, Cloud Transformation, Digital Strategy, Technology Modernization",
      icon: "DigitalTransformation"
    },
    {
      title: "Enterprise Technology",
      desc: "Custom Business Applications, Enterprise Portals, Analytics Platforms, Data Platforms, System Integration",
      icon: "EnterpriseTechnology"
    },
    {
      title: "Consulting Services",
      desc: "Analytics Consulting, Technology Advisory, Digital Strategy, Business Process Analysis, Implementation Roadmaps",
      icon: "ConsultingServices"
    }
  ]
});

// Why KVJ Analytics section (new label and heading)
await saveSupabaseSection("why_kvj", "Why KVJ Analytics", {
  heading: "Turning Complex Data into Clear Decisions",
  subheading: "",
  description: "Enterprise capability across intelligence, automation and platforms — engineered around measurable business outcomes.",
  items: [
    { number: "01", title: "Business Intelligence" },
    { number: "02", title: "Automation" },
    { number: "03", title: "Artificial Intelligence" },
    { number: "04", title: "Enterprise Platforms" },
    { number: "05", title: "Custom Solutions" },
    { number: "06", title: "Innovation" }
  ]
});

// Our Solutions (second Enterprise Solutions section)
await saveSupabaseSection("solutions_repeat", "Our Solutions", {
  eyebrow: "Enterprise Solutions That Drive Business Growth",
  heading: "Enterprise Solutions That Drive Business Growth",
  description: "We help organizations transform data into strategic assets through intelligent analytics, automation and enterprise technology solutions.",
  cards: [
    { title: "Corporate Analytics", desc: "Business Intelligence, Executive Dashboards, Data Visualization, Performance Analytics, Decision Support", icon: "CorporateAnalytics" },
    { title: "Digital Transformation", desc: "Business Process Automation, Workflow Optimization, Cloud Transformation, Digital Strategy, Technology Modernization", icon: "DigitalTransformation" },
    { title: "Enterprise Technology", desc: "Custom Business Applications, Enterprise Portals, Analytics Platforms, Data Platforms, System Integration", icon: "EnterpriseTechnology" },
    { title: "Consulting Services", desc: "Analytics Consulting, Technology Advisory, Digital Strategy, Business Process Analysis, Implementation Roadmaps", icon: "ConsultingServices" }
  ]
});

// Our Approach section (framework) – moved after second Enterprise Solutions
await saveSupabaseSection("framework", "Our Approach", {
  eyebrow: "A Proven Framework For Digital Transformation",
  heading: "A Proven Framework For Digital Transformation",
  description: "How we partner with organizations to turn complex data into clear, lasting business decisions and operational efficiency.",
  stages: [
    { number: "01", title: "Discover", desc: "Identify key challenges, gather stakeholder requirements, and audit existing data assets to establish a clear digital roadmap." },
    { number: "02", title: "Design", desc: "Co‑create tailored analytics and automation blueprints aligned with your operational workflows and KPIs." },
    { number: "03", title: "Build", desc: "Develop and deploy high‑performance dashboards, report automation pipelines, and platforms with precision." },
    { number: "04", title: "Deploy", desc: "Roll out solutions to production environments with robust testing and monitoring." },
    { number: "05", title: "Optimize", desc: "Continuous performance tuning, data quality improvement, and workflow refinement." },
    { number: "06", title: "Report Automation", desc: "Automate scheduled reporting, alerts, and distribution for faster decision making." },
    { number: "07", title: "Business Decisions", desc: "Empower leadership teams with clear, actionable insights, predictive analytics models, and automated reporting systems to drive growth." }
  ]
});

// Technology Products section – new content
await saveSupabaseSection("technology_products", "Technology Products", {
  eyebrow: "Technology Products",
  heading: "Proprietary Technology Platforms",
  description: "Purpose-built platforms — GradeScope, Proctrix, BeInTrack — designed to solve practical reporting, assessment, and institutional operations.",
  products: [
    { title: "GradeScope", desc: "Academic reporting", icon: "GradeScope" },
    { title: "Proctrix", desc: "Exam assessment", icon: "Proctrix" },
    { title: "BeInTrack", desc: "Process analytics", icon: "BeInTrack" }
  ],
  ctaLabel: "Explore Products",
  ctaHref: "/products"
});

// Insights section – detailed articles
await saveSupabaseSection("insights", "Insights", {
  eyebrow: "Insights",
  heading: "From Our Knowledge Base",
  ctaLabel: "View All Articles",
  ctaHref: "/blog",
  articles: [
    {
      category: "Automation",
      title: "How Automation Can Reduce Repetitive Reporting Work",
      description: "Learn how modern workflow tools and automation scripts can free up valuable time by taking over manual report compilation.",
      ctaLabel: "Read article",
      ctaHref: "/blog/reduce-reporting-work"
    },
    {
      category: "Analytics",
      title: "Turning Business Data Into Actionable Insights",
      description: "A practical guide to sorting through raw business data and highlighting the key metrics that drive growth.",
      ctaLabel: "Read article",
      ctaHref: "/blog/actionable-insights"
    },
    {
      category: "Business Intelligence",
      title: "Why Interactive Dashboards Improve Decision-Making",
      description: "Discover the visual principles and layout strategies that make real-time dashboards effective for management teams.",
      ctaLabel: "Read article",
      ctaHref: "/blog/dashboards-decision-making"
    }
  ]
});

// Final CTA – updated as required
await saveSupabaseSection("final_cta", "Final CTA", {
  heading: "Let's Build Smarter Systems Together",
  body: "Whether you are a corporate organization seeking automation and analytics, or an institution wanting industry‑ready outcomes, The Strategist is ready to support your transformation journey.",
  ctaPrimary: { label: "Schedule a Consultation", href: "/contact" },
  ctaSecondary: { label: "Explore Solutions", href: "/solutions/corporate" }
});

  // 8️⃣ Statistics Section
  await saveSupabaseSection("statistics", "Statistics", {
    stats: [
      { value: "500+", label: "Projects Delivered" },
      { value: "98%", label: "Client Retention" },
      { value: "12+", label: "Years of Expertise" }
    ]
  });

  // 9️⃣ Footer – Corporate Solutions
  await saveSupabaseSection("footer_corporate", "Corporate Solutions", {
    heading: "Corporate Solutions",
    links: [
      "Report Automation",
      "Dashboard Development",
      "Data Visualization",
      "Process Automation",
      "Corporate Training"
    ]
  });

  // 🔟 Footer – Educational Solutions
  await saveSupabaseSection("footer_education", "Educational Solutions", {
    heading: "Educational Solutions",
    links: [
      "Certification Programs",
      "Curriculum Development",
      "Grade Scope",
      "Protrix",
      "Skill Development Programs"
    ]
  });

  // 📞 Footer – Contact Us (placeholder, keep existing values)
  await saveSupabaseSection("footer_contact", "Contact Us", {});

  console.log("✅ All sections synced to Supabase with KVJ‑style ordering.");
}

main().catch(err => {
  console.error("❌ Error syncing content:", err);
  process.exit(1);
});
