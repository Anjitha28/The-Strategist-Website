import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "../_components/AdminShell";
import SettingsEditor from "./_components/SettingsEditor";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const settings = await getSiteSettings();

  return (
    <AdminShell userName={user.email}>
      <div style={{ padding: "40px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: "#8a979b", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>
            SYSTEM CONFIGURATION
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#071820" }}>
            Site Settings
          </h1>
          <p style={{ margin: "8px 0 0", color: "#56666b", fontSize: 14 }}>
            Manage site-wide brand assets, contact details, social integration, and default SEO parameters.
          </p>
        </div>

        <SettingsEditor initialData={settings} />
      </div>
    </AdminShell>
  );
}
