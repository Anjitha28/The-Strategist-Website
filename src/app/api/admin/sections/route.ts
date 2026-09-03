import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSupabaseSection, saveSupabaseSection } from "@/lib/supabase-cms";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  const pageSlug = searchParams.get("page") || "home";

  if (!key) {
    return NextResponse.json({ ok: false, error: "Key is required" }, { status: 400 });
  }

  // 1. Try Supabase str_website_sections
  const supabaseData = await getSupabaseSection(key);
  if (supabaseData) {
    return NextResponse.json({
      ok: true,
      section: {
        key,
        title: key,
        data: supabaseData,
      },
    });
  }

  // 2. Try Prisma fallback
  try {
    const page = await prisma.page.findUnique({
      where: { slug: pageSlug },
      include: { sections: { where: { key } } },
    });

    if (page?.sections?.[0]) {
      return NextResponse.json({
        ok: true,
        section: {
          key: page.sections[0].key,
          title: page.sections[0].title,
          data: JSON.parse(page.sections[0].data || "{}"),
        },
      });
    }
  } catch {
    // Database offline
  }

  return NextResponse.json({ ok: true, section: { key, title: key, data: null } });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { pageSlug = "home", key, title, data } = body;

    if (!key) {
      return NextResponse.json({ error: "Section key is required" }, { status: 400 });
    }

    // 1. Save to Supabase (str_website_sections)
    await saveSupabaseSection(key, title || key, data);

    // 2. Save to Prisma if available
    try {
      let page = await prisma.page
        .findUnique({ where: { slug: pageSlug } })
        .catch(() => null);

      if (!page) {
        page = await prisma.page
          .create({ data: { slug: pageSlug, title: pageSlug.toUpperCase() } })
          .catch(() => null);
      }

      if (page) {
        const existing = await prisma.pageSection
          .findFirst({ where: { pageId: page.id, key } })
          .catch(() => null);

        if (existing) {
          await prisma.pageSection.update({
            where: { id: existing.id },
            data: {
              title: title || existing.title,
              data: typeof data === "string" ? data : JSON.stringify(data),
            },
          });
        } else {
          await prisma.pageSection.create({
            data: {
              pageId: page.id,
              key,
              type: key,
              title: title || key,
              data: typeof data === "string" ? data : JSON.stringify(data),
            },
          });
        }
      }
    } catch {
      // Ignore prisma error
    }

    // Revalidate public cache
    revalidatePath("/");
    revalidatePath("/(site)");

    return NextResponse.json({ ok: true, message: "Section saved successfully in Supabase" });
  } catch (error) {
    console.error("[api/admin/sections PUT]", error);
    return NextResponse.json({ ok: false, error: "Failed to save section" }, { status: 500 });
  }
}
