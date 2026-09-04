"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Workflow, Gauge, PieChart, Zap, Cpu, Settings, GraduationCap, HeartPulse, Factory, ShoppingBag, Landmark, Rocket, Network, Building2, TriangleAlert, Database, BarChart2, FileText, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/config/site";
import { Accordion } from "@/components/ui/Accordion";

// Map static solution names to React Lucide components
const SOL_ICONS: Record<string, React.ReactNode> = {
  "Business Analytics": <BarChart3 className="h-6 w-6 text-[#18b8ad]" />,
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Application Development": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
  "Business Intelligence": <BarChart3 className="h-6 w-6 text-[#18b8ad]" />,
  "Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Artificial Intelligence": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
  "Enterprise Platforms": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Custom Solutions": <Settings className="h-6 w-6 text-[#18b8ad]" />,
  "Innovation": <Settings className="h-6 w-6 text-[#18b8ad]" />,
};

const getIndIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("education")) return <GraduationCap className="h-5 w-5" />;
  if (n.includes("health")) return <HeartPulse className="h-5 w-5" />;
  if (n.includes("manufactur")) return <Factory className="h-5 w-5" />;
  if (n.includes("retail")) return <ShoppingBag className="h-5 w-5" />;
  if (n.includes("financ") || n.includes("bank")) return <Landmark className="h-5 w-5" />;
  if (n.includes("startup")) return <Rocket className="h-5 w-5" />;
  if (n.includes("sme") || n.includes("mid-market") || n.includes("block") || n.includes("connect")) return <Network className="h-5 w-5" />;
  return <Building2 className="h-5 w-5" />;
};

const getStageIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("discover")) return <TriangleAlert className="h-5 w-5 text-[#18b8ad]" />;
  if (t.includes("design")) return <Database className="h-5 w-5 text-[#18b8ad]" />;
  if (t.includes("build")) return <Settings className="h-5 w-5 text-[#18b8ad]" />;
  if (t.includes("deploy")) return <BarChart2 className="h-5 w-5 text-[#18b8ad]" />;
  if (t.includes("optimize")) return <Gauge className="h-5 w-5 text-[#18b8ad]" />;
  if (t.includes("report")) return <FileText className="h-5 w-5 text-[#18b8ad]" />;
  if (t.includes("decision")) return <TrendingUp className="h-5 w-5 text-[#18b8ad]" />;
  return <Settings className="h-5 w-5 text-[#18b8ad]" />;
};

interface HomePageClientProps {
  clientLogos?: { name: string; logoUrl?: string }[];
  services?: { title: string; desc: string; icon?: string | null }[];
  testimonials?: { id: string; name: string; company?: string | null; designation?: string | null; quote: string; rating: number }[];
  blogPosts?: { title: string; slug: string; excerpt: string; category: string }[];
  faqs?: { id: string; question: string; answer: string }[];
  solutionsData?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    buttonLabel?: string;
    buttonLink?: string;
    cards?: { title: string; desc: string; icon?: string; link?: string }[];
  };
  frameworkData?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    stages?: { num: string; title: string; desc: string }[];
  };
  industriesData?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    industries?: { name: string; desc: string; icon: string }[];
  };
  splitPanelsData?: {
    products?: { eyebrow: string; title: string; desc: string; linkText: string; linkHref: string; items?: { name: string; desc: string }[] };
    education?: { eyebrow: string; title: string; desc: string; linkText: string; linkHref: string; tags?: string[] };
  };
}

