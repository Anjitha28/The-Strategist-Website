import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Plus, User2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Team Members | Admin" };

export default async function AdminTeamPage() {
  await requireUser();
  const members = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  }).catch(() => []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Members</h1>
          <p className="text-sm text-slate-500">{members.length} team members</p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Member
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400 shadow-sm">
            No team members yet. Add your first team member.
          </div>
        ) : members.map((member) => (
          <div key={member.id} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                <User2 className="h-5 w-5" />
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${member.visible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {member.visible ? "Visible" : "Hidden"}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-snug">{member.name}</h3>
              <p className="text-xs text-slate-400 font-semibold">{member.position || "Staff Member"}</p>
              {member.bio && <p className="text-xs text-slate-500 mt-2 line-clamp-3">{member.bio}</p>}
            </div>
            <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
              <Link href={`/admin/team/${member.id}`} className="w-full text-center rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100">Edit Member</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
