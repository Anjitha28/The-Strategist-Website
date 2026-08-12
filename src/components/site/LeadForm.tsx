"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export type FormFieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "date";
  required?: boolean;
  options?: string[];
  full?: boolean;
  placeholder?: string;
  defaultValue?: string;
};

export function LeadForm({
  formType,
  fields,
  submitLabel,
  successTitle = "Thank you!",
  successMessage = "Your message has been received. Our team will be in touch shortly.",
  consent,
}: {
  formType: "contact" | "consultation" | "career" | "product-demo";
  fields: FormFieldDef[];
  submitLabel: string;
  successTitle?: string;
  successMessage?: string;
  consent?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    fd.forEach((v, k) => (values[k] = String(v)));

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          name: values.name || values.fullName,
          email: values.email,
          phone: values.phone,
          subject: values.subject || values.position || values.topic,
          company_website: values.company_website,
          fields: values,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-success-500/30 bg-success-500/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-success-500" />
        <h3 className="text-xl font-semibold">{successTitle}</h3>
        <p className="max-w-md text-sm text-[var(--muted)]">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {fields.map((f) => (
        <Field key={f.name} label={f.label} htmlFor={f.name} required={f.required} className={f.full ? "sm:col-span-2" : undefined}>
          {f.type === "textarea" ? (
            <Textarea id={f.name} name={f.name} required={f.required} placeholder={f.placeholder} defaultValue={f.defaultValue} />
          ) : f.type === "select" ? (
            <Select id={f.name} name={f.name} required={f.required} defaultValue={f.defaultValue ?? ""}>
              <option value="" disabled>
                Select…
              </option>
              {(f.options ?? []).map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </Select>
          ) : (
            <Input id={f.name} name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.placeholder} defaultValue={f.defaultValue} />
          )}
        </Field>
      ))}

      <div className="sm:col-span-2">
        {consent && (
          <label className="mb-4 flex items-start gap-2 text-sm text-[var(--muted)]">
            <input type="checkbox" required name="consent" className="mt-1 h-4 w-4 accent-[var(--color-primary-600)]" />
            {consent}
          </label>
        )}
        {state === "error" && <p className="mb-3 text-sm text-error-500">{error}</p>}
        <Button type="submit" size="lg" disabled={state === "loading"} className="w-full sm:w-auto">
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
