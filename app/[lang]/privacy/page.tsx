import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button, Wordmark } from '@/components/ui';
import { getCopy } from '@/lib/copy';

export const metadata: Metadata = { title: 'Privacy / Privacidad', robots: { index: false } };

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  const copy = getCopy(lang);
  return (
    <main id="main" className="container privacy-page">
      <Wordmark href={`/${lang}`} />
      <h1>{copy.privacyTitle}</h1>
      <p>{copy.privacyBody}</p>
      <Button href={`/${lang}/contact`} variant="text" diagonal>
        {copy.contact}
      </Button>
      <br />
      <Button href={`/${lang}`} variant="text" diagonal>
        {copy.back}
      </Button>
    </main>
  );
}
