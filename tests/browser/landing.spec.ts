import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const lang of ['en', 'es']) {
  for (const width of [320, 390, 768, 1440]) {
    test(`${lang}: estructura y sin desbordamiento a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${lang}`);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.locator('h2').count()).toBe(5);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute(
        'href',
        /\/es$/,
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        /og-image.png/,
      );
    });
  }
  test(`${lang}: auditoría de accesibilidad`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${lang}`);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}

test('los montajes muestran el sensor en su soporte y comparten la misma pieza', async ({
  page,
}) => {
  await page.goto('/en');
  const tabs = page.getByRole('tab');
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute('src', /ankle.webp/);
  await tabs.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute('src', /wrist.webp/);
  await page.keyboard.press('End');
  await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await page.getByRole('button', { name: /03 \/ PADDLE/ }).click();
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute(
    'alt',
    /handle.*away from the striking surface/,
  );
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute('src', /paddle.webp/);
  await tabs.nth(3).click();
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute('alt', /rear webbing/);
  await tabs.nth(4).click();
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute('alt', /waistband/);
});

test('en móvil solo aparece una imagen principal y las pestañas son desplazables', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/es');
  await expect(
    page.getByRole('heading', { name: /UN SENSOR[\s\S]*MÚLTIPLES ROLES/ }),
  ).toBeVisible();
  await expect(page.getByRole('tabpanel').locator('img')).toHaveCount(1);
  await expect(page.getByRole('tab')).toHaveCount(5);
  await page.getByRole('tab', { name: /PALETA/ }).click();
  await expect(page.getByRole('tabpanel').locator('img')).toHaveAttribute('alt', /mango/);
  await expect(page.getByRole('tabpanel')).toContainText('EL MISMO T0. OTRA PERSPECTIVA.');
});

test('español es la entrada principal y cambiar de idioma vuelve al inicio', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/es$/);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  await page.locator('.lang-switch a[href="/en"]').click();
  await expect(page).toHaveURL(/\/en$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  await page.locator('.lang-switch a[href="/es"]').click();
  await expect(page).toHaveURL(/\/es$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('navegación móvil, idioma y cabecera compacta', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.getByRole('link', { name: 'ESPAÑOL' }).click();
  await expect(page).toHaveURL(/\/es$/);
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Para entrenadores' }).click();
  await expect(page.getByRole('navigation')).not.toBeVisible();
  await expect(page.locator('header')).toHaveClass(/compact/);
});

test('valida y confirma la inscripción solo después de respuesta del servidor', async ({
  page,
}) => {
  await page.goto('/es');
  await page.locator('input[name="name"]').fill('Prueba automatizada');
  await page.locator('input[name="email"]').fill('browser-test@example.com');
  await page.locator('input[name="country"]').fill('Chile');
  await page.locator('select[name="sport"]').selectOption('taekwon-do');
  await page.getByLabel('Entrenador/a', { exact: true }).check();
  await page.locator('input[name="athleteCount"]').fill('12');
  await page.locator('input[name="consent"]').check();
  await page.route('**/api/waitlist', async (route) => {
    const body = route.request().postDataJSON();
    expect(body.role).toBe('coach');
    expect(body.lang).toBe('es');
    expect(body.consent).toBe('on');
    await route.fulfill({ status: 201, json: { success: true } });
  });
  await page.getByRole('button', { name: 'Unirme a la lista' }).click();
  await expect(page.getByRole('status')).toContainText('YA ESTÁS DENTRO.');
});

test('muestra un error y permite reintentar sin perder datos', async ({ page }) => {
  await page.goto('/en');
  await page.locator('input[name="name"]').fill('Test');
  await page.locator('input[name="email"]').fill('browser-test@example.com');
  await page.locator('input[name="country"]').fill('Chile');
  await page.locator('select[name="sport"]').selectOption('boxing');
  await page.locator('input[name="consent"]').check();
  await page.route('**/api/waitlist', (route) =>
    route.fulfill({ status: 503, json: { error: 'Unavailable' } }),
  );
  await page.getByRole('button', { name: 'Join the waitlist' }).click();
  await expect(page.locator('form').getByRole('alert')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toHaveValue('browser-test@example.com');
  await expect(page.getByRole('button', { name: 'Join the waitlist' })).toBeEnabled();
});

test('rechaza origen externo y payload inválido sin guardar', async ({ request, baseURL }) => {
  const foreign = await request.post('/api/waitlist', {
    headers: { origin: 'https://example.org' },
    data: {},
  });
  expect(foreign.status()).toBe(403);
  const invalid = await request.post('/api/waitlist', { headers: { origin: baseURL! }, data: {} });
  expect(invalid.status()).toBe(400);
  const huge = await request.post('/api/waitlist', {
    headers: { origin: baseURL! },
    data: { name: 'x'.repeat(9000) },
  });
  expect(huge.status()).toBe(413);
});
