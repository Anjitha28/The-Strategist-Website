"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, BarChart3, Workflow, Gauge, PieChart, Zap, Cpu, Award, BookOpen, Target, Settings } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/config/site";

// Map static solution names to React Lucide components
const SOL_ICONS: Record<string, React.ReactNode> = {
  "Business Analytics": <BarChart3 className="h-6 w-6 text-[#18b8ad]" />,
  "Report Automation": <Workflow className="h-6 w-6 text-[#18b8ad]" />,
  "Dashboard Development": <Gauge className="h-6 w-6 text-[#18b8ad]" />,
  "Data Visualization": <PieChart className="h-6 w-6 text-[#18b8ad]" />,
  "Process Automation": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Application Development": <Cpu className="h-6 w-6 text-[#18b8ad]" />,
};

const EDU_ICONS: Record<string, React.ReactNode> = {
  "Academic Analytics": <BarChart3 className="h-5 w-5 text-[#18b8ad]" />,
  "Learning & Assessment Solutions": <Award className="h-5 w-5 text-[#18b8ad]" />,
  "Curriculum Development": <BookOpen className="h-5 w-5 text-[#18b8ad]" />,
  "Industry-Oriented Programs": <Target className="h-5 w-5 text-[#18b8ad]" />,
};

export default function HomePageClient() {
  const homeData = SITE_CONFIG.home;

  return (
    <>
      {/* ================================================================
          TRUST BAR — Client logos / "Trusted by" strip
          ================================================================ */}
      <div
        className="w-full border-y py-7"
        style={{ background: "#ffffff", borderColor: "#dce6e7" }}
      >
        <p
          className="text-center mb-5"
          style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#8a979b", fontWeight: 850 }}
        >
          TRUSTED BY FORWARD-THINKING ORGANIZATIONS
        </p>
        <div className="container-page flex justify-around items-center gap-8 flex-wrap">
          <div className="text-center" style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82, lineHeight: 1.05 }}>
            MIM.<small className="block text-[8px] font-normal uppercase tracking-wider">KUTTIKKANAM</small>
          </div>
          <div className="text-center" style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82, lineHeight: 1.05 }}>
            CHRIST<small className="block text-[8px] font-normal uppercase tracking-wider">(Autonomous)</small>
          </div>
          <div style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82 }}>SIMS</div>
          <div style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82 }}>Federal Bank</div>
          <div style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82 }}>EY</div>
          <div style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82 }}>KPMG</div>
          <div style={{ fontWeight: 850, color: "#687478", fontSize: "16px", opacity: 0.82 }}>TATA</div>
        </div>
      </div>

      {/* ================================================================
          SOLUTIONS — Dark ink section
          ================================================================ */}
      <section id="solutions" className="py-24" style={{ background: "#071820", color: "#effffd" }}>
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-11">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#7ce3da" }} className="uppercase">
                Corporate Solutions
              </p>
              <h2
                className="mt-3 font-serif"
                style={{ fontSize: "clamp(40px, 4.8vw, 61px)", lineHeight: 0.98, letterSpacing: "-0.05em", fontWeight: 500, maxWidth: 640 }}
              >
                Enterprise-Grade<br />Business Solutions
              </h2>
              <p className="mt-4 max-w-md" style={{ color: "#a1b4b9", fontSize: "14px" }}>
                Technology and analytics solutions designed around real organizational challenges — from automating reporting to building enterprise analytics ecosystems.
              </p>
            </div>
            <Link
              href="/solutions/corporate"
              className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold border"
              style={{ color: "#7ce3da", borderColor: "rgba(124,227,218,0.3)" }}
            >
              View All Solutions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.corporate.solutions.slice(0, 6).map((sol) => (
              <RevealItem key={sol.title}>
                <div
                  className="relative overflow-hidden flex flex-col gap-7 p-6 h-full"
                  style={{
                    minHeight: 280,
                    borderRadius: 17,
                    background: "linear-gradient(145deg,#0d252c,#112e35)",
                    border: "1px solid rgba(124,227,218,0.15)",
                  }}
                >
                  <div className="absolute pointer-events-none" style={{ width: 180, height: 180, border: "1px solid rgba(25,184,173,0.15)", borderRadius: "50%", right: -90, bottom: -90 }} />
                  <div className="grid place-items-center shrink-0" style={{ width: 34, height: 34, border: "1px solid rgba(124,227,218,0.3)", borderRadius: 10, color: "#18b8ad" }}>
                    {SOL_ICONS[sol.title] || <Settings className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontSize: 17 }} className="font-bold text-white">{sol.title}</h3>
                    <p style={{ fontSize: 11, color: "#9db1b6", marginTop: 11, lineHeight: 1.6 }}>{sol.desc}</p>
                  </div>
                  <Link href="/solutions/corporate" style={{ color: "#18b8ad", fontSize: 10, fontWeight: 850 }} className="inline-flex items-center gap-1">
                    Learn more →
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================================
          APPROACH / PROCESS — White section
          ================================================================ */}
      <section id="approach" className="py-24" style={{ background: "#ffffff" }}>
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Methodology
              </p>
              <h2 className="font-serif mt-3" style={{ fontSize: "clamp(40px, 4.8vw, 61px)", lineHeight: 0.98, letterSpacing: "-0.05em", fontWeight: 500, maxWidth: 640 }}>
                Our Approach
              </h2>
            </div>
            <p className="max-w-[380px]" style={{ color: "#68787d", fontSize: 14 }}>
              How we partner with organizations to build lasting, practical systems.
            </p>
          </div>

          <div className="mt-14 grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid #dce6e7" }}>
            {[
              { num: "01", title: "Discover", desc: "Map existing systems, pain points, and strategic objectives before proposing solutions." },
              { num: "02", title: "Design", desc: "Co-create tailored analytics and automation blueprints aligned with your workflows." },
              { num: "03", title: "Build", desc: "Develop and deploy dashboards, automations, and platforms with precision." },
              { num: "04", title: "Improve", desc: "Iterate post-launch, respond to feedback, and ensure lasting organizational adoption." },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-3 p-6" style={{ borderRight: "1px solid #dce6e7", minHeight: 205 }}>
                <div className="grid place-items-center" style={{ width: 42, height: 42, borderRadius: "50%", background: "#e7f6f4", color: "#159f95" }}>
                  <span style={{ fontSize: 11, fontWeight: 900 }}>{step.num}</span>
                </div>
                <div>
                  <span style={{ fontSize: 9, color: "#159f95", letterSpacing: "0.13em", fontWeight: 850, display: "block", marginTop: 17 }}>STEP {step.num}</span>
                  <h3 style={{ fontSize: 14, marginTop: 3 }} className="font-bold text-[#071820]">{step.title}</h3>
                  <p style={{ fontSize: 10, color: "#68787d", marginTop: 7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INDUSTRIES — Light teal-green bg
          ================================================================ */}
      <section id="industries" className="py-24" style={{ background: "#f0f5f4" }}>
        <div className="container-page">
          <Reveal>
            <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
              Who We Serve
            </p>
            <h2 className="font-serif mt-3" style={{ fontSize: "clamp(40px, 4.8vw, 61px)", lineHeight: 0.98, letterSpacing: "-0.05em", fontWeight: 500, maxWidth: 640 }}>
              Solutions Across<br />Organizations
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-2.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {homeData.industries.tags.map((tag) => (
              <RevealItem key={tag}>
                <div className="flex flex-col gap-2 p-5" style={{ background: "#fff", border: "1px solid #dce6e7", borderRadius: 14 }}>
                  <span style={{ color: "#18b8ad", fontSize: 19 }}>◈</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#46575c" }}>{tag}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ================================================================
          SPLIT PANELS — Products + Educational (2-col)
          ================================================================ */}
      <section className="py-24" style={{ background: "#f0f5f4" }}>
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="flex flex-col gap-5 p-9" style={{ minHeight: 300, borderRadius: 23, background: "#071820", color: "#fff" }}>
                <h3 className="font-serif" style={{ fontSize: 31, fontWeight: 500, lineHeight: 1.06, maxWidth: 320 }}>
                  Proprietary Technology Products
                </h3>
                <p style={{ fontSize: 13, color: "#a5b7bb", marginTop: 4 }}>
                  Purpose-built platforms — GradeScope, Proctrix, BeInTrack — designed to solve practical reporting, assessment, and institutional challenges.
                </p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                  {[["GradeScope", "Academic reporting"], ["Proctrix", "Exam integrity"], ["BeInTrack", "Attendance analytics"]].map(([name, desc]) => (
                    <div key={name} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-xs font-bold text-white">{name}</p>
                      <p style={{ fontSize: 10, color: "#a5b7bb" }}>{desc}</p>
                    </div>
                  ))}
                </div>
                <Link href="/products" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#18b8ad" }}>
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-5 p-9" style={{ minHeight: 300, borderRadius: 23, background: "#fff", border: "1px solid #dce6e7" }}>
                <h3 className="font-serif" style={{ fontSize: 31, fontWeight: 500, lineHeight: 1.06, maxWidth: 320, color: "#071820" }}>
                  Educational Solutions
                </h3>
                <p style={{ fontSize: 13, color: "#68787d" }}>
                  We bridge the gap between academic learning and industry requirements through analytics, technology platforms, and practical programs.
                </p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                  {["Academic Analytics", "Curriculum Dev", "Assessment Tools", "Industry Programs"].map((t) => (
                    <div key={t} className="p-3 rounded-lg text-xs font-bold" style={{ background: "#edf5f4", color: "#46575c" }}>
                      {t}
                    </div>
                  ))}
                </div>
                <Link href="/solutions/educational" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#18b8ad" }}>
                  View Educational Solutions <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          INSIGHTS / BLOG — White section
          ================================================================ */}
      <section id="insights" className="py-24" style={{ background: "#ffffff" }}>
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-11">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Insights
              </p>
              <h2 className="font-serif mt-3" style={{ fontSize: "clamp(40px, 4.8vw, 61px)", lineHeight: 0.98, letterSpacing: "-0.05em", fontWeight: 500 }}>
                From Our<br />Knowledge Base
              </h2>
            </div>
            <Link href="/blog" className="text-sm font-bold" style={{ color: "#18b8ad" }}>
              View All Articles →
            </Link>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {SITE_CONFIG.blog.articles.slice(0, 3).map((post) => (
              <RevealItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="p-5 pt-6" style={{ borderTop: "2px solid #18b8ad" }}>
                    <p style={{ fontSize: 9, color: "#159b91", letterSpacing: "0.12em", fontWeight: 850 }} className="uppercase">
                      {post.category}
                    </p>
                    <h3 className="font-serif mt-4 group-hover:text-[#18b8ad] transition-colors" style={{ fontSize: 23, lineHeight: 1.1, fontWeight: 500, color: "#071820" }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 11, color: "#68787d", marginTop: 10 }} className="line-clamp-2">
                      {post.excerpt}
                    </p>
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
          <Reveal>
            <h2
              className="font-serif"
              style={{ fontSize: "clamp(44px, 5.3vw, 72px)", lineHeight: 0.94, fontWeight: 500, letterSpacing: "-0.055em", maxWidth: 850, color: "#071820" }}
            >
              Have a Challenge Worth<br />Solving?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ maxWidth: 650, color: "#3d6461", fontSize: 14, margin: "19px 0 26px" }}>
              Let&apos;s explore how analytics, automation, and technology can help your organization work smarter and grow faster.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold"
              style={{ background: "#071820", color: "#fff", padding: "13px 22px", fontSize: 11 }}
            >
              Start a Conversation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact?service=Products#form"
              className="inline-flex items-center gap-2 rounded-full font-bold border"
              style={{ background: "transparent", color: "#071820", padding: "13px 22px", fontSize: 11, borderColor: "rgba(7,24,32,0.25)" }}
            >
              Request a Demo
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
