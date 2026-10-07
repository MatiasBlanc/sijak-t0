import type { Metadata } from 'next';
import { Cal_Sans, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import '../globals.css';

const display = Cal_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
});

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/satoshi/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sijak-t0.vercel.app'),
  title: { default: 'SIJAK T0 — Everyone starts here.', template: '%s | SIJAK T0' },
  icons: { icon: '/icon.svg' },
};

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'es') notFound();
  return (
    <html lang={lang}>
      <body className={`${display.variable} ${satoshi.variable} ${mono.variable}`}>
        <a href="#main" className="skip-link">
          {lang === 'es' ? 'Ir al contenido' : 'Skip to content'}
        </a>
        {children}
      </body>
    </html>
  );
}
