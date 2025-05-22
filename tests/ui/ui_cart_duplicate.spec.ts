// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://www.kurly.com/main'); 

 
//   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).click();
//   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('수박');
//   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');

//   await page.locator('//a[1]//div[2]//button[1]').click();
//   await page.getByRole('button', { name: '장바구니 담기' }).click();
//   await page.locator('//a[1]//div[2]//button[1]').click();
//   await page.getByRole('button', { name: '장바구니 담기' }).click();

//   await page.locator('.css-g25h97.e14oy6dx1').click();
//   await expect(page.getByText("[KF365] 당도선별 수박 4kg 이상")).toBeVisible();

//   const quantityLocator = page.locator('//p[contains(@class, "kpds_") and text()="2"]');
//   await expect(quantityLocator).toHaveText('2');
// });
