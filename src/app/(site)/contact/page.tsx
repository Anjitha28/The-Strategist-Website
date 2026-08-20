"use client";

import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";
import { SITE_CONFIG } from "@/config/site";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") ?? "";
  const defaultProduct = searchParams.get("product") ?? "";

  const address = SITE_CONFIG.brand.address;
  const email = SITE_CONFIG.brand.email;
  const phones = SITE_CONFIG.brand.phones;
  const whatsapp = SITE_CONFIG.brand.whatsapp;

  const contactFields: FormFieldDef[] = [
    { name: "name", label: "Your Name", required: true },
    { name: "organization", label: "Organization Name", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
    {
      name: "service",
      label: "Service Interested In",
      type: "select",
      required: true,
      options: [
        "Corporate Solutions",
        "Educational Solutions",
        "Products",
        "Training Programs",
        "Other"
      ],
      defaultValue: defaultService
    },
    { 
      name: "message", 
      label: "How Can We Help You?", 
      type: "textarea", 
      full: true, 
      required: true,
      defaultValue: defaultProduct ? `Interested in product demo for: ${defaultProduct}` : ""
    }
  ];

  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

      {/* Hero Banner — Exact Selected Brand Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-[#071820]">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-25 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#18b8ad]/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#18b8ad]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Get In Touch
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white leading-[1.05] tracking-tight font-medium">
              Let&apos;s Build Smarter<br />
              <span className="italic text-[#18b8ad]">Systems Together</span>
            </h1>
            <p className="text-base leading-relaxed text-[#a1b4b9] max-w-xl">
              Whether you are a business looking for automation and analytics solutions or an educational institution seeking industry-oriented learning and technology solutions, The Strategist is ready to support your transformation journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Info & Form Split on warm paper background */}
      <Section id="form" className="bg-[#f7f9f8] py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal>
              <h2 className="font-serif text-3xl text-[#071820] font-medium leading-tight">Office Details</h2>
              <p className="text-xs text-[#68787d] mt-1.5 leading-relaxed">
                Connect with our team directly via email, phone, or stop by our office.
              </p>
            </Reveal>

            <RevealGroup className="flex flex-col gap-6">
              {/* Address */}
              <RevealItem className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] shrink-0 text-[#18b8ad]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071820]">Address</h3>
                  <p className="text-xs text-[#68787d] mt-1.5 leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </RevealItem>

              {/* Email */}
              <RevealItem className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] shrink-0 text-[#18b8ad]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071820]">Email</h3>
                  <p className="text-xs text-[#68787d] mt-1.5">
                    <a href={`mailto:${email}`} className="hover:text-[#18b8ad] font-semibold transition-colors">
                      {email}
                    </a>
                  </p>
                </div>
              </RevealItem>

              {/* Phone */}
              <RevealItem className="flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] shrink-0 text-[#18b8ad]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071820]">Phone Numbers</h3>
                  <div className="flex flex-col gap-1 mt-1.5 text-xs text-[#68787d]">
                    {phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="hover:text-[#18b8ad] font-semibold transition-colors">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-10 shadow-sm relative" style={{ border: "1px solid #dce6e7" }}>
            <Reveal className="mb-6">
              <h2 className="text-xl font-bold text-[#071820]">Send Us a Message</h2>
              <p className="text-xs text-[#68787d] mt-1">
                Fill out the form and our team will get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <LeadForm
                formType="contact"
                fields={contactFields}
                submitLabel="Request a Demo"
                successTitle="Message Sent"
                successMessage="Your details have been successfully received. A coordinator from The Strategist will reach out to you shortly."
              />
            </Reveal>

            {/* WhatsApp CTA */}
            <div className="mt-8 pt-6 border-t border-[#dce6e7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#68787d] font-semibold">Prefer instant messaging?</span>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-103 duration-300"
              >
                <MessageCircle className="h-4.5 w-4.5 fill-current" /> Chat with us on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </Section>

      {/* Contact Final Message */}
      <Section className="bg-white py-20 text-center border-t border-[#dce6e7]">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <Reveal>
            <h2 className="font-serif text-3xl text-[#071820] font-medium leading-tight">
              Let&apos;s Start a Conversation
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xs text-[#68787d] leading-relaxed">
              Tell us what you are trying to improve, automate, build, or solve. Our team will help identify the right next step.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
