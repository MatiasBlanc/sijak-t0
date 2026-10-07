import { Button, DeviceImage } from '@/components/ui';
import type { Copy } from '@/lib/copy';
import { product } from '@/lib/product';

/** Opciones de cantidad. Un sensor sigue siendo útil; dos completan la acción. */
export function System({ copy }: { copy: Copy }) {
  const tiers = [
    { name: `${product.name} SOLO`, count: 1, desc: copy.solo, featured: false },
    {
      name: `${product.name} DUO`,
      count: 2,
      desc: `${copy.duo}. ${copy.duoExtra}`,
      featured: true,
    },
    { name: `${product.name} TEAM 4`, count: 4, desc: copy.team, featured: false },
  ];
  return (
    <section id="t0" className="border-t border-border py-20 md:py-28">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="font-heading text-4xl leading-tight md:text-6xl">{copy.systemTitle}</h2>
          <p className="max-w-md text-base leading-relaxed text-muted">{copy.systemBody}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={
                tier.featured
                  ? 'border border-signal bg-surface p-6'
                  : 'border border-border bg-surface p-6'
              }
            >
              <div className="flex h-28 items-center justify-center" aria-hidden="true">
                {Array.from({ length: Math.min(tier.count, 2) }, (_, index) => (
                  <DeviceImage key={index} className="h-24 w-24 object-contain" />
                ))}
              </div>
              <h3 className="mt-4 font-heading text-3xl">{tier.name}</h3>
              <p className="mt-2 font-technical text-xs text-signal">
                {tier.count} {tier.count === 1 ? copy.sensor : copy.sensors}
              </p>
              <p className="mt-4 min-h-16 text-sm leading-relaxed text-muted">{tier.desc}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="font-technical text-xs text-muted">{copy.coming}</span>
                <a
                  href="#waitlist"
                  className="font-technical text-xs text-signal"
                  aria-label={`${copy.early} — ${tier.name}`}
                >
                  {copy.join} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Button href="#waitlist" variant="text">
            {copy.early}
          </Button>
        </div>
      </div>
    </section>
  );
}
