import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ServiceForm } from "./ServiceForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Service | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let service = null;

  if (id !== "new") {
    service = await prisma.service.findUnique({
      where: { id },
    });
    if (!service) notFound();
  }

  // Map database service to ServiceData interface
  const initialData = service
    ? {
        id: service.id,
        name: service.name,
        slug: service.slug,
        icon: service.icon || "layers",
        shortDescription: service.shortDescription,
        description: service.description,
        features: JSON.parse(service.features || "[]"),
        featured: service.featured,
        order: service.order,
        status: service.status,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
      }
    : null;

  return <ServiceForm initialData={initialData} />;
}
