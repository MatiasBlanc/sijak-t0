'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import { Field, fieldProps } from '@/components/ui/Field';
import { FormAlert } from '@/components/ui/FormAlert';
import { LimeDot } from '@/components/ui/LimeDot';
import { useFormNotice } from '@/components/ui/useFormNotice';
import type { Copy, Lang } from '@/lib/copy';
import { postForm } from '@/lib/form';
import { parseWaitlist } from '@/lib/waitlist';

const SPORT_VALUES = ['taekwon-do', 'boxing', 'kickboxing', 'muay-thai', 'karate', 'mma'] as const;
const ROLE_VALUES = ['athlete', 'coach', 'club'] as const;

type WaitlistCopy = Pick<
  Copy,
  | 'waitTitle'
  | 'waitBody'
  | 'footerTag'
  | 'name'
  | 'email'
  | 'country'
  | 'sport'
  | 'role'
  | 'roles'
  | 'sports'
  | 'count'
  | 'select'
  | 'submit'
  | 'sending'
  | 'success'
  | 'successBody'
  | 'privacyNote'
  | 'privacy'
  | 'errors'
> & { early: string };

/** Inscripción. Valida antes de enviar y conserva los datos si el servidor falla. */
export function Waitlist({ lang, copy }: { lang: Lang; copy: WaitlistCopy }) {
  const notice = useFormNotice(copy.errors);
  const [role, setRole] = useState<(typeof ROLE_VALUES)[number]>('athlete');
  const isSpanish = lang === 'es';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const payload = { ...values, role, lang };
    const parsed = parseWaitlist(payload);
    if (!parsed.ok) {
      notice.showFields(parsed.fields);
      return;
    }
    notice.beginSubmit();
    const result = await postForm('/api/waitlist', payload);
    if (!result.ok) {
      notice.showFailure(result.failure);
      return;
    }
    form.reset();
    setRole('athlete');
    notice.setStatus('success');
  }

  return (
    <section id="waitlist" className="waitlist-section">
      <div className="container waitlist-layout">
        <div className="waitlist-copy">
          <h2>
            <LimeDot />
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
          {notice.status === 'success' ? (
            <div className="form-success" role="status">
              <span className="success-icon">✓</span>
              <p className="eyebrow">SIJAK / T0</p>
              <h3>{copy.success}</h3>
              <p>{copy.successBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="form-head">
                <span>{copy.early} / T0</span>
              </div>
              <FormAlert
                title={copy.errors.title}
                messages={notice.messages}
                alertRef={notice.alertRef}
              />
              <div className="form-fields">
                <Field label={copy.name} name="name" error={notice.fieldError('name')}>
                  <input
                    {...fieldProps('name', notice.fieldError('name'))}
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    required
                    placeholder={isSpanish ? 'Tu nombre' : 'Your name'}
                  />
                </Field>
                <Field label={copy.email} name="email" error={notice.fieldError('email')}>
                  <input
                    {...fieldProps('email', notice.fieldError('email'))}
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    placeholder="you@example.com"
                  />
                </Field>
                <div className="form-two">
                  <Field label={copy.country} name="country" error={notice.fieldError('country')}>
                    <input
                      {...fieldProps('country', notice.fieldError('country'))}
                      type="text"
                      autoComplete="country-name"
                      maxLength={80}
                      required
                      placeholder={isSpanish ? 'Tu país' : 'Your country'}
                    />
                  </Field>
                  <Field label={copy.sport} name="sport" error={notice.fieldError('sport')}>
                    <select
                      {...fieldProps('sport', notice.fieldError('sport'))}
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {copy.select}
                      </option>
                      {copy.sports.map((sport, index) => (
                        <option key={sport} value={SPORT_VALUES[index]}>
                          {sport}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <ChoiceGroup
                  legend={copy.role}
                  name="role"
                  value={role}
                  error={notice.fieldError('role')}
                  options={copy.roles.map((label, index) => ({
                    value: ROLE_VALUES[index],
                    label,
                  }))}
                  onChange={(value) => {
                    if (value === 'athlete' || value === 'coach' || value === 'club')
                      setRole(value);
                  }}
                />
                <Field
                  label={copy.count}
                  name="athleteCount"
                  error={notice.fieldError('athleteCount')}
                >
                  <input
                    {...fieldProps('athleteCount', notice.fieldError('athleteCount'))}
                    type="number"
                    min="0"
                    max="100000"
                    inputMode="numeric"
                    placeholder="—"
                  />
                </Field>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                className="submit-button"
                disabled={notice.status === 'sending'}
              >
                {notice.status === 'sending' ? copy.sending : copy.submit}
              </Button>
              <div
                className={
                  notice.fieldError('consent') ? 'consent-block field-invalid' : 'consent-block'
                }
              >
                <label className="consent-label">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    aria-invalid={notice.fieldError('consent') ? true : undefined}
                    aria-describedby={notice.fieldError('consent') ? 'consent-error' : undefined}
                  />
                  <span>
                    {copy.privacyNote} <Link href={`/${lang}/privacy`}>{copy.privacy} ↗</Link>
                  </span>
                </label>
                {notice.fieldError('consent') ? (
                  <span id="consent-error" className="field-error">
                    {notice.fieldError('consent')}
                  </span>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
