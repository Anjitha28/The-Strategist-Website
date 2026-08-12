"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Briefcase, Clock, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeadForm, type FormFieldDef } from "./LeadForm";

export type JobItem = {
  id: string;
  title: string;
  slug: string;
  department: string;
  employmentType: string;
  experience: string | null;
  location: string | null;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
};

export function JobsBrowser({ jobs }: { jobs: JobItem[] }) {
  const departments = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))], [jobs]);
  const [filter, setFilter] = useState("All");
  const [applyFor, setApplyFor] = useState<JobItem | null>(null);

  const filtered = filter === "All" ? jobs : jobs.filter((j) => j.department === filter);

  const careerFields: FormFieldDef[] = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "position", label: "Position Applying For", required: true },
    { name: "experience", label: "Experience" },
    { name: "location", label: "Current Location" },
    { name: "portfolio", label: "Portfolio / LinkedIn", full: true },
    { name: "coverLetter", label: "Cover Letter", type: "textarea", full: true },
  ];

  if (jobs.length === 0) {
    return <p className="text-center text-[var(--muted)]">No open positions right now — but we&apos;d still love to hear from you. Reach out via our Contact page.</p>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {departments.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === d ? "bg-primary-600 text-white" : "bg-[var(--surface-2)] text-[var(--fg)] hover:bg-primary-50 hover:text-primary-700",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {filtered.map((job) => (
          <div key={job.id} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-950/50 dark:text-primary-200">{job.department}</span>
                  <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 text-xs text-[var(--muted)]">{job.employmentType}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{job.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{job.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
                  {job.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>}
                  {job.experience && <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.experience}</span>}
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.employmentType}</span>
                </div>
              </div>
              <button
                onClick={() => setApplyFor(job)}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[linear-gradient(120deg,var(--color-primary-600),var(--color-secondary-600))] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Apply <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {(job.skills.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[var(--border-color)] pt-4">
                {job.skills.map((s) => (
                  <span key={s} className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--muted)]">{s}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Apply modal */}
      <AnimatePresence>
        {applyFor && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-[8vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setApplyFor(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl bg-[var(--surface)] p-6 shadow-2xl sm:p-8"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">Apply for</p>
                  <h3 className="text-xl font-bold">{applyFor.title}</h3>
                </div>
                <button onClick={() => setApplyFor(null)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--surface-2)]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <LeadForm
                formType="career"
                fields={careerFields.map((f) => (f.name === "position" ? { ...f, defaultValue: applyFor.title } : f))}
                submitLabel="Submit Application"
                successTitle="Application received"
                successMessage="Thank you for applying. Our recruitment team will review your profile and reach out if there's a match."
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
