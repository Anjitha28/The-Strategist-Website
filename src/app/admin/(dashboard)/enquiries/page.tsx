import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { MessageSquare, Search, Download } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiries | Admin" };

const STATUS_STYLE: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border border-blue-200",
  read: "bg-slate-100 text-slate-600 border border-slate-200",
  replied: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  archived: "bg-amber-50 text-amber-600 border border-amber-200",
};

const TYPE_STYLE: Record<string, string> = {
  contact: "bg-violet-50 text-violet-700",
  career: "bg-emerald-50 text-emerald-700",
  "product-demo": "bg-blue-50 text-blue-700",
  generic: "bg-slate-100 text-slate-600",
};

export default async function EnquiriesPage() {
  await requireUser();
  const enquiries = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
    archived: enquiries.filter((e) => e.status === "archived").length,
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-sm text-slate-500">All form submissions from the website</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: stats.total, color: "slate" },
          { label: "New", value: stats.new, color: "blue" },
          { label: "Replied", value: stats.replied, color: "emerald" },
          { label: "Archived", value: stats.archived, color: "amber" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">Filter & search coming soon</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No enquiries yet.
                  </td>
                </tr>
              ) : enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{e.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-500">{e.email ?? "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${TYPE_STYLE[e.formType] ?? "bg-slate-100 text-slate-500"}`}>
                      {e.formType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[e.status] ?? ""}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{formatDate(e.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/enquiries/${e.id}`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
