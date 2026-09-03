import type { Metadata } from "next";
import { BarChart3, Award, BookOpen, Target, GraduationCap, Building, Globe, ArrowRight, ShieldCheck, Users, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Educational Solutions | The Strategist",
  description:
    "We help educational institutions transform how they collect, analyze, and act on student and institutional data — bridging the gap between academic learning and industry requirements.",
};

const SOL_ICONS: Record<string, React.ReactNode> = {
  "Academic Analytics": <BarChart3 className="h-6 w-6 text-[#18b8ad]" />,
  "Certification Programs": <Award className="h-6 w-6 text-[#18b8ad]" />,
  "Curriculum Development": <BookOpen className="h-6 w-6 text-[#18b8ad]" />,
  "Skill Development": <Target className="h-6 w-6 text-[#18b8ad]" />,
  "Training Programs": <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
  "Institutional Technology": <Building className="h-6 w-6 text-[#18b8ad]" />,
  "Industry Partnership": <Globe className="h-6 w-6 text-[#18b8ad]" />,
  "Individual Learning": <Users className="h-6 w-6 text-[#18b8ad]" />,
  "Corporate Learning": <Briefcase className="h-6 w-6 text-[#18b8ad]" />,
  "College Training": <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
  "Online Learning": <Globe className="h-6 w-6 text-[#18b8ad]" />,
  "Internship Programs": <Target className="h-6 w-6 text-[#18b8ad]" />,
};

export default async function EducationalSolutionsPage() {
  let dbPage = null;

  try {
    dbPage = await prisma.page.findUnique({
      where: { slug: "solutions/educational" },
      include: { sections: true },
    });
  } catch {
    // Database connection fallback — defaults handled below
  }

  // Fallbacks
  const heroData = dbPage?.sections.find(s => s.key === "hero")?.data
    ? JSON.parse(dbPage.sections.find(s => s.key === "hero")!.data)
    : {
        badge: "Educational Solutions",
        title: "Building Smarter Learning Systems",
        description: "We help educational institutions transform how they collect, analyze, and act on student and institutional data — bridging the gap between academic learning and industry requirements.",
      };

  const programsData = dbPage?.sections.find(s => s.key === "programs")?.data
    ? JSON.parse(dbPage.sections.find(s => s.key === "programs")!.data)
    : null;

  const solutions = programsData?.items
    ? programsData.items.map((item: any) => ({
        title: item.title,
        desc: item.description,
        icon: item.icon,
      }))
    : SITE_CONFIG.educational.solutions;

  const journeyData = dbPage?.sections.find(s => s.key === "journey")?.data
    ? JSON.parse(dbPage.sections.find(s => s.key === "journey")!.data)
    : null;

  const approachSteps = journeyData?.items
    ? journeyData.items.map((item: any) => ({
        step: String(item.step).padStart(2, "0"),
        title: item.title,
        desc: item.description,
      }))
    : [
        { step: "01", title: "Needs Discovery", desc: "We map your current systems, pain points, and institutional priorities before any solution design." },
        { step: "02", title: "Tailored Design", desc: "Solutions are custom-built around your academic calendar, curriculum structure, and technology environment." },
        { step: "03", title: "Deployment & Training", desc: "We deploy, onboard staff, and ensure adoption — not just installation." },
        { step: "04", title: "Ongoing Support", desc: "Post-delivery support and continuous improvement as your institution grows and requirements evolve." },
      ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Educational", url: "/solutions/educational" }]} />

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10">
          <Reveal className="flex flex-col gap-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              {heroData.badge || "Educational Solutions"}
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              {heroData.title.split("Learning Systems")[0]}
              <span className="text-[#18b8ad]">Learning Systems</span>
              {heroData.title.split("Learning Systems")[1] || ""}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-xl">
              {heroData.description || "We help educational institutions transform how they collect, analyze, and act on student and institutional data — bridging the gap between academic learning and industry requirements."}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/contact?service=Educational Solutions"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
                style={{
                  padding: "13px 24px",
                  fontSize: 13,
                  fontWeight: 800
                }}
              >
                Explore Partnership <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/training"
                className="inline-flex items-center gap-2 rounded-full border border-[#dce6ee] bg-[#F1F6FA] px-6 py-3 text-xs font-bold text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
              >
                View Training Programs
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solutions Grid */}
      <Section className="bg-white py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Our Educational Services
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                Institutional Transformation
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              From academic analytics to curriculum development — practical solutions for forward-thinking educational institutions.
            </p>
          </div>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol: any, i: number) => (
              <RevealItem key={sol.title}>
                <div
                  className="group flex flex-col justify-between p-7 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div>
                    <div
                      className="w-11 h-11 rounded-xl bg-white border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-5 shadow-xs group-hover:scale-105 transition-all"
                    >
                      {SOL_ICONS[sol.title] || <GraduationCap className="h-5 w-5 text-[#18b8ad]" />}
                    </div>
                    <h3 className="text-xl font-bold text-[#071820] leading-snug">{sol.title}</h3>
                    <p className="text-sm text-[#56666b] leading-relaxed mt-2.5">{sol.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between border-t border-[#dce6ee]/60">
                    <span className="text-[10px] font-black text-[#8a979b] uppercase tracking-wider">
                      Service {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-7 w-7 rounded-full bg-white border border-[#dce6ee] group-hover:bg-[#18b8ad] group-hover:text-white transition-colors grid place-items-center shadow-xs">
                      <ArrowRight className="h-3.5 w-3.5 text-[#18b8ad] group-hover:text-white" />
                    </span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Approach section */}
      <Section className="bg-[#F1F6FA] py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Methodology
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] leading-tight font-extrabold tracking-tight">
                Our Approach to<br />Educational Transformation
              </h2>
              <p className="text-sm text-[#56666b] leading-relaxed max-w-sm">
                We work alongside educators, administrators, and institutional leaders to understand specific needs before designing any solution — ensuring practical outcomes over theoretical frameworks.
              </p>
              <div className="mt-2">
                <a
                  href="/contact?service=Educational Solutions"
                  className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
                  style={{
                    padding: "13px 24px",
                    fontSize: 13,
                    fontWeight: 800
                  }}
                >
                  Start a Partnership <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <RevealGroup className="flex flex-col gap-4">
                {approachSteps.map((s: any) => (
                  <RevealItem key={s.step}>
                    <div
                      className="flex items-start gap-5 p-6 transition-all duration-300 hover:shadow-sm bg-white border border-[#dce6ee] rounded-2xl shadow-xs"
                    >
                      <span className="text-2xl font-black text-[#18b8ad] font-sans leading-none shrink-0">{s.step}</span>
                      <div>
                        <h3 className="font-bold text-[#071820] text-base">{s.title}</h3>
                        <p className="text-xs text-[#56666b] mt-1.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-sans text-3xl text-[#071820] sm:text-4xl font-extrabold tracking-tight">
              Partner With The Strategist
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#2d524f] leading-relaxed">
              Whether you&apos;re building analytics capabilities from scratch or scaling existing programs — we&apos;re ready to support your institution&apos;s growth.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact?service=Educational Solutions"
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
