"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_CONFIG } from "@/config/site";

interface HeaderProps {
  navItems?: { label: string; url: string }[];
  phoneNum?: string;
  logoUrl?: string;
}

export function Header({ navItems: propNavItems, phoneNum: propPhoneNum, logoUrl: propLogoUrl }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      setMobileOpen(false);
    }, 0);
    return () => clearTimeout(handle);
  }, [pathname]);

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  const navItems = propNavItems && propNavItems.length > 0 ? propNavItems : SITE_CONFIG.navigation.header;
  const phoneNum = propPhoneNum || SITE_CONFIG.brand.phones[0];
  const logoUrl = propLogoUrl || "/brand/strategist-logo.png";

  const isHome = pathname === "/";
  // Hero-integrated: transparent on home until scrolled, always solid on other pages
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed z-50 top-0 left-1/2 -translate-x-1/2 transition-all duration-500",
          isTransparent
            ? "w-full max-w-none border-transparent shadow-none top-0"
            : "top-[6px] w-[calc(100%-24px)] max-w-[1240px] rounded-[30px] border border-solid border-[rgba(7,24,32,0.08)] shadow-[0_15px_45px_rgba(7,30,35,0.08)]"
        )}
        style={{
          background: isTransparent
            ? "transparent"
            : "rgba(255,255,255,0.97)",
          backdropFilter: isTransparent ? "none" : "blur(16px)",
        }}
      >
        <div className="w-full flex items-center justify-between gap-7 transition-all duration-300 px-5" style={{ height: isTransparent ? 84 : 72 }}>
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center hover:opacity-90 transition-opacity"
            aria-label="The Strategist — Home"
          >
            <Image
              src={logoUrl}
              alt="The Strategist"
              width={180}
              height={45}
              className="h-9 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Pill Ribbon Style */}
          <nav 
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[rgba(7,24,32,0.06)] bg-[rgba(255,255,255,0.65)] backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),_0_2px_8px_rgba(7,24,32,0.03)] mx-auto"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "px-3.5 py-1.5 rounded-full transition-all duration-300 relative text-xs font-bold",
                  isActive(item.url) 
                    ? "bg-[#18b8ad] text-white shadow-[0_4px_12px_rgba(24,184,173,0.22)]" 
                    : "text-[#56666b] hover:text-[#071820] hover:bg-[rgba(7,24,32,0.04)]"
                )}
                style={{
                  fontWeight: isActive(item.url) ? 850 : 750,
                  color: isActive(item.url)
                    ? "#ffffff"
                    : (isTransparent ? "rgba(7,24,32,0.85)" : "#56666b"),
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0 shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full font-bold transition-all duration-300"
              style={{
                background: isTransparent ? "rgba(7,24,32,0.9)" : "#071820",
                color: "#fff",
                padding: "13px 19px",
                fontSize: 11,
                fontWeight: 850,
              }}
            >
              Let&apos;s Talk →
            </Link>
            <ThemeToggle className="hidden sm:grid" />
            <button
              className="grid h-10 w-10 place-items-center rounded-full border lg:hidden transition-all duration-300"
              style={{
                borderColor: isTransparent ? "rgba(7,24,32,0.2)" : "rgba(7,24,32,0.12)",
                background: isTransparent ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.8)",
                color: isTransparent ? "#071820" : "var(--fg)",
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-[86%] max-w-sm overflow-y-auto bg-[var(--surface)] p-6 shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <Image
                  src={logoUrl}
                  alt="The Strategist"
                  width={140}
                  height={36}
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navItems.map((item) => (
                  <div key={item.url} className="border-b border-[var(--border-color)] py-1 last:border-0">
                    <Link
                      href={item.url}
                      className={cn(
                        "block rounded-xl px-3 py-3 text-base font-semibold",
                        isActive(item.url) ? "text-[#18b8ad] bg-[#18b8ad]/5" : "text-[var(--fg)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`tel:${phoneNum}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-3 text-sm font-semibold text-[var(--fg)] hover:bg-[var(--surface-2)] transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call {phoneNum}
                </a>
                <Button
                  href="/contact?service=Products#form"
                  className="w-full bg-[#071820] text-white hover:bg-[#18b8ad]"
                >
                  Request Demo &rarr;
                </Button>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-[var(--border-color)]">
                  <span className="text-xs text-[var(--muted)]">Toggle Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </header>
      {/* Spacer: only on non-home pages since hero already pads for fixed header */}
      {!isHome && <div className="h-[84px] w-full shrink-0" />}
    </>
  );
}
