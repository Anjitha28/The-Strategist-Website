"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Workflow,
  Building2,
  Columns,
  MessageSquareQuote,
  HelpCircle,
  Image as ImageIcon,
  Settings,
  LogOut,
  Globe,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

interface NavGroup {
  title: string;
  items: {
    href: string;
    label: string;
    icon: React.ElementType;
    exact?: boolean;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: "Website Sections",
    items: [
      { href: "/admin/sections/hero", label: "Hero Section", icon: Sparkles },
      { href: "/admin/sections/solutions", label: "Enterprise Solutions", icon: Layers, badge: "6 cards" },
      { href: "/admin/sections/framework", label: "Proven Framework", icon: Workflow, badge: "4 cards" },
      { href: "/admin/sections/industries", label: "Industries", icon: Building2, badge: "8 cards" },
      { href: "/admin/sections/split-panels", label: "Split Panels", icon: Columns },
    ],
  },
  {
    title: "Marketing & FAQs",
    items: [
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
      { href: "/admin/faqs", label: "FAQs Accordion", icon: HelpCircle },
    ],
  },
  {
    title: "Assets & System",
    items: [
      { href: "/admin/media", label: "Media Assets", icon: ImageIcon },
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
    ],
  },
];

export default function AdminShell({
  children,
  userName = "Admin",
}: {
  children: React.ReactNode;
  userName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-[#f4f7f9] text-[#071820] font-sans antialiased">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#071820] flex flex-col justify-between border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-7 w-32">
                <Image
                  src="/brand/strategist-logo.png"
                  alt="The Strategist"
                  fill
                  className="object-contain object-left brightness-0 invert"
                  priority
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-[#8a979b] hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-6 flex-1">
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#8a979b] mb-2">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = item.exact
                      ? pathname === item.href
                      : pathname === item.href || pathname.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          active
                            ? "bg-[#18b8ad] text-[#071820] shadow-sm font-extrabold"
                            : "text-[#cbd5e1] hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${active ? "text-[#071820]" : "text-[#18b8ad]"}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge ? (
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                              active ? "bg-black/15 text-[#071820]" : "bg-white/10 text-[#8a979b]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        ) : active ? (
                          <ChevronRight className="h-3.5 w-3.5" />
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#051319]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#8a979b] hover:text-white hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 text-[#18b8ad]" />
              <span>Live Website</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#8a979b]" />
          </a>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between px-2">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-white truncate max-w-[120px]">{userName}</span>
              <span className="text-[9px] text-[#18b8ad] font-semibold">Super Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-[#dce6ee] px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#071820] hover:bg-[#F1F6FA]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-[#56666b]">
              <span>Admin Portal</span>
              <span>/</span>
              <span className="text-[#071820] capitalize font-extrabold">
                {pathname.split("/").filter(Boolean).slice(-1)[0] || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#dce6ee] bg-[#F1F6FA] text-[#071820] hover:border-[#18b8ad] hover:text-[#18b8ad] transition-all"
            >
              <Globe className="h-3.5 w-3.5 text-[#18b8ad]" />
              <span>View Site</span>
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
