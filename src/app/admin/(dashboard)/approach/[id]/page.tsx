import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ApproachForm } from "./ApproachForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Approach Stage | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditApproachPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let stage = null;

  if (id !== "new") {
    stage = await prisma.strategistApproachStage.findUnique({
      where: { id },
    });
    if (!stage) notFound();
  }

  const initialData = stage
    ? {
        id: stage.id,
        step: stage.step,
        title: stage.title,
        description: stage.description || "",
        visible: stage.visible,
      }
    : null;

  return <ApproachForm initialData={initialData} />;
}
