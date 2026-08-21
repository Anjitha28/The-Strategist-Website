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

    const list = await prisma.faq.findMany({
      orderBy: [{ group: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(list);
  } catch (error) {
    console.error("[faqs/GET]", error);
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
    const created = await prisma.faq.create({
      data: {
        question: body.question || "",
        answer: body.answer || "",
        group: body.group || "general",
        order: Number(body.order) || 0,
        visible: body.visible !== false,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("[faqs/POST]", error);
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

    const updated = await prisma.faq.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer,
        group: data.group,
        order: Number(data.order),
        visible: data.visible,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[faqs/PUT]", error);
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

    await prisma.faq.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[faqs/DELETE]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
