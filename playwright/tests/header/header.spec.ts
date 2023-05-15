import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto(`/`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Header', () => {
  test('should contain "Walutownik" text', async ({ page }, testInfo) => {
    const text = await page.getByText('Walutownik');

    await expect(page.locator('.header-bar-2')).toHaveScreenshot('header-bar.png')
    await expect(text).toBeVisible();
    await testInfo.attach('screenshot', { body: await page.locator('.header-bar-2').screenshot(), contentType: 'image/png' });
  });
});
