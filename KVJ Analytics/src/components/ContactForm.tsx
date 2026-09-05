"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";

interface ContactFormProps {
  inquiryAreas: string[];
}

function ContactFormInner({ inquiryAreas }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Pre-select interest from URL parameter
  useEffect(() => {
    const interest = searchParams.get("interest") || searchParams.get("subject");
    if (interest) {
      // Find matching area (case-insensitive or containing string)
      const matchedArea = inquiryAreas.find(
        (area) =>
          area.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(area.toLowerCase())
      );
      if (matchedArea) {
        setFormData((prev) => ({ ...prev, subject: matchedArea }));
      } else {
        // Fallback to custom match if not in list
        setFormData((prev) => ({ ...prev, subject: interest }));
      }
    }
  }, [searchParams, inquiryAreas]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Field validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.organization.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address (e.g. yourname@company.com).");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim(),
          subject: formData.subject.trim(),
          serviceInterest: formData.subject.trim(),
          message: formData.message.trim(),
          sourcePage: window.location.pathname,
          utmSource: localStorage.getItem("utm_source") || "",
          utmMedium: localStorage.getItem("utm_medium") || "",
          utmCampaign: localStorage.getItem("utm_campaign") || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#0D9488]/5 border border-[#0D9488]/30 rounded-[24px] p-8 text-center flex flex-col items-center w-full shadow-sm animate-fade-up">
        <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-6 animate-pulse" />
        <h3 className="text-2xl font-bold font-display text-ink mb-3">
          Message Sent Successfully!
        </h3>
        <p className="text-base text-slate font-light leading-relaxed mb-6">
          Thank you for contacting The Strategist. Our consulting team will review your message and reach back to you within 24 hours.
        </p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  const inputClasses = "peer w-full px-0 pt-6 pb-2 rounded-none border-0 border-b border-line bg-transparent focus:border-b-[#10B981] text-ink text-sm transition-all outline-none";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8 relative">
      {/* Styles for breathing button and focus tracers */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blue-breath {
          0%, 100% {
            box-shadow: 0 0 12px rgba(13, 148, 136, 0.45), 0 0 5px rgba(16, 185, 129, 0.25);
            border-color: rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 28px rgba(13, 148, 136, 0.85), 0 0 15px rgba(16, 185, 129, 0.5);
            border-color: #10B981;
          }
        }
        .btn-breathing-neon-blue {
          animation: blue-breath 3s ease-in-out infinite !important;
        }
      `}} />

      {error && (
        <div className="bg-error/5 border border-error/20 p-4 rounded-lg flex items-start space-x-3 text-error animate-fade-up">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Name input */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField("")}
            className={inputClasses}
          />
          <label
            htmlFor="name"
            className={`absolute left-0 top-4 text-xs font-bold uppercase tracking-wider transition-all pointer-events-none origin-left ${
              focusedField === "name" || formData.name
                ? "transform -translate-y-2.5 scale-75 text-[#10B981]"
                : "transform translate-y-0 scale-100 text-slate-500"
            }`}
          >
            Name *
          </label>
        </div>

        {/* Email input */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
            className={inputClasses}
          />
          <label
            htmlFor="email"
            className={`absolute left-0 top-4 text-xs font-bold uppercase tracking-wider transition-all pointer-events-none origin-left ${
              focusedField === "email" || formData.email
                ? "transform -translate-y-2.5 scale-75 text-[#10B981]"
                : "transform translate-y-0 scale-100 text-slate-500"
            }`}
          >
            Email *
          </label>
        </div>
      </div>

      {/* Row 2: Phone and Company / Organization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Phone input */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            onFocus={() => setFocusedField("phone")}
            onBlur={() => setFocusedField("")}
            className={inputClasses}
          />
          <label
            htmlFor="phone"
            className={`absolute left-0 top-4 text-xs font-bold uppercase tracking-wider transition-all pointer-events-none origin-left ${
              focusedField === "phone" || formData.phone
                ? "transform -translate-y-2.5 scale-75 text-[#10B981]"
                : "transform translate-y-0 scale-100 text-slate-500"
            }`}
          >
            Phone *
          </label>
        </div>

        {/* Organization input */}
        <div className="relative">
          <input
            type="text"
            id="organization"
            name="organization"
            required
            value={formData.organization}
            onChange={handleChange}
            onFocus={() => setFocusedField("organization")}
            onBlur={() => setFocusedField("")}
            className={inputClasses}
          />
          <label
            htmlFor="organization"
            className={`absolute left-0 top-4 text-xs font-bold uppercase tracking-wider transition-all pointer-events-none origin-left ${
              focusedField === "organization" || formData.organization
                ? "transform -translate-y-2.5 scale-75 text-[#10B981]"
                : "transform translate-y-0 scale-100 text-slate-500"
            }`}
          >
            Company / Organization *
          </label>
        </div>
      </div>

      {/* Row 3: Subject */}
      <div className="relative">
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => setFocusedField("subject")}
          onBlur={() => setFocusedField("")}
          className="peer w-full px-0 pt-6 pb-2 rounded-none border-0 border-b border-line bg-transparent focus:border-b-[#10B981] text-ink text-sm transition-all outline-none appearance-none cursor-pointer"
        >
          <option value="" className="bg-white text-slate-500">-- Select Subject / Area of Interest --</option>
          {inquiryAreas.map((area, idx) => (
            <option key={idx} value={area} className="bg-white text-ink">
              {area}
            </option>
          ))}
          {formData.subject && !inquiryAreas.includes(formData.subject) && (
            <option value={formData.subject} className="bg-white text-ink">{formData.subject}</option>
          )}
        </select>
        <label
          htmlFor="subject"
          className={`absolute left-0 top-1.5 text-xs font-bold uppercase tracking-wider transition-all pointer-events-none origin-left transform -translate-y-2.5 scale-75 ${
            focusedField === "subject"
              ? "text-[#10B981]"
              : "text-slate-500"
          }`}
        >
          Subject *
        </label>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none border-l border-line pl-3">
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Row 4: Message textarea */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField("")}
          className="peer w-full px-0 pt-6 pb-2 rounded-none border-0 border-b border-line bg-transparent focus:border-b-[#10B981] text-ink text-sm transition-all outline-none resize-none"
        />
        <label
          htmlFor="message"
          className={`absolute left-0 top-4 text-xs font-bold uppercase tracking-wider transition-all pointer-events-none origin-left ${
            focusedField === "message" || formData.message
              ? "transform -translate-y-2.5 scale-75 text-[#10B981]"
              : "transform translate-y-0 scale-100 text-slate-500"
            }`}
        >
          Message *
        </label>
      </div>

      <div className="flex justify-end pt-4">
        {/* Send Message submit button with breathing neon-blue glow */}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-4 flex items-center justify-center space-x-2 btn-breathing-neon-blue"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 animate-[bounce_1.5s_infinite]" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function ContactForm({ inquiryAreas }: ContactFormProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#10B981]" />
      </div>
    }>
      <ContactFormInner inquiryAreas={inquiryAreas} />
    </Suspense>
  );
}

