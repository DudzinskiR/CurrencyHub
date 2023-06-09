import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto(`/`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Statistics', () => {
  test("should change statistics on change period time", async ({page}, testInfo) => {
    const statisticsBox = page.locator('.currency-statistics-content');

    const oneWeek = page.getByRole('button', { name: 'Week', exact: true });
    const twoWeeks = page.getByRole('button', { name: '2 Weeks' });

    await testInfo.attach('Statistics box', { 
      body: await statisticsBox.screenshot(), 
      contentType: 'image/png' 
    });

    const statisticsTextBefore = await statisticsBox.textContent();

    const selectedClass = /.*selected*./;
    await expect(oneWeek).toHaveClass(selectedClass);
    await expect(twoWeeks).not.toHaveClass(selectedClass);

    await twoWeeks.click();

    await expect(oneWeek).not.toHaveClass(selectedClass);
    await expect(twoWeeks).toHaveClass(selectedClass);

    expect(statisticsTextBefore).not.toContain(await statisticsBox.textContent());
  });

  test("should change statistics on change currency", async ({page}, testInfo) => {
    const statisticsBox = page.locator('.currency-statistics-content');
    const statisticsModule = page.getByText("Change distributionMonthQuarterSelect currenciesAnalysis");

    await testInfo.attach('Statistics box before change', { 
      body: await statisticsBox.screenshot(), 
      contentType: 'image/png' 
    });

    const statisticsTextBefore = await statisticsBox.textContent();
    await page.getByRole('button', { name: 'USD United States Dollar' }).nth(1).click();
    await page.getByPlaceholder('Enter a currency...').fill('ron');
    await page.getByRole('button', { name: 'RON Romanian Leu' }).click();

    const responsePromise = page.waitForResponse(res => res.url().includes('statistics/?code=RON'));
    await page.getByRole('button', { name: 'Select' }).nth(1).click();
    
    expect((await responsePromise).status()).toBe(200);
    
    await testInfo.attach('Statistics box after change', { 
      body: await statisticsBox.screenshot(), 
      contentType: 'image/png' 
    });

    expect(statisticsTextBefore).not.toContain(await statisticsBox.textContent());
  });
});

const sleep = (time: number):Promise<void> => {
  return new Promise(r => setTimeout(r, time));
}