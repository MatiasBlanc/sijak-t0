'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';
import type { Copy, Lang } from '@/lib/copy';

const anchors = ['#t0', '#how-it-works', '#coaches', '#waitlist'];
const metricValues = ['184', '213', '247', '±18', '12.8'];
const metricUnits = ['ms', 'ms', 'ms', 'ms', 'g'];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? '↗' : '→'}
    </span>
  );
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reducedMotion ? undefined : { opacity: [0.7, 1], y: [16, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ title, body }: { title: string; body?: string; eyebrow?: string }) {
  return (
    <Reveal className="section-heading">
      <div className="heading-row">
        <h2>
          <span className="lime-dot" aria-hidden="true" />
          {title}
        </h2>
        {body && <p className="section-intro">{body}</p>}
      </div>
    </Reveal>
  );
}

function Device({ className = '' }: { className?: string }) {
  return (
    <Image src="/device.svg" alt="" width={520} height={350} className={className} unoptimized />
  );
}

function Header({ lang, copy }: { lang: Lang; copy: Copy }) {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${isCompact ? 'compact' : ''}`}>
      <div className="nav-shell container">
        <a href="#top" className="wordmark" aria-label={`SIJAK — ${copy.tech.top}`}>
          SIJAK<span className="wordmark-mark">✳</span>
        </a>
        <nav
          className={isOpen ? 'nav-links open' : 'nav-links'}
          aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
        >
          {copy.nav.map((label, index) => (
            <a key={label} href={anchors[index]} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
          <div className="mobile-nav-extra">
            <Link href={lang === 'en' ? '/es' : '/en'} onClick={() => setIsOpen(false)}>
              {lang === 'en' ? 'ESPAÑOL' : 'ENGLISH'}
            </Link>
          </div>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>
            <Link href="/en" aria-current={lang === 'en' ? 'page' : undefined}>
              EN
            </Link>
            <span>/</span>
            <Link href="/es" aria-current={lang === 'es' ? 'page' : undefined}>
              ES
            </Link>
          </div>
          <a className="nav-cta" href="#waitlist">
            {copy.join} <Arrow diagonal />
          </a>
          <button
            type="button"
            className="menu-button"
            aria-label={isOpen ? copy.tech.menuClose : copy.tech.menuOpen}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ copy }: { copy: Copy }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid container">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" />
            {copy.coming} <span className="hero-eyebrow-line" /> {copy.tech.redefined}
          </p>
          <h1>{copy.heroTitle}</h1>
          <p className="hero-description">{copy.heroBody}</p>
          <div className="hero-actions">
            <a href="#waitlist" className="button button-lime">
              {copy.join} <Arrow diagonal />
            </a>
            <a href="#how-it-works" className="text-link">
              {copy.seeHow} <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-visual" role="img" aria-label={copy.tech.heroAlt}>
          <div className="hero-visual-grid" />
          <Image
            src="/t0-hero.svg"
            alt=""
            width={680}
            height={630}
            className="hero-product-render"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

function Concept({ copy }: { copy: Copy }) {
  const [selected, setSelected] = useState(0);
  return (
    <section id="t0" className="section concept-section">
      <div className="container">
        <SectionHeading title={copy.conceptTitle} />
        <Reveal className="concept-stage">
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
            <Device className="concept-device" />
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
        </Reveal>
        <div className="mount-list" role="group" aria-label={copy.tech.mounts}>
          {copy.mounts.map(([mount, action], index) => (
            <button
              key={mount}
              type="button"
              className={selected === index ? 'mount-option active' : 'mount-option'}
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
            >
              <span className="mount-number">0{index + 1}</span>
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

function IndustrialDesign({ lang }: { lang: Lang }) {
  const isSpanish = lang === 'es';
  return (
    <section className="section industrial-section">
      <div className="container">
        <SectionHeading
          title={isSpanish ? 'DISEÑADO PARA CAMBIAR DE MONTAJE.' : 'DESIGNED TO CHANGE MOUNTS.'}
          body={
            isSpanish
              ? 'Un cuerpo compacto, una interfaz común. El difusor permanece visible en cada posición.'
              : 'One compact body, one shared interface. The status diffuser stays visible in every setup.'
          }
        />
        <div
          className="industrial-board"
          tabIndex={0}
          role="region"
          aria-label={
            isSpanish
              ? 'Lámina de diseño industrial del sensor SIJAK T0'
              : 'SIJAK T0 industrial design sheet'
          }
        >
          <Image
            src="/t0-industrial-design.svg"
            alt={
              isSpanish
                ? 'Lámina de diseño del SIJAK T0: vistas superior, inferior y lateral, cierre de bayoneta, contactos de carga y montajes para tobillo, muñeca y mango de paleta.'
                : 'SIJAK T0 design board showing top, bottom and side views, bayonet mount, charging contacts, and ankle, wrist and paddle-handle mounts.'
            }
            width={1440}
            height={1000}
            unoptimized
          />
        </div>
        <div className="industrial-footnote">
          <span>38 × 38 mm</span>
          <i />
          <span>10–12 mm</span>
          <i />
          <span>{isSpanish ? 'CONCEPTO EXTERIOR' : 'EXTERIOR CONCEPT'}</span>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ copy }: { copy: Copy }) {
  return (
    <section id="how-it-works" className="section work-section">
      <div className="container">
        <SectionHeading title={copy.workTitle} body={copy.workBody} />
        <Reveal className="timeline-panel">
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
                <span className="point-index">0{index + 1}</span>
                <strong>{item}</strong>
                <span className="point-time">
                  {['0 ms', '184 ms', '184 ms', '397 ms', '397 ms', '644 ms'][index]}
                </span>
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
        </Reveal>

        <Reveal className="work-metrics-block">
          <div className="work-metrics-header">
            <h3>
              <span className="lime-dot" aria-hidden="true" />
              {copy.metricsTitle}
            </h3>
            {copy.metricsBody && <p className="section-intro">{copy.metricsBody}</p>}
          </div>
          <div className="metrics-grid">
            {copy.metrics.map((metric, index) => (
              <div key={metric} className={`metric-tile metric-${index}`}>
                <div className="metric-tile-top">
                  <span>
                    0{index + 1} / {metric}
                  </span>
                  <span>↗</span>
                </div>
                <div className="metric-value">
                  {metricValues[index]}
                  <small>{metricUnits[index]}</small>
                </div>
                <div className="metric-graph" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>
          <p className="metrics-note">* {copy.example}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Sports({ copy }: { copy: Copy }) {
  return (
    <section className="sports-section">
      <div className="sports-photo">
        <Image
          src="/images/pexels-260447.jpg"
          alt={copy.tech.sportsAlt}
          fill
          sizes="100vw"
          className="sports-image"
        />
      </div>
      <div className="sports-overlay" />
      <div className="container sports-content">
        <SectionHeading
          title={copy.sportsTitle}
          body={copy.sportsBody}
        />
        <div className="sports-list">
          {copy.sports.map((sport, index) => (
            <div key={sport} className="sports-item">
              <span>0{index + 1}</span>
              <strong>{sport}</strong>
              <span className="sports-plus">+</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function System({ copy }: { copy: Copy }) {
  const tiers = [
    { name: 'T0 SOLO', count: 1, desc: copy.solo },
    { name: 'T0 DUO', count: 2, desc: copy.duo, extra: copy.duoExtra },
    { name: 'T0 TEAM 4', count: 4, desc: copy.team },
  ];
  return (
    <section className="section system-section">
      <div className="container">
        <SectionHeading
          title={copy.systemTitle}
        />
        <div className="system-grid">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} className={`system-tier ${index === 1 ? 'featured' : ''}`}>
              <div className="tier-top">
                <span>
                  0{index + 1} / {copy.tech.system}
                </span>
                <span>↗</span>
              </div>
              <div className="tier-devices" aria-hidden="true">
                {Array.from({ length: tier.count }, (_, i) => (
                  <Device key={i} />
                ))}
              </div>
              <h3>{tier.name}</h3>
              <p className="tier-count">
                {tier.count} {tier.count === 1 ? copy.sensor : copy.sensors}
              </p>
              <p className="tier-description">
                {tier.desc}
                {tier.extra && (
                  <>
                    <br />
                    {tier.extra}
                  </>
                )}
              </p>
              <div className="tier-bottom">
                <span>{copy.coming}</span>
                <a href="#waitlist" aria-label={`${copy.early} — ${tier.name}`}>
                  <Arrow diagonal />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="system-link">
          <a href="#waitlist" className="text-link">
            {copy.early} <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

function Coaches({ lang, copy }: { lang: Lang; copy: Copy }) {
  const isSpanish = lang === 'es';
  const rows = [
    {
      label: copy.left,
      values: ['172', '218', '301'],
    },
    {
      label: copy.right,
      values: ['169', '201', '242'],
    },
  ];
  return (
    <section id="coaches" className="section coaches-section">
      <div className="container coaches-layout">
        <div className="coaches-copy">
          <SectionHeading title={copy.coachTitle} />
          <p className="coaches-lead-text">{copy.coachBody}</p>

          <div className="coaches-pillars">
            <div className="coaches-pillar">
              <span className="pillar-num">01</span>
              <div>
                <strong>
                  {isSpanish
                    ? 'Simetría bilateral en tiempo real'
                    : 'Real-time bilateral symmetry'}
                </strong>
                <p>
                  {isSpanish
                    ? 'Compara pierna hábil vs. inhábil en cada serie para corregir desbalances invisibles al ojo humano.'
                    : 'Compare dominant vs. off-side limbs to isolate imbalances invisible to the human eye.'}
                </p>
              </div>
            </div>
            <div className="coaches-pillar">
              <span className="pillar-num">02</span>
              <div>
                <strong>
                  {isSpanish
                    ? 'Aislamiento cinemático de fases'
                    : 'Kinematic phase isolation'}
                </strong>
                <p>
                  {isSpanish
                    ? 'Mide con exactitud de 1 ms la reacción al estímulo, la aceleración de impacto y el retorno.'
                    : 'Measure down to 1 ms reaction to stimulus, strike acceleration, and guard reset.'}
                </p>
              </div>
            </div>
            <div className="coaches-pillar">
              <span className="pillar-num">03</span>
              <div>
                <strong>
                  {isSpanish
                    ? 'Control de fatiga y sobrecarga'
                    : 'Fatigue & load management'}
                </strong>
                <p>
                  {isSpanish
                    ? 'Monitorea el retardo de recuperación asalto tras asalto antes de que la técnica se quiebre.'
                    : 'Track recovery delay across rounds before fatigue breaks down execution mechanics.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Reveal className="comparison">
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
            {rows.map((row, rIdx) => (
              <div className="comparison-row" key={row.label}>
                <div className="row-label">
                  <span className="limb-indicator" />
                  <strong>{row.label}</strong>
                </div>
                {row.values.map((value, index) => {
                  const isHighlight = index === 2 && rIdx === 0;
                  return (
                    <div
                      key={index}
                      className={`metric-cell ${isHighlight ? 'cell-highlighted' : ''}`}
                    >
                      <span className="metric-num">
                        {value}
                        <small>ms</small>
                      </span>
                      {isHighlight && (
                        <span className="asymmetry-pill">+24% (59 ms)</span>
                      )}
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
                  La recuperación es un{' '}
                  <span className="insight-highlight">24 % más lenta</span> en el lado izquierdo.
                </>
              ) : (
                <>
                  Recovery is{' '}
                  <span className="insight-highlight">24% slower</span> on the left side.
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
        </Reveal>
      </div>
    </section>
  );
}

function Waitlist({ lang, copy }: { lang: Lang; copy: Copy }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [role, setRole] = useState('athlete');
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, role, lang }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }
  return (
    <section id="waitlist" className="waitlist-section">
      <div className="container waitlist-layout">
        <div className="waitlist-copy">
          <h2>
            <span className="lime-dot" aria-hidden="true" />
            {copy.waitTitle}
          </h2>
          <p>{copy.waitBody}</p>
          <div className="waitlist-art" aria-hidden="true">
            <span className="art-circle art-one" />
            <span className="art-circle art-two" />
            <span className="art-cross">✳</span>
            <span className="art-caption">{copy.footerTag.toUpperCase()} / 2027</span>
          </div>
        </div>
        <div className="form-panel">
          {status === 'success' ? (
            <div className="form-success" role="status">
              <span className="success-icon">✓</span>
              <p className="eyebrow">SIJAK / T0</p>
              <h3>{copy.success}</h3>
              <p>{copy.successBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-head">
                <span>{copy.tech.early} / T0</span>
                <span>01 — 07</span>
              </div>
              <div className="form-fields">
                <label>
                  {copy.name}
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    required
                    placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                  />
                </label>
                <label>
                  {copy.email}
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    placeholder="you@example.com"
                  />
                </label>
                <div className="form-two">
                  <label>
                    {copy.country}
                    <input
                      name="country"
                      type="text"
                      autoComplete="country-name"
                      maxLength={80}
                      required
                      placeholder={lang === 'es' ? 'Tu país' : 'Your country'}
                    />
                  </label>
                  <label>
                    {copy.sport}
                    <select name="sport" required defaultValue="">
                      <option value="" disabled>
                        {copy.select}
                      </option>
                      {copy.sports.map((sport, index) => (
                        <option
                          key={sport}
                          value={
                            ['taekwon-do', 'boxing', 'kickboxing', 'muay-thai', 'karate', 'mma'][
                              index
                            ]
                          }
                        >
                          {sport}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <fieldset>
                  <legend>{copy.role}</legend>
                  <div className="role-options">
                    {copy.roles.map((label, index) => (
                      <label
                        key={label}
                        className={
                          role === ['athlete', 'coach', 'club'][index]
                            ? 'role-pill selected'
                            : 'role-pill'
                        }
                      >
                        <input
                          type="radio"
                          name="roleChoice"
                          value={['athlete', 'coach', 'club'][index]}
                          checked={role === ['athlete', 'coach', 'club'][index]}
                          onChange={() => setRole(['athlete', 'coach', 'club'][index])}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label>
                  {copy.count}
                  <input
                    name="athleteCount"
                    type="number"
                    min="0"
                    max="100000"
                    inputMode="numeric"
                    placeholder="—"
                  />
                </label>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
              </div>
              {status === 'error' && (
                <p className="form-error" role="alert">
                  {copy.formError}
                </p>
              )}
              <button
                className="button button-lime submit-button"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? copy.sending : copy.submit}
                <Arrow diagonal />
              </button>
              <label className="consent-label">
                <input type="checkbox" name="consent" required />{' '}
                <span>
                  {copy.privacyNote} <Link href={`/${lang}/privacy`}>{copy.privacy} ↗</Link>
                </span>
              </label>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ lang, copy }: { lang: Lang; copy: Copy }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a className="footer-logo" href="#top">
              SIJAK<span>✳</span>
            </a>
            <p>{copy.footerTag}</p>
          </div>
          <div className="footer-links">
            {process.env.NEXT_PUBLIC_INSTAGRAM_URL ? (
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            ) : (
              <span title={copy.tech.socialSoon}>Instagram ↗</span>
            )}
            {process.env.NEXT_PUBLIC_X_URL ? (
              <a href={process.env.NEXT_PUBLIC_X_URL} target="_blank" rel="noopener noreferrer">
                X ↗
              </a>
            ) : (
              <span title={copy.tech.socialSoon}>X ↗</span>
            )}
            <Link href={`/${lang}/contact`}>{copy.contact} ↗</Link>
            <Link href={`/${lang}/privacy`}>{copy.privacy} ↗</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} SIJAK. {copy.designed}
          </span>
          <span>{copy.photo}</span>
          <a href="#top">{copy.tech.top.toUpperCase()} ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage({ lang, copy }: { lang: Lang; copy: Copy }) {
  return (
    <>
      <Header lang={lang} copy={copy} />
      <main id="main">
        <Hero copy={copy} />
        <Concept copy={copy} />
        <IndustrialDesign lang={lang} />
        <HowItWorks copy={copy} />
        <Sports copy={copy} />
        <System copy={copy} />
        <Coaches lang={lang} copy={copy} />
        <Waitlist lang={lang} copy={copy} />
      </main>
      <Footer lang={lang} copy={copy} />
    </>
  );
}
