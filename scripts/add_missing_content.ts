// scripts/add_missing_content.ts
import { createClient } from "@supabase/supabase-js";
import { upsertSection } from "../src/lib/supabase-cms";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase env vars missing");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  // 1. Value Proposition Section (new)
  await upsertSection("value-proposition", {
    eyebrow: "Our Value",
    heading: "Empowering Learners with Industry‑Ready Skills",
    description: "Practical, hands‑on training that bridges the gap between academia and the corporate world. We equip you with the tools and knowledge to excel in today’s data‑driven environment.",
    ctaLabel: "Learn How We Empower Learners",
    ctaHref: "/about",
    cards: []
  });

  // 2. Capabilities Section (new)
  await upsertSection("capabilities", {
    eyebrow: "Why Choose Us",
    heading: "Our Capabilities",
    description: "Industry‑focused curriculum, real‑world projects, certified instructors, and career support services.",
    cards: [
      { title: "Industry‑Ready Curriculum", desc: "Aligned with current market demands", icon: "Curriculum" },
      { title: "Hands‑On Projects", desc: "Live case studies and labs", icon: "Projects" },
      { title: "Certification Pathways", desc: "Earn recognized credentials", icon: "Certificate" },
      { title: "Career Coaching", desc: "Resume reviews & interview prep", icon: "Coaching" }
    ]
  });

  // 3. Add missing solution cards to existing "solutions" section
  const solKey = "solutions";
  const existing = await supabase.from("str_website_sections").select("data").eq("section_key", solKey);
  const solData = (existing.data?.[0] as any)?.data || {};
  const additionalCards = [
    { title: "Business Intelligence Training", desc: "Learn data modeling, reporting, and visualization", icon: "BI" },
    { title: "Automation & Productivity Skills", desc: "Streamline workflows with scripting and RPA", icon: "Automation" },
    { title: "AI & Emerging Technology Skills", desc: "Hands‑on AI, ML, and data science fundamentals", icon: "AI" },
    { title: "Innovation & Career Development", desc: "Build innovative projects and showcase your portfolio", icon: "Innovation" }
  ];
  solData.cards = [...(solData.cards || []), ...additionalCards];
  await upsertSection(solKey, solData);

  // 4. Add Training Programs Section
  await upsertSection("training", {
    eyebrow: "Our Training Programs",
    heading: "Advance Your Career with Targeted Courses",
    description: "From beginner to advanced, our courses cover analytics, automation, AI, and more.",
    ctaLabel: "Explore All Courses",
    ctaHref: "/training",
    cards: [
      { title: "Advanced Excel", desc: "Master formulas, pivot tables, and automation", icon: "Excel" },
      { title: "Power BI", desc: "Build interactive dashboards and reports", icon: "PowerBI" },
      { title: "Data Analytics", desc: "Statistical analysis and storytelling with data", icon: "Analytics" },
      { title: "AI Fundamentals", desc: "Intro to machine learning and practical AI tools", icon: "AI" },
      { title: "Report Automation", desc: "Automate data pipelines and scheduled reporting", icon: "Automation" }
    ]
  });

  console.log("All missing content upserted successfully.");
  process.exit(0);
}

main().catch(err => {
  console.error("Error", err);
  process.exit(1);
});
