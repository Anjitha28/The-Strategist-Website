import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("solutions/educational");
}

export default function EducationalPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Educational Solutions", url: "/solutions/educational" }]} />
      <CmsPage slug="solutions/educational" />
    </>
  );
}
