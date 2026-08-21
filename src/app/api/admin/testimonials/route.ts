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

    const list = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.error("[testimonials/GET]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const created = await prisma.testimonial.create({
      data: {
        name: body.name || "Anonymous",
        company: body.company || "",
        designation: body.designation || "",
        quote: body.quote || "",
        rating: Number(body.rating) || 5,
        order: Number(body.order) || 0,
        visible: body.visible !== false,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("[testimonials/POST]", error);
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
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        name: data.name,
        company: data.company,
        designation: data.designation,
        quote: data.quote,
        rating: Number(data.rating),
        order: Number(data.order),
        visible: data.visible,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[testimonials/PUT]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[testimonials/DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
