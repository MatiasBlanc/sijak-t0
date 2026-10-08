import Image from 'next/image';
import { Button } from '@/components/ui';
import { PageContainer, SectionHeader, TechnicalLabel } from '@/components/ui/LandingLayout';
import type { Copy } from '@/lib/copy';
import { media } from '@/lib/media';

const demo = [
  { label: 'REACTION', value: '184 ms' },
  { label: 'EXECUTION', value: '213 ms' },
  { label: 'RECOVERY', value: '247 ms' },
] as const;

/** Presenta el contexto de entrenamiento y una medición ilustrativa.
 * @param props - Textos localizados.
 * @returns Primer pantallazo de la landing.
 */
export function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="pt-28 md:pt-32" id="top">
      <PageContainer className="grid items-center gap-10 pb-20 md:pb-24 lg:grid-cols-2 lg:gap-12 lg:pb-28">
        <div>
          <TechnicalLabel>{copy.tech.redefined}</TechnicalLabel>
          <SectionHeader as="h1" className="mt-6 max-w-2xl">{copy.heroTitle}</SectionHeader>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">{copy.heroBody}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href="#waitlist">{copy.join}</Button>
            <Button href="#how-it-works" variant="text" diagonal={false}>{copy.seeHow}</Button>
          </div>
          <p className="mt-6 font-technical text-xs uppercase tracking-widest text-muted">{copy.coming}</p>
        </div>
        <div className="relative min-h-80 overflow-hidden border border-border bg-surface md:min-h-96 lg:min-h-128">
          <Image src={media.hero.desktop} alt={copy.tech.heroAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-background/40" />
          <div className="relative grid min-h-80 content-between p-6 md:min-h-96 lg:min-h-128">
            <div className="flex items-center justify-between font-technical text-xs text-foreground">
              <span>{copy.tech.athlete}</span><span className="text-signal">{copy.tech.target}</span>
            </div>
            <dl className="ml-auto grid w-48 gap-3 border border-border bg-background/80 p-4">
              {demo.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-3">
                  <dt className="font-technical text-xs text-muted">{item.label}</dt>
                  <dd className="font-technical text-sm text-signal">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
