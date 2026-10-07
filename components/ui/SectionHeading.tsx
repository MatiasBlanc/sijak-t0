import { LimeDot } from './LimeDot';
import { cn } from './cn';

interface SectionHeadingProps {
  title: string;
  body?: string;
  className?: string;
  headingClassName?: string;
}

/** Encabezado de sección con el punto lima y la introducción opcional. */
export function SectionHeading({
  title,
  body,
  className,
  headingClassName = 'section-heading',
}: SectionHeadingProps) {
  return (
    <div className={cn(headingClassName, 'reveal', className)}>
      <div className="heading-row">
        <h2>
          <LimeDot />
          {title}
        </h2>
        {body ? <p className="section-intro">{body}</p> : null}
      </div>
    </div>
  );
}
