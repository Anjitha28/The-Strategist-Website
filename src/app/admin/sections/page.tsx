import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "../_components/AdminShell";
import Link from "next/link";
import { Sparkles, Layers, Workflow, Building2, Columns, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const SECTIONS = [
  {
    key: "hero",
    href: "/admin/sections/hero",
    icon: Sparkles,
    label: "Hero Section",
    badge: "Main Banner",
    description: "Manage the hero headline, tagline, supporting body, CTA button, and hero graphic preview.",
  },
  {
    key: "solutions",
    href: "/admin/sections/solutions",
    icon: Layers,
    label: "Enterprise Solutions",
    badge: "6 Cards Group",
    description: "Manage the section header and the 6 cards under 'Enterprise Solutions That Drive Business Growth'.",
  },
  {
    key: "framework",
    href: "/admin/sections/framework",
    icon: Workflow,
    label: "Proven Framework",
    badge: "4 Stages Group",
    description: "Manage the 4-stage digital transformation process cards (Discover, Design, Build, Optimize).",
  },
  {
    key: "industries",
    href: "/admin/sections/industries",
    icon: Building2,
    label: "Industry Solutions",
    badge: "8 Cards Group",
    description: "Manage the 8 industry operational cards under 'Solutions Built For Every Industry'.",
  },
  {
    key: "split-panels",
    href: "/admin/sections/split-panels",
    icon: Columns,
    label: "Technology & Education Split",
    badge: "2 Feature Panels",
    description: "Manage proprietary platforms and educational enablement split panels.",
  },
];

export default async function AdminSectionsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell userName={user.email}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#071820] tracking-tight">Website Sections</h1>
          <p className="text-sm text-[#56666b] mt-1">
            Choose a section to customize headings, supporting text, cards, and buttons.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.key}
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
                  <p className="text-xs text-[#56666b] mt-2 leading-relaxed">{sec.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#dce6ee]/60 flex items-center justify-between text-xs font-bold text-[#18b8ad]">
                  <span>Open Editor</span>
                  <span className="w-7 h-7 rounded-full bg-[#F1F6FA] border border-[#dce6ee] group-hover:bg-[#18b8ad] group-hover:text-white transition-colors grid place-items-center">
                    <ArrowRight className="h-3.5 w-3.5 text-[#18b8ad] group-hover:text-white" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
