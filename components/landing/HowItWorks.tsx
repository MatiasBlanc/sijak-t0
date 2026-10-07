import { IndexMark, LimeDot, SectionHeading } from '@/components/ui';
import type { Copy } from '@/lib/copy';

const timelineTimes = ['0 ms', '184 ms', '184 ms', '397 ms', '397 ms', '644 ms'];
const metricValues = ['184', '213', '247', '±18', '12.8'];
const metricUnits = ['ms', 'ms', 'ms', 'ms', 'g'];

/** Método y métricas. No tiene estado: se renderiza en el servidor. */
export function HowItWorks({ copy }: { copy: Copy }) {
  return (
    <section id="how-it-works" className="section work-section">
      <div className="container">
        <SectionHeading title={copy.workTitle} body={copy.workBody} />
        <div className="timeline-panel reveal">
          <div className="timeline-top">
            <span>{copy.tech.capture} / 001</span>
            <span>{copy.tech.time} →</span>
          </div>
          <div className="timeline-track">
            <div className="track-line" />
            <div className="track-progress" />
            {copy.timeline.map((item, index) => (
              <div className="timeline-point" key={item}>
                <span className={index === 4 ? 'point-dot impact' : 'point-dot'} />
                <IndexMark index={index} className="point-index" />
                <strong>{item}</strong>
                <span className="point-time">{timelineTimes[index]}</span>
              </div>
            ))}
          </div>
          <div className="timeline-wave">
            <svg viewBox="0 0 1000 95" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0 65 H180 L210 63 L222 57 L236 68 L260 65 H385 L400 53 L415 71 L438 60 L470 65 H585 L607 63 L617 18 L628 83 L639 61 L655 65 H1000"
                fill="none"
                stroke="#c6ff00"
                strokeWidth="2"
              />
              <path
                d="M0 65 H1000"
                fill="none"
                stroke="#545a5a"
                strokeWidth="1"
                strokeDasharray="2 7"
              />
            </svg>
          </div>
          <div className="timeline-summary">
            <span>
              {copy.tech.total}{' '}
              <strong>
                397 <small>ms</small>
              </strong>
            </span>
            <span>
              {copy.tech.cycle}{' '}
              <strong>
                644 <small>ms</small>
              </strong>
            </span>
          </div>
          <div className="timeline-sources">
            <span>
              <i className="source-dot" />
              {copy.athlete}
            </span>
            <span>
              <i className="source-dot target" />
              {copy.target}
            </span>
            <span className="source-shared">↳ {copy.shared}</span>
          </div>
        </div>

        <div className="work-metrics-block reveal">
          <div className="work-metrics-header">
            <h3>
              <LimeDot />
              {copy.metricsTitle}
            </h3>
            {copy.metricsBody ? <p className="section-intro">{copy.metricsBody}</p> : null}
          </div>
          <div className="metrics-grid">
            {copy.metrics.map((metric, index) => (
              <div key={metric} className={`metric-tile metric-${index}`}>
                <div className="metric-tile-top">
                  <span>
                    <IndexMark index={index} /> / {metric}
                  </span>
                  <span>↗</span>
                </div>
                <div className="metric-value">
                  {metricValues[index]}
                  <small>{metricUnits[index]}</small>
                </div>
                <div className="metric-graph" aria-hidden="true">
                  {Array.from({ length: 15 }, (_, bar) => (
                    <span key={bar} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="metrics-note">* {copy.example}</p>
        </div>
      </div>
    </section>
  );
}
