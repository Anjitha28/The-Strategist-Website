import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const DEFAULT_HERO = {
  eyebrow: "STRATEGY. DATA. TRANSFORMATION.",
  heading: "From Insights to Impact.",
  tagline: "We help you scale.",
  body: "We transform your data into actionable intelligence, automate operations and empower you to make better decisions that fuel sustainable growth.",
  ctaLabel: "Explore Solutions",
  ctaHref: "/solutions/corporate",
};

async function getHero() {
  try {
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
      {/* Background 3D visualization image placed on the right */}
      <Image
        src="/brand/hero-visual-final.png"
        alt="The Strategist growth visualization"
        fill
        className="object-cover object-right md:object-[85%_center]"
        priority
        quality={90}
      />

      {/* Clean plain white background on the left where text is located, smoothly blending into the visual on the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 32%, rgba(255,255,255,0.55) 52%, rgba(255,255,255,0) 72%)",
        }}
      />

      {/* Text content — overlaid on left */}
      <div className="relative container-page w-full flex items-center">
        <div style={{ paddingTop: "clamp(110px, 11vw, 140px)", paddingBottom: "clamp(64px, 7vw, 110px)", maxWidth: 540 }}>

          {/* Eyebrow */}
          <p
            style={{
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: "0.22em",
              color: "#18b8ad",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {hero.eyebrow}
          </p>

          {/* Main heading */}
          <h1
            className="font-serif"
            style={{
              margin: "0 0 6px",
              fontSize: "clamp(42px, 5.2vw, 76px)",
              fontWeight: 700,
              color: "#071820",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            {hero.heading}
          </h1>

          {/* Italic tagline */}
          <div
            className="font-serif"
            style={{
              fontSize: "clamp(38px, 4.6vw, 70px)",
              fontStyle: "italic",
              fontWeight: 500,
              color: "#18b8ad",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 22,
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
