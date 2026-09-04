import type { Metadata } from "next";
import { Workflow, Gauge, PieChart, Table, Zap, Presentation, Smartphone, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate Solutions | The Strategist",
  description: "Corporate solutions, reporting, dashboards and automation.",
};

const ICONS: Record<string, React.ReactNode> = {
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Spreadsheet Consulting": <Table className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "App Development": <Smartphone className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate Training": <Presentation className="h-6 w-6 text-[#18b8ad]" />,
};

const SERVICES = [
  {
    title: "Report Automation",
    desc: "Automate MIS, financial, operational, and management reports with speed and accuracy.",
  },
  {
    title: "Data Visualization",
    desc: "Convert complex data into meaningful visual insights and interactive reports.",
  },
  {
    title: "Spreadsheet Consulting",
    desc: "Advanced Excel systems, automation, validation, and optimization solutions.",
  },
  {
    title: "Dashboard Development",
    desc: "Real-time dashboards for KPI tracking, performance monitoring, and business intelligence.",
  },
  {
    title: "App Development",
    desc: "Custom business applications for reporting, workflow, and operational management.",
  },
  {
    title: "Process Automation",
    desc: "Reduce manual work through intelligent workflow and process automation.",
  },
  {
    title: "Corporate Training",
    desc: "Hands-on training in Excel, Power BI, analytics, dashboards, and automation tools.",
  }
];

export default function CorporateSolutionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Corporate", url: "/solutions/corporate" }]} />

      {/* 01. HERO */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              For Businesses & Corporates
            </span>
            
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Corporate Solutions
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-bold text-[#18b8ad]">
              Smarter Reporting. Faster Decisions.
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl mx-auto">
              We help organizations automate reporting, improve visibility, optimize workflows, and make faster business decisions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02. SERVICES LIST */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((sol) => (
              <RevealItem key={sol.title}>
                <Link href="/contact" className="block group h-full">
                  <div className="flex flex-col justify-between p-8 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-6 shadow-xs group-hover:scale-105 transition-all">
                        {ICONS[sol.title]}
                      </div>
                      <h3 className="text-xl font-bold text-[#071820] leading-snug">{sol.title}</h3>
                      <p className="text-sm text-[#56666b] leading-relaxed mt-3">{sol.desc}</p>
                    </div>
                    <div className="mt-8">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] group-hover:gap-2.5 transition-all">
                        Learn More <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 03. FINAL CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Looking for custom automation, reports or dashboards?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#2d524f] leading-relaxed font-bold">
              We provide full-spectrum consultation, audit, development, and training integration tailored to your company.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              Schedule a Free Discovery Session <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
