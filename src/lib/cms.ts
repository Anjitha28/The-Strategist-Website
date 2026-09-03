import { cache } from "react";
import { prisma } from "./prisma";
import { parseJson, splitCsv } from "./utils";

export type SiteSettings = Awaited<ReturnType<typeof loadSiteSettings>>;

async function loadSiteSettings() {
  let s = null;
  try {
    s = await prisma.siteSetting.findUnique({ where: { id: "singleton" } });
  } catch {
    // DB fallback
  }
  const row = s ?? {
    siteName: "The Strategist",
    tagline: "Gain the competitive edge",
    logoUrl: "/brand/strategist-logo.png",
    logoDarkUrl: null,
    faviconUrl: null,
    loadingLogoUrl: null,
    companyDescription: "",
    businessEmail: "",
    supportEmail: "",
    salesEmail: "",
    phone: "",
    whatsapp: "",
    address: "",
    mapsUrl: "",
    businessHours: "[]",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    threads: "",
    primaryColor: "#1c64d8",
    secondaryColor: "#6027e8",
    accentColor: "#06b0d2",
    defaultSeoTitle: "The Strategist | Business Intelligence, AI & Digital Transformation",
    defaultSeoDescription: "",
    defaultKeywords: "",
    ogTitle: "The Strategist",
    ogDescription: "",
    ogImage: "",
    formEndpoint: "",
    gaId: "",
    metaPixelId: "",
    maintenanceMode: false,
    announcement: "",
    theme: "aurora",
  };

  return {
    ...row,
    logoUrl: row.logoUrl || "/brand/strategist-logo.png",
    defaultKeywords: splitCsv(row.defaultKeywords),
    businessHoursList: parseJson<{ day: string; hours: string }[]>(row.businessHours, []),
    announcementData: parseJson<{ enabled: boolean; text: string; url?: string; label?: string }>(
      row.announcement,
      { enabled: false, text: "" },
    ),
    social: {
      linkedin: row.linkedin,
      facebook: row.facebook,
      instagram: row.instagram,
      youtube: row.youtube,
      twitter: row.twitter,
      threads: row.threads,
    },
  };
}

export const getSiteSettings = cache(loadSiteSettings);

export type SectionMap = Record<string, { data: Record<string, unknown>; visible: boolean; title: string | null }>;

/** Load a page and return its sections keyed by `key` with parsed data. */
export const getPage = cache(async (slug: string) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    if (!page) return null;
    const sections: SectionMap = {};
    for (const sec of page.sections) {
      sections[sec.key] = {
        data: parseJson<Record<string, unknown>>(sec.data, {}),
        visible: sec.visible,
        title: sec.title,
      };
    }
    return { page, sections };
  } catch {
    return null;
  }
});

export const getNavigation = cache(async (location: "header" | "footer" = "header") => {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { location, visible: true, parentId: null },
      orderBy: { order: "asc" },
      include: {
        children: {
          where: { visible: true },
          orderBy: { order: "asc" },
        },
      },
    });
    return items;
  } catch {
    return [];
  }
});

export const getFaqs = cache(async (group: string) => {
  try {
    return await prisma.faq.findMany({
      where: { group, visible: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
});

export const getTestimonials = cache(async () => {
  try {
    return await prisma.testimonial.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  } catch {
    return [];
  }
});

export const getClientLogos = cache(async () => {
  try {
    return await prisma.clientLogo.findMany({ where: { visible: true }, orderBy: { order: "asc" } });
  } catch {
    return [];
  }
});