export default function HomePageClient({
  clientLogos,
  services,
  testimonials,
  blogPosts,
  faqs,
  solutionsData,
  frameworkData,
  industriesData,
  splitPanelsData,
}: HomePageClientProps) {
  const homeData = SITE_CONFIG.home;

  const trustLogos = clientLogos || [
    { name: "MIM.KUTTIKKANAM" },
    { name: "CHRIST(Autonomous)" },
    { name: "SIMS" },
    { name: "Federal Bank" },
    { name: "EY" },
    { name: "KPMG" },
    { name: "TATA" },
  ];

  // Dynamic solutions fallback
  const solEyebrow = solutionsData?.eyebrow || "Our Solutions";
  const solHeading = solutionsData?.heading || "Enterprise Solutions That Drive Business Growth";
  const solDescription = solutionsData?.description || "We help organizations transform data into strategic assets through intelligent analytics, report automation, and enterprise technology solutions.";
  const solBtnLabel = solutionsData?.buttonLabel || "Explore All Solutions";
  const solBtnLink = solutionsData?.buttonLink || "/solutions/corporate";
  const displayServices = solutionsData?.cards || services || SITE_CONFIG.corporate.solutions.slice(0, 6);

  // Dynamic framework fallback
  const frameEyebrow = frameworkData?.eyebrow || "Our Approach";
  const rawFrameHeading = frameworkData?.heading || "A Proven Framework For Digital Transformation";
  const frameHeading = rawFrameHeading.split("\n")[0];
  const frameDescription = frameworkData?.description || "How we partner with organizations to turn complex data into clear, lasting business decisions and operational efficiency.";
  const displayStages = frameworkData?.stages || [
    { num: "01", title: "Discover", desc: "Identify key challenges, gather stakeholder requirements, and audit existing data assets to establish a clear digital roadmap." },
    { num: "02", title: "Design", desc: "Co-create tailored analytics and automation blueprints aligned with your operational workflows and KPIs." },
    { num: "03", title: "Build", desc: "Develop high-performance dashboards, report automation pipelines, and platforms with precision." },
    { num: "04", title: "Deploy", desc: "Roll out the solution securely, integrating it with your existing enterprise systems and infrastructure." },
    { num: "05", title: "Optimize", desc: "Provide continuous refinement, performance tuning, and hands-on team enablement for sustainable outcomes." },
    { num: "06", title: "Report Automation", desc: "Automate repetitive reporting workflows to ensure timely and accurate information delivery." },
    { num: "07", title: "Business Decisions", desc: "Empower leadership with actionable insights and clear data to drive strategic business growth." },
  ];

  // Dynamic industries fallback
  const indEyebrow = industriesData?.eyebrow || "Industries";
  const indHeading = industriesData?.heading || "Solutions Built For Every Industry";
  const indDescription = industriesData?.description || "Tailored analytics frameworks and automated systems engineered to solve industry-specific operations and workflows.";
  const displayIndustries = industriesData?.industries || [
    { name: "Education", desc: "K-12 & Higher Ed Analytics", icon: "🎓" },
    { name: "Healthcare", desc: "Clinical & Operations Intelligence", icon: "🏥" },
    { name: "Manufacturing", desc: "Supply Chain & IoT Tracking", icon: "⚙️" },
    { name: "Retail & E-Com", desc: "Omnichannel & Customer Analytics", icon: "🛍️" },
    { name: "Financial Services", desc: "Banking, Risk & Portfolio Analytics", icon: "💳" },
    { name: "Startups & Scaleups", desc: "Seed to Series Growth Metrics", icon: "🚀" },
    { name: "SMEs & Mid-Market", desc: "Operational Efficiency & Modernization", icon: "📈" },
    { name: "Large Enterprises", desc: "Scalable Enterprise Automation", icon: "🏢" }
  ];

  // Dynamic split panels fallback
  const productsPanel = splitPanelsData?.products || {
    eyebrow: "Technology Products",
    title: "Proprietary Technology Platforms",
    desc: "Purpose-built platforms — GradeScope, Proctrix, BeInTrack — designed to solve practical reporting, assessment, and institutional operations.",
    linkText: "Explore Products",
    linkHref: "/products",
    items: [
      { name: "GradeScope", desc: "Academic reporting" },
      { name: "Proctrix", desc: "Exam assessment" },
      { name: "BeInTrack", desc: "Process analytics" },
    ],
  };

  const educationPanel = splitPanelsData?.education || {
    eyebrow: "Education & Enablement",
    title: "Educational Solutions",
    desc: "We bridge the gap between academic learning and industry requirements through practical analytics curriculum, certifications, and institutional platforms.",
    linkText: "View Educational Solutions",
    linkHref: "/solutions/educational",
    tags: ["Academic Analytics", "Curriculum Dev", "Assessment Tools", "Industry Programs"],
  };

  const displayArticles = blogPosts || SITE_CONFIG.blog.articles.slice(0, 3);

  return (
    <>
      {/* ================================================================
          TRUST BAR — Client logos / "Trusted by" strip
          ================================================================ */}
      <div
        className="w-full border-y py-7 bg-white border-[#dce6e7]"
      >
        <p
          className="text-center mb-5"
          style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#8a979b", fontWeight: 850 }}
        >
          TRUSTED BY FORWARD-THINKING ORGANIZATIONS
        </p>
        <div className="container-page flex justify-around items-center gap-8 flex-wrap">
          {trustLogos.map((logo, i) => (
            <div
              key={logo.name + "-" + i}
              className="text-center font-bold text-[#687478] text-base opacity-80"
              style={{ fontWeight: 850, lineHeight: 1.05 }}
            >
              {logo.name.includes(".") ? (
                <>
                  {logo.name.split(".")[0]}.
                  <small className="block text-[8px] font-normal uppercase tracking-wider">
                    {logo.name.split(".")[1]}
                  </small>
                </>
              ) : logo.name.includes("(") ? (
                <>
                  {logo.name.split("(")[0]}
                  <small className="block text-[8px] font-normal uppercase tracking-wider">
                    ({logo.name.split("(")[1].replace(")", "")})
                  </small>
                </>
              ) : (
                logo.name
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================
          SOLUTIONS — Clean white section (Group 1: 6 cards)
          ================================================================ */}
      <section id="solutions" className="py-24 bg-white border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              {solEyebrow !== solHeading && (
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                  {solEyebrow}
                </span>
              )}
              <h2
                className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
              >
                {solHeading}
              </h2>
              <p className="mt-4 text-base text-[#56666b] leading-relaxed">
                {solDescription}
              </p>
            </div>
            <Link
              href={solBtnLink}
              className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold border border-[#dce6ee] bg-[#F1F6FA] text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] hover:shadow-sm transition-all"
            >
              {solBtnLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {displayServices.map((sol: any, i) => (
              <RevealItem key={`${sol.title}-${i}`}>
                <Link href={sol.link || "/solutions/corporate"} className="block h-full group">
                  <div
                    className="relative overflow-hidden flex flex-col justify-between p-7 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300"
                    style={{ minHeight: 280 }}
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-white border border-[#dce6ee] grid place-items-center mb-5 text-[#18b8ad] shadow-xs group-hover:border-[#18b8ad]/40 group-hover:scale-105 transition-all">
                        {typeof sol.icon === "string" && SOL_ICONS[sol.icon] ? (
                          SOL_ICONS[sol.icon]
                        ) : sol.icon && typeof sol.icon !== "string" ? (
                          sol.icon
                        ) : (
                          SOL_ICONS[sol.title] || <Settings className="h-5 w-5" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-[#071820] leading-snug group-hover:text-[#18b8ad] transition-colors">{sol.title}</h3>
                      <p className="text-sm text-[#56666b] mt-2.5 leading-relaxed">{sol.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#dce6ee]/60">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] group-hover:gap-2.5 transition-all">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================================
          NEW SECTION – Turning Complex Data into Clear Decisions
          ================================================================ */}
      <section id="turning-complex-data" className="py-24 bg-white border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">Why The Strategist</span>
              <h2 className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Turning Complex Data into Clear Decisions
              </h2>
              <p className="mt-4 text-base text-[#56666b] leading-relaxed">
                Enterprise capability across intelligence, automation and platforms — engineered around measurable business outcomes.
              </p>
            </div>
          </div>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {[{num: "01", title: "Business Intelligence"},
              {num: "02", title: "Automation"},
              {num: "03", title: "Artificial Intelligence"},
              {num: "04", title: "Enterprise Platforms"},
              {num: "05", title: "Custom Solutions"},
              {num: "06", title: "Innovation"}].map((item, i) => (
              <RevealItem key={item.num + "-" + i}>
                <div className="relative flex flex-col p-6 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#dce6ee] grid place-items-center mb-4 text-[#18b8ad] shadow-sm">
                    {SOL_ICONS[item.title] || <Settings className="h-5 w-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-[#071820] leading-snug">
                    {item.title}
                  </h3>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================================
          INDUSTRIES — Solutions Built For Every Industry (Group 3: 8 cards)
          ================================================================ */}
      <section id="industries" className="py-24 bg-white border-t border-[#dce6e7]">
        <div className="container-page">
          <Reveal className="max-w-2xl mb-12">
            {indEyebrow !== indHeading && (
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                {indEyebrow}
              </span>
            )}
            <h2
              className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
            >
              {indHeading}
            </h2>
            <p className="mt-4 text-base text-[#56666b] leading-relaxed">
              {indDescription}
            </p>
          </Reveal>

          <RevealGroup className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {displayIndustries.map((ind: any, i: number) => (
              <RevealItem key={ind.name + "-" + i}>
                <div className="group relative flex flex-col p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-4 shadow-sm group-hover:scale-105 transition-all">
                    {getIndIcon(ind.name)}
                  </div>
                  <h3 className="text-base font-bold text-[#071820] leading-snug">{ind.name}</h3>
                  {ind.desc && <p className="text-xs text-[#56666b] mt-1.5 leading-relaxed">{ind.desc}</p>}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

{/* ================================================================
   APPROACH / PROCESS — Framework section (Group 2: 4 cards)
   ================================================================ */}
<section id="framework" className="py-24 bg-white border-t border-[#dce6e7]">
  <div className="container-page">
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
      <div className="max-w-2xl">
        {frameEyebrow !== frameHeading && (
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
            {frameEyebrow}
          </span>
        )}
        <h2 className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
          {frameHeading}
        </h2>
        <p className="mt-4 text-base text-[#56666b] leading-relaxed">
          {frameDescription}
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {displayStages.map((step: any, i: number) => (
        <div
          key={step.num + "-" + i}
          className="group relative flex flex-col justify-between p-7 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300"
          style={{ minHeight: 280 }}
        >
          <div>
            <div className="flex items-center mb-5">
              <div className="w-11 h-11 rounded-full bg-white border border-[#dce6ee] grid place-items-center shadow-xs group-hover:border-[#18b8ad]/40 transition-all">
                {getStageIcon(step.title)}
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#071820] leading-snug">{step.title}</h3>
            <p className="text-sm text-[#56666b] mt-2.5 leading-relaxed">{step.desc}</p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#dce6ee]/60 flex items-center justify-between text-xs text-[#8a979b] font-medium">
            <span>Phase {step.num || `0${i + 1}`}</span>
            <span className="text-[#18b8ad] font-bold">✓</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================================================================
          INSIGHTS SECTION – after Framework
      ================================================================ */}
      <section id="insights" className="py-24 bg-white border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">Insights</span>
              <h2 className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl">Insights That Drive Better Decisions</h2>
            </div>
            <Link href="/insights" className="shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold border border-[#dce6ee] bg-[#F1F6FA] text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] hover:shadow-sm transition-all">
              Read All Insights →
            </Link>
          </div>
          {/* Placeholder for insights list – replace with actual component if exists */}
          <p className="text-base text-[#56666b]">No insights available yet.</p>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA SECTION WITH STATISTICS
      ================================================================ */}
      <section id="final-cta" className="py-24 bg-[#F1F6FA] border-t border-[#dce6e7]">
        <div className="container-page text-center">
          <h2 className="text-3xl font-extrabold text-[#071820]">Ready to Transform Your Business?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-[#56666b]">
            Partner with The Strategist to build intelligent analytics platforms, automate operations and enable data‑driven decisions that create measurable business outcomes.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-[#071820]">500+</p>
              <p className="mt-2 text-sm text-[#56666b]">Projects Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#071820]">98%</p>
              <p className="mt-2 text-sm text-[#56666b]">Client Retention</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#071820]">12+</p>
              <p className="mt-2 text-sm text-[#56666b]">Years of Expertise</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/schedule-consultation" className="inline-flex items-center justify-center rounded-full bg-[#18b8ad] px-6 py-3 text-sm font-bold text-white hover:bg-[#13a09a]">
              Schedule a Consultation →
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#18b8ad] px-6 py-3 text-sm font-bold text-[#18b8ad] hover:bg-[#18b8ad]/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
