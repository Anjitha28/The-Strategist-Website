import type { Metadata } from "next";
import { CmsPage } from "@/components/sections/CmsPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("terms-conditions");
}

export default function LegalPage() {
  return <CmsPage slug="terms-conditions" />;
}
