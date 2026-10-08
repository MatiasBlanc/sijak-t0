'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { ChoiceGroup } from '@/components/ui/ChoiceGroup';
import { Field, fieldProps } from '@/components/ui/Field';
import { FormAlert } from '@/components/ui/FormAlert';
import { Section, SectionHeader, TechnicalLabel } from '@/components/ui/LandingLayout';
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
    <Section id="waitlist">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <TechnicalLabel className="text-signal">SIJAK / T0</TechnicalLabel>
          <SectionHeader className="mt-6 max-w-xl">
            {copy.waitTitle.slice(0, -3)}<span className="text-signal">T0.</span>
          </SectionHeader>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">{copy.waitBody}</p>
        </div>
        <div className="min-w-0 self-start border border-border bg-surface p-6 lg:p-8">
          {notice.status === 'success' ? (
            <div className="flex min-h-80 flex-col justify-center gap-4" role="status">
              <span className="text-3xl text-signal" aria-hidden="true">✓</span>
              <TechnicalLabel>SIJAK / T0</TechnicalLabel>
              <h3 className="font-heading text-2xl md:text-3xl">{copy.success}</h3>
              <p className="text-base text-muted">{copy.successBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="border-b border-border pb-5"><TechnicalLabel>{copy.early} / T0</TechnicalLabel></div>
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
                {role !== 'athlete' && (
                  <Field label={copy.count} name="athleteCount" error={notice.fieldError('athleteCount')}>
                    <input
                      {...fieldProps('athleteCount', notice.fieldError('athleteCount'))}
                      type="number"
                      min="0"
                      max="100000"
                      inputMode="numeric"
                      placeholder="—"
                    />
                  </Field>
                )}
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
    </Section>
  );
}
