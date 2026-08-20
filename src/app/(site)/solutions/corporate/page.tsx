"use client";

import { Workflow, PieChart, Table, Gauge, Cpu, Zap, Presentation, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

const SOL_ICONS: Record<string, React.ReactNode> = {
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Spreadsheet Consulting": <Table className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Application Development": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate Training": <Presentation className="h-6 w-6 text-[#18b8ad]" />,
};

export default function CorporateSolutionsPage() {
  const solutions = SITE_CONFIG.corporate.solutions;

  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Corporate", url: "/solutions/corporate" }]} />

      {/* Hero Banner — Exact Selected Brand Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10">
          <Reveal className="flex flex-col gap-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Corporate Solutions
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              Enterprise-Grade<br />
              <span className="italic text-[#18b8ad]">Business Solutions</span>
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              Technology and analytics solutions designed around real organizational challenges — from automating reporting workflows to building enterprise-grade analytics systems.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/contact?service=Corporate Solutions"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90"
                style={{
                  background: "#18b8ad",
                  color: "#071820",
                  padding: "13px 22px",
                  fontSize: 11,
                  fontWeight: 850
                }}
              >
                Request a Consultation <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Talk to Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Grid — Warm paper gray background & clean border layouts */}
      <Section className="bg-[#f7f9f8] py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Our Services
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                What We Deliver
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              From data visualization to process automation — we help businesses eliminate inefficiency and create data-driven competitive advantage.
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol, i) => (
              <RevealItem key={sol.title}>
                <div
                  className="group relative flex flex-col gap-6 bg-white p-6 h-full transition-all duration-300 hover:shadow-md"
                  style={{ borderRadius: 18, border: "1px solid #dce6e7" }}
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl bg-[#e7f6f4] text-[#18b8ad] transition-colors"
                  >
                    {SOL_ICONS[sol.title] || <Settings className="h-6 w-6 text-[#18b8ad]" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#071820]">{sol.title}</h3>
                    <p className="text-xs text-[#68787d] leading-relaxed mt-2">{sol.desc}</p>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: "1px solid #dce6e7" }}>
                    <span className="text-[9px] font-black text-[#8a979b] uppercase tracking-wider">
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-6 w-6 rounded-full bg-[#e7f6f4] group-hover:bg-[#18b8ad]/20 transition-colors grid place-items-center">
                      <ArrowRight className="h-3 w-3 text-[#18b8ad]" />
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Value proposition — Dark section */}
      <section className="relative overflow-hidden py-24 bg-[#071820]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="container-page relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Reveal>
                <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                  Why It Matters
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="font-serif text-4xl text-white sm:text-5xl leading-tight font-medium">
                  Data is Only Valuable<br />When It Drives Decisions
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-base text-[#a1b4b9] leading-relaxed">
                  Most organizations collect data but struggle to act on it. The Strategist bridges that gap — building systems that transform raw data into clear, actionable business intelligence.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <RevealGroup className="grid gap-3 sm:grid-cols-2">
                {[
                  { stat: "70%", label: "Reduction in manual reporting time" },
                  { stat: "3x", label: "Faster business decision cycles" },
                  { stat: "50+", label: "Organizations transformed" },
                  { stat: "100%", label: "Tailored to your workflows" },
                ].map((item) => (
                  <RevealItem key={item.label}>
                    <div
                      className="rounded-2xl p-6 transition-colors"
                      style={{ border: "1px solid rgba(124,227,218,0.15)", background: "linear-gradient(145deg,#0d252c,#112e35)" }}
                    >
                      <p className="text-3xl font-black text-[#18b8ad]">{item.stat}</p>
                      <p className="text-xs text-[#9db1b6] mt-1.5 leading-snug">{item.label}</p>
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
            <h2 className="font-serif text-3xl text-[#071820] sm:text-4xl font-medium">
              Ready to Transform Your Operations?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#3d6461] leading-relaxed">
              Schedule a free consultation with The Strategist to explore how analytics and automation can create immediate impact for your organization.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact?service=Corporate Solutions"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 shadow-md"
              style={{
                background: "#071820",
                color: "#fff",
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
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
