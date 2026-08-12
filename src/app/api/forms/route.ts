import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  formType: z.enum(["contact", "consultation", "career", "product-demo", "generic"]),
  name: z.string().min(1).max(160).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(60).optional(),
  subject: z.string().max(200).optional(),
  // Honeypot — must be empty
  company_website: z.string().max(0).optional(),
  fields: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
    }
    // Honeypot filled → silently accept (bot) without storing.
    if (parsed.data.company_website) {
      return NextResponse.json({ ok: true });
    }

    const { formType, name, email, phone, subject, fields } = parsed.data;
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    await prisma.formSubmission.create({
      data: {
        formType,
        name: name ?? null,
        email: email ?? null,
        phone: phone ?? null,
        subject: subject ?? null,
        data: JSON.stringify(fields ?? {}),
        ip,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error. Please try again." }, { status: 500 });
  }
}
