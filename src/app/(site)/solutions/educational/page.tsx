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
  } catch (error) {
    console.error("Failed to fetch educational solutions page data:", error);
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

      {/* Hero Banner — Match Brand Color Scheme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10">
          <Reveal className="flex flex-col gap-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              {heroData.badge || "Educational Solutions"}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              {heroData.title.split("Learning Systems")[0]}
              <span className="italic text-[#18b8ad]">Learning Systems</span>
              {heroData.title.split("Learning Systems")[1] || ""}
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              {heroData.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/contact?service=Educational Solutions"
                className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 bg-[#18b8ad] text-[#071820]"
                style={{
                  padding: "13px 22px",
                  fontSize: 11,
                  fontWeight: 850
                }}
              >
                Explore Partnership <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/training"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                View Training Programs
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solutions Grid — Warm paper background */}
      <Section className="bg-[#f7f9f8] py-24">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <p style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", color: "#18b8ad" }} className="uppercase">
                Our Educational Services
              </p>
              <h2
                className="font-serif mt-3"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 500, color: "#071820" }}
              >
                Institutional Transformation
              </h2>
            </div>
            <p className="max-w-[420px]" style={{ color: "#68787d", fontSize: 14 }}>
              From academic analytics to curriculum development — practical solutions for forward-thinking educational institutions.
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol: any, i: number) => (
              <RevealItem key={sol.title}>
                <div
                  className="group flex flex-col gap-6 bg-white p-6 h-full transition-all duration-300 hover:shadow-md border border-[#dce6e7]"
                  style={{ borderRadius: 18 }}
                >
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl bg-[#e7f6f4] text-[#18b8ad] transition-colors"
                  >
                    {SOL_ICONS[sol.title] || <GraduationCap className="h-6 w-6 text-[#18b8ad]" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#071820]">{sol.title}</h3>
                    <p className="text-xs text-[#68787d] leading-relaxed mt-2">{sol.desc}</p>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#dce6e7]">
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

      {/* Approach section */}
      <Section className="bg-white py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Methodology
              </span>
              <h2 className="font-serif text-4xl text-[#071820] leading-[1.1] font-medium">
                Our Approach to<br />Educational Transformation
              </h2>
              <p className="text-sm text-[#68787d] leading-relaxed max-w-sm">
                We work alongside educators, administrators, and institutional leaders to understand specific needs before designing any solution — ensuring practical outcomes over theoretical frameworks.
              </p>
              <div className="mt-2">
                <a
                  href="/contact?service=Educational Solutions"
                  className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 bg-[#071820] text-white"
                  style={{
                    padding: "13px 22px",
                    fontSize: 11,
                    fontWeight: 850
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
                      className="flex items-start gap-5 p-5 transition-all duration-300 hover:shadow-sm bg-[#f7f9f8] border border-[#dce6e7]"
                      style={{ borderRadius: 16 }}
                    >
                      <span className="text-3xl font-black text-[#18b8ad]/30 font-display leading-none shrink-0">{s.step}</span>
                      <div>
                        <h3 className="font-bold text-[#071820] text-sm">{s.title}</h3>
                        <p className="text-xs text-[#68787d] mt-1.5 leading-relaxed">{s.desc}</p>
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
            <h2 className="font-serif text-3xl text-[#071820] sm:text-4xl font-medium">
              Partner With The Strategist
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#3d6461] leading-relaxed">
              Whether you&apos;re building analytics capabilities from scratch or scaling existing programs — we&apos;re ready to support your institution&apos;s growth.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact?service=Educational Solutions"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:opacity-90 shadow-md bg-[#071820] text-white"
              style={{
                padding: "13px 22px",
                fontSize: 11,
                fontWeight: 850
              }}
            >
              Start a Conversation <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
