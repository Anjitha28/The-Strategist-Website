import { prisma } from "./prisma";
import { SITE_CONFIG } from "@/config/site";

export interface SettingsData {
  siteName: string;
  tagline: string;
  logoUrl: string;
  logoDarkUrl: string | null;
  faviconUrl: string | null;
  companyDescription: string;
  businessEmail: string;
  supportEmail: string;
  salesEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapsUrl: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultKeywords: string;
}

export async function getSiteSettings(): Promise<SettingsData> {
  try {
    const settings = await prisma.siteSetting.findUnique({
      where: { id: "singleton" },
    });

    if (!settings) {
      return getFallbackSettings();
    }

    return {
      siteName: settings.siteName || SITE_CONFIG.brand.name,
      tagline: settings.tagline || SITE_CONFIG.brand.tagline,
      logoUrl: settings.logoUrl || "/brand/strategist-logo.png",
      logoDarkUrl: settings.logoDarkUrl,
      faviconUrl: settings.faviconUrl,
      companyDescription: settings.companyDescription || SITE_CONFIG.brand.tagline,
      businessEmail: settings.businessEmail || SITE_CONFIG.brand.email,
      supportEmail: settings.supportEmail || SITE_CONFIG.brand.email,
      salesEmail: settings.salesEmail || SITE_CONFIG.brand.email,
      phone: settings.phone || SITE_CONFIG.brand.phones[0],
      whatsapp: settings.whatsapp || SITE_CONFIG.brand.whatsapp,
      address: settings.address || SITE_CONFIG.brand.address,
      mapsUrl: settings.mapsUrl || SITE_CONFIG.brand.mapsUrl,
      linkedin: settings.linkedin || SITE_CONFIG.brand.socials.linkedin,
      facebook: settings.facebook || SITE_CONFIG.brand.socials.facebook,
      twitter: settings.twitter || SITE_CONFIG.brand.socials.twitter,
      instagram: settings.instagram || SITE_CONFIG.brand.socials.instagram,
      youtube: settings.youtube || "https://youtube.com",
      defaultSeoTitle: settings.defaultSeoTitle || `${SITE_CONFIG.brand.name} | Strategy • Analytics • Automation • Technology`,
      defaultSeoDescription: settings.defaultSeoDescription || SITE_CONFIG.brand.tagline,
      defaultKeywords: settings.defaultKeywords || "Business Intelligence, Analytics, Automation, Technology",
    };
  } catch (error) {
    console.error("Failed to fetch site settings, using fallback:", error);
    return getFallbackSettings();
  }
}

function getFallbackSettings(): SettingsData {
  return {
    siteName: SITE_CONFIG.brand.name,
    tagline: SITE_CONFIG.brand.tagline,
    logoUrl: "/brand/strategist-logo.png",
    logoDarkUrl: null,
    faviconUrl: null,
    companyDescription: SITE_CONFIG.brand.tagline,
    businessEmail: SITE_CONFIG.brand.email,
    supportEmail: SITE_CONFIG.brand.email,
    salesEmail: SITE_CONFIG.brand.email,
    phone: SITE_CONFIG.brand.phones[0],
    whatsapp: SITE_CONFIG.brand.whatsapp,
    address: SITE_CONFIG.brand.address,
    mapsUrl: SITE_CONFIG.brand.mapsUrl,
    linkedin: SITE_CONFIG.brand.socials.linkedin,
    facebook: SITE_CONFIG.brand.socials.facebook,
    twitter: SITE_CONFIG.brand.socials.twitter,
    instagram: SITE_CONFIG.brand.socials.instagram,
    youtube: "https://youtube.com",
    defaultSeoTitle: `${SITE_CONFIG.brand.name} | Strategy • Analytics • Automation • Technology`,
    defaultSeoDescription: SITE_CONFIG.brand.tagline,
    defaultKeywords: "Business Intelligence, Analytics, Automation, Technology",
  };
}
