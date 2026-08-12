import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("blog");
}

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />
      <CmsPage slug="blog" />
    </>
  );
}
