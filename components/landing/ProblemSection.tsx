import { Section, SectionHeader, TechnicalLabel } from '@/components/ui/LandingLayout';
import type { Lang } from '@/lib/copy';

const content = {
  es: {
    title: 'HOY, GRAN PARTE DE ESTO SE ENTRENA A OJO.',
    seen: 'LO QUE VES',
    missing: 'LO QUE FALTA',
    observations: ['Salió rápido.', 'Reaccionaste tarde.', 'La izquierda se siente más lenta.'],
    gaps: ['184 ms de reacción', '213 ms de ejecución', '247 ms de recuperación'],
    close: 'LO QUE NO SE MIDE TERMINA DEPENDIENDO DE PERCEPCIÓN.',
  },
  en: {
    title: 'TODAY, MUCH OF THIS IS STILL TRAINED BY EYE.',
    seen: 'WHAT YOU SEE',
    missing: "WHAT'S MISSING",
    observations: ['It looked fast.', 'You reacted late.', 'The left side feels slower.'],
    gaps: ['184 ms reaction', '213 ms execution', '247 ms recovery'],
    close: "WHAT ISN'T MEASURED ENDS UP DEPENDING ON PERCEPTION.",
  },
} as const;

/** Contrasta observaciones con tiempos ilustrativos.
 * @param props - Idioma de la página.
 * @returns Sección del problema con dos columnas.
 */
export function ProblemSection({ lang }: { lang: Lang }) {
  const copy = content[lang];
  return (
    <Section>
      <SectionHeader className="max-w-4xl">{copy.title}</SectionHeader>
      <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
        <div>
          <TechnicalLabel>{copy.seen}</TechnicalLabel>
          <ul className="mt-5 space-y-3 text-base text-muted md:text-lg">
            {copy.observations.map((item) => <li key={item}>“{item}”</li>)}
          </ul>
        </div>
        <div>
          <TechnicalLabel>{copy.missing}</TechnicalLabel>
          <ul className="mt-5 space-y-3 font-technical text-base text-foreground md:text-lg">
            {copy.gaps.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      <p className="mt-12 max-w-2xl font-heading text-2xl leading-tight text-foreground md:text-3xl">
        {copy.close}
      </p>
    </Section>
  );
}
