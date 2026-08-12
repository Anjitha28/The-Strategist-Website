import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "./HeroVisual";

type HeroData = {
  badge?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: { value: string; label: string }[];
};

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora absolute inset-0 -z-10" />
      <div className="mesh-grid absolute inset-0 -z-10 opacity-60" />

      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="flex flex-col items-start gap-6">
          {data.badge && (
            <Reveal>
              <Badge>{data.badge}</Badge>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {renderTitle(data.title ?? "")}
            </h1>
          </Reveal>
          {data.description && (
            <Reveal delay={0.12}>
              <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{data.description}</p>
            </Reveal>
          )}
          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-3">
              {data.primaryLabel && (
                <Button href={data.primaryHref ?? "/contact"} size="lg" icon="arrow-right" iconRight>
                  {data.primaryLabel}
                </Button>
              )}
              {data.secondaryLabel && (
                <Button href={data.secondaryHref ?? "/contact"} size="lg" variant="secondary">
                  {data.secondaryLabel}
                </Button>
              )}
            </div>
          </Reveal>

          {data.stats && data.stats.length > 0 && (
            <Reveal delay={0.24}>
              <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
                {data.stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="text-gradient text-3xl font-extrabold sm:text-4xl">{s.value}</dt>
                    <dd className="text-sm text-[var(--muted)]">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

/** Emphasize the last two words of the headline with a gradient. */
function renderTitle(title: string) {
  const words = title.split(" ");
  if (words.length < 3) return <span className="text-gradient">{title}</span>;
  const head = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  return (
    <>
      {head} <span className="text-gradient">{tail}</span>
    </>
  );
}

export function LegalHero({ data }: { data: { title?: string; updated?: string } }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-color)]">
      <div className="aurora absolute inset-0 -z-10 opacity-70" />
      <div className="container-page py-16 sm:py-20">
        <Reveal className="flex flex-col gap-3">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{data.title}</h1>
          {data.updated && <p className="text-sm text-[var(--muted)]">{data.updated}</p>}
        </Reveal>
      </div>
    </section>
  );
}
