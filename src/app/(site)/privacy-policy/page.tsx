import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | The Strategist",
  description: "Learn how The Strategist handles and protects user information and customer data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy-policy" }]} />

      <Section className="bg-[var(--surface)] pt-12">
        <div className="max-w-3xl mx-auto prose prose-lg text-[var(--fg)]">
          <Reveal>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-[var(--fg)] font-display mb-6">
              Privacy Policy
            </h1>
            <p className="text-xs text-[var(--muted)] mb-8 font-semibold">
              Last Updated: August 17, 2026
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-6 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            <p>
              At **The Strategist** (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), protecting your privacy and security is of paramount importance. This Privacy Policy explains how we collect, use, and safeguard personal information when you visit our website or enquire about our analytics, automation, and training solutions.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when submitting enquiries or requesting demonstrations, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>**Identity Details**: Full name and professional organization name.</li>
              <li>**Contact Information**: Business email address and active telephone numbers.</li>
              <li>**Enquiry Context**: The specific services, training programs, or products you select and any details provided in message fields.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              2. How We Use Your Information
            </h2>
            <p>
              The information we collect is processed solely to fulfill your requests, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responding to enquiries submitted via contact forms.</li>
              <li>Scheduling and delivering product demonstrations for platforms like Grade Scope, Proctrix, or BeInTrack.</li>
              <li>Sending details about corporate analytics programs and academic partnerships.</li>
              <li>Maintaining operations security and analyzing website performance statically.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              3. Data Retention &amp; Sharing
            </h2>
            <p>
              We do not sell, rent, or lease your contact information or personal data to third parties. Information is stored securely and is accessible only to authorized staff members coordinates training or corporate solutions setups. We retain information only as long as necessary to address your professional inquiries or institutional partnership requirements.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              4. Cookies and Analytical Tracking
            </h2>
            <p>
              Our website uses basic cookies to support UI display preferences (such as theme selection settings). For details regarding how we monitor site traffic, please consult our accompanying Cookie Policy page.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our practices regarding your information, please email our security desk at **info@kvjanalytics.in**.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
