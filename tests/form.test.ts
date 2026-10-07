import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formErrorMessages, type FormErrorCopy } from '../lib/form';

const copy: FormErrorCopy = {
  title: 'Revisa',
  network: 'Sin conexión',
  unavailable: 'No disponible',
  invalid: 'Inválido',
  unexpected: 'Inesperado',
  tooLarge: 'Demasiado grande',
  fields: { email: 'Correo inválido', consent: 'Falta consentimiento' },
};

test('prioriza el fallo de red y no repite mensajes de campo', () => {
  assert.deepEqual(formErrorMessages(copy, { status: 0, fields: ['email'] }), ['Sin conexión']);
  assert.deepEqual(formErrorMessages(copy, { status: 503, fields: [] }), ['No disponible']);
  assert.deepEqual(
    formErrorMessages(copy, { status: 400, fields: ['email', 'email', 'consent'] }),
    ['Correo inválido', 'Falta consentimiento'],
  );
  assert.deepEqual(formErrorMessages(copy, { status: 400, fields: [] }), ['Inválido']);
  assert.deepEqual(formErrorMessages(copy, { status: 500, fields: [] }), ['Inesperado']);
});
