import Image from 'next/image';
import { NumberedList, SectionHeading } from '@/components/ui';
import type { Copy } from '@/lib/copy';

/** Foto de entrenamiento optimizada por `next/image`, sin prioridad de LCP. */
export function Sports({ copy }: { copy: Copy }) {
  return (
    <section className="sports-section">
      <div className="sports-photo">
        <Image
          src="/images/pexels-260447.jpg"
          alt={copy.tech.sportsAlt}
          fill
          sizes="100vw"
          quality={68}
          className="sports-image"
        />
      </div>
      <div className="sports-overlay" />
      <div className="container sports-content">
        <SectionHeading title={copy.sportsTitle} body={copy.sportsBody} />
        <NumberedList
          items={copy.sports}
          className="sports-list"
          itemClassName="sports-item"
          trailing={() => <span className="sports-plus">+</span>}
        />
      </div>
    </section>
  );
}
