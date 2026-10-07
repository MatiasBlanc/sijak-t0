import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseContact } from '../lib/contact';

const valid = {
  email: ' Test@example.com ',
  message: '  Quiero eliminar mis datos.  ',
  consent: 'on',
  lang: 'es',
};

test('normaliza una consulta válida', () => {
  const result = parseContact(valid);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.entry.email, 'test@example.com');
  assert.equal(result.entry.message, 'Quiero eliminar mis datos.');
  assert.equal(result.entry.lang, 'es');
});

test('informa correo, mensaje, consentimiento e idioma inválidos', () => {
  const result = parseContact({ email: 'a@b', message: 'hola', consent: false, lang: 'fr' });
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.deepEqual(result.fields, ['email', 'message', 'consent', 'lang']);
});
