import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "../_components/AdminShell";
import HeroEditor from "./_components/HeroEditor";
import { DEFAULT_HERO } from "@/app/api/admin/hero/route";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getHeroData() {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: "home" },
      include: { sections: { where: { key: "hero" } } },
    });
    if (!page || page.sections.length === 0) return DEFAULT_HERO;
    return { ...DEFAULT_HERO, ...JSON.parse(page.sections[0].data) };
  } catch {
    return DEFAULT_HERO;
  }
}

export default async function AdminHeroPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const heroData = await getHeroData();

  return (
    <AdminShell userName={user.email}>
      <div style={{ padding: "40px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: "#8a979b", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>
            CONTENT EDITOR
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#071820" }}>
            Hero Section
          </h1>
          <p style={{ margin: "8px 0 0", color: "#56666b", fontSize: 14 }}>
            Changes are saved directly to the database and reflected immediately on the homepage.
          </p>
        </div>

        <HeroEditor initialData={heroData} />
      </div>
    </AdminShell>
  );
}
