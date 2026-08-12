import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function Badge({
  children,
  icon = "sparkles",
  className,
}: {
  children: React.ReactNode;
  icon?: string | null;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--fg)]",
        className,
      )}
    >
      {icon && <Icon name={icon} className="h-3.5 w-3.5 text-primary-600" />}
      <span className="uppercase">{children}</span>
    </span>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-950/50 dark:text-primary-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
