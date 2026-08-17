import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { FileText, Layout } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pages & Sections | Admin" };

export default async function AdminPagesPage() {
  await requireUser();
  const pages = await prisma.page.findMany({
    orderBy: { slug: "asc" },
    include: { sections: true },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pages & CMS Layouts</h1>
          <p className="text-sm text-slate-500">{pages.length} active pages</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <div key={page.id} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                <FileText className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-650">
                {page.sections.length} Sections
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-snug">{page.title}</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Slug: /{page.slug === "home" ? "" : page.slug}</p>
            </div>
            <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
              <Link href={`/admin/pages/${page.id}`} className="w-full text-center rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 flex items-center justify-center gap-1">
                <Layout className="h-3.5 w-3.5" /> Manage Page Layout
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
