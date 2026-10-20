import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['', '/work', '/work/convocatoria', '/about', '/contact', '/does-not-exist'];

for (const locale of ['en', 'es']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test.describe(`${locale} · ${colorScheme}`, () => {
      test.use({ colorScheme });

      for (const route of routes) {
        test(`/${locale}${route} has no detectable WCAG 2.2 AA violations`, async ({ page }) => {
          await page.goto(`/${locale}${route}`);
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
