import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = true,
  glass = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        glass
          ? "glass"
          : "bg-[var(--surface)] border border-[var(--border-color)]/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
        hover && "hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-primary-400/40",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconBadge({ icon, className }: { icon: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--color-primary-500)] via-[var(--color-primary-600)] to-[var(--color-secondary-500)] text-white shadow-[0_6px_20px_rgba(37,99,235,0.2)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-108",
        className,
      )}
    >
      {icon}
    </div>
  );
}
