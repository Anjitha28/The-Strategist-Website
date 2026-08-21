import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Default hero content — used as fallback when DB row doesn't exist
export const DEFAULT_HERO = {
  eyebrow: "STRATEGY. DATA. TRANSFORMATION.",
  heading: "From Insights to Impact.",
  tagline: "We help you scale.",
  body: "We transform your data into actionable intelligence, automate operations and empower you to make better decisions that fuel sustainable growth.",
  ctaLabel: "Explore Solutions",
  ctaHref: "/solutions/corporate",
};

async function verifySession(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("ts_session")?.value;
  if (!token) return false;
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const session = await prisma.session.findUnique({ where: { tokenHash } }).catch(() => null);
  if (!session || session.expiresAt < new Date()) return false;
  return true;
}

async function getHeroSection() {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
    include: { sections: { where: { key: "hero" } } },
  }).catch(() => null);

  if (!page || page.sections.length === 0) return DEFAULT_HERO;

  try {
    const data = JSON.parse(page.sections[0].data);
    return { ...DEFAULT_HERO, ...data };
  } catch {
    return DEFAULT_HERO;
  }
}

/** GET /api/admin/hero — returns current hero content (public, for SSR) */
export async function GET() {
  const hero = await getHeroSection();
  return NextResponse.json(hero);
}

/** PUT /api/admin/hero — saves updated hero content (requires admin session) */
export async function PUT(req: NextRequest) {
  const authed = await verifySession(req);
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = {
      eyebrow: String(body.eyebrow ?? DEFAULT_HERO.eyebrow),
      heading: String(body.heading ?? DEFAULT_HERO.heading),
      tagline: String(body.tagline ?? DEFAULT_HERO.tagline),
      body: String(body.body ?? DEFAULT_HERO.body),
      ctaLabel: String(body.ctaLabel ?? DEFAULT_HERO.ctaLabel),
      ctaHref: String(body.ctaHref ?? DEFAULT_HERO.ctaHref),
    };

    // Upsert the home page
    const page = await prisma.page.upsert({
      where: { slug: "home" },
      create: { slug: "home", title: "Home" },
      update: {},
    });

    // Upsert the hero section
    const existing = await prisma.pageSection.findFirst({
      where: { pageId: page.id, key: "hero" },
    });

    if (existing) {
      await prisma.pageSection.update({
        where: { id: existing.id },
        data: { data: JSON.stringify(data), updatedAt: new Date() },
      });
    } else {
      await prisma.pageSection.create({
        data: {
          pageId: page.id,
          key: "hero",
          type: "hero",
          title: "Hero Section",
          order: 0,
          data: JSON.stringify(data),
        },
      });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("[admin/hero PUT]", err);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
