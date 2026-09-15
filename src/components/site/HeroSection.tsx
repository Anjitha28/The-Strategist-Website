import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSupabaseSection } from "@/lib/supabase-cms";

const DEFAULT_HERO = {
  eyebrow: "ANALYTICS • AUTOMATION • TECHNOLOGY • TRANSFORMATION",
  heading: "Transform Data Into",
  tagline: "Business Growth.",
  body: "We partner with businesses and enterprises to build intelligent analytics platforms, automate reporting workflows, modernize operations, and enable data-driven decision making.",
  ctaLabel: "Schedule a Consultation",
  ctaHref: "/contact",
};

async function getHero() {
  try {
    // 1. Try Supabase str_website_sections
    const sbHero = await getSupabaseSection("hero");
    if (sbHero) {
      return { ...DEFAULT_HERO, ...sbHero };
    }

    // 2. Try Prisma
    if (process.env.DATABASE_URL) {
      const page = await prisma.page.findUnique({
        where: { slug: "home" },
        include: { sections: { where: { key: "hero" } } },
      });
      if (!page || page.sections.length === 0) return DEFAULT_HERO;
      return { ...DEFAULT_HERO, ...JSON.parse(page.sections[0].data) };
    }
    return DEFAULT_HERO;
  } catch {
    return DEFAULT_HERO;
  }
}

export async function HeroSection() {
  const hero = await getHero();

  return (
    <section
      className="relative w-full overflow-hidden bg-white border-b border-[#dce6e7]"
      style={{ minHeight: "clamp(550px, 58vw, 820px)" }}
    >
      {/* Background subtle radial aura */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] glow-teal opacity-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #071820 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container-page relative z-10 w-full flex flex-col lg:flex-row items-center justify-between pt-28 sm:pt-32 pb-14 sm:pb-16 lg:py-24 gap-8 lg:gap-12">
        {/* Left Column: Headline, tagline, body, CTA */}
        <div className="w-full lg:max-w-[500px] xl:max-w-[540px] shrink-0 text-left">
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
              maxWidth: 440,
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

        {/* Right Column: Hero Visual Graphic (Never cropped, maintains original 2:1 aspect ratio, sharp & responsive) */}
        <div className="w-full flex-1 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[800px] aspect-[2/1] rounded-2xl overflow-hidden shadow-xs border border-[#dce6ee]/60 bg-gradient-to-b from-[#f8fafc] to-white p-1 sm:p-2">
            <Image
              src="/brand/hero-visual-final.png"
              alt="The Strategist — Business Growth Progression"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 750px"
              className="object-contain object-center"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
