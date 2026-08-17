import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { IndustryForm } from "./IndustryForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Industry | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditIndustryPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let industry = null;

  if (id !== "new") {
    industry = await prisma.strategistIndustry.findUnique({
      where: { id },
    });
    if (!industry) notFound();
  }

  const initialData = industry
    ? {
        id: industry.id,
        name: industry.name,
        slug: industry.slug,
        icon: industry.icon || "building",
        description: industry.description || "",
        order: industry.order,
        visible: industry.visible,
      }
    : null;

  return <IndustryForm initialData={initialData} />;
}
