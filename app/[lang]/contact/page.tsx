import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
export const metadata: Metadata = { title: 'Contact / Contacto', robots: { index: false } };
export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  return (
    <main id="main" className="container privacy-page">
      <Link href={`/${lang}`} className="wordmark">
        SIJAK<span className="wordmark-mark">✳</span>
      </Link>
      <h1>{lang === 'es' ? 'HABLEMOS.' : 'LET’S TALK.'}</h1>
      <p>
        {lang === 'es'
          ? 'Consultas sobre T0, colaboración o solicitudes de acceso y eliminación de datos.'
          : 'Questions about T0, partnerships, or requests to access and delete your data.'}
      </p>
      <ContactForm lang={lang} />
      <Link className="text-link" href={`/${lang}`}>
        ← {lang === 'es' ? 'Volver a SIJAK' : 'Back to SIJAK'}
      </Link>
    </main>
  );
}
