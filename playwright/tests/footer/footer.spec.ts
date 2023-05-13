import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto(`${process.env.ROOT}`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Footer', () => {
  test('should contain github link', async ({ page }) => {
    const link = await page.getByRole('link');
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('https://github.com/DudzinskiR/finance');
  });

  test('should render footer correctly', async ({page}, testInfo) => {
    await expect(page.locator(".footer-box")).toHaveScreenshot('footer.png');

    await testInfo.attach('footer', { 
      body: await page.locator(".footer-box").screenshot(), 
      contentType: 'image/png' 
    });
  })
});
