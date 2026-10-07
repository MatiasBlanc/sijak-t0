interface ArrowProps {
  diagonal?: boolean;
}

/** Flecha decorativa de los enlaces y botones. */
export function Arrow({ diagonal = false }: ArrowProps) {
  return (
    <span aria-hidden="true" className="text-xl leading-none">
      {diagonal ? '↗' : '→'}
    </span>
  );
}
