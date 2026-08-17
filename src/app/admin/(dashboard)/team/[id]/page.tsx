import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { TeamForm } from "./TeamForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Team Member | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditTeamPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let member = null;

  if (id !== "new") {
    member = await prisma.teamMember.findUnique({
      where: { id },
    });
    if (!member) notFound();
  }

  const initialData = member
    ? {
        id: member.id,
        name: member.name,
        position: member.position || "",
        photoUrl: member.photoUrl || "",
        bio: member.bio || "",
        social: JSON.parse(member.social || "{}"),
        order: member.order,
        visible: member.visible,
      }
    : null;

  return <TeamForm initialData={initialData} />;
}
