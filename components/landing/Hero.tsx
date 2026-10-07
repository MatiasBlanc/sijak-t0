import Image from 'next/image';
import { Button } from '@/components/ui';
import type { Copy } from '@/lib/copy';
import { media } from '@/lib/media';

/** Primer pantallazo. El render aprobado del producto tiene prioridad de carga. */
export function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid container">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            {copy.coming} <span className="hero-eyebrow-line" /> {copy.tech.redefined}
          </p>
          <h1>{copy.heroTitle}</h1>
          <p className="hero-description">{copy.heroBody}</p>
          <div className="hero-actions">
            <Button href="#waitlist">{copy.join}</Button>
            <Button href="#how-it-works" variant="text" diagonal={false}>
              {copy.seeHow}
            </Button>
          </div>
        </div>
        <div className="hero-visual" role="img" aria-label={copy.tech.heroAlt}>
          <div className="hero-visual-grid" />
          <Image
            src={media.product}
            alt=""
            width={1200}
            height={1200}
            className="hero-product-render"
            priority
            sizes="(max-width: 680px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
