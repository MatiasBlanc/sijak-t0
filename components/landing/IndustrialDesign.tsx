import Image from 'next/image';
import { SectionHeading } from '@/components/ui';
import type { Lang } from '@/lib/copy';

/** Lámina estática. La imagen queda fuera del primer pantallazo y se carga en diferido. */
export function IndustrialDesign({ lang }: { lang: Lang }) {
  const isSpanish = lang === 'es';
  return (
    <section className="section industrial-section">
      <div className="container">
        <SectionHeading
          title={isSpanish ? 'DISEÑADO PARA CAMBIAR DE MONTAJE.' : 'DESIGNED TO CHANGE MOUNTS.'}
          body={
            isSpanish
              ? 'Un cuerpo compacto, una interfaz común. El difusor permanece visible en cada posición.'
              : 'One compact body, one shared interface. The status diffuser stays visible in every setup.'
          }
        />
        <div
          className="industrial-board"
          tabIndex={0}
          role="region"
          aria-label={
            isSpanish
              ? 'Lámina de diseño industrial del sensor SIJAK T0'
              : 'SIJAK T0 industrial design sheet'
          }
        >
          <Image
            src="/t0-industrial-design.svg"
            alt={
              isSpanish
                ? 'Lámina de diseño del SIJAK T0: vistas superior, inferior y lateral, cierre de bayoneta, contactos de carga y montajes para tobillo, muñeca y mango de paleta.'
                : 'SIJAK T0 design board showing top, bottom and side views, bayonet mount, charging contacts, and ankle, wrist and paddle-handle mounts.'
            }
            width={1440}
            height={1000}
            unoptimized
          />
        </div>
        <div className="industrial-footnote">
          <span>38 × 38 mm</span>
          <i />
          <span>10–12 mm</span>
          <i />
          <span>{isSpanish ? 'CONCEPTO EXTERIOR' : 'EXTERIOR CONCEPT'}</span>
        </div>
      </div>
    </section>
  );
}
