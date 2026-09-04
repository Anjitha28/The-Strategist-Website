import type { Metadata } from "next";
import { Award, BookOpen, GraduationCap, ShieldCheck, ArrowRight, BarChart3 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Educational Solutions | The Strategist",
  description: "The Strategist helps institutions bridge the gap between academics and industry through practical training, automation, and analytics platforms.",
};

const SOL_ICONS: Record<string, React.ReactNode> = {
  "Training Programs": <GraduationCap className="h-6 w-6 text-[#18b8ad]" />,
  "Certification Programs": <Award className="h-6 w-6 text-[#18b8ad]" />,
  "Curriculum Development": <BookOpen className="h-6 w-6 text-[#18b8ad]" />,
  "Academic Analytics Solutions": <BarChart3 className="h-6 w-6 text-[#18b8ad]" />,
};

const SERVICES = [
  {
    title: "Training Programs",
    desc: "Practical programs in Excel, Power BI, Data Analytics, Financial Analytics, and Business Intelligence.",
    icon: "Training Programs",
    link: "/education/training-programs"
  },
  {
    title: "Certification Programs",
    desc: "Industry-oriented certifications focused on employability and practical skills.",
    icon: "Certification Programs",
    link: "/education/certification-programs"
  },
  {
    title: "Curriculum Development",
    desc: "Modern, analytics-driven curriculum aligned with industry expectations.",
    icon: "Curriculum Development",
    link: "/education/curriculum-development"
  },
  {
    title: "Academic Analytics Solutions",
    desc: "Technology platforms for reporting, evaluation, analytics, and performance tracking.",
    icon: "Academic Analytics Solutions",
    link: "/education/academic-analytics-solutions"
  }
];

export default function EducationalSolutionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Educational", url: "/solutions/educational" }]} />

      {/* EDUCATIONAL SOLUTIONS HERO */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              For Colleges & Universities
            </span>
            
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Educational Solutions
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-bold text-[#18b8ad]">
              Building Industry-Ready Learning Systems
            </h2>
            
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl mx-auto">
              The Strategist helps institutions bridge the gap between academics and industry through practical training, automation, and analytics platforms.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SOLUTIONS CARDS */}
      <Section className="bg-[#F1F6FA] py-24 border-b border-[#dce6e7]">
        <div className="container-page">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((sol) => (
              <RevealItem key={sol.title}>
                <Link href={sol.link} className="block group h-full">
                  <div className="flex flex-col justify-between p-8 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8a979b] block mb-4">
                        Academic Solution
                      </span>
                      <div className="w-16 h-16 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] mb-6 shadow-xs group-hover:scale-105 transition-all">
                        {SOL_ICONS[sol.icon]}
                      </div>
                      <h3 className="text-xl font-bold text-[#071820] leading-snug">{sol.title}</h3>
                      <p className="text-sm text-[#56666b] leading-relaxed mt-3">{sol.desc}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[#56666b] group-hover:text-[#18b8ad] transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* REFERENCE CTA */}
      <section className="py-24 text-center bg-[#071820] text-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 px-4">
          <Reveal>
            <h2 className="font-sans text-2xl sm:text-4xl text-white font-extrabold tracking-tight leading-tight">
              Looking to run a certificate program or skill lab?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#97aba2] leading-relaxed font-medium">
              We partner with academic institutions to provide practical workshops, syllabus updates, and assessment platforms.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-white bg-[#18b8ad] text-white hover:text-[#071820] shadow-sm"
              style={{
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 800
              }}
            >
              Request an Institutional Partnership Proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
