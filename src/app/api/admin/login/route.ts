import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

const DEFAULT_ADMIN_EMAIL = "admin@thestrategist.com";
const DEFAULT_ADMIN_PASSWORD = "Strategist@2026";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    let authenticated = false;
    let userId: string | null = null;
    let userName = "Site Administrator";
    let userEmail = email.toLowerCase().trim();

    // 1. First try database lookup
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { role: true },
      });

      if (dbUser && dbUser.isActive && !dbUser.deletedAt) {
        const match = await bcrypt.compare(password, dbUser.passwordHash);
        if (match) {
          authenticated = true;
          userId = dbUser.id;
          userName = dbUser.name;
        }
      }
    } catch {
      // Database connection error — check static credentials below
    }

    // 2. Check hardcoded default credentials & env credentials
    if (!authenticated) {
      const allowedCredentials = [
        {
          email: "admin@thestrategist.com",
          password: "Strategist@2026",
          name: "Site Administrator",
        },
        {
          email: (process.env.ADMIN_USERNAME || "").toLowerCase().trim(),
          password: process.env.ADMIN_PASSWORD || "",
          name: "Site Administrator",
        },
      ];

      for (const cred of allowedCredentials) {
        if (cred.email && cred.password) {
          if (userEmail === cred.email && password === cred.password) {
            authenticated = true;
            userId = "admin-super";
            userName = cred.name;
            break;
          }
        }
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: "Invalid email or password. Please try again." }, { status: 401 });
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    let sessionToken = "";

    // 3. Try creating DB session
    let dbSessionCreated = false;
    try {
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

      await prisma.session.create({
        data: {
          userId: userId!,
          tokenHash,
          expiresAt,
          ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
          userAgent: req.headers.get("user-agent") ?? null,
        },
      });
      sessionToken = token;
      dbSessionCreated = true;
    } catch {
      // If DB session creation fails, fallback to signed JWT-like token
    }

    if (!dbSessionCreated) {
      const payload = Buffer.from(
        JSON.stringify({
          id: userId,
          email: userEmail,
          name: userName,
          exp: expiresAt.getTime(),
        })
      ).toString("base64");
      sessionToken = signToken(payload);
    }

    const res = NextResponse.json({ ok: true, user: { name: userName, email: userEmail } });
    res.cookies.set("ts_session", sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    });
    return res;
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json({ error: "Server error occurred during login." }, { status: 500 });
  }
}
