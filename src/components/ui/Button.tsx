import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "glass" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-semibold rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_6px_20px_rgba(37,99,235,0.2)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.3)] bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 hover:shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:-translate-y-0.5",
  secondary:
    "bg-[var(--surface)] text-[var(--fg)] border border-[var(--border-color)] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-primary-400 hover:bg-[var(--surface-2)] hover:-translate-y-0.5",
  outline:
    "border-2 border-primary-500/80 text-primary-600 hover:bg-primary-500 hover:text-white hover:-translate-y-0.5 dark:text-primary-400 dark:border-primary-500 dark:hover:bg-primary-500/20",
  ghost: "text-[var(--fg)] hover:bg-[var(--surface-2)] hover:text-primary-600",
  glass: "glass text-[var(--fg)] hover:-translate-y-0.5 hover:bg-white/10",
  white: "bg-white text-blue-700 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
  ...rest
}: CommonProps &
  (
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {icon && !iconRight && <Icon name={icon} className="h-4 w-4" />}
      {children}
      {icon && iconRight && <Icon name={icon} className="h-4 w-4" />}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
