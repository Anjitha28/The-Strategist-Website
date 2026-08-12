import { notFound } from "next/navigation";
import { getPage, getSiteSettings } from "@/lib/cms";
import { SectionRenderer } from "./SectionRenderer";

/**
 * Render a CMS page by slug. Optionally inject a node after the first section
 * (used to place the client marquee directly beneath the hero on the home page).
 */
export async function CmsPage({ slug, afterFirst }: { slug: string; afterFirst?: React.ReactNode }) {
  const result = await getPage(slug);
  if (!result) notFound();

  const settings = await getSiteSettings();
  const theme = settings.theme || "aurora";

  const sections = Object.values(result.page.sections)
    .map((s) => ({ key: s.key, type: s.type, order: s.order, visible: s.visible, data: parse(s.data) }))
    .sort((a, b) => a.order - b.order);

  if (!afterFirst) {
    return <SectionRenderer sections={sections} theme={theme} />;
  }

  const [first, ...rest] = sections;
  return (
    <>
      {first && <SectionRenderer sections={[first]} theme={theme} />}
      {afterFirst}
      <SectionRenderer sections={rest} theme={theme} />
    </>
  );
}

function parse(data: string): Record<string, unknown> {
  try {
    return JSON.parse(data) as Record<string, unknown>;
  } catch {
    return {};
  }
}
