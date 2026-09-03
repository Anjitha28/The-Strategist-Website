"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm, type FormFieldDef } from "@/components/site/LeadForm";
import { SITE_CONFIG } from "@/config/site";

function ContactContent() {
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

      {/* Hero Banner — Clean White Theme */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-white border-b border-[#dce6e7]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 glow-teal opacity-20 pointer-events-none" />

        <div className="container-page relative z-10 text-center">
          <Reveal className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 w-fit rounded-full border border-[#18b8ad]/30 bg-[#e7f6f4] px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[#159f95]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18b8ad] animate-pulse" />
              Get In Touch
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl text-[#071820] leading-[1.08] tracking-tight font-extrabold">
              Let&apos;s Build Smarter<br />
              <span className="text-[#18b8ad]">Systems Together</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#56666b] max-w-2xl">
              Whether you are a business looking for automation and analytics solutions or an educational institution seeking industry-oriented learning and technology solutions, The Strategist is ready to support your transformation journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Info & Form Split */}
      <Section id="form" className="bg-[#F1F6FA] py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#18b8ad]">Direct Channels</span>
              <h2 className="font-sans text-3xl text-[#071820] font-extrabold tracking-tight leading-tight mt-2">Office Details</h2>
              <p className="text-sm text-[#56666b] mt-2 leading-relaxed">
                Connect with our team directly via email, phone, or stop by our office.
              </p>
            </Reveal>

            <RevealGroup className="flex flex-col gap-6">
              {/* Address */}
              <RevealItem className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#dce6ee] shadow-xs">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] shrink-0 text-[#18b8ad]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071820]">Address</h3>
                  <p className="text-xs text-[#56666b] mt-1.5 leading-relaxed whitespace-pre-line">
                    {address}
                  </p>
                </div>
              </RevealItem>

              {/* Email */}
              <RevealItem className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#dce6ee] shadow-xs">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] shrink-0 text-[#18b8ad]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071820]">Email</h3>
                  <p className="text-xs text-[#56666b] mt-1.5">
                    <a href={`mailto:${email}`} className="hover:text-[#18b8ad] font-bold transition-colors">
                      {email}
                    </a>
                  </p>
                </div>
              </RevealItem>

              {/* Phone */}
              <RevealItem className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#dce6ee] shadow-xs">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e7f6f4] shrink-0 text-[#18b8ad]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#071820]">Phone Numbers</h3>
                  <div className="flex flex-col gap-1 mt-1.5 text-xs text-[#56666b]">
                    {phones.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="hover:text-[#18b8ad] font-bold transition-colors">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Form Box */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-7 sm:p-10 shadow-xs border border-[#dce6ee] relative">
            <Reveal className="mb-6">
              <h2 className="text-2xl font-bold text-[#071820] tracking-tight">Send Us a Message</h2>
              <p className="text-sm text-[#56666b] mt-1.5">
                Fill out the form and our team will get back to you within 24 business hours.
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
            <div className="mt-8 pt-6 border-t border-[#dce6ee] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#56666b] font-semibold">Prefer instant messaging?</span>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105 duration-300"
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
            <h2 className="font-sans text-3xl text-[#071820] font-extrabold tracking-tight leading-tight">
              Let&apos;s Start a Conversation
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-sm text-[#56666b] leading-relaxed">
              Tell us what you are trying to improve, automate, build, or solve. Our team will help identify the right next step.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#56666b]">Loading contact details...</div>}>
      <ContactContent />
    </Suspense>
  );
}
