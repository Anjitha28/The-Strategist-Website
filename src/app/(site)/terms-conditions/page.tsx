import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Strategist",
  description: "Read the Terms & Conditions governing the use of The Strategist website and services.",
};

export default function TermsConditionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms & Conditions", url: "/terms-conditions" }]} />

      <Section className="bg-[var(--surface)] pt-12">
        <div className="max-w-3xl mx-auto prose prose-lg text-[var(--fg)]">
          <Reveal>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-[var(--fg)] font-display mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-[var(--muted)] mb-8 font-semibold">
              Last Updated: August 17, 2026
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-6 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            <p>
              Welcome to **The Strategist**. These Terms &amp; Conditions govern your access to and use of our website, located at this domain. By accessing or browsing our pages, you agree to comply with and be bound by the terms outlined below.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              1. Acceptance of Terms
            </h2>
            <p>
              By using our website, you signify your acceptance of these terms. If you do not agree with any part of these conditions, you must discontinue browsing our site immediately.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              2. Intellectual Property
            </h2>
            <p>
              All content displayed on this website, including texts, copy, graphics, layouts, UI components, code, product names (Grade Scope, Proctrix, BeInTrack), logos, and branding elements is the intellectual property of **The Strategist** and protected by applicable copyright laws. You may not copy, download, reproduce, or modify any portions of this site without prior explicit authorization from our management.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              3. Professional Use &amp; Service Enquiries
            </h2>
            <p>
              Forms and buttons provided on this site are designed to capture genuine interest for our corporate and educational technology solutions. Any submission of false contact details, automated span, or malicious scripts via our enquiry pipelines is strictly prohibited and will result in IP filtering.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              4. Disclaimer of Warranties
            </h2>
            <p>
              This website and its informational resources are provided on an &quot;as is&quot; and &quot;as available&quot; basis. While we strive to ensure that all services, training durations, and software products details are accurate, we make no representations or warranties of any kind regarding their availability, correctness, or completeness.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              5. Modifications to Terms
            </h2>
            <p>
              We reserve the right to revise these Terms &amp; Conditions at any time. Any changes will be posted on this page with an updated modification timestamp. Your continued browsing of the site constitutes your consent to the revised terms.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              6. Contact
            </h2>
            <p>
              For legal inquiries or request permissions, please contact our administration desk at **info@thestrategist.co.in**.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
