import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import {
  MessageSquare, FileText, Briefcase, Package, BarChart3,
  TrendingUp, Clock, CheckCircle2, AlertCircle, BookOpen
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

async function getDashboardStats() {
  try {
    const [
      totalEnquiries, newEnquiries,
      publishedBlogs, draftBlogs,
      openCareers, totalProducts,
      totalServices, totalCourses,
      recentEnquiries, recentLogs,
    ] = await Promise.all([
      prisma.formSubmission.count(),
      prisma.formSubmission.count({ where: { status: "new" } }),
      prisma.blogPost.count({ where: { status: "published" } }),
      prisma.blogPost.count({ where: { status: "draft" } }),
      prisma.jobOpening.count({ where: { status: "open" } }),
      prisma.product.count({ where: { status: "published" } }),
      prisma.service.count({ where: { status: "published" } }),
      prisma.course.count({ where: { status: "published" } }),
      prisma.formSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
    ]);
    return { totalEnquiries, newEnquiries, publishedBlogs, draftBlogs, openCareers, totalProducts, totalServices, totalCourses, recentEnquiries, recentLogs };
  } catch {
    return null;
  }
}

const STAT_CARDS = [
  { key: "newEnquiries", label: "New Enquiries", total: "totalEnquiries", totalLabel: "total", icon: MessageSquare, color: "blue", href: "/admin/enquiries" },
  { key: "publishedBlogs", label: "Published Blogs", total: "draftBlogs", totalLabel: "draft", icon: FileText, color: "violet", href: "/admin/blogs" },
  { key: "openCareers", label: "Open Positions", total: null, totalLabel: null, icon: Briefcase, color: "emerald", href: "/admin/careers" },
  { key: "totalProducts", label: "Products", total: null, totalLabel: null, icon: Package, color: "amber", href: "/admin/products" },
  { key: "totalServices", label: "Services", total: null, totalLabel: null, icon: BarChart3, color: "rose", href: "/admin/services" },
  { key: "totalCourses", label: "Courses", total: null, totalLabel: null, icon: BookOpen, color: "cyan", href: "/admin/courses" },
];

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700",
  violet: "bg-violet-50 text-violet-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
  cyan: "bg-cyan-50 text-cyan-700",
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  read: "bg-slate-100 text-slate-600",
  replied: "bg-emerald-50 text-emerald-700",
  archived: "bg-amber-50 text-amber-600",
};

export default async function AdminDashboard() {
  const user = await requireUser();
  const stats = await getDashboardStats();

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Welcome back, <span className="font-medium text-slate-700">{user.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
          <Clock className="h-4 w-4" />
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stats grid */}
      {stats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {STAT_CARDS.map(({ key, label, total, totalLabel, icon: Icon, color, href }) => {
            const mainVal = (stats as Record<string, unknown>)[key] as number;
            const secVal = total ? (stats as Record<string, unknown>)[total] as number : null;
            return (
              <Link key={key} href={href} className="group col-span-1">
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${COLOR_MAP[color]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900">{mainVal}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
                    {secVal !== null && (
                      <p className="text-[11px] text-slate-400 mt-1">{secVal} {totalLabel}</p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Database not connected. Stats unavailable.
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Enquiries */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="font-bold text-slate-900">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs font-medium text-primary-600 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats?.recentEnquiries.length ? stats.recentEnquiries.map((e) => (
              <div key={e.id} className="flex items-start justify-between gap-3 px-6 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{e.name ?? "Anonymous"}</p>
                  <p className="truncate text-xs text-slate-400">{e.email} · {e.formType}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[e.status] ?? "bg-slate-100 text-slate-500"}`}>
                    {e.status}
                  </span>
                  <span className="text-[10px] text-slate-400">{formatDate(e.createdAt)}</span>
                </div>
              </div>
            )) : (
              <p className="px-6 py-8 text-center text-sm text-slate-400">No enquiries yet.</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="font-bold text-slate-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {stats?.recentLogs.length ? stats.recentLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 px-6 py-3.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium capitalize">{log.action}</span>{" "}
                    <span className="text-slate-500">{log.module}</span>
                    {log.summary && <span className="text-slate-400"> — {log.summary}</span>}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{log.userEmail} · {formatDate(log.createdAt)}</p>
                </div>
              </div>
            )) : (
              <p className="px-6 py-8 text-center text-sm text-slate-400">No activity logged yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-base font-bold text-slate-900">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/blogs/new", label: "New Blog Post", icon: FileText },
            { href: "/admin/careers/new", label: "New Job Opening", icon: Briefcase },
            { href: "/admin/services/new", label: "New Service", icon: BarChart3 },
            { href: "/admin/products/new", label: "New Product", icon: Package },
            { href: "/admin/enquiries", label: "View Enquiries", icon: MessageSquare },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
