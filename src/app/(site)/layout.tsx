import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { getSiteSettings } from "@/lib/settings";
import { prisma } from "@/lib/prisma";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  let settings;
  let navItems: any[] = [];
  try {
    settings = await getSiteSettings();
    navItems = await prisma.navigationItem.findMany({
      where: { visible: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Failed to query settings or navigation:", error);
  }

  const headerNav = navItems.filter((item) => item.location === "header" && !item.parentId);
  const footerNav = navItems.filter((item) => item.location === "footer");

  const logoUrl = settings?.logoUrl || "/brand/strategist-logo.png";
  const phoneNum = settings?.phone || "";
  const address = settings?.address || "";
  const email = settings?.businessEmail || "";

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Header navItems={headerNav} phoneNum={phoneNum} logoUrl={logoUrl} />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer
        navItems={footerNav}
        siteName={settings?.siteName}
        address={address}
        email={email}
        phones={phoneNum ? [phoneNum] : undefined}
        linkedinUrl={settings?.linkedin}
        facebookUrl={settings?.facebook}
        twitterUrl={settings?.twitter}
        instagramUrl={settings?.instagram}
      />
      <FloatingContact />
    </div>
  );
}
