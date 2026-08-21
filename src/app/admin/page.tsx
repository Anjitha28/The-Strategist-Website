import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "./_components/AdminShell";
import Link from "next/link";
import { ImageIcon, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const SECTIONS = [
  {
    href: "/admin/hero",
    icon: "🖼️",
    label: "Hero Section",
    description: "Edit the homepage headline, tagline, body text and CTA button.",
  },
];

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell userName={user.email}>
      <div style={{ padding: "40px 48px", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#071820" }}>
            Welcome back, {user.name} 👋
          </h1>
          <p style={{ margin: "8px 0 0", color: "#56666b", fontSize: 14 }}>
            Use the sections below to manage your website content.
          </p>
        </div>

        {/* Section cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {SECTIONS.map(s => (
            <Link
              key={s.href}
              href={s.href}
              style={{
                display: "block",
                background: "#fff",
                borderRadius: 16,
                padding: "28px 24px",
                boxShadow: "0 2px 16px rgba(7,24,32,0.07)",
                border: "1.5px solid #edf2f4",
                textDecoration: "none",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#071820", marginBottom: 6 }}>{s.label}</div>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: "#56666b", lineHeight: 1.5 }}>
                {s.description}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#18b8ad" }}>
                Edit <span style={{ fontSize: 16 }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info card */}
        <div style={{
          marginTop: 40,
          background: "linear-gradient(135deg, #071820 0%, #0d2d3e 100%)",
          borderRadius: 16,
          padding: "28px 32px",
          color: "#fff",
        }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800 }}>Content is saved in real-time</h3>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Changes you make in the admin panel are immediately saved to the database and reflected on the live website. No deployment required.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
