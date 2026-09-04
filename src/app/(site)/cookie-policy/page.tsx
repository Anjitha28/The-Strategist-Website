import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy | The Strategist",
  description: "Learn how The Strategist uses cookies to enhance user experience.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Cookie Policy", url: "/cookie-policy" }]} />

      <Section className="bg-[var(--surface)] pt-12">
        <div className="max-w-3xl mx-auto prose prose-lg text-[var(--fg)]">
          <Reveal>
            <h1 className="text-3xl font-extrabold sm:text-4xl text-[var(--fg)] font-display mb-6">
              Cookie Policy
            </h1>
            <p className="text-xs text-[var(--muted)] mb-8 font-semibold">
              Last Updated: August 17, 2026
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-6 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
            <p>
              At **The Strategist**, we believe in being clear and open about how we collect and process data. This Cookie Policy details how and why we use cookies on our website.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your computer or mobile device when you load web pages. They are widely used to make websites work, or work more efficiently, as well as to remember user-specific parameters like color preferences.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              2. How We Use Cookies
            </h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>**Essential Cookies**: Required for page navigation and core operations.</li>
              <li>**Preference Cookies**: Used to save your selected theme settings (e.g. data theme set dynamically by localStorage script).</li>
              <li>**Analytics Cookies**: Used for static traffic count analysis, helping us understand how visitors interact with solutions and products pages.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              3. Managing Cookie Settings
            </h2>
            <p>
              Most web browsers allow you to control cookies through their configuration settings. You can choose to block all cookies or receive alerts before a cookie is stored. Please note that disabling cookies may affect the usability of preference parameters on our site.
            </p>

            <h2 className="text-lg sm:text-xl font-bold text-[var(--fg)] font-display mt-6 mb-1">
              4. Contact Us
            </h2>
            <p>
              For any questions regarding our cookie practices, please contact us at **info@thestrategist.co.in**.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
