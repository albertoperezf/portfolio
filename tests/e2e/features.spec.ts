import { expect, test } from '@playwright/test';

test.describe('CV', () => {
  for (const locale of ['en', 'es']) {
    test(`the ${locale} PDF is generated from the site content`, async ({ request }) => {
      const response = await request.get(`/cv/alberto-perez-faria-cv-${locale}.pdf`);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toBe('application/pdf');
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
    });
  }

  test('is linked from the hero, the about page, the contact page and the footer', async ({ page }) => {
    for (const path of ['/en', '/en/about', '/en/contact']) {
      await page.goto(path);
      const links = page.locator('a[href="/cv/alberto-perez-faria-cv-en.pdf"]');
      expect(await links.count()).toBeGreaterThanOrEqual(2);
      await expect(links.first()).toHaveAttribute('download', '');
    }
  });
});

test.describe('command menu', () => {
  test('opens with the keyboard and navigates to a page', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('ControlOrMeta+k');

    const input = page.getByRole('combobox', { name: 'Search pages and actions' });
    await expect(input).toBeFocused();
    await input.fill('data grid');
    await expect(page.getByRole('option')).toHaveCount(1);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/en\/lab\/data-grid$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Accessible data grid');
  });

  test('closes with Escape and returns focus to the trigger', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const trigger = page.getByRole('button', { name: 'Search or jump to' });
    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('can switch the theme', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const before = await page.locator('html').getAttribute('data-theme');
    await page.keyboard.press('ControlOrMeta+k');
    await page.getByRole('combobox').fill('theme');
    await page.keyboard.press('Enter');
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', before ?? '');
  });
});

test.describe('data grid demo', () => {
  test('is usable with the keyboard', async ({ page }) => {
    await page.goto('/en/lab/data-grid');
    await page.waitForLoadState('networkidle');
    const grid = page.getByRole('grid', { name: 'Products' });
    await expect(grid).toHaveAttribute('aria-rowcount', '10001');

    await page.getByRole('button', { name: 'Product' }).focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator(':focus')).toHaveAttribute('aria-colindex', '1');
    await page.keyboard.press('PageDown');
    await page.keyboard.press('PageDown');
    await expect(page.locator(':focus').locator('xpath=..')).toHaveAttribute('aria-rowindex', '22');
    await page.keyboard.press('ControlOrMeta+End');
    await expect(page.locator(':focus').locator('xpath=..')).toHaveAttribute('aria-rowindex', '10001');
    await expect(page.locator(':focus')).toBeInViewport();
  });

  test('filters and announces results', async ({ page }) => {
    await page.goto('/en/lab/data-grid');
    await page.getByRole('searchbox', { name: 'Search products' }).fill('cardigan germany');
    await expect(page.getByRole('status').filter({ hasText: 'Showing' })).not.toHaveText(/Showing 10,000/);
    await expect(page.getByRole('gridcell').first()).toContainText('Cardigan');
  });
});

test.describe('layout', () => {
  test('the header fits on small screens without horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('/es/about');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.getByRole('navigation', { name: 'Principal' })).toBeVisible();
  });

  test('project cards are fully clickable', async ({ page }) => {
    await page.goto('/en/work');
    // The card's stretched link covers the whole card, so the click lands on it.
    await page.getByText('The site you are reading').click({ force: true });
    await expect(page).toHaveURL(/\/en\/work\/portfolio$/);
  });
});
