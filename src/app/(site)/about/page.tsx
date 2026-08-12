import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("about");
}

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", url: "/about" }]} />
      <CmsPage slug="about" />
    </>
  );
}
