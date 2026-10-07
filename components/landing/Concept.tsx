'use client';

import { useState } from 'react';
import { DeviceImage, IndexMark, SectionHeading } from '@/components/ui';
import type { Copy } from '@/lib/copy';

/** Selector de montajes. El sensor no se vuelve a descargar al cambiar de rol. */
export function Concept({ copy }: { copy: Copy }) {
  const [selected, setSelected] = useState(0);
  return (
    <section id="t0" className="section concept-section">
      <div className="container">
        <SectionHeading title={copy.conceptTitle} />
        <div className="concept-stage reveal">
          <div className="concept-stage-top">
            <span>SIJAK / T0</span>
            <span>{copy.tech.modular} — 01</span>
          </div>
          <div className="concept-stage-main" data-mount={selected}>
            <div className="mount-accessory" aria-hidden="true">
              <span />
            </div>
            <div className="stage-rings">
              <span />
              <span />
              <span />
            </div>
            <div className="mount-ghost">{String(selected + 1).padStart(2, '0')}</div>
            <DeviceImage className="concept-device" />
            <div className="stage-spec stage-spec-left">
              01 / {copy.tech.core}
              <br />
              {copy.tech.same}
            </div>
            <div className="stage-spec stage-spec-right">
              {copy.mounts[selected][0]}
              <br />↳ {copy.mounts[selected][1]}
            </div>
          </div>
          <div className="concept-stage-bottom">
            <span className="lime-dot" />
            {copy.sensorLabel}
            <span className="stage-cross">+</span>
          </div>
        </div>
        <div className="mount-list" role="group" aria-label={copy.tech.mounts}>
          {copy.mounts.map(([mount, action], index) => (
            <button
              key={mount}
              type="button"
              className={selected === index ? 'mount-option active' : 'mount-option'}
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
            >
              <IndexMark index={index} className="mount-number" />
              <span className="mount-name">{mount}</span>
              <span className="mount-action">{action}</span>
              <span className="mount-arrow">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
