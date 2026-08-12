import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Kept in sync with SESSION_COOKIE in src/lib/auth.ts (inlined to keep the
// proxy bundle free of server-only modules like Prisma/bcrypt).
const SESSION_COOKIE = "ts_session";

// Next.js 16: `proxy` replaces `middleware` (Node.js runtime).
// This performs an OPTIMISTIC auth check only — real authorization happens
// in the admin server components / server actions via requirePermission().
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (isAdmin && !isLogin && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
