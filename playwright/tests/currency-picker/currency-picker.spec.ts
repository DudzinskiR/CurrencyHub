import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto(`/`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Currency Picker', () => {

  test('should show default currency', async ({ page }) => {
    const currencyPicker = await page.getByText('Select currenciesAnalysis of the volatility of a currency pair\'s value over a sp');

    await expect(currencyPicker).toBeVisible();
    await expect(currencyPicker).toHaveScreenshot('currency-picker.png');
  });

  test('should show list after click and hide after click on other object', async ({ page }, testInfo) => {
    const currencyPicker = await page.getByRole('button', { name: 'USD United States Dollar' }).first()
    await currencyPicker.click();

    const list = await page.locator('.list-box');

    await expect(list).toBeVisible();

    await sleep(500);

    await expect(page.locator('.list-box')).toHaveScreenshot('currency-picker-list.png');

    await testInfo.attach('Currency picker list', { body: await list.screenshot(), contentType: 'image/png' });

    await page.getByText('Change distribution').click();

    await expect(list).not.toBeVisible();
  });
})

const sleep = (time: number):Promise<void> => {
  return new Promise(r => setTimeout(r, time));
}