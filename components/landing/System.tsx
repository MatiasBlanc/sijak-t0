import { DeviceImage } from '@/components/ui';
import { CTA, Section, SectionHeader } from '@/components/ui/LandingLayout';
import type { Copy } from '@/lib/copy';
import { product } from '@/lib/product';

/** Presenta las tres configuraciones con una sola llamada a la lista.
 * @param props - Textos localizados.
 * @returns Opciones de sensores y CTA compartida.
 */
export function System({ copy }: { copy: Copy }) {
  const tiers = [
    { name: `${product.name} SOLO`, count: 1, desc: copy.solo, featured: false },
    { name: `${product.name} DUO`, count: 2, desc: copy.duo, featured: true },
    { name: `${product.name} TEAM 4`, count: 4, desc: copy.team, featured: false },
  ];
  return (
    <Section id="t0">
      <SectionHeader className="max-w-4xl">{copy.systemTitle}</SectionHeader>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.name} className={`border bg-surface p-6 lg:p-8 ${tier.featured ? 'border-signal' : 'border-border'}`}>
            <div className="flex h-24 items-center justify-center" aria-hidden="true">
              {Array.from({ length: Math.min(tier.count, 2) }, (_, index) => (
                <DeviceImage key={index} className="h-20 w-20 object-contain" />
              ))}
            </div>
            <h3 className="mt-5 font-heading text-2xl md:text-3xl">{tier.name}</h3>
            <p className="mt-2 font-technical text-xs text-signal">{tier.count} {tier.count === 1 ? copy.sensor : copy.sensors}</p>
            <p className="mt-4 text-base text-muted md:text-lg">{tier.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-8"><CTA>{copy.join}</CTA></div>
    </Section>
  );
}
