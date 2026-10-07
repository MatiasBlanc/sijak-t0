import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseWaitlist, validateWaitlist } from '../lib/waitlist';

const valid = {
  name: 'Test Athlete',
  email: ' TEST@example.com ',
  country: ' Chile ',
  sport: 'taekwon-do',
  role: 'athlete',
  lang: 'es',
  athleteCount: '',
  consent: 'on',
};

test('normaliza una inscripción válida', () => {
  const entry = validateWaitlist(valid);
  assert.ok(entry);
  assert.equal(entry.email, 'test@example.com');
  assert.equal(entry.country, 'Chile');
  assert.equal(entry.athleteCount, null);
  assert.equal(entry.consentVersion, '2026-10');
});

test('acepta atletas, entrenadores y clubes de ambos idiomas', () => {
  for (const role of ['athlete', 'coach', 'club']) {
    for (const lang of ['en', 'es']) assert.ok(validateWaitlist({ ...valid, role, lang }));
  }
});

test('rechaza campos requeridos ausentes y tipos no válidos', () => {
  for (const key of ['name', 'email', 'country', 'sport', 'role', 'lang', 'consent']) {
    assert.equal(validateWaitlist({ ...valid, [key]: undefined }), null, key);
    assert.equal(validateWaitlist({ ...valid, [key]: 123 }), null, key);
  }
  for (const value of [null, [], false, 'data', 123]) assert.equal(validateWaitlist(value), null);
});

test('rechaza correos inválidos, valores fuera del contrato y controles', () => {
  for (const email of ['a', 'a@b', 'a b@example.com', 'a@@b.com'])
    assert.equal(validateWaitlist({ ...valid, email }), null);
  assert.equal(validateWaitlist({ ...valid, sport: 'golf' }), null);
  assert.equal(validateWaitlist({ ...valid, role: 'admin' }), null);
  assert.equal(validateWaitlist({ ...valid, name: 'a\nname' }), null);
  assert.equal(validateWaitlist({ ...valid, name: 'a'.repeat(101) }), null);
  assert.equal(validateWaitlist({ ...valid, consent: false }), null);
});

test('informa los campos que impiden guardar la inscripción', () => {
  const result = parseWaitlist({
    ...valid,
    email: 'no-es-correo',
    consent: false,
    athleteCount: '3.5',
  });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.deepEqual(result.fields, ['email', 'consent', 'athleteCount']);
});

test('valida el número opcional de atletas sin coerciones arbitrarias', () => {
  for (const athleteCount of ['0', '12', '100000'])
    assert.equal(validateWaitlist({ ...valid, athleteCount })?.athleteCount, Number(athleteCount));
  for (const athleteCount of ['-1', '3.5', '1e3', '100001', [], false, 'x'])
    assert.equal(validateWaitlist({ ...valid, athleteCount }), null);
});
