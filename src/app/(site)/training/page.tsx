import type { Metadata } from "next";
import { GraduationCap, ArrowRight, Laptop, Briefcase, UserPlus, FileText, CheckCircle2, PlayCircle, BarChart, Database, Zap, PieChart, Target, Table, Layers, Cog, Lightbulb, Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Training Programs | The Strategist",
  description: "Select a learning pathway tailored for personal excellence, academic growth, or corporate optimization.",
};

export default function TrainingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Training", url: "/training" }]} />

      {/* 01. HERO */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Training Hub
            </span>
            
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Training Programs
            </h1>
            
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl mx-auto mt-4">
              Select a learning pathway tailored for personal excellence, academic growth, or corporate optimization.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
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
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-6 py-3 text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
              >
                Student Portal Login
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02. CORE DISCIPLINES */}
      <Section className="bg-[#071820] py-24 text-white border-b border-[#0d2f3a]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-sans text-white font-extrabold tracking-tight text-3xl sm:text-4xl">
              Core disciplines
            </h2>
          </div>
          
          <RevealGroup className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Advanced Excel", "Power BI", "Data Analytics", 
              "Dashboards", "Report Automation", "Business Intelligence"
            ].map(disc => (
              <RevealItem key={disc}>
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white hover:bg-[#18b8ad]/20 hover:border-[#18b8ad]/50 transition-all cursor-default">
                  {disc}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 03. LEARNING PATHWAYS */}
      <Section id="courses" className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Showcase
            </span>
            <h2 className="font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl mb-4">
              Learning Pathways
            </h2>
            <p className="text-[#56666b] text-base leading-relaxed">
              Explore custom-tailored tracks built for professionals, students, and companies.
            </p>
          </div>
          
          <RevealGroup className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto items-stretch">
            {[
              {
                num: "01",
                slug: "online-courses",
                category: "Self-Serve",
                title: "Online Courses",
                desc: "Self-paced video courses for professional spreadsheet modeling and analytics.",
                image: "/images/pathways/online-courses.jpg",
                icon: <Laptop className="h-4 w-4" />,
                isWide: false,
              },
              {
                num: "02",
                slug: "corporate",
                category: "B2B / Program",
                title: "Corporate",
                desc: "Dedicated team automation, reports, and analytical solutions training.",
                image: "/images/pathways/corporate.jpg",
                icon: <Briefcase className="h-4 w-4" />,
                isWide: false,
              },
              {
                num: "03",
                slug: "one-to-one",
                category: "B2B / Program",
                title: "One-to-One",
                desc: "Personalized mentoring sessions tailored for custom growth plans.",
                image: "/images/pathways/one-to-one.jpg",
                icon: <UserPlus className="h-4 w-4" />,
                isWide: false,
              },
              {
                num: "04",
                slug: "internships",
                category: "Self-Serve",
                title: "Internships",
                desc: "Hands-on project experience with placement-focused learning paths.",
                image: "/images/pathways/internships.jpg",
                icon: <Target className="h-4 w-4" />,
                isWide: false,
              },
              {
                num: "05",
                slug: "colleges",
                category: "B2B / Program",
                title: "Colleges",
                desc: "Curriculum partnerships and evaluation systems for students and academies.",
                image: "/images/pathways/colleges.jpg",
                icon: <GraduationCap className="h-4 w-4" />,
                isWide: true,
              }
            ].map(path => (
              <RevealItem key={path.num} className={path.isWide ? "md:col-span-2" : ""}>
                <Link
                  href={`/training/${path.slug}`}
                  className={`relative rounded-[28px] overflow-hidden border border-[#dce6ee] bg-[#071820] text-white p-7 sm:p-9 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-[#18b8ad] transition-all duration-500 group block ${
                    path.isWide ? "min-h-[380px]" : "min-h-[420px]"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    style={{ backgroundImage: `url(${path.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071820] via-[#071820]/85 via-45% to-[#071820]/30 pointer-events-none z-10" />
                  
                  {/* Top Bar */}
                  <div className="relative z-20 flex items-center justify-between gap-4 w-full">
                    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      path.category === "Self-Serve"
                        ? "bg-[#18b8ad]/20 text-[#18b8ad] border border-[#18b8ad]/40"
                        : "bg-[#0d2f3a]/80 text-[#5eead4] border border-[#18b8ad]/30"
                    }`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
                      {path.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 group-hover:text-[#18b8ad] transition-colors">
                        TRACK // {path.num}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-[#18b8ad] group-hover:bg-[#18b8ad]/20 transition-all duration-300">
                        {path.icon}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-20 mt-auto pt-10 space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#18b8ad] transition-colors duration-300 leading-tight">
                      {path.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 group-hover:text-zinc-100 transition-colors duration-300 leading-relaxed max-w-xl">
                      {path.desc}
                    </p>
                    <div className="pt-3">
                      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white group-hover:bg-[#18b8ad] group-hover:text-[#071820] group-hover:border-[#18b8ad] transition-all duration-300 shadow-md">
                        <span>Explore Track</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 04. CURRICULUM FLOW */}
      <Section className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block mb-3">
              Curriculum Flow
            </span>
            <h2 className="font-sans text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl mb-4">
              The Learning Journey
            </h2>
            <p className="text-[#56666b] text-base leading-relaxed">
              Our structured approach translates absolute beginners into industry-ready data specialists.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <RevealGroup className="flex flex-col gap-6">
              {[
                { step: "01", title: "Business Challenge", desc: "Translate complex corporate problems into structured analytical frameworks.", icon: <Target className="h-5 w-5" /> },
                { step: "02", title: "Data Collection", desc: "Aggregate ERP database outputs, CRM tables, and live transactional streams.", icon: <Database className="h-5 w-5" /> },
                { step: "03", title: "Data Engineering", desc: "Build query views, clean null anomalies, and consolidate reporting directories.", icon: <Cog className="h-5 w-5" /> },
                { step: "04", title: "Analytics", desc: "Apply nesting, calculation tables, and advanced DAX loops.", icon: <BarChart className="h-5 w-5" /> },
                { step: "05", title: "Visualization", desc: "Design high-density interactive dashboards with real-time KPI thresholds.", icon: <PieChart className="h-5 w-5" /> },
                { step: "06", title: "Report Automation", desc: "Eliminate copy-paste loops via robust macro schedules.", icon: <Zap className="h-5 w-5" /> },
                { step: "07", title: "Business Decisions", desc: "Empower decision-makers with confident, automated data intelligence.", icon: <Lightbulb className="h-5 w-5" /> }
              ].map((stage, idx) => (
                <RevealItem key={stage.step}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl hover:shadow-sm transition-all group">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#dce6ee] text-[#18b8ad] font-black shrink-0 group-hover:scale-105 transition-all shadow-xs">
                      {stage.step}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-[#071820] mb-2 flex items-center gap-2">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-[#56666b] leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#dce6ee] text-[#dce6ee] shrink-0">
                      {stage.icon}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* 05. INTEGRATED LEARNING TOOLS */}
      <Section className="bg-[#071820] py-24 text-white border-b border-[#0d2f3a]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] block mb-3">
              Ecosystem
            </span>
            <h2 className="font-sans text-white font-extrabold tracking-tight text-3xl sm:text-4xl mb-4">
              Integrated Learning Tools
            </h2>
            <p className="text-[#97aba2] text-base leading-relaxed">
              Every course is backed by a robust suite of digital learning tools.
            </p>
          </div>
          
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              { num: "01", title: "Assignments", desc: "Project-focused work solving real corporate models.", icon: <FileText className="h-5 w-5" /> },
              { num: "02", title: "Mock Tests", desc: "Time-bound simulation of actual placement tests.", icon: <Target className="h-5 w-5" /> },
              { num: "03", title: "Assessments", desc: "Automatic test checking and granular output evaluation.", icon: <CheckCircle2 className="h-5 w-5" /> },
              { num: "04", title: "Certificates", desc: "Verified downloadable credentials with unique IDs.", icon: <Award className="h-5 w-5" /> },
              { num: "05", title: "Video Lessons", desc: "Step-by-step video instructions mapping analytical loops.", icon: <PlayCircle className="h-5 w-5" /> },
              { num: "06", title: "Progress Tracking", desc: "Interactive visual scoring of your modular checklist.", icon: <BarChart className="h-5 w-5" /> }
            ].map(tool => (
              <RevealItem key={tool.title}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all h-full flex flex-col group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/5 grid place-items-center text-[#18b8ad] group-hover:scale-105 transition-all">
                      {tool.icon}
                    </div>
                    <h3 className="text-base font-bold text-white flex-grow">{tool.title}</h3>
                    <span className="text-xl font-black text-white/10 group-hover:text-white/20 transition-colors">{tool.num}</span>
                  </div>
                  <p className="text-sm text-[#97aba2] leading-relaxed mt-2">{tool.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* 06. FINAL CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <h2 className="font-sans text-3xl sm:text-5xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Start Your Learning Journey
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#2d524f] leading-relaxed font-bold max-w-2xl mx-auto">
              Practical, placement-focused training in Advanced Excel, Power BI, Data Analytics, dashboards and automation. Explore a program and begin building career-ready skills with The Strategist.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
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
              Contact a Training Advisor
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
