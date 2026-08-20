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

      {/* Hero Banner — Exact Selected Brand Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Training Programs
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              Practical Learning for<br />
              <span className="italic text-[#18b8ad]">Real-World Skills</span>
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              Build practical capabilities in analytics, business intelligence, automation, and productivity tools designed for professionals, students, institutions, and organizations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90"
                style={{
                  background: "#18b8ad",
                  color: "#071820",
                  padding: "13px 22px",
                  fontSize: 11,
                  fontWeight: 850
                }}
              >
                Explore Programs <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/contact?service=Training"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Enquire About Training
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Disciplines */}
      <Section className="bg-[#f7f9f8] py-14 border-b border-[#dce6e7]">
        <div className="container-page text-center flex flex-col gap-6">
          <Reveal>
            <span className="text-[10px] font-black text-[#18b8ad] uppercase tracking-[0.2em] block">Core Disciplines</span>
          </Reveal>
          <RevealGroup className="flex flex-wrap justify-center gap-3">
            {trainingData.disciplines.map((disc) => (
              <RevealItem key={disc}>
                <span
                  className="inline-block bg-white px-4.5 py-2 text-xs font-bold text-[#46575c]"
                  style={{ borderRadius: 10, border: "1px solid #dce6e7" }}
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
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Category
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                Learning Modes
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              Programs structured around your constraints, objectives, and requirements.
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trainingData.categories.map((cat) => (
              <RevealItem key={cat.title}>
                <div
                  className="group flex flex-col justify-between bg-white p-6 h-full transition-all duration-300 hover:shadow-md"
                  style={{ borderRadius: 18, border: "1px solid #dce6e7" }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e7f6f4] text-[#18b8ad]">
                      {CAT_ICONS[cat.title] || <BookOpen className="h-6 w-6 text-[#18b8ad]" />}
                    </div>
                    <h3 className="text-base font-bold text-[#071820]">{cat.title}</h3>
                    <p className="text-xs text-[#68787d] leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4" style={{ borderTop: "1px solid #dce6e7" }}>
                    <Link
                      href={cat.href}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[#18b8ad] uppercase tracking-wider group-hover:text-[#159f95] transition-all"
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
      <Section id="courses" className="bg-[#f7f9f8] py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Curriculum
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                Featured Programs
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              Explore our catalog of structured, workplace-ready certification courses.
            </p>
          </div>

          <RevealGroup className="grid gap-6 lg:grid-cols-3">
            {trainingData.courses.map((course) => (
              <RevealItem key={course.slug}>
                <div
                  className="group flex flex-col justify-between bg-white p-6 h-full transition-all duration-300 hover:shadow-md"
                  style={{ borderRadius: 18, border: "1px solid #dce6e7" }}
                >
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-[#071820] leading-tight">{course.title}</h3>
                    <p className="text-xs text-[#68787d] leading-relaxed line-clamp-4">{course.overview}</p>
                    
                    <div className="flex flex-col gap-2.5 mt-4 text-xs text-[#68787d] font-semibold pt-4" style={{ borderTop: "1px solid #dce6e7" }}>
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
                      className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all hover:opacity-90 w-full text-center"
                      style={{
                        background: "#071820",
                        color: "#fff",
                        padding: "11px 20px",
                        fontSize: 11,
                        fontWeight: 850
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
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Advisory Support
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-serif text-3xl text-[#071820] sm:text-4xl font-medium">
              Find the Right Program for Your Goals
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base text-[#3d6461] leading-relaxed">
              Explore practical learning programs designed to help you build relevant, workplace-ready skills.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="flex flex-wrap justify-center gap-3 mt-2">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90"
              style={{
                background: "#071820",
                color: "#fff",
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
              }}
            >
              View Training Programs <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/contact?service=Training"
              className="inline-flex items-center gap-2 rounded-full font-bold border transition-colors hover:bg-black/5"
              style={{
                borderColor: "rgba(7,24,32,0.25)",
                color: "#071820",
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
              }}
            >
              Contact a Training Advisor
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
