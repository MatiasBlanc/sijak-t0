/** Índice visual de dos dígitos, empezando en 01. */
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, '0');
}

export function IndexMark({ index, className }: { index: number; className?: string }) {
  return <span className={className}>{formatIndex(index)}</span>;
}
