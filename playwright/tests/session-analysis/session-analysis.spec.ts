import { test, expect } from '@playwright/test';
import { getComparator } from 'playwright-core/lib/utils';

test.beforeEach(async ({page}) => {
  await page.goto(`/`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Session Analysis', () => {

  test("should change chart on period change", async ({page}, testInfo) => {
    const timePicker = page.getByText('Week2 WeeksMonthQuarter6 MonthsYear');
    await testInfo.attach('time picker', { 
      body: await timePicker.screenshot(), 
      contentType: 'image/png' 
    });


    await testInfo.attach('Session Analysis before change', { 
      body: await page.getByText('Session analysisWeek2 WeeksMonthQuarter6 MonthsYearSelect currencyDynamic sessio').screenshot(), 
      contentType: 'image/png' 
    });

    const oneWeek = page.getByRole('button', { name: 'Week', exact: true });
    const twoWeeks = page.getByRole('button', { name: '2 Weeks' });

    const chart = await page.locator('canvas').nth(1);

    const chartBefore : Buffer = await chart.screenshot();
    await sleep(500);

    const selectedClass = /.*selected*./;
    await expect(oneWeek).toHaveClass(selectedClass);
    await expect(twoWeeks).not.toHaveClass(selectedClass);
    await expect(timePicker).toHaveScreenshot('time-picker-before.png');

    await twoWeeks.click();

    await expect(oneWeek).not.toHaveClass(selectedClass);
    await expect(twoWeeks).toHaveClass(selectedClass);
    await expect(timePicker).toHaveScreenshot('time-picker-after.png');

    await sleep(500);
    const chartAfter: Buffer = await chart.screenshot();

    const comparator = getComparator('image/png');
    await expect(comparator(chartBefore, chartAfter)).not.toBeNull();

    await testInfo.attach('Session Analysis after change', { 
      body: await page.getByText('Session analysisWeek2 WeeksMonthQuarter6 MonthsYearSelect currencyDynamic sessio').screenshot(), 
      contentType: 'image/png' 
    });
  })

  test("should change chart on currency change", async ({page}, testInfo) => {    
    const sessionAnalysis = await page.getByText("Session analysisWeek2 WeeksMonthQuarter6 MonthsYearSelect currencyDynamic sessio");
    const chart = await page.locator('canvas').nth(1);

    const chartBefore : Buffer = await chart.screenshot();
    await sleep(500);

    await testInfo.attach('Session Analysis before change', { 
      body: await page.getByText('Session analysisWeek2 WeeksMonthQuarter6 MonthsYearSelect currencyDynamic sessio').screenshot(), 
      contentType: 'image/png' 
    });

    const currencyPickerUSD = sessionAnalysis.getByText('USDUnited States Dollar');
    await currencyPickerUSD.click();
    
    const currencyButton = sessionAnalysis.getByRole('button', { name: 'LRD Liberian Dollar' });
    await currencyButton.click();
    
    const button = page.getByRole('button', { name: 'Select' });
    button.nth(1).click()
    await page.waitForResponse(res => res.url().includes('session/?code=LRD') && res.status() === 200);

    await sleep(500);
    const chartAfter: Buffer = await chart.screenshot();

    await testInfo.attach('Session Analysis after change', { 
      body: await page.getByText('Session analysisWeek2 WeeksMonthQuarter6 MonthsYearSelect currencyDynamic sessio').screenshot(), 
      contentType: 'image/png' 
    });

    const comparator = getComparator('image/png');
    await expect(comparator(chartBefore, chartAfter)).not.toBeNull();
  })
});

const sleep = (time: number):Promise<void> => {
  return new Promise(r => setTimeout(r, time));
}