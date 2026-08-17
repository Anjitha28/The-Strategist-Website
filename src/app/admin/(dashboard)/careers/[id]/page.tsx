import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { CareerForm } from "./CareerForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Career Opening | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditCareerPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let job = null;

  if (id !== "new") {
    job = await prisma.jobOpening.findUnique({
      where: { id },
    });
    if (!job) notFound();
  }

  const initialData = job
    ? {
        id: job.id,
        title: job.title,
        slug: job.slug,
        employmentType: job.employmentType,
        experience: job.experience || "",
        location: job.location || "",
        description: job.description,
        responsibilities: JSON.parse(job.responsibilities || "[]"),
        qualifications: JSON.parse(job.qualifications || "[]"),
        skills: JSON.parse(job.skills || "[]"),
        salary: job.salary || "",
        status: job.status,
        applyUrl: job.applyUrl || "",
      }
    : null;

  return <CareerForm initialData={initialData} />;
}
