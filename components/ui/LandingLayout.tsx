import type { ElementType, ReactNode } from 'react';
import { cn } from './cn';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

interface SectionProps extends LayoutProps {
  id?: string;
  labelledBy?: string;
  sectionRef?: React.Ref<HTMLElement>;
}

/** Alinea el contenido de las secciones de la landing.
 * @param props - Contenido y clases adicionales.
 * @returns Contenedor con la cuadrícula exterior común.
 */
export function PageContainer({ children, className }: LayoutProps) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-2xl px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}

/** Aplica el ritmo vertical común de la landing.
 * @param props - Contenido, identificador, etiqueta accesible y referencia opcionales.
 * @returns Sección semántica con espaciado uniforme.
 */
export function Section({ children, className, id, labelledBy, sectionRef }: SectionProps) {
  return (
    <section
      id={id}
      ref={sectionRef}
      aria-labelledby={labelledBy}
      className={cn('border-t border-border py-20 md:py-24 lg:py-28', className)}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
}

interface SectionHeaderProps extends LayoutProps {
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
}

/** Mantiene una escala tipográfica coherente para los títulos.
 * @param props - Texto, nivel semántico y clases adicionales.
 * @returns Encabezado con la escala del nivel elegido.
 */
export function SectionHeader({ children, as: Tag = 'h2', id, className }: SectionHeaderProps) {
  const heading: ElementType = Tag;
  const Heading = heading;
  return (
    <Heading
      id={id}
      className={cn(
        'font-heading leading-none text-foreground',
        Tag === 'h1'
          ? 'text-5xl md:text-6xl lg:text-7xl'
          : Tag === 'h3'
            ? 'text-2xl md:text-3xl'
            : 'text-4xl md:text-5xl lg:text-6xl',
        className,
      )}
    >
      {children}
    </Heading>
  );
}

/** Etiqueta secundaria para datos de la interfaz.
 * @param props - Texto y clases adicionales.
 * @returns Etiqueta técnica discreta.
 */
export function TechnicalLabel({ children, className }: LayoutProps) {
  return (
    <span className={cn('font-technical text-xs uppercase tracking-widest text-muted', className)}>
      {children}
    </span>
  );
}

interface MetricProps {
  label: string;
  value: string;
  className?: string;
}

/** Relaciona una medida con su nombre accesible.
 * @param props - Nombre, valor y clases opcionales.
 * @returns Par semántico de dato y valor.
 */
export function Metric({ label, value, className }: MetricProps) {
  return (
    <div className={className}>
      <dt className="font-technical text-xs uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-3 font-technical text-2xl text-signal md:text-3xl">{value}</dd>
    </div>
  );
}

/** Enlace principal hacia la lista de espera.
 * @param props - Texto y clases opcionales.
 * @returns Enlace CTA de la landing.
 */
export function CTA({ children, className }: LayoutProps) {
  return (
    <a
      href="#waitlist"
      className={cn(
        'inline-flex min-h-12 items-center justify-center bg-signal px-6 text-xs font-bold uppercase tracking-wide text-background hover:bg-signal/90',
        className,
      )}
    >
      {children}
    </a>
  );
}
