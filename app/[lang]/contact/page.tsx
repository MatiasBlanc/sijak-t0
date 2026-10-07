import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Button, Wordmark } from '@/components/ui';
import { getCopy } from '@/lib/copy';

export const metadata: Metadata = { title: 'Contact / Contacto', robots: { index: false } };

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  const copy = getCopy(lang);
  return (
    <main id="main" className="container privacy-page">
      <Wordmark href={`/${lang}`} />
      <h1>{copy.contactTitle}</h1>
      <p>{copy.contactIntro}</p>
      <ContactForm lang={lang} copy={copy} />
      <Button href={`/${lang}`} variant="text" showArrow={false}>
        ← {copy.back}
      </Button>
    </main>
  );
}
