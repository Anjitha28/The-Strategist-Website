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

export function Footer() {
  const brandName = SITE_CONFIG.brand.name;
  const companyDescription = "Helping businesses and institutions build smarter systems through analytics, automation, technology, and practical solutions.";
  const address = SITE_CONFIG.brand.address;
  const email = SITE_CONFIG.brand.email;
  const phones = SITE_CONFIG.brand.phones;
  const year = new Date().getFullYear();

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
                const url = SITE_CONFIG.brand.socials[s.key];
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
            {/* Corporate */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Corporate Solutions</h3>
              <ul className="flex flex-col gap-2.5 border-t border-[rgba(32,217,160,0.1)] pt-3">
                {[
                  "Report Automation",
                  "Dashboard Development",
                  "Data Visualization",
                  "Process Automation",
                  "Application Development",
                  "Corporate Training"
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/solutions/corporate"
                      className="text-xs text-[#97aba2] transition-all duration-300 hover:text-[#20D9A0] hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Educational */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Educational Solutions</h3>
              <ul className="flex flex-col gap-2.5 border-t border-[rgba(32,217,160,0.1)] pt-3">
                {[
                  "Training Programs",
                  "Certification Programs",
                  "Curriculum Development",
                  "Academic Analytics",
                  "Skill Development Programs"
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="/solutions/educational"
                      className="text-xs text-[#97aba2] transition-all duration-300 hover:text-[#20D9A0] hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Products</h3>
              <ul className="flex flex-col gap-2.5 border-t border-[rgba(32,217,160,0.1)] pt-3">
                {[
                  { name: "Grade Scope", href: "/products/grade-scope" },
                  { name: "Proctrix", href: "/products/proctrix" },
                  { name: "BeInTrack", href: "/products/beintrack" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-[#97aba2] transition-all duration-300 hover:text-[#20D9A0] hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Company</h3>
              <ul className="flex flex-col gap-2.5 border-t border-[rgba(32,217,160,0.1)] pt-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-[#97aba2] transition-all duration-300 hover:text-[#20D9A0] hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
