import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// axe on long pages can exceed the default 30 s when many workers run in parallel.
test.describe.configure({ timeout: 60_000 });

const routes = [
  '',
  '/work',
  '/work/convocatoria',
  '/work/portfolio',
  '/lab/data-grid',
  '/about',
  '/contact',
  '/accessibility',
  '/does-not-exist',
];

for (const locale of ['en', 'es']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`${locale} · ${colorScheme}`, () => {
      test.use({ colorScheme });

      for (const route of routes) {
        test(`/${locale}${route} has no detectable WCAG 2.2 AA violations`, async ({ page }) => {
          await page.goto(`/${locale}${route}`);
          await page.waitForLoadState('networkidle');
          await expect(page.locator('html')).toHaveAttribute('lang', locale);
          await expect(page.locator('html')).toHaveAttribute('data-theme', colorScheme);
          await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

          const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
            .analyze();
          expect(results.violations).toEqual([]);
        });
      }
    });
  }
}
