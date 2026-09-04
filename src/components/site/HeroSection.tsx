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
    const page = await prisma.page.findUnique({
      where: { slug: "home" },
      include: { sections: { where: { key: "hero" } } },
    });
    if (!page || page.sections.length === 0) return DEFAULT_HERO;
    return { ...DEFAULT_HERO, ...JSON.parse(page.sections[0].data) };
  } catch {
    return DEFAULT_HERO;
  }
}

export async function HeroSection() {
  const hero = await getHero();

  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ background: "#ffffff", minHeight: "clamp(550px, 60vw, 860px)" }}
    >
      {/* Right-aligned visual container preserving the entire image without any cropping, zooming, or distortion */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-[60%] lg:w-[55%] h-full flex items-center justify-end pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/brand/hero-visual-final.png"
            alt="The Strategist growth visualization"
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-contain object-right"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Subtle overlay on mobile only for crisp text contrast */}
      <div
        className="absolute inset-0 block md:hidden pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.2) 100%)",
        }}
      />

      {/* Text content — overlaid on left */}
      <div className="relative container-page w-full flex items-center">
        <div style={{ paddingTop: "clamp(110px, 11vw, 140px)", paddingBottom: "clamp(64px, 7vw, 110px)", maxWidth: 540 }}>

          {/* Eyebrow */}
          <p
            className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad] mb-5"
          >
            {hero.eyebrow}
          </p>

          {/* Main heading */}
          <h1
            className="font-sans text-[#071820] font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(40px, 5vw, 68px)",
              lineHeight: 1.05,
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
              fontSize: "clamp(36px, 4.5vw, 62px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            {hero.tagline}
          </div>

          {/* Body */}
          <p
            style={{
              margin: "0 0 36px",
              fontSize: "clamp(13px,1.15vw,16px)",
              color: "#56666b",
              lineHeight: 1.75,
              maxWidth: 420,
            }}
          >
            {hero.body}
          </p>

          {/* CTA */}
          <Link
            href={hero.ctaHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#071820",
              color: "#fff",
              padding: "16px 28px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 800,
              textDecoration: "none",
              letterSpacing: "0.02em",
              boxShadow: "0 8px 24px rgba(7,24,32,0.22)",
              transition: "background 0.2s, transform 0.2s",
            }}
          >
            {hero.ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
