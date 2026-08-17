"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Site Settings
export async function saveSiteSettings(data: {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  contactEmail?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  announcementDataText?: string;
  announcementDataUrl?: string;
  announcementDataEnabled?: boolean;
}) {
  await requireUser();

  const settings = await prisma.siteSetting.findFirst();
  const payload = {
    siteName: data.siteName,
    siteTitle: data.siteTitle,
    siteDescription: data.siteDescription,
    contactEmail: data.contactEmail || "",
    phone: data.phone || "",
    whatsapp: data.whatsapp || "",
    address: data.address || "",
    announcementData: JSON.stringify({
      text: data.announcementDataText || "",
      url: data.announcementDataUrl || "",
      enabled: data.announcementDataEnabled || false,
    }),
  };

  if (settings) {
    await prisma.siteSetting.update({
      where: { id: settings.id },
      data: payload,
    });
  } else {
    await prisma.siteSetting.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

// Services (Solutions)
export async function saveService(id: string | null, data: {
  name: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  description?: string;
  features?: string[];
  featured?: boolean;
  order?: number;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}) {
  await requireUser();

  // Find or create a default category
  let category = await prisma.serviceCategory.findFirst();
  if (!category) {
    category = await prisma.serviceCategory.create({
      data: { name: "Solutions", slug: "solutions", order: 0 }
    });
  }

  const payload = {
    name: data.name,
    slug: data.slug,
    icon: data.icon || "layers",
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    features: JSON.stringify(data.features || []),
    featured: data.featured || false,
    order: data.order || 0,
    status: data.status || "published",
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    categoryId: category.id,
  };

  if (id && id !== "new") {
    await prisma.service.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.service.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireUser();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Industries
export async function saveIndustry(id: string | null, data: {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  order?: number;
  visible?: boolean;
}) {
  await requireUser();

  const payload = {
    name: data.name,
    slug: data.slug,
    icon: data.icon || "building",
    description: data.description || "",
    order: data.order || 0,
    visible: data.visible !== undefined ? data.visible : true,
  };

  if (id && id !== "new") {
    await prisma.strategistIndustry.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.strategistIndustry.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteIndustry(id: string) {
  await requireUser();
  await prisma.strategistIndustry.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Approach Stages
export async function saveApproachStage(id: string | null, data: {
  step: number;
  title: string;
  description?: string;
  visible?: boolean;
}) {
  await requireUser();

  const payload = {
    step: data.step,
    title: data.title,
    description: data.description || "",
    visible: data.visible !== undefined ? data.visible : true,
  };

  if (id && id !== "new") {
    await prisma.strategistApproachStage.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.strategistApproachStage.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteApproachStage(id: string) {
  await requireUser();
  await prisma.strategistApproachStage.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Products
export async function saveProduct(id: string | null, data: {
  name: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  description?: string;
  features?: string[];
  gallery?: string[];
  ctaLabel?: string;
  featured?: boolean;
  order?: number;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}) {
  await requireUser();

  let category = await prisma.productCategory.findFirst();
  if (!category) {
    category = await prisma.productCategory.create({
      data: { name: "Products", slug: "products", order: 0 }
    });
  }

  const payload = {
    name: data.name,
    slug: data.slug,
    icon: data.icon || "box",
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    features: JSON.stringify(data.features || []),
    gallery: JSON.stringify(data.gallery || []),
    ctaLabel: data.ctaLabel || "Request Demo",
    featured: data.featured || false,
    order: data.order || 0,
    status: data.status || "published",
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    categoryId: category.id,
  };

  if (id && id !== "new") {
    await prisma.product.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.product.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteProduct(id: string) {
  await requireUser();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Learning Programs (Courses)
export async function saveCourse(id: string | null, data: {
  title: string;
  slug: string;
  level?: string;
  duration?: string;
  language?: string;
  instructor?: string;
  modulesCount?: number;
  shortDescription?: string;
  description?: string;
  objectives?: string[];
  audience?: string[];
  prerequisites?: string[];
  curriculum?: { title: string; lessons?: string[] }[];
  certificate?: boolean;
  featured?: boolean;
  order?: number;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
}) {
  await requireUser();

  let category = await prisma.courseCategory.findFirst();
  if (!category) {
    category = await prisma.courseCategory.create({
      data: { name: "Learning", slug: "learning", icon: "graduation-cap", order: 0 }
    });
  }

  const payload = {
    title: data.title,
    slug: data.slug,
    level: data.level || "Beginner",
    duration: data.duration || "",
    language: data.language || "English",
    instructor: data.instructor || "",
    modulesCount: data.modulesCount || 0,
    shortDescription: data.shortDescription || "",
    description: data.description || "",
    objectives: JSON.stringify(data.objectives || []),
    audience: JSON.stringify(data.audience || []),
    prerequisites: JSON.stringify(data.prerequisites || []),
    curriculum: JSON.stringify(data.curriculum || []),
    certificate: data.certificate !== undefined ? data.certificate : true,
    featured: data.featured || false,
    order: data.order || 0,
    status: data.status || "published",
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    categoryId: category.id,
  };

  if (id && id !== "new") {
    await prisma.course.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.course.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteCourse(id: string) {
  await requireUser();
  await prisma.course.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Blog Posts
export async function saveBlogPost(id: string | null, data: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status?: string;
  publishedAt?: Date | null;
  seoTitle?: string;
  seoDescription?: string;
}) {
  const user = await requireUser();

  let category = await prisma.blogCategory.findFirst();
  if (!category) {
    category = await prisma.blogCategory.create({
      data: { name: "General", slug: "general", order: 0 }
    });
  }

  const payload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    content: data.content || "",
    status: data.status || "draft",
    publishedAt: data.status === "published" ? (data.publishedAt || new Date()) : null,
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    categoryId: category.id,
    authorId: user.id,
  };

  if (id && id !== "new") {
    await prisma.blogPost.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.blogPost.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  await requireUser();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Job Openings (Careers)
export async function saveJobOpening(id: string | null, data: {
  title: string;
  slug: string;
  employmentType?: string;
  experience?: string;
  location?: string;
  description?: string;
  responsibilities?: string[];
  qualifications?: string[];
  skills?: string[];
  salary?: string;
  status?: string;
  applyUrl?: string;
}) {
  await requireUser();

  let department = await prisma.department.findFirst();
  if (!department) {
    department = await prisma.department.create({
      data: { name: "Technology", order: 0 }
    });
  }

  const payload = {
    title: data.title,
    slug: data.slug,
    employmentType: data.employmentType || "Full-time",
    experience: data.experience || "",
    location: data.location || "Remote",
    description: data.description || "",
    responsibilities: JSON.stringify(data.responsibilities || []),
    qualifications: JSON.stringify(data.qualifications || []),
    skills: JSON.stringify(data.skills || []),
    salary: data.salary || "",
    status: data.status || "open",
    applyUrl: data.applyUrl || "",
    departmentId: department.id,
  };

  if (id && id !== "new") {
    await prisma.jobOpening.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.jobOpening.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteJobOpening(id: string) {
  await requireUser();
  await prisma.jobOpening.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Testimonials
export async function saveTestimonial(id: string | null, data: {
  name: string;
  company?: string;
  designation?: string;
  photoUrl?: string;
  quote: string;
  rating?: number;
  order?: number;
  visible?: boolean;
}) {
  await requireUser();

  const payload = {
    name: data.name,
    company: data.company || "",
    designation: data.designation || "",
    photoUrl: data.photoUrl || "",
    quote: data.quote,
    rating: data.rating || 5,
    order: data.order || 0,
    visible: data.visible !== undefined ? data.visible : true,
  };

  if (id && id !== "new") {
    await prisma.testimonial.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.testimonial.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await requireUser();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Team Members
export async function saveTeamMember(id: string | null, data: {
  name: string;
  position?: string;
  photoUrl?: string;
  bio?: string;
  social?: Record<string, string>;
  order?: number;
  visible?: boolean;
}) {
  await requireUser();

  const payload = {
    name: data.name,
    position: data.position || "",
    photoUrl: data.photoUrl || "",
    bio: data.bio || "",
    social: JSON.stringify(data.social || {}),
    order: data.order || 0,
    visible: data.visible !== undefined ? data.visible : true,
  };

  if (id && id !== "new") {
    await prisma.teamMember.update({
      where: { id },
      data: payload,
    });
  } else {
    await prisma.teamMember.create({
      data: payload,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  await requireUser();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/", "layout");
  return { success: true };
}

// Page SEO Editor & Section Reordering / Editing
export async function savePageSeo(id: string, data: {
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}) {
  await requireUser();

  await prisma.page.update({
    where: { id },
    data: {
      title: data.title,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      seoKeywords: data.seoKeywords || null,
    },
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function savePageSectionData(id: string, data: {
  title?: string;
  visible?: boolean;
  order?: number;
  payload: Record<string, unknown>;
}) {
  await requireUser();

  await prisma.pageSection.update({
    where: { id },
    data: {
      title: data.title,
      visible: data.visible !== undefined ? data.visible : true,
      order: data.order !== undefined ? data.order : undefined,
      data: JSON.stringify(data.payload),
    },
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateSectionsOrder(sectionOrders: { id: string; order: number }[]) {
  await requireUser();

  await prisma.$transaction(
    sectionOrders.map((s) =>
      prisma.pageSection.update({
        where: { id: s.id },
        data: { order: s.order },
      })
    )
  );

  revalidatePath("/", "layout");
  return { success: true };
}
