import { Metric, Section, SectionHeader, TechnicalLabel } from '@/components/ui/LandingLayout';
import type { Copy } from '@/lib/copy';

const events = [
  { time: '0 ms', derived: '' },
  { time: '184 ms', derived: '184 ms' },
  { time: '397 ms', derived: '213 ms' },
  { time: '644 ms', derived: '247 ms' },
] as const;

/** Muestra la línea de tiempo ilustrativa entre atleta y objetivo.
 * @param props - Textos localizados.
 * @returns Fases y métricas de una sola acción.
 */
export function HowItWorks({ copy }: { copy: Copy }) {
  const labels = copy.timeline.filter((_, index) => [0, 2, 4, 5].includes(index));
  return (
    <Section id="how-it-works">
      <SectionHeader>{copy.workTitle}</SectionHeader>
      <ol className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {labels.map((label, index) => (
          <li key={label} className="bg-surface p-6">
            <TechnicalLabel className="text-signal">{String(index + 1).padStart(2, '0')}</TechnicalLabel>
            <h3 className="mt-6 font-heading text-2xl leading-none md:text-3xl">{label}</h3>
            <p className="mt-3 font-technical text-base text-muted md:text-lg">{events[index].time}</p>
          </li>
        ))}
      </ol>
      <dl className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
        {copy.metrics.slice(0, 3).map((label, index) => (
          <Metric key={label} label={label} value={events[index + 1].derived} />
        ))}
      </dl>
      <p className="mt-6 text-xs text-muted">{copy.example}</p>
    </Section>
  );
}
