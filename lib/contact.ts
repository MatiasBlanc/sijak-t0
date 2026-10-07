export interface ContactEntry {
  email: string;
  message: string;
  lang: 'en' | 'es';
}

export type ContactField = 'email' | 'message' | 'consent' | 'lang';

export type ContactParseResult =
  | { ok: true; entry: ContactEntry }
  | { ok: false; fields: ContactField[] };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida una consulta de contacto con las mismas reglas que usa el servidor.
 * @param value - Cuerpo JSON del formulario.
 * @returns El mensaje normalizado o los campos que impiden guardarlo.
 */
export function parseContact(value: unknown): ContactParseResult {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ok: false, fields: ['email', 'message', 'consent', 'lang'] };
  }
  const data = value as Record<string, unknown>;
  const fields: ContactField[] = [];
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (typeof data.email !== 'string' || data.email.length > 254 || !EMAIL_PATTERN.test(email)) {
    fields.push('email');
  }
  if (message.length < 5 || message.length > 3000) fields.push('message');
  if (data.consent !== 'on') fields.push('consent');
  if (data.lang !== 'en' && data.lang !== 'es') fields.push('lang');
  if (fields.length > 0) return { ok: false, fields };
  return {
    ok: true,
    entry: { email, message, lang: data.lang === 'es' ? 'es' : 'en' },
  };
}
