import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("solutions/corporate");
}

export default function CorporatePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }, { name: "Corporate Solutions", url: "/solutions/corporate" }]} />
      <CmsPage slug="solutions/corporate" />
    </>
  );
}
