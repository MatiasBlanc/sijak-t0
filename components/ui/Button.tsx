import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from './Arrow';
import { cn } from './cn';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'lime' | 'text';
  diagonal?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
  ariaLabel?: string;
}

/**
 * Botón o enlace de la landing. Las rutas internas usan `next/link`; los anclajes, un enlace nativo.
 */
export function Button({
  children,
  href,
  variant = 'lime',
  diagonal,
  className,
  type = 'button',
  disabled,
  onClick,
  external = false,
  ariaLabel,
}: ButtonProps) {
  const isText = variant === 'text';
  const classes = cn(isText ? 'text-link' : 'button button-lime', className);
  const content = (
    <>
      {children}
      <Arrow diagonal={diagonal ?? !isText} />
    </>
  );
  if (href && external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }
  if (href?.startsWith('/')) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
