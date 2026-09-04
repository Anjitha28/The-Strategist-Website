import type { Metadata } from "next";
import { CheckCircle2, Award, Zap, Compass, Users, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SITE_CONFIG } from "@/config/site";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | The Strategist",
  description: "Learn about The Strategist, our methodology, core values, beliefs, and capabilities.",
};

const defaultIcons: Record<string, React.ReactNode> = {
  "Discover": <Compass className="h-6 w-6 text-[#18b8ad]" />,
  "Design": <Users className="h-6 w-6 text-[#18b8ad]" />,
  "Build": <Zap className="h-6 w-6 text-[#18b8ad]" />,
  "Improve": <Award className="h-6 w-6 text-[#18b8ad]" />,
};

export default async function AboutPage() {
  let dbPage = null;
  try {
    dbPage = await prisma.page.findUnique({
      where: { slug: "about" },
      include: { sections: true },
    });
  } catch {
    // Database connection fallback — defaults handled below
  }

  // Fallbacks
  const heroData = dbPage?.sections.find(s => s.key === "hero")?.data 
    ? JSON.parse(dbPage.sections.find(s => s.key === "hero")!.data)
    : {
        badge: "Who We Are",
        title: "About The Strategist",
        description: "Strategy. Technology. Analytics. Practical Transformation.",
      };

  const overviewData = dbPage?.sections.find(s => s.key === "overview")?.data
    ? JSON.parse(dbPage.sections.find(s => s.key === "overview")!.data)
    : {
        heading: "Who We Are",
        paragraphs: [
          "The Strategist is an analytics, automation, and technology company with 16+ years of experience supporting corporates and educational institutions.",
          "We combine analytical thinking, automation, technology development, and practical industry knowledge to create solutions that are useful, scalable, and aligned with real-world requirements.",
          "Our services and training programs have reached clients across Kerala, India, UAE, Oman, USA, and Europe."
        ]
      };

  const journeyData = dbPage?.sections.find(s => s.key === "journey")?.data
    ? JSON.parse(dbPage.sections.find(s => s.key === "journey")!.data)
    : null;

  const approachSteps = journeyData?.items 
    ? journeyData.items.map((item: any) => ({
        num: String(item.step).padStart(2, "0"),
        title: item.title,
        desc: item.description,
      }))
    : SITE_CONFIG.about.approach.steps;

  const beliefs = SITE_CONFIG.about.beliefs;
  const capabilities = SITE_CONFIG.about.capabilities;
  const whyUs = SITE_CONFIG.home.whyUs;
  const industries = SITE_CONFIG.home.industries;

  return (
    <>
      <Breadcrumbs items={[{ name: "About Us", url: "/about" }]} />

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              {heroData.badge || "Who We Are"}
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              {heroData.title.split("The Strategist")[0]}
              <span className="text-[#18b8ad]">The Strategist</span>
              {heroData.title.split("The Strategist")[1] || ""}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              {heroData.description || "An analytics, automation, and training company with 16+ years of experience supporting corporates and educational institutions worldwide."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Introduction */}
      <Section className="bg-white py-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="flex flex-col gap-6 text-center">
            {overviewData.paragraphs.map((p: string, idx: number) => (
              <p 
                key={idx} 
                className={idx === 0 ? "text-lg sm:text-xl leading-relaxed text-[#071820] font-bold" : "text-base leading-relaxed text-[#56666b]"}
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section className="bg-[#F1F6FA] py-20 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-4 p-8 bg-white border border-[#dce6ee] rounded-2xl shadow-xs">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Our Vision
              </span>
              <h2 className="font-sans text-2xl text-[#071820] font-bold leading-tight">
                To build smarter organizations and industry-ready professionals.
              </h2>
              <p className="text-sm text-[#56666b] leading-relaxed">
                To build smarter organizations and industry-ready professionals through analytics, automation, and practical learning.
              </p>
            </Reveal>
            <Reveal className="flex flex-col gap-4 p-8 bg-white border border-[#dce6ee] rounded-2xl shadow-xs">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Our Mission
              </span>
              <h2 className="font-sans text-2xl text-[#071820] font-bold leading-tight">
                To help organizations unlock their full potential.
              </h2>
              <p className="text-sm text-[#56666b] leading-relaxed">
                To help organizations unlock their full potential by combining Business Intelligence, Artificial Intelligence, Data Analytics, Digital Transformation, Professional Training, and innovative technology solutions that create measurable value.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Our Approach */}
      <Section className="bg-white py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Methodology
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                Our Approach
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              How we partner with organizations to build lasting, practical systems.
            </p>
          </div>

          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step: any, idx: number) => (
              <RevealItem key={step.title}>
                <div
                  className="flex flex-col gap-4 bg-[#F1F6FA] p-6 h-full transition-all duration-300 hover:shadow-md border border-[#dce6ee] rounded-2xl shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white border border-[#dce6ee] text-[#18b8ad] shadow-xs">
                      {defaultIcons[step.title] || <Compass className="h-5 w-5 text-[#18b8ad]" />}
                    </span>
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full bg-white border border-[#dce6ee] text-[#071820]"
                    >
                      {step.num || `0${idx + 1}`}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#071820] leading-snug">{step.title}</h3>
                  <p className="text-xs text-[#56666b] leading-relaxed">{step.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* What We Believe */}
      <Section className="bg-white py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Philosophy
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                What We Believe
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              Core values that guide our solution designs and advisory work.
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((belief, idx) => (
              <RevealItem key={idx}>
                <div
                  className="flex items-start gap-4 p-6 h-full bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs"
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
      <Section className="bg-[#F1F6FA] py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Expertise
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                Our Capabilities
              </h2>
            </div>
            <p className="max-w-[420px] text-[#56666b] text-base leading-relaxed">
              A comprehensive suite of transformation and technical services.
            </p>
          </div>

          <RevealGroup className="flex flex-wrap justify-center gap-3 mt-1 max-w-4xl mx-auto">
            {capabilities.map((cap) => (
              <RevealItem key={cap}>
                <span
                  className="inline-block bg-white px-5 py-3 text-xs font-bold tracking-wide text-[#071820] rounded-xl border border-[#dce6ee] shadow-xs"
                >
                  {cap}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Why Choose The Strategist */}
      <Section className="bg-white py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Advantage
              </span>
              <h2
                className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight"
                style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
              >
                {whyUs.title}
              </h2>
            </div>
          </div>

          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {whyUs.items.map((item, idx) => (
              <RevealItem key={idx}>
                <div className="p-8 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl h-full shadow-xs">
                  <span className="text-3xl font-black text-[#18b8ad]/20 block mb-4">{item.num}</span>
                  <h3 className="text-xl font-bold text-[#071820] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#56666b] leading-relaxed">{item.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Industries We Serve */}
      <Section className="bg-[#F1F6FA] py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              Sectors
            </span>
            <h2 className="font-sans mt-3 text-[#071820] font-extrabold tracking-tight text-3xl sm:text-4xl">
              Industries We Serve
            </h2>
          </div>
          <RevealGroup className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {industries.tags.map((tag) => (
              <RevealItem key={tag}>
                <span className="inline-block bg-white px-5 py-3 text-xs font-bold tracking-wide text-[#071820] rounded-xl border border-[#dce6ee] shadow-xs">
                  {tag}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Our Impact */}
      <Section className="bg-white py-24 border-t border-[#dce6e7]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">
                Our Impact
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl text-[#071820] leading-tight font-extrabold tracking-tight">
                Helping Organizations Create Measurable Outcomes
              </h2>
              <p className="text-sm text-[#56666b] leading-relaxed">
                For over 16 years, our analytics, automation, and training solutions have enabled organizations and institutions to streamline operations, optimize reporting, and build data-driven cultures.
              </p>
            </div>
            <div className="lg:col-span-7">
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {[
                  { stat: "5+", label: "Regions Served", desc: "Kerala, India, UAE, Oman, USA, Europe" },
                  { stat: "20+", label: "Corporate Clients", desc: "Enterprise solutions & business analytics" },
                  { stat: "50,000+", label: "Professionals Trained", desc: "Young professionals and students" },
                  { stat: "5,000+", label: "Senior Leaders Trained", desc: "Executive capability programs" },
                ].map((item) => (
                  <RevealItem key={item.label}>
                    <div
                      className="rounded-2xl p-6 bg-[#F1F6FA] border border-[#dce6ee] flex flex-col justify-between shadow-xs"
                      style={{ minHeight: 140 }}
                    >
                      <p className="text-3xl font-black text-[#18b8ad] font-sans">{item.stat}</p>
                      <div>
                        <p className="text-sm font-bold text-[#071820] mt-2">{item.label}</p>
                        <p className="text-xs text-[#56666b] mt-1 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA — Teal gradient */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg,#ddf7f4,#a7e9e3)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <Reveal>
            <h2 className="font-sans text-3xl text-[#071820] sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s Build Smarter Systems Together
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-[#2d524f] leading-relaxed">
              Whether you are a corporate organization seeking automation and analytics, or an institution wanting industry-ready outcomes, The Strategist is ready to support your transformation journey.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-sm"
              style={{
                padding: "13px 24px",
                fontSize: 13,
                fontWeight: 800
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
