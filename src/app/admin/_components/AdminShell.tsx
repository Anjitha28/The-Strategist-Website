"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ImageIcon, LogOut, Globe, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero Section", icon: ImageIcon },
];

export default function AdminShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4f8" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: "#071820",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        padding: "0",
      }}>
        {/* Logo area */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/strategist-logo.png" alt="The Strategist" style={{ height: 28, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <div style={{ marginTop: 6, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", fontWeight: 700 }}>
            ADMIN PANEL
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {NAV.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  marginBottom: 4,
                  textDecoration: "none",
                  background: active ? "rgba(24,184,173,0.15)" : "transparent",
                  color: active ? "#18b8ad" : "rgba(255,255,255,0.6)",
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  transition: "all 0.15s",
                }}
              >
                <Icon size={16} />
                {item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <a
            href="/"
            target="_blank"
            rel="noopener"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              textDecoration: "none",
              color: "rgba(255,255,255,0.45)",
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 4,
              transition: "color 0.15s",
            }}
          >
            <Globe size={16} /> View Website
          </a>
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.45)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              textAlign: "left",
              transition: "color 0.15s",
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            {userName}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
