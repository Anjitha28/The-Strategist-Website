import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "glass" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-semibold rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[#071820] hover:bg-[#18B8AD] shadow-sm hover:-translate-y-0.5 transition-all duration-300",
  secondary:
    "bg-[var(--surface)] text-[#071820] border border-[#DCE6E7] shadow-sm hover:border-[#18B8AD] hover:bg-[#F7F9F8] hover:-translate-y-0.5 transition-all duration-300",
  outline:
    "border border-[#18B8AD] text-[#18B8AD] hover:bg-[#18B8AD] hover:text-white hover:-translate-y-0.5 transition-all duration-300",
  ghost: "text-[var(--fg)] hover:bg-[var(--surface-2)] hover:text-[#18B8AD]",
  glass: "glass text-[var(--fg)] hover:-translate-y-0.5 hover:bg-white/10",
  white: "bg-white text-[#071820] border border-[#DCE6E7] shadow-sm hover:-translate-y-0.5 hover:bg-[#F7F9F8] transition-all duration-300",
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
