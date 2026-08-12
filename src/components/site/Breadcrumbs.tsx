import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  const trail = [{ name: "Home", url: "/" }, ...items];
  return (
    <>
      <BreadcrumbJsonLd items={trail} />
      <nav aria-label="Breadcrumb" className="border-b border-[var(--border-color)] bg-[var(--surface)]">
        <div className="container-page flex items-center gap-1.5 py-3 text-sm">
          {trail.map((item, i) => {
            const last = i === trail.length - 1;
            return (
              <span key={item.url} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[var(--muted)]" />}
                {last ? (
                  <span className="font-medium text-[var(--fg)]">{item.name}</span>
                ) : (
                  <Link href={item.url} className="text-[var(--muted)] transition-colors hover:text-primary-600">
                    {item.name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
}
