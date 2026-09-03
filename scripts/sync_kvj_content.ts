// scripts/sync_kvj_content.ts
import { upsertSection } from "../src/lib/supabase-cms";

/**
 * This script overwrites the Strategist homepage content to exactly match the
 * KVJ Analytics content order and coverage while preserving the existing visual
 * design. All sections are stored in Supabase tables with the `str_` prefix, so
 * the Admin CMS can continue to edit them.
 */

async function main() {
  // 1️⃣ Hero Section – adapted wording
  await upsertSection("hero", {
    eyebrow: "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
    heading: "Transform Data Into",
    tagline: "Business Growth.",
    body: "The Strategist partners with businesses, enterprises, and institutions to build intelligent analytics platforms, automate processes, modernize operations, and enable data‑driven decision making. We combine technology, strategy, and innovation to create measurable outcomes.",
    ctaLabel: "Schedule a Consultation",
    ctaHref: "/contact"
  });

  // 2️⃣ Solutions Section – 4 cards, exact order
  await upsertSection("solutions", {
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

  // 3️⃣ Why Section – "Why The Strategist"
  await upsertSection("why", {
    heading: "Why The Strategist",
    subheading: "Turning Complex Data into Clear Decisions",
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

  // 4️⃣ Industries Section – 8 industries exact order
  await upsertSection("industries", {
    eyebrow: "Solutions Built For Every Industry",
    heading: "Solutions Built For Every Industry",
    description: "Tailored analytics frameworks and automated systems engineered to solve industry‑specific operations and workflows.",
    industries: [
      { name: "Education", icon: "Education" },
      { name: "Healthcare", icon: "Healthcare" },
      { name: "Manufacturing", icon: "Manufacturing" },
      { name: "Retail", icon: "Retail" },
      { name: "Financial Services", icon: "FinancialServices" },
      { name: "Startups", icon: "Startups" },
      { name: "SMEs", icon: "SMEs" },
      { name: "Large Enterprises", icon: "LargeEnterprises" }
    ]
  });

  // 5️⃣ Framework / Approach – 7 stages exact order
  await upsertSection("framework", {
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

  // 6️⃣ Insights Section – placeholder (adjust URL as needed)
  await upsertSection("insights", {
    heading: "Insights That Drive Better Decisions",
    ctaLabel: "Read All Insights",
    ctaHref: "/insights"
  });

  // 7️⃣ Final CTA Section
  await upsertSection("final_cta", {
    heading: "Ready to Transform Your Business?",
    body: "Partner with The Strategist to build intelligent analytics platforms, automate operations and enable data‑driven decisions that create measurable business outcomes.",
    ctaPrimary: { label: "Schedule a Consultation", href: "/contact" },
    ctaSecondary: { label: "Contact Us", href: "/contact" }
  });

  // 8️⃣ Statistics Section
  await upsertSection("statistics", {
    stats: [
      { value: "500+", label: "Projects Delivered" },
      { value: "98%", label: "Client Retention" },
      { value: "12+", label: "Years of Expertise" }
    ]
  });

  // 9️⃣ Footer – Corporate Solutions
  await upsertSection("footer_corporate", {
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
  await upsertSection("footer_education", {
    heading: "Educational Solutions",
    links: [
      "Certification Programs",
      "Curriculum Development",
      "Grade Scope",
      "Protrix",
      "Skill Development Programs"
    ]
  });

  // 📞 Footer – Contact Us (keep existing values from DB – we only ensure the section exists)
  await upsertSection("footer_contact", { heading: "Contact Us" });

  console.log("✅ All sections synced to Supabase with KVJ‑style ordering.");
}

main().catch(err => {
  console.error("❌ Error syncing content:", err);
  process.exit(1);
});
