import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { getSiteSettings } from "@/lib/cms";

const SERVICE_OPTIONS = [
  "Business Intelligence", "Artificial Intelligence", "Data Analytics", "Data Visualization",
  "Report Automation", "Digital Transformation", "Software Products", "Corporate Training",
  "Educational Solutions", "Online Learning", "Internship Programs", "Consulting Services", "Other",
];

const contactFields: FormFieldDef[] = [
  { name: "name", label: "Full Name", required: true },
  { name: "organization", label: "Organization Name" },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "country", label: "Country" },
  { name: "industry", label: "Industry" },
  { name: "subject", label: "Subject", full: true },
  { name: "service", label: "Service Interested In", type: "select", options: SERVICE_OPTIONS, full: true },
  { name: "message", label: "Message", type: "textarea", required: true, full: true },
];

const consultationFields: FormFieldDef[] = [
  { name: "name", label: "Full Name", required: true },
  { name: "organization", label: "Organization" },
  { name: "designation", label: "Designation" },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "preferredDate", label: "Preferred Date", type: "date" },
  { name: "preferredTime", label: "Preferred Time" },
  { name: "participants", label: "Number of Participants" },
  { name: "topic", label: "Consultation Topic", full: true },
  { name: "notes", label: "Additional Notes", type: "textarea", full: true },
];

export async function ContactSection({ data }: { data: { heading?: string } }) {
  const s = await getSiteSettings();
  const info = [
    { icon: "mail", label: "Business Email", value: s.businessEmail, href: `mailto:${s.businessEmail}` },
    { icon: "phone", label: "Phone Number", value: s.phone, href: `tel:${s.phone}` },
    { icon: "map-pin", label: "Office Address", value: s.address },
  ];
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Info */}
        <Reveal className="flex flex-col gap-4">
          <SectionHeader title="Get in Touch" align="left" eyebrow="Contact" eyebrowIcon="message-square" />
          <div className="mt-2 flex flex-col gap-3">
            {info.map((i) => (
              <div key={i.label} className="flex items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-300">
                  <Icon name={i.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{i.label}</p>
                  {i.href ? (
                    <a href={i.href} className="text-sm font-medium hover:text-primary-600">{i.value}</a>
                  ) : (
                    <p className="text-sm font-medium">{i.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Business Hours</p>
              <ul className="flex flex-col gap-1 text-sm">
                {s.businessHoursList.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-[var(--muted)]">{h.day}</span>
                    <span className="font-medium">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} id="contact-form">
          <Card hover={false}>
            <h3 className="mb-6 text-xl font-semibold">{data.heading ?? "Send Us a Message"}</h3>
            <LeadForm
              formType="contact"
              fields={contactFields}
              submitLabel="Send Message"
              consent="I agree to the Privacy Policy."
            />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

export function ConsultationSection({ data }: { data: { heading?: string; description?: string } }) {
  return (
    <Section id="consultation" className="bg-[var(--surface-2)]">
      <div className="mx-auto max-w-3xl">
        <SectionHeader title={data.heading ?? "Book a Business Consultation"} subtitle={data.description} eyebrow="Consultation" eyebrowIcon="calendar" />
        <Reveal delay={0.1} className="mt-10">
          <Card hover={false}>
            <LeadForm
              formType="consultation"
              fields={consultationFields}
              submitLabel="Request Consultation"
              successTitle="Consultation requested"
              successMessage="Thanks — our specialists will confirm your consultation shortly."
            />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

export function NewsletterSection({ data }: { data: { heading?: string; description?: string } }) {
  return (
    <Section id="newsletter">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface)] p-8 sm:p-12">
          <div className="aurora absolute inset-0 -z-10 opacity-40" />
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{data.heading ?? "Never Miss an Update"}</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">{data.description}</p>
            </div>
            <div className="mx-auto w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
