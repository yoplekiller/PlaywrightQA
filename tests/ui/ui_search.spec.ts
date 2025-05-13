import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-vdi47h').click();
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('양파');
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');
  await page.getByRole('link', { name: '담기 샛별배송 [KF365] 햇 양파 1.8kg' }).getByRole('button').click();
  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  const productTitle = page.getByText('text=[KF365] 햇 양파 1.8kg');
  await expect(productTitle).toBeVisible();
});