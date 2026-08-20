"use client";

import { CheckCircle2, Award, Zap, Compass, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

export default function AboutPage() {
  const aboutData = SITE_CONFIG.about;
  
  const stepIcons = [
    <Compass key="understand" className="h-6 w-6 text-[#18b8ad]" />,
    <Users key="analyze" className="h-6 w-6 text-[#18b8ad]" />,
    <Zap key="build" className="h-6 w-6 text-[#18b8ad]" />,
    <Award key="improve" className="h-6 w-6 text-[#18b8ad]" />
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      {/* Hero Banner — Exact Selected Brand Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Who We Are
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              About{" "}
              <span className="italic text-[#18b8ad]">The Strategist</span>
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              Strategy. Technology. Analytics. Practical Transformation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Introduction */}
      <Section className="bg-white py-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="flex flex-col gap-6 text-center">
            <p className="text-lg sm:text-xl leading-relaxed text-[#071820] font-semibold">
              The Strategist is a technology and analytics organization focused on helping businesses and institutions improve the way they work, understand information, and make decisions.
            </p>
            <p className="text-base leading-relaxed text-[#68787d]">
              We combine analytical thinking, automation, technology development, and practical industry knowledge to create solutions that are useful, scalable, and aligned with real-world requirements.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Our Approach — Warm paper background */}
      <Section className="bg-[#f7f9f8] py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Methodology
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                Our Approach
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              How we partner with organizations to build lasting, practical systems.
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.approach.steps.map((step, idx) => (
              <RevealItem key={step.title}>
                <div
                  className="flex flex-col gap-4 bg-white p-6 h-full transition-all duration-300 hover:shadow-md"
                  style={{ borderRadius: 18, border: "1px solid #dce6e7" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] text-[#18b8ad]">
                      {stepIcons[idx]}
                    </span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "#e7f6f4", color: "#159f95" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#071820]">{step.title}</h3>
                  <p className="text-xs text-[#68787d] leading-relaxed">{step.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* What We Believe */}
      <Section className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Philosophy
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                What We Believe
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              Core values that guide our solution designs and advisory work.
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.beliefs.map((belief, idx) => (
              <RevealItem key={idx}>
                <div
                  className="flex items-start gap-4 p-5 h-full bg-[#f7f9f8]"
                  style={{ borderRadius: 16, border: "1px solid #dce6e7" }}
                >
                  <CheckCircle2 className="h-5 w-5 text-[#18b8ad] shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-[#071820] leading-relaxed">
                    {belief}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Capabilities */}
      <Section className="bg-[#f7f9f8] py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Expertise
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                Our Capabilities
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              A comprehensive suite of transformation and technical services.
            </p>
          </div>

          <RevealGroup className="flex flex-wrap justify-center gap-3 mt-1 max-w-4xl mx-auto">
            {aboutData.capabilities.map((cap) => (
              <RevealItem key={cap}>
                <span
                  className="inline-block bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-[#46575c]"
                  style={{ borderRadius: 10, border: "1px solid #dce6e7" }}
                >
                  {cap}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Final CTA — Teal gradient */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-serif text-3xl text-[#071820] sm:text-4xl font-medium">
              Let&apos;s Build Something Smarter
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#3d6461] leading-relaxed">
              Schedule a free consultation with The Strategist to explore how analytics and automation can create immediate impact for your organization.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 shadow-md"
              style={{
                background: "#071820",
                color: "#fff",
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
              }}
            >
              Get In Touch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
