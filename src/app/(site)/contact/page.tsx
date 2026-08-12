import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("contact");
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />
      <CmsPage slug="contact" />
    </>
  );
}
