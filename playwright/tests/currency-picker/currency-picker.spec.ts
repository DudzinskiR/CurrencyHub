import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto(`${process.env.ROOT}`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Currency Picker', () => {

  test('should show default currency', async ({ page }) => {
    const currencyPicker = await page.getByText('Wybierz waluteUSDdolar amerykański');

    await expect(currencyPicker).toBeVisible();
    await expect(currencyPicker).toHaveScreenshot('currency-picker.png');
  });

  test('should show list after click and hide after click on other object', async ({ page }, testInfo) => {
    const currencyPicker = await page.getByText('Wybierz waluteUSDdolar amerykański');
    await currencyPicker.click();

    const list = await page.locator('.list-box');

    await expect(list).toBeVisible();

    sleep(4000);

    await expect(page.locator('.list-box')).toHaveScreenshot('currency-picker-list.png');

    await testInfo.attach('Currency picker list', { body: await list.screenshot(), contentType: 'image/png' });

    await page.getByText('Analiza waluty').click();

    await expect(list).not.toBeVisible();
  });
})

const sleep = (time: number):Promise<void> => {
  return new Promise(r => setTimeout(r, time));
}