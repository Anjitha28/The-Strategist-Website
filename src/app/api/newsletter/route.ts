import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    const { email, name } = parsed.data;
    console.log(`[Newsletter Subscription - Static Mode]: email=${email}, name=${name}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in newsletter subscription:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
