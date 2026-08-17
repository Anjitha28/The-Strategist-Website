import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { ProductForm } from "./ProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Product | Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  await requireUser();
  const { id } = await params;

  let product = null;

  if (id !== "new") {
    product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) notFound();
  }

  const initialData = product
    ? {
        id: product.id,
        name: product.name,
        slug: product.slug,
        icon: product.icon || "box",
        shortDescription: product.shortDescription,
        description: product.description,
        features: JSON.parse(product.features || "[]"),
        gallery: JSON.parse(product.gallery || "[]"),
        ctaLabel: product.ctaLabel || "Request Demo",
        featured: product.featured,
        order: product.order,
        status: product.status,
        seoTitle: product.seoTitle,
        seoDescription: product.seoDescription,
      }
    : null;

  return <ProductForm initialData={initialData} />;
}
