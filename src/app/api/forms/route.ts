import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  formType: z.enum(["contact", "consultation", "career", "product-demo", "generic"]),
  name: z.string().min(1).max(160).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(60).optional(),
  subject: z.string().max(200).optional(),
  company_website: z.string().max(0).optional(), // Honeypot
  fields: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
    }
    
    // Honeypot check for bots
    if (parsed.data.company_website) {
      return NextResponse.json({ ok: true });
    }

    const { formType, name, email, phone, subject, fields } = parsed.data;
    console.log(`[Form Submission - Static Mode]: type=${formType}, name=${name}, email=${email}, phone=${phone}, subject=${subject}`, fields);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in static form submit API:", err);
    return NextResponse.json({ ok: false, error: "Server error. Please try again." }, { status: 500 });
  }
}
