import Link from "next/link";
import Image from "next/image";
import { getSiteSettings, getNavigation } from "@/lib/cms";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "./NewsletterForm";

const SOCIALS: { key: "linkedin" | "facebook" | "instagram" | "youtube" | "twitter"; icon: string; label: string }[] = [
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "facebook", icon: "facebook", label: "Facebook" },
  { key: "instagram", icon: "instagram", label: "Instagram" },
  { key: "youtube", icon: "youtube", label: "YouTube" },
  { key: "twitter", icon: "twitter", label: "X (Twitter)" },
];

export async function Footer() {
  const [settings, footerNav] = await Promise.all([getSiteSettings(), getNavigation("footer")]);

  const columns = new Map<string, { label: string; url: string }[]>();
  for (const item of footerNav) {
    const col = item.footerColumn ?? "Links";
    if (!columns.has(col)) columns.set(col, []);
    columns.get(col)!.push({ label: item.label, url: item.url });
  }

  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-[rgba(124,227,218,0.15)] bg-[#071820] text-[#91A4A9] rounded-t-[32px] shadow-lg">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr]">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Image src={settings.logoUrl} alt={settings.siteName} width={180} height={48} className="h-9 w-auto brightness-110" />
            <p className="max-w-sm text-sm leading-relaxed text-[#91A4A9]/90">{settings.companyDescription}</p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => {
                const url = settings.social[s.key];
                if (!url) return null;
                return (
                  <a
                    key={s.key}
                    href={url}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#0D252C] border border-[#18B8AD]/10 text-[#91A4A9] transition-all duration-300 hover:bg-[#18B8AD] hover:text-white hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <Icon name={s.icon} className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Array.from(columns.entries()).map(([col, links]) => (
              <div key={col} className="flex flex-col gap-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{col}</h3>
                <ul className="flex flex-col gap-2.5 border-t border-[rgba(124,227,218,0.1)] pt-3">
                  {links.map((l) => (
                    <li key={l.label + l.url}>
                      <Link href={l.url} className="text-sm text-[#91A4A9] transition-all duration-300 hover:text-[#18B8AD] hover:translate-x-1 inline-block">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter + contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-[#91A4A9] leading-relaxed border-t border-[rgba(124,227,218,0.1)] pt-3">
              Subscribe to receive industry insights, product updates, technology trends, and learning opportunities.
            </p>
            <NewsletterForm />
            <div className="flex flex-col gap-3 pt-2 text-sm text-[#91A4A9]">
              {settings.businessEmail && (
                <a href={`mailto:${settings.businessEmail}`} className="flex items-center gap-2.5 hover:text-[#18B8AD] transition-colors">
                  <Icon name="mail" className="h-4 w-4 text-[#18B8AD]" /> {settings.businessEmail}
                </a>
              )}
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-2.5 hover:text-[#18B8AD] transition-colors">
                  <Icon name="phone" className="h-4 w-4 text-[#18B8AD]" /> {settings.phone}
                </a>
              )}
              {settings.address && (
                <span className="flex items-start gap-2.5">
                  <Icon name="map-pin" className="mt-0.5 h-4 w-4 text-[#18B8AD] shrink-0" /> <span className="leading-snug">{settings.address}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[rgba(124,227,218,0.1)] pt-6 sm:flex-row">
          <p className="text-sm text-[#91A4A9] font-medium">© {year} {settings.siteName}. All Rights Reserved.</p>
          <div className="flex gap-6 text-sm text-[#91A4A9] font-medium">
            <Link href="/privacy-policy" className="hover:text-[#18B8AD] transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-[#18B8AD] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-[#18B8AD] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
