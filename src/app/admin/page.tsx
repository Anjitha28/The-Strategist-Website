import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "./_components/AdminShell";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Workflow,
  Building2,
  Columns,
  MessageSquareQuote,
  HelpCircle,
  Settings,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
} from "lucide-react";

export const dynamic = "force-dynamic";

const SECTIONS_CONFIG = [
  {
    href: "/admin/sections/hero",
    icon: Sparkles,
    label: "Hero Section",
    badge: "Main Banner",
    description: "Manage headline, tagline, description, CTA button, and hero graphic preview.",
  },
  {
    href: "/admin/sections/solutions",
    icon: Layers,
    label: "Enterprise Solutions",
    badge: "6 Cards Group",
    description: "Edit the 6 solution cards under 'Enterprise Solutions That Drive Business Growth'.",
  },
  {
    href: "/admin/sections/framework",
    icon: Workflow,
    label: "Proven Framework",
    badge: "4 Stages Group",
    description: "Edit the 4-stage digital transformation process cards (Discover, Design, Build, Optimize).",
  },
  {
    href: "/admin/sections/industries",
    icon: Building2,
    label: "Industry Solutions",
    badge: "8 Cards Group",
    description: "Edit the 8 industry operational cards under 'Solutions Built For Every Industry'.",
  },
  {
    href: "/admin/sections/split-panels",
    icon: Columns,
    label: "Technology & Education Split",
    badge: "2 Feature Panels",
    description: "Manage proprietary platforms and educational enablement split panels.",
  },
  {
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
    label: "Client Testimonials",
    badge: "Social Proof",
    description: "Manage client reviews, star ratings, author designations, and display visibility.",
  },
  {
    href: "/admin/faqs",
    icon: HelpCircle,
    label: "Frequently Asked Questions",
    badge: "Support",
    description: "Add, edit, and organize FAQ accordion items displayed across the website.",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Site Settings & Footer",
    badge: "Global",
    description: "Update contact emails, phone numbers, WhatsApp, physical address, and social links.",
  },
];

export default async function AdminDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell userName={user.email}>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 bg-white border border-[#dce6ee] rounded-3xl shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#e7f6f4] text-[#159f95] border border-[#18b8ad]/30">
                <ShieldCheck className="h-3.5 w-3.5" /> Administrator Mode
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071820] tracking-tight">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-sm text-[#56666b] mt-1">
              Select any website section below to edit live content without writing code.
            </p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold bg-[#071820] text-white hover:bg-[#0d2f3a] transition-all shadow-sm shrink-0"
          >
            <Globe className="h-4 w-4 text-[#18b8ad]" />
            <span>Preview Live Website</span>
          </a>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Core Sections", value: "5 Areas", status: "Active" },
            { label: "Card Groups", value: "18 Cards", status: "Synchronized" },
            { label: "System Sync", value: "Live Mode", status: "Real-time" },
            { label: "CMS Status", value: "Operational", status: "Protected" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-[#F1F6FA] border border-[#dce6ee] rounded-2xl shadow-xs"
            >
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#8a979b]">
                <span>{stat.label}</span>
                <span className="text-[#18b8ad] font-bold">● {stat.status}</span>
              </div>
              <div className="text-2xl font-extrabold text-[#071820] mt-2">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Sections Grid */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-extrabold text-[#071820] tracking-tight">
                Website Content Sections
              </h2>
              <p className="text-xs text-[#56666b] mt-0.5">
                Click on any section to customize headings, text, and card items
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS_CONFIG.map((sec) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={sec.href}
                  href={sec.href}
                  className="group flex flex-col justify-between p-6 bg-white border border-[#dce6ee] rounded-2xl shadow-xs hover:shadow-md hover:border-[#18b8ad]/40 hover:-translate-y-0.5 transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#F1F6FA] border border-[#dce6ee] grid place-items-center text-[#18b8ad] group-hover:scale-105 transition-transform shadow-xs">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#18b8ad] bg-[#e7f6f4] px-2.5 py-1 rounded-md border border-[#18b8ad]/20">
                        {sec.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#071820] group-hover:text-[#18b8ad] transition-colors leading-snug">
                      {sec.label}
                    </h3>
                    <p className="text-xs text-[#56666b] mt-2 leading-relaxed">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#dce6ee]/60 flex items-center justify-between text-xs font-bold text-[#18b8ad]">
                    <span>Edit Section</span>
                    <span className="w-7 h-7 rounded-full bg-[#F1F6FA] border border-[#dce6ee] group-hover:bg-[#18b8ad] group-hover:text-white transition-colors grid place-items-center">
                      <ArrowRight className="h-3.5 w-3.5 text-[#18b8ad] group-hover:text-white" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Live sync banner */}
        <div className="p-6 bg-gradient-to-r from-[#071820] to-[#0f3440] rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18b8ad]/20 border border-[#18b8ad]/30 grid place-items-center text-[#18b8ad] shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Instant Live Publishing</h3>
              <p className="text-xs text-white/70 mt-0.5">
                Every change you save in the editor is immediately updated on the public website with automatic revalidation.
              </p>
            </div>
          </div>
          <Link
            href="/admin/sections/solutions"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold bg-[#18b8ad] text-[#071820] hover:bg-white transition-colors shrink-0"
          >
            Start Editing <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
