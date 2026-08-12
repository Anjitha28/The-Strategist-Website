import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--muted)] shadow-[var(--shadow-soft)] transition-colors focus:border-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 dark:focus-visible:ring-primary-900";

export function Field({
  label,
  htmlFor,
  required,
  error,
  children,
  className,
}: {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--fg)]">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-error-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(control, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(control, "min-h-32 resize-y", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(control, "appearance-none pr-10", props.className)} />;
}
