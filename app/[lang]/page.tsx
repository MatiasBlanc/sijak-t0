import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { getCopy } from '@/lib/copy';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  const isSpanish = lang === 'es';
  const copy = getCopy(lang);
  const title = isSpanish
    ? 'SIJAK T0 — Mide lo que antes no podías'
    : "SIJAK T0 — Measure what you couldn't before";
  const description = isSpanish
    ? 'Sensor modular de rendimiento para deportes de combate. Mide reacción, ejecución, impacto y recuperación en tiempo real.'
    : 'Modular performance sensor for combat sports. Measure reaction, execution, impact, and recovery in real time.';

  return {
    title,
    description,
    alternates: { canonical: `/${lang}`, languages: { en: '/en', es: '/es', 'x-default': '/en' } },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/${lang}`,
      siteName: 'SIJAK',
      locale: isSpanish ? 'es_CL' : 'en_US',
      alternateLocale: isSpanish ? 'en_US' : 'es_CL',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: isSpanish
            ? 'SIJAK T0 — Sensor modular de rendimiento para deportes de combate'
            : 'SIJAK T0 — Modular performance sensor for combat sports',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  return <LandingPage lang={lang} copy={getCopy(lang)} />;
}
