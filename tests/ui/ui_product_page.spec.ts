import { test, expect } from '@playwright/test';

test('상품 상세페이지 진입 확인', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-vdi47h').click();
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('바나나');
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');
  await page.getByRole('link', { name: '담기 샛별배송 [KF365] 실속 바나나 1kg 2' }).click();
  await expect(page.getByText('[KF365] 실속 바나나 1kg 2종')).toBeVisible();

});