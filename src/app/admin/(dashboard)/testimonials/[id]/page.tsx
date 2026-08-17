import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { TestimonialForm } from "./TestimonialForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Testimonial | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let testimonial = null;

  if (id !== "new") {
    testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });
    if (!testimonial) notFound();
  }

  const initialData = testimonial
    ? {
        id: testimonial.id,
        name: testimonial.name,
        company: testimonial.company || "",
        designation: testimonial.designation || "",
        photoUrl: testimonial.photoUrl || "",
        quote: testimonial.quote,
        rating: testimonial.rating,
        order: testimonial.order,
        visible: testimonial.visible,
      }
    : null;

  return <TestimonialForm initialData={initialData} />;
}
