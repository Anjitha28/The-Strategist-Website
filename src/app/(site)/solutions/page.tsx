import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const metadata: Metadata = {
  title: "Solutions | The Strategist",
  description:
    "Explore The Strategist's corporate and educational solutions across Business Intelligence, Artificial Intelligence, Data Analytics, Report Automation, and Digital Transformation.",
};

const hubs = [
  {
    title: "Corporate Solutions",
    href: "/solutions/corporate",
    icon: "building",
    description: "Modernize operations, implement Business Intelligence, automate reporting, and build scalable digital ecosystems.",
    points: ["Business Intelligence", "Data Analytics", "Artificial Intelligence", "Report Automation", "Digital Transformation", "Technology Consulting"],
  },
  {
    title: "Educational Solutions",
    href: "/solutions/educational",
    icon: "graduation-cap",
    description: "Industry-focused learning programs for colleges, universities, organizations, and professionals.",
    points: ["Individual Learning", "Corporate Learning", "College Training", "Online Learning", "Internship Programs", "Certifications"],
  },
];

export default function SolutionsHub() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Solutions", url: "/solutions" }]} />
      <section className="relative overflow-hidden">
        <div className="aurora absolute inset-0 -z-10 opacity-80" />
        <div className="container-page py-16 text-center sm:py-20">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5">
            <Badge>Solutions • Strategy • Technology</Badge>
            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Solutions Built Around <span className="text-gradient">Your Objectives</span>
            </h1>
            <p className="text-lg text-[var(--muted)]">
              Whether you&apos;re transforming an enterprise or empowering an institution, we design intelligent solutions that deliver measurable outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      <Section padded={false} className="pb-20">
        <RevealGroup className="grid gap-6 lg:grid-cols-2">
          {hubs.map((h) => (
            <RevealItem key={h.href}>
              <Link href={h.href} className="group block h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] transition-all hover-lift">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-primary-600),var(--color-secondary-600))] text-white shadow-[var(--shadow-glow)]">
                    <Icon name={h.icon} className="h-7 w-7" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold">{h.title}</h2>
                  <p className="mt-2 text-[var(--muted)]">{h.description}</p>
                  <ul className="mt-5 grid flex-1 grid-cols-2 gap-2">
                    {h.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <Icon name="check-circle" className="h-4 w-4 text-primary-500" /> {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 font-medium text-primary-600 transition-all group-hover:gap-2">
                    Explore <Icon name="arrow-right" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section padded={false} className="pb-24">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-[var(--surface-2)] p-10 text-center">
            <SectionHeader title="Not sure where to start?" subtitle="Book a consultation and we'll help you identify the highest-impact opportunities for your organization." />
            <Button href="/contact" size="lg" icon="arrow-right" iconRight>
              Schedule a Consultation
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
