"use client";

import Link from "next/link";
import { BookOpen, User, Building, GraduationCap, Briefcase, ArrowRight, Clock, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";

const CAT_ICONS: Record<string, React.ReactNode> = {
  "Online Courses": <BookOpen className="h-6 w-6 text-[#18b8ad]" />,
  "One-to-One": <User className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate": <Building className="h-6 w-6 text-[#18b8ad]" />,
  "Colleges": <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
  "Internships": <Briefcase className="h-6 w-6 text-[#18b8ad]" />
};

export default function TrainingPage() {
  const trainingData = SITE_CONFIG.training;

  return (
    <>
      <Breadcrumbs items={[{ name: "Training", url: "/training" }]} />

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Training &amp; Capability Development
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Practical Learning for<br />
              <span className="text-[#18b8ad]">Real-World Skills</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              Build practical capabilities in analytics, Power BI dashboards, spreadsheet modeling, report automation, and productivity tools designed for corporate teams, students, and institutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
                style={{
                  padding: "13px 24px",
                  fontSize: 13,
                  fontWeight: 800
                }}
              >
                Explore Programs <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/contact?service=Training"
                className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-6 py-3 text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
              >
                Enquire About Training
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Disciplines */}
      <Section className="bg-[#F1F6FA] py-14 border-b border-[#dce6e7]">
        <div className="container-page text-center flex flex-col gap-6">
          <Reveal>
            <span className="text-xs font-black text-[#18b8ad] uppercase tracking-[0.2em] block">Core Disciplines</span>
          </Reveal>
          <RevealGroup className="flex flex-wrap justify-center gap-3">
            {trainingData.disciplines.map((disc) => (
              <RevealItem key={disc}>
                <span
                  className="inline-block bg-white px-5 py-2.5 text-xs font-bold text-[#071820] rounded-xl border border-[#dce6ee] shadow-xs"
                >
                  {disc}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Program Categories */}
      <Section id="programs" className="bg-white py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Category
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                Learning Modes
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              Programs structured around your constraints, objectives, and requirements.
            </p>
          </div>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trainingData.categories.map((cat) => (
              <RevealItem key={cat.title}>
                <div
                  className="group flex flex-col justify-between bg-[#F1F6FA] p-7 h-full transition-all duration-300 hover:shadow-md border border-[#dce6ee] rounded-2xl shadow-xs"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-[#18b8ad] shadow-xs group-hover:scale-105 transition-all">
                      {CAT_ICONS[cat.title] || <BookOpen className="h-5 w-5 text-[#18b8ad]" />}
                    </div>
                    <h3 className="text-xl font-bold text-[#071820] leading-snug">{cat.title}</h3>
                    <p className="text-sm text-[#56666b] leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#dce6ee]/60">
                    <Link
                      href={cat.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18b8ad] group-hover:gap-2.5 transition-all"
                    >
                      {cat.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Courses List — Warm paper background */}
      <Section id="courses" className="bg-[#F1F6FA] py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Curriculum
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                Featured Programs
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              Explore our catalog of structured, workplace-ready certification courses.
            </p>
          </div>

          <RevealGroup className="grid gap-6 lg:grid-cols-3">
            {trainingData.courses.map((course) => (
              <RevealItem key={course.slug}>
                <div
                  className="group flex flex-col justify-between bg-white p-7 h-full transition-all duration-300 hover:shadow-md border border-[#dce6ee] rounded-2xl shadow-xs"
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#071820] leading-snug">{course.title}</h3>
                    <p className="text-xs text-[#56666b] leading-relaxed line-clamp-4">{course.overview}</p>
                    
                    <div className="flex flex-col gap-2.5 mt-4 text-xs text-[#56666b] font-medium pt-4 border-t border-[#dce6ee]">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#18b8ad]" /> Duration: {course.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-[#18b8ad]" /> Mode: {course.mode}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/training/${course.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm w-full text-center"
                      style={{
                        padding: "12px 20px",
                        fontSize: 12,
                        fontWeight: 800
                      }}
                    >
                      View Details & Modules
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Training Final CTA — Teal gradient */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Advisory Support
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-sans text-3xl text-[#071820] sm:text-4xl font-extrabold tracking-tight">
              Find the Right Program for Your Goals
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base text-[#2d524f] leading-relaxed">
              Explore practical learning programs designed to help you build relevant, workplace-ready skills.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="flex flex-wrap justify-center gap-3 mt-2">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
              style={{
                padding: "13px 24px",
                fontSize: 13,
                fontWeight: 800
              }}
            >
              Explore Courses <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="/contact?service=Training"
              className="inline-flex items-center gap-2 rounded-full font-bold border border-[#dce6ee] bg-white/80 text-[#071820] hover:bg-white transition-all shadow-xs"
              style={{
                padding: "13px 24px",
                fontSize: 13,
                fontWeight: 800
              }}
            >
              Get Custom Training Plan
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
