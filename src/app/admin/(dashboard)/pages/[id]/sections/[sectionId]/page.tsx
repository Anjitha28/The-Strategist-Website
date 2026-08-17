import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { SectionEditForm } from "./SectionEditForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Section Content | Admin" };

type Props = { params: Promise<{ id: string; sectionId: string }> };

export default async function EditPageSection({ params }: Props) {
  await requireUser();
  const { id, sectionId } = await params;

  const section = await prisma.pageSection.findUnique({
    where: { id: sectionId },
  });

  if (!section || section.pageId !== id) notFound();

  return (
    <SectionEditForm
      pageId={id}
      section={{
        id: section.id,
        key: section.key,
        type: section.type,
        title: section.title || "",
        data: section.data || "{}",
      }}
    />
  );
}
