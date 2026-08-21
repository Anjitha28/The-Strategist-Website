import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "./NewsletterForm";
import { SITE_CONFIG } from "@/config/site";

const SOCIALS: { key: "linkedin" | "facebook" | "instagram" | "twitter"; icon: string; label: string }[] = [
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "facebook", icon: "facebook", label: "Facebook" },
  { key: "instagram", icon: "instagram", label: "Instagram" },
  { key: "twitter", icon: "twitter", label: "X (Twitter)" },
];

interface FooterProps {
  navItems?: { label: string; url: string; location: string; footerColumn?: string | null }[];
  address?: string;
  email?: string;
  phones?: string[];
  linkedinUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  siteName?: string;
}

export function Footer({
  navItems: propNavItems,
  address: propAddress,
  email: propEmail,
  phones: propPhones,
  linkedinUrl,
  facebookUrl,
  twitterUrl,
  instagramUrl,
  siteName: propSiteName,
}: FooterProps) {
  const brandName = propSiteName || SITE_CONFIG.brand.name;
  const companyDescription = "Helping businesses and institutions build smarter systems through analytics, automation, technology, and practical solutions.";
  const address = propAddress || SITE_CONFIG.brand.address;
  const email = propEmail || SITE_CONFIG.brand.email;
  const phones = propPhones || SITE_CONFIG.brand.phones;
  const year = new Date().getFullYear();

  const socialUrls: Record<string, string> = {
    linkedin: linkedinUrl || SITE_CONFIG.brand.socials.linkedin,
    facebook: facebookUrl || SITE_CONFIG.brand.socials.facebook,
    twitter: twitterUrl || SITE_CONFIG.brand.socials.twitter,
    instagram: instagramUrl || SITE_CONFIG.brand.socials.instagram,
  };

  // Group footer links if provided, else fall back to static SITE_CONFIG/standard
  const columns: { title: string; links: { label: string; url: string }[] }[] = [];

  if (propNavItems && propNavItems.length > 0) {
    const grouped = propNavItems.reduce<Record<string, { label: string; url: string }[]>>((acc, item) => {
      if (item.location === "footer" && item.footerColumn) {
        if (!acc[item.footerColumn]) acc[item.footerColumn] = [];
        acc[item.footerColumn].push({ label: item.label, url: item.url });
      }
      return acc;
    }, {});

    Object.entries(grouped).forEach(([colName, links]) => {
      columns.push({ title: colName, links });
    });
  } else {
    // Standard static fallback columns
    columns.push(
      {
        title: "Corporate Solutions",
        links: [
          { label: "Report Automation", url: "/solutions/corporate" },
          { label: "Dashboard Development", url: "/solutions/corporate" },
          { label: "Data Visualization", url: "/solutions/corporate" },
          { label: "Process Automation", url: "/solutions/corporate" },
          { label: "Application Development", url: "/solutions/corporate" },
          { label: "Corporate Training", url: "/solutions/corporate" },
        ],
      },
      {
        title: "Educational Solutions",
        links: [
          { label: "Training Programs", url: "/solutions/educational" },
          { label: "Certification Programs", url: "/solutions/educational" },
          { label: "Curriculum Development", url: "/solutions/educational" },
          { label: "Academic Analytics", url: "/solutions/educational" },
          { label: "Skill Development Programs", url: "/solutions/educational" },
        ],
      },
      {
        title: "Products",
        links: [
          { label: "Grade Scope", url: "/products" },
          { label: "Proctrix", url: "/products" },
          { label: "BeInTrack", url: "/products" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", url: "/about" },
          { label: "Blog", url: "/blog" },
          { label: "Contact", url: "/contact" },
        ],
      }
    );
  }

  return (
    <footer className="relative mt-24 border-t border-[rgba(32,217,160,0.15)] bg-[#062D24] text-[#97aba2] rounded-t-[32px] shadow-lg">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr_1.2fr]">
          {/* Brand & Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="The Strategist — Home">
              <Image
                src="/brand/strategist-logo.png"
                alt="The Strategist"
                width={160}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#97aba2]/90">
              {companyDescription}
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => {
                const url = socialUrls[s.key];
                return (
                  <a
                    key={s.key}
                    href={url}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#073B30] border border-[#20D9A0]/10 text-[#97aba2] transition-all duration-300 hover:bg-[#00B894] hover:text-white hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <Icon name={s.icon} className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</h3>
                <ul className="flex flex-col gap-2.5 border-t border-[rgba(32,217,160,0.1)] pt-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.url}
                        className="text-xs text-[#97aba2] transition-all duration-300 hover:text-[#20D9A0] hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter & Direct Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-semibold">Stay Updated</h3>
            <p className="text-xs text-[#97aba2] leading-relaxed border-t border-[rgba(32,217,160,0.1)] pt-3">
              Subscribe to receive insights, product updates, technology trends, and learning opportunities.
            </p>
            <NewsletterForm />
            <div className="flex flex-col gap-3 pt-2 text-xs text-[#97aba2]">
              <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-[#20D9A0] transition-colors">
                <Icon name="mail" className="h-4 w-4 text-[#20D9A0]" /> {email}
              </a>
              {phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="flex items-center gap-2.5 hover:text-[#20D9A0] transition-colors">
                  <Icon name="phone" className="h-4 w-4 text-[#20D9A0]" /> {phone}
                </a>
              ))}
              <span className="flex items-start gap-2.5">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 text-[#20D9A0] shrink-0" />
                <span className="leading-snug whitespace-pre-line">{address}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[rgba(32,217,160,0.1)] pt-6 sm:flex-row">
          <p className="text-xs text-[#97aba2] font-semibold">
            © {year} {brandName}. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#97aba2] font-semibold">
            <Link href="/privacy-policy" className="hover:text-[#20D9A0] transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-[#20D9A0] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-[#20D9A0] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
