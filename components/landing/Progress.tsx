import { Metric, Section, SectionHeader, TechnicalLabel } from '@/components/ui/LandingLayout';
import type { Lang } from '@/lib/copy';

const content = {
  es: {
    title: 'DE “SE VIO MÁS RÁPIDO” A “MEJORÓ 12%”.',
    example: 'EJEMPLO DE INTERFAZ',
    first: 'SEMANA 1',
    last: 'SEMANA 4',
    labels: ['REACCIÓN', 'EJECUCIÓN', 'RECUPERACIÓN'],
  },
  en: {
    title: 'FROM “LOOKED FASTER” TO “IMPROVED 12%”.',
    example: 'INTERFACE EXAMPLE',
    first: 'WEEK 1',
    last: 'WEEK 4',
    labels: ['REACTION', 'EXECUTION', 'RECOVERY'],
  },
} as const;

const values = [
  ['201 ms', '178 ms'],
  ['238 ms', '211 ms'],
  ['302 ms', '249 ms'],
] as const;

/** Compara dos sesiones ilustrativas sin presentar sus cifras como resultados reales.
 * @param props - Idioma de la página.
 * @returns Ejemplo compacto de progreso entre semanas.
 */
export function Progress({ lang }: { lang: Lang }) {
  const copy = content[lang];
  return (
    <Section id="progress">
      <TechnicalLabel>{copy.example}</TechnicalLabel>
      <SectionHeader className="mt-5 max-w-4xl">{copy.title}</SectionHeader>
      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-3">
        {values.map(([first, last], index) => (
          <dl key={copy.labels[index]} className="bg-surface p-6">
            <TechnicalLabel>{copy.labels[index]}</TechnicalLabel>
            <div className="mt-5 flex items-end gap-4">
              <div className="min-w-0">
                <dt className="font-technical text-xs text-muted">{copy.first}</dt>
                <dd className="mt-2 font-technical text-base text-muted">{first}</dd>
              </div>
              <span className="pb-1 text-muted" aria-hidden="true">→</span>
              <Metric label={copy.last} value={last} />
            </div>
          </dl>
        ))}
      </div>
    </Section>
  );
}
