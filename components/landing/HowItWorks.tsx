import type { Copy } from '@/lib/copy';

const events = [
  { time: '0 ms', derived: null },
  { time: '184 ms', derived: '184 ms' },
  { time: '397 ms', derived: '213 ms' },
  { time: '644 ms', derived: '247 ms' },
] as const;

/** Descompone una acción en momentos medibles, sin presentarlos como resultados validados. */
export function HowItWorks({ copy }: { copy: Copy }) {
  const labels = copy.timeline.filter((_, index) => [0, 2, 4, 5].includes(index));
  const derived = copy.metrics.slice(0, 3);
  return (
    <section id="how-it-works" className="border-t border-border py-20 md:py-28">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-heading text-4xl leading-tight md:text-6xl">{copy.workTitle}</h2>
          <p className="max-w-md text-base leading-relaxed text-muted">{copy.workBody}</p>
        </div>
        <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-4">
          {labels.map((label, index) => (
            <li key={label} className="bg-surface p-6">
              <p className="font-technical text-xs text-signal">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 font-heading text-2xl">{label}</h3>
              <p className="mt-3 font-technical text-lg text-foreground">{events[index].time}</p>
            </li>
          ))}
        </ol>
        <dl className="mt-6 grid gap-px border border-border bg-border md:grid-cols-3">
          {derived.map((label, index) => (
            <div key={label} className="bg-background p-6">
              <dt className="font-technical text-xs text-muted">{label}</dt>
              <dd className="mt-3 font-technical text-3xl text-signal">
                {events[index + 1].derived}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-technical text-xs text-muted">* {copy.example}</p>
      </div>
    </section>
  );
}
