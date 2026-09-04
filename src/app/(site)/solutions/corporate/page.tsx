import type { Metadata } from "next";
import { Workflow, Gauge, PieChart, Zap, Network, Cpu, Presentation, ArrowRight, CheckCircle2, Factory, Stethoscope, GraduationCap, ShoppingBag, Landmark, Rocket, Building2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Corporate Solutions | The Strategist",
  description: "Explore The Strategist's corporate analytics, automation, digital transformation, enterprise technology and consulting solutions designed to improve business performance and decision-making.",
};

const IND_ICONS: Record<string, React.ReactNode> = {
  Education: <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
  Healthcare: <Stethoscope className="h-6 w-6 text-[#18b8ad]" />,
  Manufacturing: <Factory className="h-6 w-6 text-[#18b8ad]" />,
  Retail: <ShoppingBag className="h-6 w-6 text-[#18b8ad]" />,
  "Financial Services": <Landmark className="h-6 w-6 text-[#18b8ad]" />,
  Startups: <Rocket className="h-6 w-6 text-[#18b8ad]" />,
  SMEs: <Building2 className="h-6 w-6 text-[#18b8ad]" />,
  "Large Enterprises": <Building2 className="h-6 w-6 text-[#18b8ad]" />,
};

const ICONS: Record<string, React.ReactNode> = {
  "Corporate Analytics": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Digital Transformation": <Network className="h-6 w-6 text-[#18b8ad]" />,
  "Enterprise Technology": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
  "Consulting Services": <Presentation className="h-6 w-6 text-[#18b8ad]" />,
};

const OVERVIEW_SOLUTIONS = [
  {
    title: "Corporate Analytics",
    desc: "Turn business data into clear, actionable insights that support better planning, performance monitoring and decision-making.",
    features: ["Business Intelligence", "Executive Dashboards", "Data Visualization", "Performance Analytics"],
    icon: "Corporate Analytics"
  },
  {
    title: "Digital Transformation",
    desc: "Redesign legacy processes around better data, automation and modern technology to achieve operational excellence.",
    features: ["Digital Strategy", "Process Modernization", "Workflow Optimization", "Technology Adoption"],
    icon: "Digital Transformation"
  },
  {
    title: "Enterprise Technology",
    desc: "Custom platforms, enterprise portals and integrated systems designed to support scalable business growth.",
    features: ["Custom Business Apps", "Enterprise Portals", "Analytics Platforms", "System Integration"],
    icon: "Enterprise Technology"
  },
  {
    title: "Consulting Services",
    desc: "Identify the right technology and implementation approach before investing heavily in digital infrastructure.",
    features: ["Analytics Consulting", "Technology Advisory", "Digital Strategy", "Implementation Roadmaps"],
    icon: "Consulting Services"
  }
];

export default function CorporateSolutionsPage() {
  const approachSteps = SITE_CONFIG.about.approach.steps || [];

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
              Corporate Solutions
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Corporate Solutions That <br className="hidden sm:block" />
              <span className="text-[#18b8ad]">Drive Business Growth</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              Transform your business with intelligent analytics, automation, technology and data-driven solutions designed to improve efficiency, visibility and decision-making.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
                style={{ padding: "13px 24px", fontSize: 13, fontWeight: 800 }}
              >
                Explore Our Solutions <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-6 py-3 text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02. INTRODUCTION SECTION */}
      <Section className="bg-[#F1F6FA] py-20 border-b border-[#dce6e7]">
        <div className="container-page max-w-4xl mx-auto text-center">
          <Reveal className="flex flex-col gap-6">
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Technology Solutions Built Around Your Business
            </h2>
            <p className="text-base sm:text-lg text-[#56666b] leading-relaxed">
              Businesses generate large amounts of data and operate across multiple processes and systems. The Strategist helps organizations turn this complexity into practical, connected and scalable solutions.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-left">
              {[
                "Better visibility", "Automated processes", "Faster reporting",
                "Smarter decisions", "Improved operational efficiency", "Scalable technology"
              ].map(benefit => (
                <div key={benefit} className="flex items-center gap-2.5 text-sm font-bold text-[#071820] bg-white p-3 rounded-xl border border-[#dce6ee]">
                  <CheckCircle2 className="h-4 w-4 text-[#18b8ad] shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 03. MAIN SOLUTIONS */}
      <Section id="solutions" className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Overview
            </span>
            <h2 className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl">
              Our Corporate Solutions
            </h2>
          </div>
          
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {OVERVIEW_SOLUTIONS.map((sol, i) => (
              <RevealItem key={sol.title}>
                <a href={`#${sol.title.toLowerCase().replace(/\s+/g, '-')}`} className="block group h-full">
                  <div className="flex flex-col justify-between p-8 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-6 shadow-xs group-hover:scale-105 transition-all">
                        {ICONS[sol.icon]}
                      </div>
                      <h3 className="text-xl font-bold text-[#071820] leading-snug">{sol.title}</h3>
                      <p className="text-sm text-[#56666b] leading-relaxed mt-3">{sol.desc}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-5 pt-5 border-t border-[#dce6ee]">
                        {sol.features.map(f => (
                          <div key={f} className="text-xs font-semibold text-[#071820] flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#18b8ad]" /> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] group-hover:gap-2.5 transition-all">
                        Learn More <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 04. CORPORATE ANALYTICS */}
      <Section id="corporate-analytics" className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Solution Area
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Corporate Analytics
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              Turn business data into clear, actionable insights that support better planning, performance monitoring and decision-making.
            </p>
            <div className="mt-2">
              <a href="#report-automation" className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-6 py-3 text-[13px]">
                Explore Analytics <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {["Business Intelligence", "Executive Dashboards", "Management Reporting", "Data Visualization", "KPI Monitoring", "Performance Analytics", "Automated Reporting", "Decision Support"].map(item => (
                <div key={item} className="p-4 bg-white border border-[#dce6ee] rounded-xl shadow-xs font-bold text-[#071820] text-sm flex items-center gap-3">
                  <PieChart className="h-4 w-4 text-[#18b8ad]" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 05. REPORT AUTOMATION */}
      <Section id="report-automation" className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Capability
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Report Automation
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              We help organizations automate repetitive reporting workflows and reduce manual reporting effort, ensuring that leaders receive accurate data exactly when they need it.
            </p>
            <ul className="flex flex-col gap-3 mt-2 text-sm font-semibold text-[#071820]">
              {[
                "Automated data collection", "Automated report generation", "Scheduled reporting", 
                "Centralized reporting", "Real-time/near-real-time visibility", "Reduced manual effort", "Consistent reporting"
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#18b8ad] mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-6 py-3 text-[13px]">
                Automate Your Reports <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#071820] to-[#12313a] flex items-center justify-center p-12 border border-[#18b8ad]/20 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <Workflow className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 06. DASHBOARD DEVELOPMENT */}
      <Section id="dashboard-development" className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Capability
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Dashboard Development
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              We design and develop business dashboards for Management, Finance, Sales, Operations, HR, Marketing, and Education sectors, giving leaders a unified view of their organization.
            </p>
            <ul className="flex flex-col gap-3 mt-2 text-sm font-semibold text-[#071820]">
              {[
                "Interactive dashboards", "KPI tracking", "Drill-down analysis", 
                "Data visualization", "Role-based views", "Decision-focused reporting"
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#18b8ad] mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-6 py-3 text-[13px]">
                Build a Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#071820] to-[#12313a] flex items-center justify-center p-12 border border-[#18b8ad]/20 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <Gauge className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 07. DATA VISUALIZATION */}
      <Section id="data-visualization" className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Capability
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Data Visualization
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              Transform complex, sprawling data into clarity. We visualize your metrics so decision-makers instantly understand trends, risks, and opportunities.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {["Charts", "Graphs", "KPI Cards", "Interactive Reports", "Executive Views", "Analytical Dashboards"].map(f => (
                <div key={f} className="p-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#18b8ad]" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#071820] to-[#12313a] flex items-center justify-center p-12 border border-[#18b8ad]/20 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <PieChart className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 08. PROCESS AUTOMATION */}
      <Section id="process-automation" className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Capability
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Process Automation
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              We help automate repetitive business processes and workflows, freeing up your team to focus on high-value strategic work instead of manual data entry.
            </p>
            <ul className="flex flex-col gap-3 mt-2 text-sm font-semibold text-[#071820]">
              {[
                "Workflow automation", "Data entry automation", "Approval workflows", 
                "Notifications", "Process tracking", "System integration", "Operational efficiency"
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#18b8ad] mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-6 py-3 text-[13px]">
                Automate Your Operations <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#071820] to-[#12313a] flex items-center justify-center p-12 border border-[#18b8ad]/20 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <Zap className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 09. DIGITAL TRANSFORMATION */}
      <Section id="digital-transformation" className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Solution Area
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Digital Transformation
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              Digital transformation is not simply replacing manual work with software; it is about redesigning processes around better data, automation and technology.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {["Digital Strategy", "Process Modernization", "Workflow Optimization", "Automation", "Cloud-Enabled Solutions", "System Modernization", "Data-Driven Operations", "Technology Adoption"].map(f => (
                <div key={f} className="p-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#18b8ad]" /> {f}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#071820] to-[#12313a] flex items-center justify-center p-12 border border-[#18b8ad]/20 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <Network className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 10. ENTERPRISE TECHNOLOGY */}
      <Section id="enterprise-technology" className="bg-[#071820] py-24 border-b border-[#0d2f3a] text-white">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Solution Area
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-white font-extrabold tracking-tight leading-tight">
              Enterprise Technology
            </h2>
            <p className="text-base text-[#97aba2] leading-relaxed">
              We design robust technology infrastructure to support scalable enterprise growth and complex data requirements.
            </p>
            <ul className="flex flex-col gap-3 mt-2 text-sm font-semibold text-white">
              {[
                "Custom business applications", "Enterprise portals", "Internal management systems", 
                "Analytics platforms", "Data platforms", "System integration", "Workflow systems", "Custom technology solutions"
              ].map(f => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#18b8ad] mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-white bg-[#18b8ad] text-white hover:text-[#071820] shadow-sm px-6 py-3 text-[13px]">
                Build Your Solution <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-white/5 flex items-center justify-center p-12 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-sm">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <Cpu className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 11. CONSULTING SERVICES */}
      <Section id="consulting-services" className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 lg:order-2 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Solution Area
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Consulting Services
            </h2>
            <p className="text-base text-[#56666b] leading-relaxed">
              Consulting helps organizations identify the right technology and implementation approach before investing heavily in digital infrastructure.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {["Analytics Consulting", "Business Process Analysis", "Technology Advisory", "Digital Strategy", "Data Strategy", "Automation Consulting", "Implementation Roadmaps"].map(f => (
                <div key={f} className="p-3 bg-[#F1F6FA] border border-[#dce6ee] rounded-xl text-xs font-bold text-[#071820] flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#18b8ad]" /> {f}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm px-6 py-3 text-[13px]">
                Talk to Our Consultants <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 flex justify-center">
             <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-[#071820] to-[#12313a] flex items-center justify-center p-12 border border-[#18b8ad]/20 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
               <Presentation className="h-24 w-24 text-[#18b8ad] relative z-10" />
             </div>
          </div>
        </div>
      </Section>

      {/* 12. WHY CHOOSE THE STRATEGIST */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Benefits
            </span>
            <h2 className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl">
              Why Choose The Strategist?
            </h2>
          </div>
          
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Better Decision Making", "Automated Operations", "Real-Time Visibility", 
              "Reduced Manual Work", "Scalable Solutions", "Improved Business Efficiency", 
              "Data-Driven Growth", "Future-Ready Technology"
            ].map((benefit) => (
              <RevealItem key={benefit}>
                <div className="flex items-center gap-3 p-5 h-full bg-white border border-[#dce6ee] rounded-xl shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-[#18b8ad] shrink-0" />
                  <span className="text-sm font-bold text-[#071820] leading-snug">{benefit}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 13. INDUSTRIES WE SERVE */}
      <Section className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Sectors
            </span>
            <h2 className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl">
              Solutions Across Industries
            </h2>
          </div>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Education", "Healthcare", "Manufacturing", "Retail", 
              "Financial Services", "Startups", "SMEs", "Large Enterprises"
            ].map(ind => (
              <RevealItem key={ind}>
                <div className="flex flex-col items-center justify-center p-6 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full grid place-items-center mb-4 border border-[#dce6ee] shadow-xs text-[#18b8ad]">
                    {IND_ICONS[ind] || <Building2 className="h-6 w-6" />}
                  </div>
                  <h3 className="text-sm font-bold text-[#071820]">{ind}</h3>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 14. A PROVEN FRAMEWORK */}
      <Section className="bg-[#071820] py-24 border-b border-[#0d2f3a]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Methodology
            </span>
            <h2 className="font-sans mt-3 text-white font-extrabold tracking-tight text-3xl sm:text-4xl">
              A Proven Framework For Digital Transformation
            </h2>
            <p className="mt-4 text-[#97aba2] text-sm">
              How we work with you from discovery through implementation and optimization.
            </p>
          </div>
          
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.slice(0, 4).map((step: any, idx: number) => (
              <RevealItem key={step.title}>
                <div className="flex flex-col gap-4 bg-white/5 p-6 h-full border border-white/10 rounded-2xl">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white/10 text-white w-fit">
                    PHASE {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug">{step.title}</h3>
                  <p className="text-xs text-[#97aba2] leading-relaxed">{step.description || step.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 15. FINAL CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Ready to Transform Your Business?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#2d524f] leading-relaxed">
              Let's build intelligent analytics, automation and technology solutions that make your business more efficient, connected and ready for what's next.
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
              Schedule a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad] bg-white/50 text-[#071820] hover:bg-white transition-all font-bold shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
