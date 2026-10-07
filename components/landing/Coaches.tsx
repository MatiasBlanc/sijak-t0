import { DetailList, SectionHeading } from '@/components/ui';
import type { Copy, Lang } from '@/lib/copy';

/** Comparación estática para entrenadores. */
export function Coaches({ lang, copy }: { lang: Lang; copy: Copy }) {
  const isSpanish = lang === 'es';
  const rows = [
    { label: copy.left, values: ['172', '218', '301'] },
    { label: copy.right, values: ['169', '201', '242'] },
  ];
  const pillars = [
    {
      title: isSpanish ? 'Simetría bilateral en tiempo real' : 'Real-time bilateral symmetry',
      body: isSpanish
        ? 'Compara pierna hábil vs. inhábil en cada serie para corregir desbalances invisibles al ojo humano.'
        : 'Compare dominant vs. off-side limbs to isolate imbalances invisible to the human eye.',
    },
    {
      title: isSpanish ? 'Aislamiento cinemático de fases' : 'Kinematic phase isolation',
      body: isSpanish
        ? 'Mide con exactitud de 1 ms la reacción al estímulo, la aceleración de impacto y el retorno.'
        : 'Measure down to 1 ms reaction to stimulus, strike acceleration, and guard reset.',
    },
    {
      title: isSpanish ? 'Control de fatiga y sobrecarga' : 'Fatigue & load management',
      body: isSpanish
        ? 'Monitorea el retardo de recuperación asalto tras asalto antes de que la técnica se quiebre.'
        : 'Track recovery delay across rounds before fatigue breaks down execution mechanics.',
    },
  ];
  return (
    <section id="coaches" className="section coaches-section">
      <div className="container coaches-layout">
        <div className="coaches-copy">
          <SectionHeading title={copy.coachTitle} />
          <p className="coaches-lead-text">{copy.coachBody}</p>
          <DetailList
            items={pillars}
            className="coaches-pillars"
            itemClassName="coaches-pillar"
            indexClassName="pillar-num"
          />
        </div>
        <div className="comparison reveal">
          <div className="comparison-top">
            <div className="comparison-status">
              <span className="telemetry-live-dot" />
              <span>{copy.tech.analysis} / 012</span>
            </div>
            <div className="comparison-tag">
              <span>{isSpanish ? 'TELEMETRÍA DE ASALTO' : 'BOUT TELEMETRY'}</span>
              <span>↗</span>
            </div>
          </div>
          <div className="comparison-headers">
            <span className="col-label">{isSpanish ? 'EXTREMIDAD' : 'LIMB'}</span>
            {copy.metrics.slice(0, 3).map((metric) => (
              <span key={metric} className="col-metric">
                {metric}
              </span>
            ))}
          </div>
          <div className="comparison-rows">
            {rows.map((row, rowIndex) => (
              <div className="comparison-row" key={row.label}>
                <div className="row-label">
                  <span className="limb-indicator" />
                  <strong>{row.label}</strong>
                </div>
                {row.values.map((value, index) => {
                  const isHighlight = index === 2 && rowIndex === 0;
                  return (
                    <div
                      key={value}
                      className={isHighlight ? 'metric-cell cell-highlighted' : 'metric-cell'}
                    >
                      <span className="metric-num">
                        {value}
                        <small>ms</small>
                      </span>
                      {isHighlight ? <span className="asymmetry-pill">+24% (59 ms)</span> : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="comparison-insight" role="alert">
            <div className="insight-badge-row">
              <div className="insight-label-group">
                <span className="insight-signal" />
                <span className="insight-label-text">{copy.insightLabel}</span>
              </div>
              <span className="insight-tag">
                {isSpanish ? 'ALERTA DE RENDIMIENTO' : 'PERFORMANCE ALERT'}
              </span>
            </div>
            <p className="insight-statement">
              {isSpanish ? (
                <>
                  La recuperación es un <span className="insight-highlight">24 % más lenta</span> en
                  el lado izquierdo.
                </>
              ) : (
                <>
                  Recovery is <span className="insight-highlight">24% slower</span> on the left
                  side.
                </>
              )}
            </p>
            <p className="insight-context">
              {isSpanish
                ? 'Déficit asimétrico crítico: el atleta tarda 59 ms adicionales en rearmar la guardia tras el impacto.'
                : 'Critical asymmetric deficit: the athlete takes an additional 59 ms to reset guard following impact.'}
            </p>
          </div>
          <div className="comparison-bottom">
            <span>T0 / {copy.tech.intelligence}</span>
            <span>DUAL SENSOR SYNC · © SIJAK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
