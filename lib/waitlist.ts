export interface WaitlistEntry {
  name: string;
  email: string;
  country: string;
  sport: string;
  role: 'athlete' | 'coach' | 'club';
  lang: 'en' | 'es';
  athleteCount: number | null;
  consentVersion: '2026-10';
  createdAt: string;
}

export type WaitlistField =
  'name' | 'email' | 'country' | 'sport' | 'role' | 'lang' | 'consent' | 'athleteCount';

export type WaitlistParseResult =
  { ok: true; entry: WaitlistEntry } | { ok: false; fields: WaitlistField[] };

const SPORTS = ['taekwon-do', 'boxing', 'kickboxing', 'muay-thai', 'karate', 'mma'] as const;
const ROLES = ['athlete', 'coach', 'club'] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida y normaliza una inscripción sin confiar en los controles del navegador.
 * @param value - Cuerpo JSON recibido desde el formulario.
 * @returns Los datos normalizados, o `null` cuando no cumplen el contrato.
 */
export function validateWaitlist(value: unknown): WaitlistEntry | null {
  const result = parseWaitlist(value);
  return result.ok ? result.entry : null;
}

/**
 * Separa una inscripción válida de los campos que hay que corregir.
 * @param value - Cuerpo JSON recibido desde el formulario.
 * @returns La entrada normalizada o la lista de campos rechazados.
 */
export function parseWaitlist(value: unknown): WaitlistParseResult {
  if (!isRecord(value)) {
    return {
      ok: false,
      fields: ['name', 'email', 'country', 'sport', 'role', 'lang', 'consent'],
    };
  }
  const fields: WaitlistField[] = [];
  if (!isText(value.name, 100)) fields.push('name');
  if (!isText(value.email, 254) || !EMAIL_PATTERN.test(value.email.trim())) fields.push('email');
  if (!isText(value.country, 80)) fields.push('country');
  if (!isSport(value.sport)) fields.push('sport');
  if (!isRole(value.role)) fields.push('role');
  if (value.lang !== 'en' && value.lang !== 'es') fields.push('lang');
  if (value.consent !== 'on') fields.push('consent');
  const athleteCount = readAthleteCount(value.athleteCount);
  if (athleteCount === 'invalid') fields.push('athleteCount');
  if (
    fields.length > 0 ||
    athleteCount === 'invalid' ||
    !isSport(value.sport) ||
    !isRole(value.role)
  ) {
    return { ok: false, fields };
  }
  if (value.lang !== 'en' && value.lang !== 'es') return { ok: false, fields: ['lang'] };
  return {
    ok: true,
    entry: {
      name: value.name.trim(),
      email: value.email.trim().toLowerCase(),
      country: value.country.trim(),
      sport: value.sport,
      role: value.role,
      lang: value.lang,
      athleteCount,
      consentVersion: '2026-10',
      createdAt: new Date().toISOString(),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> & {
  name: string;
  email: string;
  country: string;
} {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isText(field: unknown, max: number): field is string {
  return (
    typeof field === 'string' &&
    field.trim().length > 0 &&
    field.trim().length <= max &&
    !/[\u0000-\u001F]/.test(field)
  );
}

function isSport(value: unknown): value is (typeof SPORTS)[number] {
  return typeof value === 'string' && (SPORTS as readonly string[]).includes(value);
}

function isRole(value: unknown): value is (typeof ROLES)[number] {
  return typeof value === 'string' && (ROLES as readonly string[]).includes(value);
}

function readAthleteCount(value: unknown): number | null | 'invalid' {
  if (value === undefined || value === '') return null;
  if (typeof value !== 'string' || !/^\d{1,6}$/.test(value)) return 'invalid';
  const count = Number(value);
  if (count > 100000) return 'invalid';
  return count;
}
