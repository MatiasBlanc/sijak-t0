'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Arrow, Wordmark } from '@/components/ui';
import type { Lang } from '@/lib/copy';

const anchors = ['#t0', '#how-it-works', '#coaches', '#waitlist'];

interface HeaderProps {
  lang: Lang;
  nav: readonly string[];
  join: string;
  menuOpen: string;
  menuClose: string;
  topLabel: string;
}

/** Cabecera fija. Solo este módulo se hidrata para el menú y el estado compacto. */
export function Header({ lang, nav, join, menuOpen, menuClose, topLabel }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40;
      setIsCompact((current) => (current === next ? current : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={isCompact ? 'site-header compact' : 'site-header'}>
      <div className="nav-shell container">
        <Wordmark href="#top" label={`SIJAK — ${topLabel}`} />
        <nav
          className={isOpen ? 'nav-links open' : 'nav-links'}
          aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
        >
          {nav.map((label, index) => (
            <a key={label} href={anchors[index]} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
          <div className="mobile-nav-extra">
            <Link href={lang === 'en' ? '/es' : '/en'} onClick={() => setIsOpen(false)}>
              {lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </Link>
          </div>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>
            <Link href="/en" aria-current={lang === 'en' ? 'page' : undefined}>
              EN
            </Link>
            <span>/</span>
            <Link href="/es" aria-current={lang === 'es' ? 'page' : undefined}>
              ES
            </Link>
          </div>
          <a className="nav-cta" href="#waitlist">
            {join} <Arrow diagonal />
          </a>
          <button
            type="button"
            className="menu-button"
            aria-label={isOpen ? menuClose : menuOpen}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
