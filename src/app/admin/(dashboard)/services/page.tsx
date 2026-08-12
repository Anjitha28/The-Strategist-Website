import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services | Admin" };

export default async function AdminServicesPage() {
  await requireUser();
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-sm text-slate-500">{services.length} corporate services</p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Service
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
            No services yet. Add your first service.
          </div>
        ) : services.map((service) => (
          <div key={service.id} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                <Icon name={service.icon ?? "layers"} className="h-5 w-5" />
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${service.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {service.status}
              </span>
            </div>
            {service.category && (
              <span className="text-xs font-medium text-slate-400">{service.category.name}</span>
            )}
            <h3 className="font-bold text-slate-900 leading-snug">{service.name}</h3>
            <p className="text-xs text-slate-500 line-clamp-2">{service.shortDescription}</p>
            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
              <Link href={`/services/${service.slug}`} target="_blank" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">View</Link>
              <Link href={`/admin/services/${service.id}`} className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
