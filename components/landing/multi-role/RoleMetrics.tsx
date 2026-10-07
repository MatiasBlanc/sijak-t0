interface RoleMetricsProps {
  metrics: readonly string[];
}

/** Etiquetas de uso, sin resultados numéricos ni gráficas simuladas. */
export function RoleMetrics({ metrics }: RoleMetricsProps) {
  return (
    <ul className="relative flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 font-technical text-xs uppercase tracking-wide text-foreground">
      {metrics.map((metric) => (
        <li key={metric}>{metric}</li>
      ))}
    </ul>
  );
}
