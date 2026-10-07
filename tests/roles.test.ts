import assert from 'node:assert/strict';
import test from 'node:test';
import { getMultiRoleContent } from '../lib/role-copy';
import { getTranslator } from '../lib/i18n';
import { roles, getEnabledRoleUses } from '../lib/roles';
import { product, productClaims } from '../lib/product';

test('roles comparten configuración de datos y recursos sin duplicarlos en los idiomas', () => {
  for (const lang of ['en', 'es'] as const) {
    const result = getMultiRoleContent(lang);
    assert.deepEqual(
      result.roles.map((role) => role.id),
      ['ankle', 'wrist', 'paddle', 'shield', 'body'],
    );
    assert.equal(result.roles[0].image, roles[0].image);
    assert.ok(result.copy.body.includes(product.name));
    assert.ok(result.copy.caption.join(' ').includes(product.name));
    assert.ok(result.roles.every((role) => role.alt.includes(product.name)));
    assert.ok(result.roles.every((role) => role.metrics.every(Boolean)));
    assert.ok(result.roles[2].alt.toLowerCase().includes(lang === 'es' ? 'mango' : 'handle'));
  }
});

test('interpolación depende del producto y rechaza parámetros omitidos', () => {
  const t = getTranslator('en', 'landing');
  assert.ok(t('multiRole.body', { productName: 'Otro nombre' }).includes('Otro nombre'));
  assert.throws(() => t('multiRole.body'), /Falta el parámetro/);
  assert.throws(() => t('missing.key'), /No existe la traducción/);
});

test('deshabilitar una capacidad suprime sus etiquetas', () => {
  const disabled = { ...productClaims, reaction: false, impactDetection: false };
  assert.equal(getEnabledRoleUses(roles[0], disabled).includes('reaction'), false);
  assert.equal(getEnabledRoleUses(roles[2], disabled).includes('impactDetection'), false);
});
