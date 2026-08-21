import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("ts_session")?.value;
  if (token) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => null);
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("ts_session");
  return res;
}
