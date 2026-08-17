"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Settings, LogOut, Shield, FileText, Briefcase,
  MessageSquare, Package, BookOpen, Star, Users, ChevronRight,
  BarChart3, Menu, X, Layout, Building2, Milestone
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAIN_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
];

const CONTENT_ITEMS = [
  { href: "/admin/pages", label: "Pages & Sections", icon: Layout },
  { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/services", label: "Services / Solutions", icon: BarChart3 },
  { href: "/admin/products", label: "Products / Tech", icon: Package },
  { href: "/admin/courses", label: "Learning Programs", icon: BookOpen },
  { href: "/admin/industries", label: "Industries We Serve", icon: Building2 },
  { href: "/admin/approach", label: "Methodology", icon: Milestone },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/team", label: "Team", icon: Users },
];

const SETTINGS_ITEMS = [
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

function NavLink({ href, label, icon: Icon, exact }: { href: string; label: string; icon: any; exact?: boolean }) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        isActive
          ? "bg-primary-50 text-primary-700 shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-primary-600" : "text-slate-400")} />
      <span>{label}</span>
      {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-primary-400" />}
    </Link>
  );
}

export function AdminSidebar({ userName, userEmail }: { userName: string; userEmail: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white shadow-sm lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,#3B82F6,#8B5CF6)]">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-900">The Strategist</p>
            <p className="text-[10px] text-slate-400">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Main</p>
          <div className="flex flex-col gap-0.5">
            {MAIN_ITEMS.map((item) => <NavLink key={item.href} {...item} />)}
          </div>

          <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Content</p>
          <div className="flex flex-col gap-0.5">
            {CONTENT_ITEMS.map((item) => <NavLink key={item.href} {...item} />)}
          </div>

          <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Settings</p>
          <div className="flex flex-col gap-0.5">
            {SETTINGS_ITEMS.map((item) => <NavLink key={item.href} {...item} />)}
          </div>
        </nav>

        {/* User footer */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#3B82F6,#8B5CF6)] text-xs font-bold uppercase text-white shadow-sm">
              {userName.substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
              <p className="truncate text-[11px] text-slate-400">{userEmail}</p>
            </div>
          </div>
          <form action="/api/admin/logout" method="POST" className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
