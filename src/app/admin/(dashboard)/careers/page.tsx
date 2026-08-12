import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Plus, MapPin, Briefcase, Clock } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Careers | Admin" };

export default async function AdminCareersPage() {
  await requireUser();
  const jobs = await prisma.jobOpening.findMany({
    orderBy: { createdAt: "desc" },
    include: { department: true },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Careers</h1>
          <p className="text-sm text-slate-500">{jobs.filter(j => j.status === "open").length} open positions</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Position
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
            No job openings yet.
          </div>
        ) : jobs.map((job) => (
          <div key={job.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {job.department && (
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                    {job.department.name}
                  </span>
                )}
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${job.status === "open" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {job.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                {job.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>}
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.employmentType}</span>
                {job.experience && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.experience}</span>}
                <span>Posted {formatDate(job.postedAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/careers/${job.slug}`} target="_blank" className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100">View</Link>
              <Link href={`/admin/careers/${job.id}`} className="rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
