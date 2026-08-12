import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("learn");
}

export default function LearnPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Learn", url: "/learn" }]} />
      <CmsPage slug="learn" />
    </>
  );
}
