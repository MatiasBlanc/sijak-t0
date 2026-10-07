import { Button } from '@/components/ui';
import type { Lang } from '@/lib/copy';

const athletes = [
  { name: 'SOFÍA', reaction: '172 ms', recovery: '231 ms', trend: '↓ 8%' },
  { name: 'MARTÍN', reaction: '198 ms', recovery: '287 ms', trend: '↓ 3%' },
  { name: 'DIEGO', reaction: '181 ms', recovery: '244 ms', trend: '↓ 12%' },
] as const;

const content = {
  es: {
    title: 'NO ENTRENES 30 ATLETAS DE MEMORIA.',
    body: 'Mide una sesión. Compara atletas. Sigue su evolución.',
    session: 'HOY · TEST DE REACCIÓN',
    labels: ['REACCIÓN', 'RECUPERACIÓN', 'TENDENCIA'],
    points: ['COMPARA LADOS.', 'SIGUE SESIONES.', 'MIDE CONSISTENCIA.'],
    cta: 'SOY ENTRENADOR',
    note: 'Ejemplo de interfaz. No es un resultado validado.',
  },
  en: {
    title: "DON'T COACH 30 ATHLETES FROM MEMORY.",
    body: 'Measure a session. Compare athletes. Follow their progress.',
    session: 'TODAY · REACTION TEST',
    labels: ['REACTION', 'RECOVERY', 'TREND'],
    points: ['COMPARE SIDES.', 'TRACK SESSIONS.', 'MEASURE CONSISTENCY.'],
    cta: "I'M A COACH",
    note: 'Interface example. Not a validated result.',
  },
} as const;

/** Presenta SIJAK como herramienta de seguimiento para un grupo, sin recomendaciones automáticas. */
export function Coaches({ lang }: { lang: Lang }) {
  const copy = content[lang];
  return (
    <section id="coaches" className="border-t border-border py-20 md:py-28">
      <div className="container grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="max-w-lg font-heading text-4xl leading-tight md:text-6xl">{copy.title}</h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{copy.body}</p>
          <ul className="mt-8 space-y-3 font-technical text-sm text-signal">
            {copy.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="#waitlist">{copy.cta}</Button>
          </div>
        </div>
        <div className="border border-border bg-surface">
          <p className="border-b border-border p-5 font-technical text-xs text-muted">
            {copy.session}
          </p>
          <div className="divide-y divide-border">
            {athletes.map((athlete) => (
              <article key={athlete.name} className="grid grid-cols-4 gap-3 p-5">
                <h3 className="font-heading text-lg">{athlete.name}</h3>
                {[athlete.reaction, athlete.recovery, athlete.trend].map((value, index) => (
                  <p key={copy.labels[index]}>
                    <span className="block font-technical text-xs text-muted">
                      {copy.labels[index]}
                    </span>
                    <span className="font-technical text-sm text-foreground">{value}</span>
                  </p>
                ))}
              </article>
            ))}
          </div>
          <p className="border-t border-border p-5 font-technical text-xs text-muted">
            {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}
