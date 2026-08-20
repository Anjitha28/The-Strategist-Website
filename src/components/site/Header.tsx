"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_CONFIG } from "@/config/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const navItems = SITE_CONFIG.navigation.header;
  const brandName = SITE_CONFIG.brand.name;
  const phoneNum = SITE_CONFIG.brand.phones[0];

    const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "absolute z-50 top-[3px] left-1/2 -translate-x-1/2 transition-all duration-300",
          "w-[calc(100%-24px)] max-w-[1240px] rounded-b-[30px] border border-solid border-[rgba(7,24,32,0.08)] shadow-[0_15px_45px_rgba(7,30,35,0.08)]"
        )}
        style={{
          background: "rgba(255,255,255,0.96)",
        }}
      >
        <div className="w-full flex items-center justify-between gap-7 transition-all duration-300 px-5" style={{ height: 78 }}>
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center hover:opacity-90 transition-opacity"
            aria-label="The Strategist — Home"
          >
            <Image
              src="/brand/strategist-logo.png"
              alt="The Strategist"
              width={160}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-0 ml-auto lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "px-3.5 py-2 transition-colors",
                  isActive(item.url)
                    ? "font-bold"
                    : ""
                )}
                style={{
                  fontSize: 12,
                  fontWeight: isActive(item.url) ? 800 : 750,
                  color: isActive(item.url) ? "#18b8ad" : "#56666b",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3 ml-auto lg:ml-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full font-bold"
              style={{
                background: "#071820",
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
              className="grid h-10 w-10 place-items-center rounded-full border text-[var(--fg)] lg:hidden"
              style={{ borderColor: "rgba(7,24,32,0.12)", background: "rgba(255,255,255,0.8)" }}
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
                  src="/brand/strategist-logo.png"
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
                        isActive(item.url) ? "text-[#00B894] bg-[#00B894]/5" : "text-[var(--fg)]"
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
                  className="w-full bg-[#073B30] text-white hover:bg-[#00B894]"
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
      {!isHome && <div className="h-[84px] w-full shrink-0" />}
    </>
  );
}
