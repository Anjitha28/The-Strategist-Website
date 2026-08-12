import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  id,
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padded?: boolean;
}) {
  return (
    <section id={id} className={cn(padded && "py-20 sm:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  eyebrowIcon?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto flex flex-col gap-4",
        align === "center" ? "items-center text-center max-w-3xl" : "items-start text-left max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Badge icon={eyebrowIcon}>{eyebrow}</Badge>}
      <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {renderTitle(title)}
      </h2>
      {subtitle && <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

/** Emphasize the last two words of the headline with a gradient. */
function renderTitle(title: string) {
  const words = title.split(" ");
  if (words.length < 3) return <span className="text-gradient font-extrabold">{title}</span>;
  const head = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  return (
    <>
      {head} <span className="text-gradient font-extrabold">{tail}</span>
    </>
  );
}
