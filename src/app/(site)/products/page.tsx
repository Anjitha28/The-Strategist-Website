import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("products");
}

export default function ProductsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Products", url: "/products" }]} />
      <CmsPage slug="products" />
    </>
  );
}
