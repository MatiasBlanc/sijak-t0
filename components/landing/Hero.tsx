import Image from 'next/image';
import { Button } from '@/components/ui';
import type { Copy } from '@/lib/copy';
import { media } from '@/lib/media';
import { product } from '@/lib/product';

const demo = [
  { label: 'REACTION', value: '184 ms' },
  { label: 'EXECUTION', value: '213 ms' },
  { label: 'RECOVERY', value: '247 ms' },
] as const;

/** Primer pantallazo: la acción y su tiempo, no un render aislado del sensor. */
export function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="overflow-hidden pt-24" id="top">
      <div className="container grid min-h-[36rem] items-center gap-10 lg:grid-cols-2">
        <div className="py-8">
          <p className="font-technical text-xs uppercase tracking-wide text-muted">
            {copy.tech.redefined}
          </p>
          <h1 className="mt-6 max-w-xl font-heading text-5xl leading-none md:text-7xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{copy.heroBody}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button href="#waitlist">{copy.join}</Button>
            <Button href="#how-it-works" variant="text" diagonal={false}>
              {copy.seeHow}
            </Button>
          </div>
          <p className="mt-6 font-technical text-xs uppercase tracking-wide text-muted">
            {copy.coming} · {product.tagline}
          </p>
        </div>
        <div className="relative min-h-96 border border-border bg-surface">
          <Image
            src={media.hero.desktop}
            alt={copy.tech.heroAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="relative grid h-full content-between p-6">
            <div className="flex items-center justify-between font-technical text-xs text-foreground">
              <span>{copy.tech.athlete}</span>
              <span className="text-signal">{copy.tech.target}</span>
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
      </div>
    </section>
  );
}
