import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSupabaseSection } from "@/lib/supabase-cms";

const DEFAULT_HERO = {
  eyebrow: "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
  heading: "Transform Data Into",
  tagline: "Business Growth.",
  body: "The Strategist partners with businesses, enterprises, and institutions to build intelligent analytics platforms, automate processes, modernize operations, and enable data-driven decision making. We combine technology, strategy, and innovation to create measurable outcomes.",
  ctaLabel: "Schedule a Consultation",
  ctaHref: "/contact",
};

async function getHero() {
  try {
    // 1. Try Supabase str_website_sections
    const sbHero = await getSupabaseSection("hero");
    if (sbHero) {
      return { ...DEFAULT_HERO, ...sbHero, body: DEFAULT_HERO.body };
    }

    // 2. Try Prisma
    if (process.env.DATABASE_URL) {
      const page = await prisma.page.findUnique({
        where: { slug: "home" },
        include: { sections: { where: { key: "hero" } } },
      });
      if (!page || page.sections.length === 0) return DEFAULT_HERO;
      return { ...DEFAULT_HERO, ...JSON.parse(page.sections[0].data), body: DEFAULT_HERO.body };
    }
    return DEFAULT_HERO;
  } catch {
    return DEFAULT_HERO;
  }
}

export async function HeroSection() {
  const hero = await getHero();

  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-[#dce6e7]">
      {/* Background subtle radial aura */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] glow-teal opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #071820 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Column: Headline, tagline, body, CTA */}
        <div className="w-full lg:w-[38%] lg:max-w-[480px] shrink-0 text-left relative z-20 pt-24 sm:pt-28 lg:pt-24 pb-8 sm:pb-10 lg:pb-6">
          {/* Eyebrow */}
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] mb-4 sm:mb-5">
            {hero.eyebrow}
          </p>

          {/* Main heading */}
          <h1
            className="font-sans text-[#071820] font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(36px, 4.5vw, 64px)",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              marginBottom: 8,
            }}
          >
            {hero.heading}
          </h1>

          {/* Tagline */}
          <div
            className="font-sans font-extrabold text-[#18b8ad] tracking-tight"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            {hero.tagline}
          </div>

          {/* Body */}
          <p
            style={{
              margin: "0 0 32px",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              color: "#56666b",
              lineHeight: 1.75,
              maxWidth: 460,
            }}
          >
            {hero.body}
          </p>

          {/* CTA */}
          <div>
            <Link
              href={hero.ctaHref}
              className="inline-flex items-center gap-2.5 rounded-full font-bold transition-all hover:bg-[#0d2f3a] bg-[#071820] text-white shadow-[0_8px_24px_rgba(7,24,32,0.18)] hover:shadow-[0_12px_28px_rgba(24,184,173,0.3)] hover:-translate-y-0.5"
              style={{
                padding: "15px 30px",
                fontSize: 14,
                letterSpacing: "0.01em",
              }}
            >
              <span>{hero.ctaLabel}</span>
              <span className="text-[#18b8ad]">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Graphic - Bigger size, touches top of website and bottom separator */}
        <div className="w-full lg:w-auto relative lg:absolute lg:-top-6 xl:-top-8 lg:bottom-0 lg:right-0 lg:w-[68%] xl:w-[72%] 2xl:w-[75%] flex items-end justify-center lg:justify-end pb-4 lg:pb-0 pointer-events-none">
          <div
            className="relative w-full h-full flex items-end justify-end"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 1.5%, black 3.5%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 1.5%, black 3.5%, black 100%)",
            }}
          >
            <img
              src="/brand/hero-blend.png"
              alt="The Strategist — Business Growth Progression"
              className="w-full lg:w-auto h-auto lg:h-[110%] object-contain object-bottom lg:object-right-bottom pointer-events-none select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
