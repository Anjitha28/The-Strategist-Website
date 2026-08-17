import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Plus, MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Testimonials | Admin" };

export default async function AdminTestimonialsPage() {
  await requireUser();
  const items = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-sm text-slate-500">{items.length} client testimonials</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Testimonial
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
            No testimonials yet. Add your first testimonial.
          </div>
        ) : items.map((item) => (
          <div key={item.id} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {item.visible ? "Visible" : "Hidden"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-500 italic line-clamp-4">"{item.quote}"</p>
            <div className="mt-auto pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 leading-snug">{item.name}</h4>
              <p className="text-[11px] text-slate-400 font-semibold">{item.designation}{item.company ? `, ${item.company}` : ""}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Link href={`/admin/testimonials/${item.id}`} className="w-full text-center rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">Edit Testimonial</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
