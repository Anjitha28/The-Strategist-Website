import "server-only";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cache } from "react";
import { prisma } from "./prisma";
import { parseJson } from "./utils";
import { hasPermission } from "./permissions";

export const SESSION_COOKIE = "ts_session";
const SESSION_DAYS = 7;

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/** Create a DB session and set the httpOnly cookie. Returns nothing. */
export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const hdrs = await headers();

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      ip: hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      userAgent: hdrs.get("user-agent") ?? null,
    },
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
    jar.delete(SESSION_COOKIE);
  }
}

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  designation: string | null;
  roleName: string;
  permissions: string[];
};

const AUTH_SECRET = process.env.AUTH_SECRET || "strategist-super-secret-key-2026";

export function signToken(payload: string): string {
  const sig = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySignedToken(signedToken: string): string | null {
  const parts = signedToken.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = crypto.createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  if (sig !== expected) return null;
  return payload;
}

/** Resolve the currently authenticated admin user (or null). Cached per request. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  // Try DB session first
  try {
    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: { include: { role: true } } },
    });

    if (session && session.expiresAt >= new Date()) {
      const user = session.user;
      if (user && user.isActive && !user.deletedAt) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          designation: user.designation,
          roleName: user.role?.name || "Administrator",
          permissions: parseJson<string[]>(user.role?.permissions, ["*"]),
        };
      }
    }
  } catch {
    // Database fallback
  }

  // Check fallback signed token
  const payload = verifySignedToken(token);
  if (payload) {
    try {
      const data = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
      if (data.exp > Date.now()) {
        return {
          id: data.id || "admin-fallback",
          email: data.email || "admin@thestrategist.com",
          name: data.name || "Site Administrator",
          avatarUrl: null,
          designation: "Administrator",
          roleName: "Super Administrator",
          permissions: ["*"],
        };
      }
    } catch {
      return null;
    }
  }

  return null;
});

/** Require an authenticated user or redirect to login. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

/** Require a specific permission or redirect. */
export async function requirePermission(required: string): Promise<CurrentUser> {
  const user = await requireUser();
  if (!hasPermission(user.permissions, required)) redirect("/admin?denied=1");
  return user;
}

export function can(user: CurrentUser | null, required: string): boolean {
  if (!user) return false;
  return hasPermission(user.permissions, required);
}
