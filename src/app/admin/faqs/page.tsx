import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "../_components/AdminShell";
import FaqManager from "./_components/FaqManager";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const faqs = await prisma.faq.findMany({
    orderBy: [{ group: "asc" }, { order: "asc" }],
  });

  return (
    <AdminShell userName={user.email}>
      <div style={{ padding: "40px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: "#8a979b", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>
            SUPPORT SYSTEM
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#071820" }}>
            FAQs Accordion
          </h1>
          <p style={{ margin: "8px 0 0", color: "#56666b", fontSize: 14 }}>
            Create and edit frequently asked questions grouped by page context.
          </p>
        </div>

        <FaqManager initialData={faqs} />
      </div>
    </AdminShell>
  );
}
