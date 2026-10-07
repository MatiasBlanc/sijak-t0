'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/copy';

export default function ContactForm({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const isSpanish = lang === 'es';
  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, lang }),
      });
      if (!response.ok) throw new Error('No se pudo guardar el mensaje.');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }
  if (status === 'success')
    return (
      <div className="contact-success" role="status">
        <h2>{isSpanish ? 'MENSAJE RECIBIDO.' : 'MESSAGE RECEIVED.'}</h2>
        <p>
          {isSpanish
            ? 'Tu mensaje quedó registrado para revisión del equipo SIJAK.'
            : 'Your message has been saved for the SIJAK team to review.'}
        </p>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-fields">
        <label>
          {isSpanish ? 'Correo electrónico' : 'Email'}
          <input name="email" type="email" autoComplete="email" required maxLength={254} />
        </label>
        <label>
          {isSpanish ? 'Mensaje o solicitud de privacidad' : 'Message or privacy request'}
          <textarea name="message" required minLength={5} maxLength={3000} rows={5} />
        </label>
        <div className="honeypot" aria-hidden="true">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-label="Website" />
        </div>
      </div>
      <label className="consent-label">
        <input type="checkbox" name="consent" required />
        <span>
          {isSpanish
            ? 'Acepto que SIJAK utilice estos datos para gestionar mi consulta.'
            : 'I agree to SIJAK using these details to handle my request.'}{' '}
          <Link href={`/${lang}/privacy`}>{isSpanish ? 'Privacidad' : 'Privacy'} ↗</Link>
        </span>
      </label>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {isSpanish
            ? 'No se pudo enviar. Inténtalo de nuevo.'
            : 'Could not send. Please try again.'}
        </p>
      )}
      <button
        type="submit"
        className="button button-lime submit-button"
        disabled={status === 'sending'}
      >
        {status === 'sending'
          ? isSpanish
            ? 'Enviando...'
            : 'Sending...'
          : isSpanish
            ? 'Enviar mensaje'
            : 'Send message'}{' '}
        ↗
      </button>
    </form>
  );
}
