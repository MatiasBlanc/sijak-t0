import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCopy } from '@/lib/copy';
export const metadata: Metadata = { title: 'Privacy / Privacidad', robots: { index: false } };
export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  const copy = getCopy(lang);
  return (
    <main id="main" className="container privacy-page">
      <Link href={`/${lang}`} className="wordmark">
        SIJAK<span className="wordmark-mark">✳</span>
      </Link>
      <h1>{copy.privacyTitle}</h1>
      <p>{copy.privacyBody}</p>
      <Link className="text-link" href={`/${lang}/contact`}>
        {copy.contact} ↗
      </Link>
      <br />
      <Link className="text-link" href={`/${lang}`}>
        {copy.back} ↗
      </Link>
    </main>
  );
}
