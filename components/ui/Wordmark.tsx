import Link from 'next/link';
import { cn } from './cn';

interface WordmarkProps {
  href: string;
  label?: string;
  className?: string;
}

/** Marca SIJAK reutilizada en cabecera, pie y páginas internas. */
export function Wordmark({ href, label, className = 'wordmark' }: WordmarkProps) {
  const mark = (
    <>
      SIJAK<span className="wordmark-mark">✳</span>
    </>
  );
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {mark}
      </Link>
    );
  }
  return (
    <a href={href} className={cn(className)} aria-label={label}>
      {mark}
    </a>
  );
}
