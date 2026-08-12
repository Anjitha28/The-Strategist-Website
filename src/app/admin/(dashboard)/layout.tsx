import React from "react";
import { requireUser } from "@/lib/auth";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar userName={user.name} userEmail={user.email} />
      <main className="flex-1 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
