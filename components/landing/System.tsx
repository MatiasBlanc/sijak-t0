import { Arrow, Button, DeviceImage, IndexMark, SectionHeading } from '@/components/ui';
import type { Copy } from '@/lib/copy';

/** Sistemas T0. Las ilustraciones repetidas comparten la misma URL cacheable. */
export function System({ copy }: { copy: Copy }) {
  const tiers = [
    { name: 'T0 SOLO', count: 1, desc: copy.solo },
    { name: 'T0 DUO', count: 2, desc: copy.duo, extra: copy.duoExtra },
    { name: 'T0 TEAM 4', count: 4, desc: copy.team },
  ];
  return (
    <section className="section system-section">
      <div className="container">
        <SectionHeading title={copy.systemTitle} />
        <div className="system-grid">
          {tiers.map((tier, index) => (
            <article key={tier.name} className={`system-tier reveal ${index === 1 ? 'featured' : ''}`}>
              <div className="tier-top">
                <span>
                  <IndexMark index={index} /> / {copy.tech.system}
                </span>
                <span>↗</span>
              </div>
              <div className="tier-devices" aria-hidden="true">
                {Array.from({ length: tier.count }, (_, device) => (
                  <DeviceImage key={device} />
                ))}
              </div>
              <h3>{tier.name}</h3>
              <p className="tier-count">
                {tier.count} {tier.count === 1 ? copy.sensor : copy.sensors}
              </p>
              <p className="tier-description">
                {tier.desc}
                {tier.extra ? (
                  <>
                    <br />
                    {tier.extra}
                  </>
                ) : null}
              </p>
              <div className="tier-bottom">
                <span>{copy.coming}</span>
                <a href="#waitlist" aria-label={`${copy.early} — ${tier.name}`}>
                  <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="system-link">
          <Button href="#waitlist" variant="text">
            {copy.early}
          </Button>
        </div>
      </div>
    </section>
  );
}
