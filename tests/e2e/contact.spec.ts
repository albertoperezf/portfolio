import { expect, test } from '@playwright/test';

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
    // Wait for hydration so the submission goes through React instead of a full page post.
    await page.waitForLoadState('networkidle');
  });

  test('reports errors in a focused summary linked to each field', async ({ page }) => {
    await page.getByRole('textbox', { name: /Email/ }).fill('not-an-email');
    await page.getByRole('button', { name: 'Send message' }).click();

    const summary = page.getByRole('alert', { name: 'There is a problem' });
    await expect(summary).toBeFocused();
    await expect(summary).toContainText('Enter your name');

    await summary.getByRole('link', { name: /correct format/ }).click();
    await expect(page.getByRole('textbox', { name: /Email/ })).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByRole('textbox', { name: /Email/ })).toHaveValue('not-an-email');
  });

  test('confirms a valid message', async ({ page }) => {
    await page.getByRole('textbox', { name: /Name/ }).fill('Jane Tester');
    await page.getByRole('textbox', { name: /Email/ }).fill('jane@example.com');
    await page.getByRole('textbox', { name: /Message/ }).fill('Hello Alberto, I really like your portfolio.');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('heading', { name: 'Message sent' })).toBeFocused();
  });

  test('works without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/contact');
    await page.getByRole('textbox', { name: /Name/ }).fill('Jane Tester');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('alert', { name: 'There is a problem' })).toContainText('Enter your email address');
    await expect(page.getByRole('textbox', { name: /Name/ })).toHaveValue('Jane Tester');
    await context.close();
  });
});
