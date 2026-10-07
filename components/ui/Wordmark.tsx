import Link from 'next/link';
import { cn } from './cn';

interface WordmarkProps {
  href: string;
  label?: string;
  className?: string;
}

/** Marca SIJAK reutilizada en cabecera, pie y páginas internas. */
export function Wordmark({ href, label, className }: WordmarkProps) {
  const classes = cn(
    'inline-flex items-center gap-2.5 font-heading text-4xl font-black leading-none tracking-tight',
    className,
  );
  const mark = (
    <>
      SIJAK<span className="text-3xl font-normal text-lime rotate-12">✳</span>
    </>
  );
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes} aria-label={label}>
        {mark}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} aria-label={label}>
      {mark}
    </a>
  );
}
