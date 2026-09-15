import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/config/site";

const SOCIALS: { key: "linkedin" | "facebook" | "instagram" | "twitter"; icon: string; label: string }[] = [
  { key: "linkedin", icon: "linkedin", label: "LinkedIn" },
  { key: "facebook", icon: "facebook", label: "Facebook" },
  { key: "instagram", icon: "instagram", label: "Instagram" },
  { key: "twitter", icon: "twitter", label: "X (Twitter)" },
];

const REGIONS_SERVED = ["Kerala", "India", "UAE", "Oman", "USA", "Europe"];

const CORPORATE_LINKS = [
  { label: "Report Automation", url: "/corporate/report-automation" },
  { label: "Dashboard Development", url: "/corporate/dashboard-development" },
  { label: "Data Visualization", url: "/corporate/data-visualization" },
  { label: "Process Automation", url: "/corporate/process-automation" },
  { label: "Corporate Training", url: "/corporate/corporate-training" },
];

const EDUCATIONAL_LINKS = [
  { label: "Certification Programs", url: "/education/certification-programs" },
  { label: "Curriculum Development", url: "/education/curriculum-development" },
  { label: "Grade Scope", url: "/products/grade-scope" },
  { label: "Protrix", url: "/products/protrix" },
  { label: "Skill Development Programs", url: "/training" },
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
  const tagline = "Empowering Businesses and Institutions Through Analytics, Automation & Practical Learning.";
  const description =
    "The Strategist is a leading analytics, automation, and training organization with extensive experience in delivering business-focused technology solutions and industry-oriented learning systems.";
  const address = propAddress || SITE_CONFIG.brand.address;
  const email = propEmail || SITE_CONFIG.brand.email;
  const phones = propPhones && propPhones.length > 0 && propPhones[0] ? propPhones : SITE_CONFIG.brand.phones;
  const whatsapp = (SITE_CONFIG.brand as any).whatsapp || "9961813730";
  const year = new Date().getFullYear();

  const socialUrls: Record<string, string> = {
    linkedin: linkedinUrl || SITE_CONFIG.brand.socials.linkedin,
    facebook: facebookUrl || SITE_CONFIG.brand.socials.facebook,
    twitter: twitterUrl || SITE_CONFIG.brand.socials.twitter,
    instagram: instagramUrl || SITE_CONFIG.brand.socials.instagram,
  };

  return (
    <footer className="relative mt-24 border-t border-[rgba(32,217,160,0.15)] bg-[#062D24] text-[#97aba2] rounded-t-[32px] shadow-lg overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#18b8ad]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#18b8ad]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-page py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Column 1: Brand / Tagline / Regions / Socials */}
          <div className="lg:col-span-3 flex flex-col justify-start">
            <Link href="/" className="inline-flex items-center mb-5 group" aria-label="The Strategist">
              <Image
                src="/brand/strategist-logo.png"
                alt="The Strategist"
                width={160}
                height={40}
                className="h-8 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm font-semibold text-white/90 mb-3 leading-snug">
              {tagline}
            </p>
            <p className="text-xs text-[#97aba2]/90 leading-relaxed mb-6 font-normal">
              {description}
            </p>

            {/* Regions served badge strip */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#18b8ad] block mb-2">
                Regions Served
              </span>
              <div className="flex flex-wrap gap-1.5">
                {REGIONS_SERVED.map((region, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[#c1d3cc] border border-[rgba(32,217,160,0.2)] hover:bg-[#18b8ad]/10 hover:text-[#18b8ad] hover:border-[#18b8ad]/40 transition-all duration-200 cursor-default"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => {
                const url = socialUrls[s.key];
                return (
                  <a
                    key={s.key}
                    href={url}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#071820] border border-[rgba(32,217,160,0.2)] text-[#97aba2] transition-all duration-300 hover:bg-[#18b8ad] hover:text-white hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <Icon name={s.icon} className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Corporate Solutions */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-[rgba(32,217,160,0.15)] pb-2.5">
              Corporate Solutions
            </h4>
            <ul className="space-y-3 pt-1">
              {CORPORATE_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.url}
                    className="text-xs text-[#97aba2] hover:text-[#18b8ad] hover:translate-x-1.5 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Educational Solutions */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-[rgba(32,217,160,0.15)] pb-2.5">
              Educational Solutions
            </h4>
            <ul className="space-y-3 pt-1">
              {EDUCATIONAL_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.url}
                    className="text-xs text-[#97aba2] hover:text-[#18b8ad] hover:translate-x-1.5 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-[rgba(32,217,160,0.15)] pb-2.5">
              Contact Us
            </h4>
            <ul className="space-y-4 pt-1">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-[#18b8ad] mr-3 shrink-0 mt-0.5" />
                <span className="text-xs text-[#97aba2] leading-relaxed whitespace-pre-line">
                  {address}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-[#18b8ad] mr-3 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-xs text-[#97aba2] hover:text-[#18b8ad] transition-colors duration-150"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-[#18b8ad] mr-3 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-1">
                  {phones.map((phone, pIdx) => (
                    <a
                      key={pIdx}
                      href={`tel:${phone}`}
                      className="text-xs text-[#97aba2] hover:text-[#18b8ad] transition-colors duration-150"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              {whatsapp && (
                <li className="flex items-center">
                  <MessageSquare className="w-4 h-4 text-[#25D366] mr-3 shrink-0" />
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
                      "Hello The Strategist, I visited your website and would like to connect."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#97aba2] hover:text-[#25D366] transition-colors duration-150 font-medium"
                  >
                    WhatsApp Chat
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-[rgba(32,217,160,0.15)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#97aba2] font-medium text-center md:text-left">
            &copy; {year} {brandName}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#97aba2] font-medium">
            <Link href="/privacy-policy" className="hover:text-[#18b8ad] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#18b8ad] transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookie-policy" className="hover:text-[#18b8ad] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
