import { getSiteSettings, getNavigation } from "@/lib/cms";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { FloatingContact } from "@/components/site/FloatingContact";
import type { NavItem } from "@/lib/types";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav] = await Promise.all([getSiteSettings(), getNavigation("header")]);

  const items: NavItem[] = nav.map((n) => ({
    id: n.id,
    label: n.label,
    url: n.url,
    megaGroup: n.megaGroup,
    children: n.children.map((c) => ({
      id: c.id,
      label: c.label,
      url: c.url,
      icon: c.icon,
      description: c.description,
    })),
  }));

  const announce = settings.announcementData;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {announce.enabled && announce.text && (
        <AnnouncementBar text={announce.text} url={announce.url} label={announce.label} />
      )}

      <Header items={items} settings={{ siteName: settings.siteName, logoUrl: settings.logoUrl, logoDarkUrl: settings.logoDarkUrl, phone: settings.phone, whatsapp: settings.whatsapp }} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
      <FloatingContact whatsapp={settings.whatsapp} phone={settings.phone} />
    </div>
  );
}
