import type { Metadata } from "next";
import { CheckCircle2, Workflow, Gauge, PieChart, Table, Zap, LineChart, Network, Cpu, Presentation, GraduationCap, ArrowRight, MapPin, Building, Users, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | The Strategist",
  description: "The Strategist is an analytics, automation, technology and learning organization focused on helping businesses and institutions make smarter decisions.",
};

const SPEC_ICONS: Record<string, React.ReactNode> = {
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Spreadsheet Consulting": <Table className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate Training": <Presentation className="h-6 w-6 text-[#18b8ad]" />,
  "Educational Technology Solutions": <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
};

const specializations = [
  { name: "Report Automation", desc: "" },
  { name: "Dashboard Development", desc: "" },
  { name: "Data Visualization", desc: "" },
  { name: "Spreadsheet Consulting", desc: "" },
  { name: "Process Automation", desc: "" },
  { name: "Corporate Training", desc: "" },
  { name: "Educational Technology Solutions", desc: "" },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      {/* SECTION 01: About / Page Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              About
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              About <span className="text-[#18b8ad]">The Strategist</span>
            </h1>
            <div className="max-w-xl mx-auto mt-4 py-6 border-l-4 border-[#18b8ad]/30 pl-6 text-left">
              <p className="font-sans font-medium text-lg sm:text-xl md:text-2xl text-[#56666b]">
                The Strategist is an analytics, automation, and training company with 16+ years of experience supporting corporates
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 02: Company Introduction & Metrics */}
      <Section className="bg-[#071820] py-24 text-white">
        <div className="container-page">
          <RevealGroup className="grid gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center divide-x divide-white/10">
            {[
              { label: "Years of Experience", value: "12+" },
              { label: "Automation", value: "100+" },
              { label: "Trained", value: "50k+" },
              { label: "Analytics", value: "200+" },
              { label: "Regions", value: "6" },
              { label: "Clients", value: "150+" },
              { label: "Projects", value: "300+" },
            ].map((metric) => (
              <RevealItem key={metric.label}>
                <div className="flex flex-col gap-2 p-4">
                  <span className="text-4xl sm:text-5xl font-black text-[#18b8ad] font-sans">{metric.value}</span>
                  <span className="text-xs sm:text-sm font-bold text-[#a1b4b9] uppercase tracking-wider">{metric.label}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* SECTION 03: We Specialize In */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl">
              We Specialize In
            </h2>
          </div>
          
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map((spec) => (
              <RevealItem key={spec.name}>
                <div className="group relative flex flex-col justify-center items-center text-center p-7 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-5 shadow-xs group-hover:scale-105 transition-all">
                    {SPEC_ICONS[spec.name] || <CheckCircle2 className="h-6 w-6 text-[#18b8ad]" />}
                  </div>
                  <h3 className="text-lg font-bold text-[#071820] leading-snug">{spec.name}</h3>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* SECTION 04: Our Impact */}
      <Section className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] font-extrabold tracking-tight leading-tight mb-8">
              Our Impact
            </h2>
            <p className="text-lg sm:text-xl text-[#56666b] leading-relaxed max-w-3xl mx-auto font-medium">
              "Our services and training programs have reached clients across Kerala, India, UAE, Oman, USA, and Europe."
            </p>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 05: Our Vision */}
      <section className="relative overflow-hidden py-24 bg-[#071820] text-center border-b border-[#0d2f3a]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #18b8ad 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container-page relative z-10">
          <Reveal className="max-w-4xl mx-auto flex flex-col gap-6 bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-sm">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Our Vision
            </span>
            <p className="font-sans text-2xl sm:text-4xl text-white font-extrabold leading-tight tracking-tight">
              "To build smarter organizations and industry-ready professionals through analytics, automation, and practical learning."
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 06: Final CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 px-4">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Let's Build Smarter Systems Together
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              Contact Our Team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions/corporate"
              className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad] bg-white/50 text-[#071820] hover:bg-white transition-all font-bold shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              View Solutions
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
