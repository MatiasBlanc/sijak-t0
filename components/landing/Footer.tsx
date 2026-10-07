import Link from 'next/link';
import { Wordmark } from '@/components/ui';
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
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Wordmark href="#top" className="footer-logo" />
            <p>{copy.footerTag}</p>
          </div>
          <div className="footer-links">
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
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} SIJAK. {copy.designed}
          </span>
          <span>{copy.photo}</span>
          <a href="#top">{copy.tech.top.toUpperCase()} ↑</a>
        </div>
      </div>
    </footer>
  );
}

function copyLink(href: string | undefined, label: string, soon: string): FooterLink {
  return href ? { href, label, external: true } : { label, title: soon };
}
