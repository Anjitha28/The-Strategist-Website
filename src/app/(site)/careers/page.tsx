import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("careers");
}

export default function CareersPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Careers", url: "/careers" }]} />
      <CmsPage slug="careers" />
    </>
  );
}
