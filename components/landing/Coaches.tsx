import { Button } from '@/components/ui';
import { Section, SectionHeader, TechnicalLabel } from '@/components/ui/LandingLayout';
import type { Lang } from '@/lib/copy';

const athletes = [
  { name: 'SOFÍA', reaction: '172 ms', recovery: '231 ms', trend: '↓ 8%' },
  { name: 'MARTÍN', reaction: '198 ms', recovery: '287 ms', trend: '↓ 3%' },
  { name: 'DIEGO', reaction: '181 ms', recovery: '244 ms', trend: '↓ 12%' },
] as const;

const content = {
  es: {
    title: 'NO ENTRENES 30 ATLETAS DE MEMORIA.',
    body: 'Mide sesiones. Compara atletas. Sigue su evolución.',
    session: 'HOY · TEST DE REACCIÓN',
    labels: ['REACCIÓN', 'RECUPERACIÓN', 'TENDENCIA'],
    cta: 'SOY ENTRENADOR',
    note: 'Ejemplo de interfaz. No es un resultado validado.',
  },
  en: {
    title: "DON'T COACH 30 ATHLETES FROM MEMORY.",
    body: 'Measure sessions. Compare athletes. Follow their progress.',
    session: 'TODAY · REACTION TEST',
    labels: ['REACTION', 'RECOVERY', 'TREND'],
    cta: "I'M A COACH",
    note: 'Interface example. Not a validated result.',
  },
} as const;

/** Muestra el seguimiento de un grupo mediante datos de interfaz ilustrativos.
 * @param props - Idioma de la página.
 * @returns Mensaje para entrenadores y tabla de ejemplo.
 */
export function Coaches({ lang }: { lang: Lang }) {
  const copy = content[lang];
  return (
    <Section id="coaches">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeader className="max-w-xl">{copy.title}</SectionHeader>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">{copy.body}</p>
          <div className="mt-8"><Button href="#waitlist">{copy.cta}</Button></div>
        </div>
        <div>
          <div className="border border-border bg-surface">
            <div className="border-b border-border p-5"><TechnicalLabel>{copy.session}</TechnicalLabel></div>
            <div className="divide-y divide-border">
              {athletes.map((athlete) => (
                <article key={athlete.name} className="grid grid-cols-4 gap-2 p-4 sm:gap-3 sm:p-5">
                  <h3 className="font-heading text-base sm:text-lg">{athlete.name}</h3>
                  {[athlete.reaction, athlete.recovery, athlete.trend].map((value, index) => (
                    <p key={copy.labels[index]}>
                      <span className="block font-technical text-xs text-muted">{copy.labels[index]}</span>
                      <span className="font-technical text-xs text-foreground sm:text-sm">{value}</span>
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">{copy.note}</p>
        </div>
      </div>
    </Section>
  );
}
