'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Field, fieldProps } from '@/components/ui/Field';
import { FormAlert } from '@/components/ui/FormAlert';
import { useFormNotice } from '@/components/ui/useFormNotice';
import { parseContact } from '@/lib/contact';
import type { Copy, Lang } from '@/lib/copy';
import { postForm } from '@/lib/form';

interface ContactFormProps {
  lang: Lang;
  copy: Pick<
    Copy,
    | 'email'
    | 'privacy'
    | 'errors'
    | 'contactMessage'
    | 'contactConsent'
    | 'contactSubmit'
    | 'contactSending'
    | 'contactSuccessTitle'
    | 'contactSuccessBody'
  >;
}

/** Consulta o solicitud de privacidad, con los mismos avisos que la lista de espera. */
export default function ContactForm({ lang, copy }: ContactFormProps) {
  const notice = useFormNotice(copy.errors);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const payload = { ...values, lang };
    const parsed = parseContact(payload);
    if (!parsed.ok) {
      notice.showFields(parsed.fields);
      return;
    }
    notice.beginSubmit();
    const result = await postForm('/api/contact', payload);
    if (!result.ok) {
      notice.showFailure(result.failure);
      return;
    }
    notice.setStatus('success');
  }

  if (notice.status === 'success') {
    return (
      <div className="contact-success" role="status">
        <h2>{copy.contactSuccessTitle}</h2>
        <p>{copy.contactSuccessBody}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <FormAlert title={copy.errors.title} messages={notice.messages} alertRef={notice.alertRef} />
      <div className="form-fields">
        <Field label={copy.email} name="email" error={notice.fieldError('email')}>
          <input
            {...fieldProps('email', notice.fieldError('email'))}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </Field>
        <Field label={copy.contactMessage} name="message" error={notice.fieldError('message')}>
          <textarea
            {...fieldProps('message', notice.fieldError('message'))}
            required
            minLength={5}
            maxLength={3000}
            rows={5}
          />
        </Field>
        <div className="honeypot" aria-hidden="true">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-label="Website" />
        </div>
      </div>
      <div
        className={notice.fieldError('consent') ? 'consent-block field-invalid' : 'consent-block'}
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
            {copy.contactConsent} <Link href={`/${lang}/privacy`}>{copy.privacy} ↗</Link>
          </span>
        </label>
        {notice.fieldError('consent') ? (
          <span id="consent-error" className="field-error">
            {notice.fieldError('consent')}
          </span>
        ) : null}
      </div>
      <Button type="submit" className="submit-button" disabled={notice.status === 'sending'}>
        {notice.status === 'sending' ? copy.contactSending : copy.contactSubmit}
      </Button>
    </form>
  );
}
