import { test, expect } from '@playwright/test';

test('뷰티컬리 버튼 동작 테스트', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.getByRole('button', { name: '뷰티컬리' }).click();
  await expect(page).toHaveURL('https://www.kurly.com/main/beauty');
});