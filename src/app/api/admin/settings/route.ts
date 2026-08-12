import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSetting.findUnique({
    where: { id: "singleton" },
  });

  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    const settings = await prisma.siteSetting.upsert({
      where: { id: "singleton" },
      update: {
        siteName: body.siteName,
        tagline: body.tagline,
        supportEmail: body.supportEmail,
        businessEmail: body.businessEmail,
        salesEmail: body.salesEmail,
        phone: body.phone,
        whatsapp: body.whatsapp,
        address: body.address,
        theme: body.theme,
        maintenanceMode: body.maintenanceMode,
      },
      create: {
        id: "singleton",
        siteName: body.siteName,
        tagline: body.tagline,
        supportEmail: body.supportEmail,
        businessEmail: body.businessEmail,
        salesEmail: body.salesEmail,
        phone: body.phone,
        whatsapp: body.whatsapp,
        address: body.address,
        theme: body.theme,
        maintenanceMode: body.maintenanceMode,
      },
    });

    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
