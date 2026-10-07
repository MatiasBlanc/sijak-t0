import type { ReactNode } from 'react';
import { IndexMark } from './IndexMark';

interface NumberedListProps {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  indexClassName?: string;
  trailing?: ReactNode;
}

/** Lista numerada 01… usada por bloques repetidos de la landing. */
export function NumberedList({
  items,
  className,
  itemClassName,
  indexClassName,
  trailing,
}: NumberedListProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={item} className={itemClassName}>
          <IndexMark index={index} className={indexClassName} />
          <strong>{item}</strong>
          {trailing}
        </div>
      ))}
    </div>
  );
}
