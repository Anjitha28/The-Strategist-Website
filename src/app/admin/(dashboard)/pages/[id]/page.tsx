import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { PageDetailsForm } from "./PageDetailsForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Page Sections | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditPageLayout({ params }: Props) {
  await requireUser();
  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id },
    include: {
      sections: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!page) notFound();

  return (
    <PageDetailsForm
      page={{
        id: page.id,
        title: page.title,
        slug: page.slug,
        seoTitle: page.seoTitle || "",
        seoDescription: page.seoDescription || "",
        seoKeywords: page.seoKeywords || "",
      }}
      sections={page.sections.map((s) => ({
        id: s.id,
        key: s.key,
        type: s.type,
        title: s.title || "",
        order: s.order,
        visible: s.visible,
      }))}
    />
  );
}
