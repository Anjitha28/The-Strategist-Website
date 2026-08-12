import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { ClientMarquee } from "@/components/sections/DataSections";
import { buildPageMetadata } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home");
}

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <CmsPage slug="home" afterFirst={<ClientMarquee />} />
    </>
  );
}
