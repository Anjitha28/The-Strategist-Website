import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = process.env.ADMIN_USERNAME ?? "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // First try DB user
    const dbUser = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    }).catch(() => null);

    let authenticated = false;
    let userId: string | null = null;

    if (dbUser && dbUser.isActive && !dbUser.deletedAt) {
      authenticated = await bcrypt.compare(password, dbUser.passwordHash);
      if (authenticated) userId = dbUser.id;
    }

    // Fallback: env-var credentials
    if (!authenticated) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Find or create an admin user record in DB
        const adminUser = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } })
          .catch(() => null);
        if (adminUser) {
          authenticated = true;
          userId = adminUser.id;
        } else {
          // Check if we have a super-admin role
          const role = await prisma.role.findFirst({ where: { name: "super-admin" } }).catch(() => null);
          if (role) {
            const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
            const newUser = await prisma.user.create({
              data: {
                email: ADMIN_EMAIL,
                passwordHash: hash,
                name: "Admin",
                roleId: role.id,
              },
            }).catch(() => null);
            if (newUser) {
              authenticated = true;
              userId = newUser.id;
            }
          }
        }
      }
    }

    if (!authenticated || !userId) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("ts_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    });
    return res;
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
