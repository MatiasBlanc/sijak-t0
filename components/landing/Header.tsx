'use client';

import { useEffect, useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { cn } from '@/components/ui/cn';
import { Wordmark } from '@/components/ui/Wordmark';
import { PageContainer } from '@/components/ui/LandingLayout';
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

/** Cabecera fija y adaptable; solo este módulo se hidrata para el menú y el estado compacto. */
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
    <header
      data-compact={isCompact}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background transition-colors duration-300"
    >
      <PageContainer className={cn('flex items-center justify-between transition-[height] duration-300', isCompact ? 'h-16 md:h-18' : 'h-20 md:h-24')}> 
        <Wordmark href="#top" label={`SIJAK — ${topLabel}`} />
        <nav
          id="primary-navigation"
          className={cn(
            'absolute inset-x-0 top-full flex-col border-b border-border bg-background px-5 py-5 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 lg:gap-9',
            isOpen ? 'flex' : 'hidden md:flex',
          )}
          aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
        >
          {nav.map((label, index) => (
            <a
              key={label}
              href={anchors[index]}
              onClick={() => setIsOpen(false)}
              className="border-b border-border py-3 text-sm text-foreground transition-colors hover:text-signal md:border-0 md:py-0 md:text-xs"
            >
              {label}
            </a>
          ))}
          <div className="pt-5 font-technical text-xs text-signal md:hidden">
            <a href={lang === 'en' ? '/es' : '/en'} onClick={() => setIsOpen(false)}>
              {lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </a>
          </div>
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
          <div
            className="hidden items-center gap-2 font-technical text-xs text-muted md:flex"
            aria-label={lang === 'es' ? 'Idioma' : 'Language'}
          >
            <a
              href="/es"
              aria-current={lang === 'es' ? 'page' : undefined}
              className="hover:text-foreground"
            >
              ES
            </a>
            <span>/</span>
            <a
              href="/en"
              aria-current={lang === 'en' ? 'page' : undefined}
              className="hover:text-foreground"
            >
              EN
            </a>
          </div>
          <a
            className="inline-flex min-h-11 items-center gap-3 bg-lime px-4 py-3 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-lime/90 md:gap-5 md:px-5"
            href="#waitlist"
          >
            {join} <Arrow diagonal />
          </a>
          <button
            type="button"
            className="flex min-h-11 w-11 flex-col items-center justify-center gap-1.5 bg-transparent md:hidden"
            aria-label={isOpen ? menuClose : menuOpen}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="h-px w-5 bg-foreground" />
            <span className="h-px w-5 bg-foreground" />
          </button>
        </div>
      </PageContainer>
    </header>
  );
}
