import { Section, SectionHeader } from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";
import { parseJson } from "@/lib/utils";
import { JobsBrowser, type JobItem } from "@/components/site/JobsBrowser";

export async function JobListSection({ data }: { data: { heading?: string } }) {
  const jobs = await prisma.jobOpening.findMany({
    where: { status: "open" },
    orderBy: { postedAt: "desc" },
    include: { department: true },
  });

  const items: JobItem[] = jobs.map((j) => ({
    id: j.id,
    title: j.title,
    slug: j.slug,
    department: j.department?.name ?? "General",
    employmentType: j.employmentType,
    experience: j.experience,
    location: j.location,
    description: j.description,
    responsibilities: parseJson<string[]>(j.responsibilities, []),
    qualifications: parseJson<string[]>(j.qualifications, []),
    skills: parseJson<string[]>(j.skills, []),
  }));

  return (
    <Section id="openings">
      <SectionHeader title={data.heading ?? "Explore Current Opportunities"} eyebrow="Open Roles" eyebrowIcon="briefcase" />
      <div className="mt-12">
        <JobsBrowser jobs={items} />
      </div>
    </Section>
  );
}
