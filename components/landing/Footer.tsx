import Link from 'next/link';
import { Wordmark } from '@/components/ui';
import { PageContainer } from '@/components/ui/LandingLayout';
import type { Copy, Lang } from '@/lib/copy';

interface FooterLink {
  href?: string;
  label: string;
  external?: boolean;
  title?: string;
}

/** Pie estático. Los enlaces sociales ausentes no generan peticiones. */
export function Footer({ lang, copy }: { lang: Lang; copy: Copy }) {
  const links: FooterLink[] = [
    copyLink(process.env.NEXT_PUBLIC_INSTAGRAM_URL, 'Instagram ↗', copy.tech.socialSoon),
    copyLink(process.env.NEXT_PUBLIC_X_URL, 'X ↗', copy.tech.socialSoon),
    { href: `/${lang}/contact`, label: `${copy.contact} ↗` },
    { href: `/${lang}/privacy`, label: `${copy.privacy} ↗` },
  ];
  return (
    <footer className="border-t border-border py-10">
      <PageContainer>
        <div className="flex flex-wrap items-start justify-between gap-8 pb-10">
          <div>
            <Wordmark href="#top" />
            <p className="mt-3 text-sm text-muted">{copy.footerTag}</p>
          </div>
          <div className="flex flex-wrap gap-6 font-technical text-xs text-muted [&_a]:hover:text-foreground">
            {links.map((link) =>
              link.href ? (
                link.external ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                )
              ) : (
                <span key={link.label} title={link.title}>
                  {link.label}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-border pt-6 font-technical text-xs text-muted">
          <span>
            © {new Date().getFullYear()} SIJAK. {copy.designed}
          </span>
          <span>{copy.photo}</span>
          <a href="#top">{copy.tech.top.toUpperCase()} ↑</a>
        </div>
      </PageContainer>
    </footer>
  );
}

function copyLink(href: string | undefined, label: string, soon: string): FooterLink {
  return href ? { href, label, external: true } : { label, title: soon };
}
