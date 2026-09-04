"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Workflow, Gauge, PieChart, Zap, Cpu, Settings } from "lucide-react";
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
    { num: "03", title: "Build & Deploy", desc: "Develop and deploy high-performance dashboards, report automation pipelines, and platforms with precision." },
    { num: "04", title: "Optimize & Enable", desc: "Provide continuous refinement, performance tuning, and hands-on team enablement for sustainable outcomes." },
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

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{num: "01", title: "Business Intelligence"},
              {num: "02", title: "Automation"},
              {num: "03", title: "Artificial Intelligence"},
              {num: "04", title: "Enterprise Platforms"},
              {num: "05", title: "Custom Solutions"},
              {num: "06", title: "Innovation"}].map((item, i) => (
              <RevealItem key={item.num + "-" + i}>
                <div className="relative overflow-hidden flex flex-col justify-between p-5 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300" style={{ minHeight: 160 }}>
                  <div className="flex items-center mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-xs font-black text-[#071820] shadow-xs">
                      {item.num}
                    </div>
                    <h3 className="ml-3 text-xl font-bold text-[#071820] leading-snug flex items-center">
                      {SOL_ICONS[item.title] || <Settings className="h-5 w-5 mr-2" />}{item.title}
                    </h3>
                  </div>
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
                <div className="group flex flex-col justify-between p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/50 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-lg mb-4 shadow-xs group-hover:scale-105 transition-all">
                      {ind.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#071820] leading-snug">{ind.name}</h3>
                    <p className="text-xs text-[#56666b] mt-1.5 leading-relaxed">{ind.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#dce6ee]/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#18b8ad] group-hover:translate-x-0.5 transition-transform">Explore →</span>
                  </div>
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
            <div className="flex items-center justify-between mb-5">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-xs font-black text-[#071820] shadow-xs group-hover:border-[#18b8ad]/40 transition-all">
                {step.num}
              </div>
              <span className="text-[10px] font-black tracking-[0.18em] uppercase text-[#18b8ad]">
                STAGE {step.num}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#071820] leading-snug">{step.title}</h3>
            <p className="text-sm text-[#56666b] mt-2.5 leading-relaxed">{step.desc}</p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#dce6ee]/60 flex items-center justify-between text-xs text-[#8a979b] font-medium">
            <span>Phase {step.num}</span>
            <span className="text-[#18b8ad] font-bold">✓</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ================================================================
          SPLIT PANELS — Products + Educational (2-col)
          ================================================================ */}
      <section className="py-24 bg-[#F1F6FA] border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="flex flex-col justify-between gap-5 p-9 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md transition-all duration-300" style={{ minHeight: 340 }}>
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block mb-2">{productsPanel.eyebrow}</span>
                  <h3 className="font-sans text-[#071820] font-extrabold text-2xl sm:text-3xl leading-snug">
                    {productsPanel.title}
                  </h3>
                  <p className="text-sm text-[#56666b] mt-3 leading-relaxed">
                    {productsPanel.desc}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2.5 my-2">
                  {(productsPanel.items || [["GradeScope", "Academic reporting"], ["Proctrix", "Exam assessment"], ["BeInTrack", "Process analytics"]]).map((item: any, i: number) => {
                    const name = Array.isArray(item) ? item[0] : item.name;
                    const desc = Array.isArray(item) ? item[1] : item.desc;
                    return (
                      <div key={name + "-" + i} className="p-3.5 rounded-xl bg-[#F1F6FA] border border-[#dce6ee]">
                        <p className="text-xs font-bold text-[#071820]">{name}</p>
                        <p className="text-[10px] text-[#68787d] mt-1 leading-snug">{desc}</p>
                      </div>
                    );
                  })}
                </div>
                <Link href={productsPanel.linkHref || "/products"} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] hover:gap-2.5 transition-all">
                  {productsPanel.linkText || "Explore Products"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="flex flex-col justify-between gap-5 p-9 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md transition-all duration-300" style={{ minHeight: 340 }}>
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block mb-2">{educationPanel.eyebrow}</span>
                  <h3 className="font-sans text-[#071820] font-extrabold text-2xl sm:text-3xl leading-snug">
                    {educationPanel.title}
                  </h3>
                  <p className="text-sm text-[#56666b] mt-3 leading-relaxed">
                    {educationPanel.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 my-2">
                  {(educationPanel.tags || ["Academic Analytics", "Curriculum Dev", "Assessment Tools", "Industry Programs"]).map((tag: string, i: number) => (
                    <span key={tag + "-" + i} className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#F1F6FA] text-[#071820] border border-[#dce6ee]">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={educationPanel.linkHref || "/solutions/educational"} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] hover:gap-2.5 transition-all">
                  {educationPanel.linkText || "View Educational Solutions"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS — Dynamic customer quotes
          ================================================================ */}
      {testimonials && testimonials.length > 0 && (
        <section id="testimonials" className="py-24 bg-white border-t border-[#dce6e7]">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Testimonials
              </span>
              <h2
                className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
              >
                Loved by Forward-Thinking Leaders
              </h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-between bg-[#F1F6FA] p-8 transition-all hover:shadow-md border border-[#dce6ee] rounded-2xl shadow-xs"
                >
                  <div>
                    <div className="flex gap-1 mb-4 text-[#18b8ad]">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-[#46575c] leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#dce6ee] flex items-center gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#071820]">{t.name}</h4>
                      <p className="text-xs text-[#8a979b] mt-0.5">
                        {t.designation}{t.company ? `, ${t.company}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          FAQS — Dynamic accordion support
          ================================================================ */}
      {faqs && faqs.length > 0 && (
        <section id="faqs" className="py-24 bg-white border-t border-[#dce6e7]">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Support
              </span>
              <h2
                className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
              >
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={faqs} />
          </div>
        </section>
      )}

      {/* ================================================================
          INSIGHTS / BLOG — White section
          ================================================================ */}
      <section id="insights" className="py-24 bg-white border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Insights
              </span>
              <h2
                className="mt-3 font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
              >
                From Our Knowledge Base
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-[#18b8ad] inline-flex items-center gap-1 hover:gap-2 transition-all">
              View All Articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <RevealGroup className="grid gap-5 sm:grid-cols-3">
            {displayArticles.map((post, i) => (
              <RevealItem key={post.slug + "-" + i}>
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <div className="flex flex-col justify-between p-7 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#159f95] block mb-3">
                        {post.category}
                      </span>
                      <h3 className="font-sans font-bold text-lg text-[#071820] group-hover:text-[#18b8ad] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#56666b] mt-3 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#dce6ee]/60">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] group-hover:gap-2.5 transition-all">
                        Read article <ArrowRight className="h-3.5 w-3.5" />
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
          FINAL CTA — Teal gradient
          ================================================================ */}
      <section className="py-20" style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}>
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <h2
              className="font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight"
            >
              Let&apos;s Build Smarter Systems Together
            </h2>
            <p className="text-base sm:text-lg text-[#2d524f] leading-relaxed mt-4 mb-8">
              Whether you are a corporate organization seeking automation and analytics, or an institution wanting industry-ready outcomes, The Strategist is ready to support your transformation journey.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full font-bold bg-[#071820] text-white transition-all hover:bg-[#0d2f3a] shadow-sm hover:shadow-md px-6 py-3.5 text-xs sm:text-sm"
              >
                Schedule a Consultation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/solutions/corporate"
                className="inline-flex items-center gap-2 rounded-full font-bold border border-[#071820]/15 bg-white/80 text-[#071820] hover:bg-white transition-all shadow-xs px-6 py-3.5 text-xs sm:text-sm"
              >
                Explore Solutions
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
