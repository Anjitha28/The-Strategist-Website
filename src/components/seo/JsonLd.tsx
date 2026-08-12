import { getSiteSettings } from "@/lib/cms";

const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

function Script({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export async function OrganizationJsonLd() {
  const s = await getSiteSettings();
  const sameAs = Object.values(s.social).filter(Boolean);
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: s.siteName,
        description: s.companyDescription,
        url: SITE_URL,
        logo: `${SITE_URL}${s.logoUrl}`,
        email: s.businessEmail || undefined,
        telephone: s.phone || undefined,
        sameAs: sameAs.length ? sameAs : undefined,
      }}
    />
  );
}

export async function WebSiteJsonLd() {
  const s = await getSiteSettings();
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: s.siteName,
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${SITE_URL}${it.url}`,
        })),
      }}
    />
  );
}

export function ArticleJsonLd({ title, description, datePublished, author, url }: { title: string; description: string; datePublished?: string; author?: string; url: string }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        datePublished,
        author: author ? { "@type": "Organization", name: author } : undefined,
        url: `${SITE_URL}${url}`,
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  if (items.length === 0) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />
  );
}

export function JobPostingJsonLd({ title, description, employmentType, datePosted, location }: { title: string; description: string; employmentType?: string; datePosted?: string; location?: string }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title,
        description,
        employmentType,
        datePosted,
        hiringOrganization: { "@type": "Organization", name: "The Strategist" },
        jobLocation: location ? { "@type": "Place", address: location } : undefined,
      }}
    />
  );
}
