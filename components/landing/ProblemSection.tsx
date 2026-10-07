import type { Lang } from '@/lib/copy';

const content = {
  es: {
    title: 'HOY, GRAN PARTE DE ESTO SE ENTRENA A OJO.',
    seen: 'LO QUE VES',
    missing: 'LO QUE FALTA',
    observations: [
      'Salió rápido.',
      'Reaccionaste tarde.',
      'La izquierda se siente más lenta.',
      'Recupera más rápido.',
    ],
    gaps: [
      '184 ms de reacción',
      '213 ms de ejecución',
      '247 ms de recuperación',
      'comparación entre repeticiones',
      'comparación entre sesiones',
    ],
    close: 'LO QUE NO SE MIDE TERMINA DEPENDIENDO DE PERCEPCIÓN.',
  },
  en: {
    title: 'TODAY, MUCH OF THIS IS STILL TRAINED BY EYE.',
    seen: 'WHAT YOU SEE',
    missing: "WHAT YOU DON'T SEE",
    observations: [
      'It looked fast.',
      'You reacted late.',
      'The left side feels slower.',
      'Recover faster.',
    ],
    gaps: [
      'reaction timing',
      'execution timing',
      'recovery timing',
      'repetition consistency',
      'session-to-session progress',
    ],
    close: "WHAT ISN'T MEASURED ENDS UP DEPENDING ON PERCEPTION.",
  },
} as const;

/** Contrasta la observación del entrenador con el tiempo que todavía no puede leer. */
export function ProblemSection({ lang }: { lang: Lang }) {
  const copy = content[lang];
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="container">
        <h2 className="max-w-3xl font-heading text-4xl leading-tight md:text-6xl">{copy.title}</h2>
        <div className="mt-12 grid border border-border md:grid-cols-2">
          <div className="border-b border-border p-6 md:border-b-0 md:border-r">
            <p className="font-technical text-xs tracking-wide text-muted">{copy.seen}</p>
            <ul className="mt-6 space-y-4 text-lg text-foreground">
              {copy.observations.map((item) => (
                <li key={item}>“{item}”</li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-6">
            <p className="font-technical text-xs tracking-wide text-signal">{copy.missing}</p>
            <ul className="mt-6 space-y-4 font-technical text-sm text-foreground">
              {copy.gaps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-2xl font-heading text-2xl leading-tight text-foreground">
          {copy.close}
        </p>
      </div>
    </section>
  );
}
