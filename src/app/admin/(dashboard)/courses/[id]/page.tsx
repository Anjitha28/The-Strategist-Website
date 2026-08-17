import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { CourseForm } from "./CourseForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Program | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditCoursePage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let course = null;

  if (id !== "new") {
    course = await prisma.course.findUnique({
      where: { id },
    });
    if (!course) notFound();
  }

  const initialData = course
    ? {
        id: course.id,
        title: course.title,
        slug: course.slug,
        level: course.level || "Beginner",
        duration: course.duration || "",
        language: course.language || "English",
        instructor: course.instructor || "",
        modulesCount: course.modulesCount,
        shortDescription: course.shortDescription,
        description: course.description,
        objectives: JSON.parse(course.objectives || "[]"),
        audience: JSON.parse(course.audience || "[]"),
        prerequisites: JSON.parse(course.prerequisites || "[]"),
        curriculum: JSON.parse(course.curriculum || "[]"),
        certificate: course.certificate,
        featured: course.featured,
        order: course.order,
        status: course.status,
        seoTitle: course.seoTitle,
        seoDescription: course.seoDescription,
      }
    : null;

  return <CourseForm initialData={initialData} />;
}
