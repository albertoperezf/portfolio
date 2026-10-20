import { expect, test } from '@playwright/test';

test.describe('language', () => {
  test('first visit follows the browser language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'es-ES' });
    const page = await context.newPage();
    await page.goto('/about');
    await expect(page).toHaveURL(/\/es\/about$/);
    await context.close();
  });

  test('falls back to English for unsupported languages', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
    await context.close();
  });

  test('the switcher keeps the page and remembers the choice', async ({ page }) => {
    await page.goto('/en/work');
    await page.getByRole('navigation', { name: 'Language' }).getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/work$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');

    await page.goto('/');
    await expect(page).toHaveURL(/\/es$/);
  });

  test('exposes hreflang alternates', async ({ page }) => {
    await page.goto('/en/about');
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', /\/es\/about$/);
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', /\/en\/about$/);
  });
});

test.describe('theme', () => {
  test.use({ colorScheme: 'light' });

  test('the toggle switches theme and the choice survives navigation and reloads', async ({ page }) => {
    await page.goto('/en');
    const toggle = page.getByRole('button', { name: 'Dark theme' });
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // The inline script must apply the saved theme before first paint.
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(12, 10, 9)');
  });

  test('defaults to the system preference', async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await context.close();
  });
});

test.describe('navigation', () => {
  test('the skip link moves focus to the main content', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium');
    await page.goto('/en');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('marks the current page in the main navigation', async ({ page }) => {
    await page.goto('/en/work/convocatoria');
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('unknown pages return 404 in the right language', async ({ page }) => {
    const response = await page.goto('/es/nada');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página no encontrada');
  });
});

test('contact page links to LinkedIn, GitHub and Stack Overflow', async ({ page }) => {
  await page.goto('/en/contact');
  const main = page.getByRole('main');
  await expect(main.getByRole('link', { name: /^LinkedIn/ })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/albertojpf',
  );
  await expect(main.getByRole('link', { name: /^GitHub/ })).toHaveAttribute('href', 'https://github.com/albertoperezf');
  await expect(main.getByRole('link', { name: /^Stack Overflow/ })).toHaveAttribute(
    'href',
    'https://stackoverflow.com/users/6450931/alberto-perez',
  );
  await expect(main.locator('form')).toHaveCount(0);
});
