import type { Metadata } from "next";
import { Workflow, PieChart, Table, Gauge, Cpu, Zap, Presentation, Settings, ArrowRight, Compass, LineChart, Brain, FileText, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate Solutions | The Strategist",
  description:
    "Enterprise-grade business solutions designed around real organizational challenges — from automating reporting to building enterprise analytics ecosystems.",
};

const SOL_ICONS: Record<string, React.ReactNode> = {
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Spreadsheet Consulting": <Table className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Application Development": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate Training": <Presentation className="h-6 w-6 text-[#18b8ad]" />,
  "Business Intelligence": <LineChart className="h-6 w-6 text-[#18b8ad]" />,
  "Data Analytics": <LineChart className="h-6 w-6 text-[#18b8ad]" />,
  "Artificial Intelligence": <Brain className="h-6 w-6 text-[#18b8ad]" />,
  "Technology Consulting": <ShieldCheck className="h-6 w-6 text-[#18b8ad]" />,
};

export default async function CorporateSolutionsPage() {
  let dbPage = null;
  let dbServices: any[] = [];

  try {
    dbPage = await prisma.page.findUnique({
      where: { slug: "solutions/corporate" },
      include: { sections: true },
    });

    dbServices = await prisma.service.findMany({
      where: { status: "published", category: { slug: "corporate" } },
      orderBy: { order: "asc" },
    });
  } catch {
    // Database connection fallback — defaults handled below
  }

  // Fallbacks
  const heroData = dbPage?.sections.find(s => s.key === "hero")?.data
    ? JSON.parse(dbPage.sections.find(s => s.key === "hero")!.data)
    : {
        badge: "Corporate Solutions",
        title: "Enterprise-Grade Business Solutions",
        description: "Technology and analytics solutions designed around real organizational challenges — from automating reporting workflows to building enterprise-grade analytics systems.",
      };

  const services = dbServices.length > 0
    ? dbServices.map(s => ({
        title: s.name,
        desc: s.shortDescription || s.description,
      }))
    : SITE_CONFIG.corporate.solutions;

  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Corporate", url: "/solutions/corporate" }]} />

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10">
          <Reveal className="flex flex-col gap-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              {heroData.badge || "Corporate Solutions"}
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              {heroData.title.split("Business Solutions")[0]}
              <span className="text-[#18b8ad]">Business Solutions</span>
              {heroData.title.split("Business Solutions")[1] || ""}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-xl">
              {heroData.description || "Technology and analytics solutions designed around real organizational challenges — from automating reporting workflows to building enterprise-grade analytics systems."}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/contact?service=Corporate Solutions"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
                style={{
                  padding: "13px 24px",
                  fontSize: 13,
                  fontWeight: 800
                }}
              >
                Request a Consultation <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-6 py-3 text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
              >
                Talk to Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <Section className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Our Services
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                What We Deliver
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              From data visualization to process automation — we help businesses eliminate inefficiency and create data-driven competitive advantage.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {/* Corporate Analytics */}
            <div className="bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl p-8 lg:p-12 shadow-xs">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-[#18b8ad] shadow-xs">
                  <PieChart className="h-6 w-6 text-[#18b8ad]" />
                </div>
                <h3 className="text-2xl font-bold text-[#071820]">Corporate Analytics</h3>
              </div>
              <p className="text-base text-[#56666b] leading-relaxed mb-8">
                Transform raw data into strategic assets. Our corporate analytics solutions provide clear, actionable intelligence for executive decision-making.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {["Business Intelligence", "Executive Dashboards", "Data Visualization", "Performance Analytics", "Decision Support"].map(item => (
                  <div key={item} className="bg-white p-4 rounded-xl border border-[#dce6ee] text-sm font-bold text-[#071820]">
                    {item}
                  </div>
                ))}
              </div>
              <a href="/contact?service=Corporate Analytics" className="inline-flex items-center gap-2 text-sm font-bold text-[#18b8ad] hover:gap-3 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Digital Transformation */}
            <div className="bg-white border border-[#dce6ee] rounded-2xl p-8 lg:p-12 shadow-xs">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] shadow-xs">
                  <Workflow className="h-6 w-6 text-[#18b8ad]" />
                </div>
                <h3 className="text-2xl font-bold text-[#071820]">Digital Transformation</h3>
              </div>
              <p className="text-base text-[#56666b] leading-relaxed mb-8">
                Modernize operations and eliminate friction. We help organizations streamline workflows and adopt digital strategies that create real efficiency.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {["Business Process Automation", "Workflow Optimization", "Cloud Transformation", "Digital Strategy", "Technology Modernization"].map(item => (
                  <div key={item} className="bg-[#F1F6FA] p-4 rounded-xl border border-[#dce6ee] text-sm font-bold text-[#071820]">
                    {item}
                  </div>
                ))}
              </div>
              <a href="/contact?service=Digital Transformation" className="inline-flex items-center gap-2 text-sm font-bold text-[#18b8ad] hover:gap-3 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Enterprise Technology */}
            <div className="bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl p-8 lg:p-12 shadow-xs">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-[#18b8ad] shadow-xs">
                  <Cpu className="h-6 w-6 text-[#18b8ad]" />
                </div>
                <h3 className="text-2xl font-bold text-[#071820]">Enterprise Technology</h3>
              </div>
              <p className="text-base text-[#56666b] leading-relaxed mb-8">
                Scalable technical foundations built for growth. From custom applications to integrated data platforms, we engineer systems that work for you.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {["Custom Business Applications", "Enterprise Portals", "Analytics Platforms", "Data Platforms", "System Integration"].map(item => (
                  <div key={item} className="bg-white p-4 rounded-xl border border-[#dce6ee] text-sm font-bold text-[#071820]">
                    {item}
                  </div>
                ))}
              </div>
              <a href="/contact?service=Enterprise Technology" className="inline-flex items-center gap-2 text-sm font-bold text-[#18b8ad] hover:gap-3 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Consulting Services */}
            <div className="bg-white border border-[#dce6ee] rounded-2xl p-8 lg:p-12 shadow-xs">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] shadow-xs">
                  <Compass className="h-6 w-6 text-[#18b8ad]" />
                </div>
                <h3 className="text-2xl font-bold text-[#071820]">Consulting Services</h3>
              </div>
              <p className="text-base text-[#56666b] leading-relaxed mb-8">
                Expert advisory to navigate complex business challenges. We provide clear roadmaps and strategies to optimize your operational performance.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {["Analytics Consulting", "Technology Advisory", "Digital Strategy", "Business Process Analysis", "Implementation Roadmaps"].map(item => (
                  <div key={item} className="bg-[#F1F6FA] p-4 rounded-xl border border-[#dce6ee] text-sm font-bold text-[#071820]">
                    {item}
                  </div>
                ))}
              </div>
              <a href="/contact?service=Consulting Services" className="inline-flex items-center gap-2 text-sm font-bold text-[#18b8ad] hover:gap-3 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Value proposition */}
      <section className="relative overflow-hidden py-24 bg-[#F1F6FA]">
        <div className="container-page relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
                  Why It Matters
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] leading-tight font-extrabold tracking-tight">
                  Data is Only Valuable<br />When It Drives Decisions
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-base text-[#56666b] leading-relaxed">
                  Most organizations collect data but struggle to act on it. The Strategist bridges that gap — building systems that transform raw data into clear, actionable business intelligence.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {[
                  { stat: "70%", label: "Reduction in manual reporting time" },
                  { stat: "3x", label: "Faster business decision cycles" },
                  { stat: "50+", label: "Organizations transformed" },
                  { stat: "100%", label: "Tailored to your workflows" },
                ].map((item) => (
                  <RevealItem key={item.label}>
                    <div
                      className="rounded-2xl p-6 bg-white border border-[#dce6ee] shadow-xs hover:border-[#18b8ad] transition-colors"
                    >
                      <p className="text-3xl font-black text-[#18b8ad] font-sans">{item.stat}</p>
                      <p className="text-xs text-[#56666b] mt-1.5 leading-snug font-bold">{item.label}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Teal gradient */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-sans text-3xl text-[#071820] sm:text-4xl font-extrabold tracking-tight">
              Ready to Transform Your Operations?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#2d524f] leading-relaxed">
              Schedule a free consultation with The Strategist to explore how analytics and automation can create immediate impact for your organization.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact?service=Corporate Solutions"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] shadow-sm bg-[#071820] text-white"
              style={{
                padding: "13px 24px",
                fontSize: 13,
                fontWeight: 800
              }}
            >
              Request a Consultation <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
