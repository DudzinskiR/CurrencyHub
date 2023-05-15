import { test, expect } from '@playwright/test';
import { getComparator } from 'playwright-core/lib/utils';

test.beforeEach(async ({page}) => {
  await page.goto(`/`);
  await page.waitForLoadState('domcontentloaded');
})

test.describe('Change distribution', () => {

  test("should change chart on period change", async ({page}, testInfo) => {
    let timePicker = page.getByText('MiesiącKwartał', { exact: true });
    await testInfo.attach('time picker', { 
      body: await timePicker.screenshot(), 
      contentType: 'image/png' 
    });


    await testInfo.attach('Change distribution before change', { 
      body: await page.getByText('Analiza par walutMiesiącKwartałWybierz waluty').screenshot(), 
      contentType: 'image/png' 
    });

    const month = timePicker.getByRole('button', { name: 'Miesiąc' });
    const quarter = timePicker.getByRole('button', { name: 'Kwartał' });

    const chart = await page.locator('canvas').nth(0);

    const chartBefore : Buffer = await chart.screenshot();
    await sleep(500);

    const selectedClass = /.*selected*./;
    await expect(month).toHaveClass(selectedClass);
    await expect(quarter).not.toHaveClass(selectedClass);
    await expect(timePicker).toHaveScreenshot('time-picker-before.png');

    await quarter.click();

    timePicker = page.getByText('MiesiącKwartał', { exact: true });
    await expect(month).not.toHaveClass(selectedClass);
    await expect(quarter).toHaveClass(selectedClass);
    await expect(timePicker).toHaveScreenshot('time-picker-after.png');

    await sleep(500);
    const chartAfter: Buffer = await chart.screenshot();

    const comparator = getComparator('image/png');
    await expect(comparator(chartBefore, chartAfter)).not.toBeNull();

    await testInfo.attach('Change distribution after change', { 
      body: await page.getByText('Analiza par walutMiesiącKwartałWybierz waluty').screenshot(), 
      contentType: 'image/png' 
    });
  })

  test("should change chart on currency change", async ({page}, testInfo) => {    
    const sessionAnalysis = await page.getByText("Analiza par walutMiesiącKwartałWybierz waluty");
    const chart = await page.locator('canvas').nth(0);

    const chartBefore : Buffer = await chart.screenshot();
    await sleep(500);

    await testInfo.attach('Change distribution before change', { 
      body: await sessionAnalysis.screenshot(), 
      contentType: 'image/png' 
    });

    const currencyPickerOne = sessionAnalysis.getByText('USDdolar amerykański');
    await currencyPickerOne.click();
    
    const currencyButtonOne = sessionAnalysis.getByRole('button', { name: 'EUR euro' });
    await currencyButtonOne.click();

    const currencyPickerTwo = sessionAnalysis.getByText('GBPfunt szterling');
    await currencyPickerTwo.click();
    
    const currencyButtonTwo = sessionAnalysis.getByRole('button', { name: 'JPY jen (Japonia)' });
    await currencyButtonTwo.click();
    
    await Promise.all([
      page.waitForResponse(res => res.url().includes('change/?one=EUR&two=JPY') && res.status() === 200),
      await page.locator('div').filter({ hasText: /^Wybierz walutyEUReuro-oraz-JPYjen \(Japonia\)Wybierz$/ }).getByRole('button', { name: 'Wybierz' }).click()
    ]);
    
    await sleep(500);
    const chartAfter: Buffer = await chart.screenshot();

    await testInfo.attach('Change distribution after change', { 
      body: await page.getByText("Analiza par walutMiesiącKwartałWybierz waluty").screenshot(), 
      contentType: 'image/png' 
    });

    const comparator = getComparator('image/png');
    await expect(comparator(chartBefore, chartAfter)).not.toBeNull();
  })
});

const sleep = (time: number):Promise<void> => {
  return new Promise(r => setTimeout(r, time));
}