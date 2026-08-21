import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await prisma.siteSetting.findUnique({
      where: { id: "singleton" },
    });

    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("[settings/GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const data = {
      siteName: body.siteName || "The Strategist",
      tagline: body.tagline || "",
      logoUrl: body.logoUrl || null,
      companyDescription: body.companyDescription || "",
      businessEmail: body.businessEmail || "",
      supportEmail: body.supportEmail || "",
      salesEmail: body.salesEmail || "",
      phone: body.phone || "",
      whatsapp: body.whatsapp || "",
      address: body.address || "",
      mapsUrl: body.mapsUrl || "",
      linkedin: body.linkedin || "",
      facebook: body.facebook || "",
      twitter: body.twitter || "",
      instagram: body.instagram || "",
      youtube: body.youtube || "",
      defaultSeoTitle: body.defaultSeoTitle || "The Strategist",
      defaultSeoDescription: body.defaultSeoDescription || "",
      defaultKeywords: body.defaultKeywords || "",
    };

    const updated = await prisma.siteSetting.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...data },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[settings/PUT]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
