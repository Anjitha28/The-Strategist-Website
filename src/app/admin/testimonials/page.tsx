import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "../_components/AdminShell";
import TestimonialManager from "./_components/TestimonialManager";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <AdminShell userName={user.email}>
      <div style={{ padding: "40px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 12, color: "#8a979b", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 8 }}>
            MARKETING COLLECTIONS
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#071820" }}>
            Testimonials
          </h1>
          <p style={{ margin: "8px 0 0", color: "#56666b", fontSize: 14 }}>
            Create and edit client testimonials shown on the homepage carousel.
          </p>
        </div>

        <TestimonialManager initialData={testimonials} />
      </div>
    </AdminShell>
  );
}
