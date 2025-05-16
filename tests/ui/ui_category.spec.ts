import { test, expect } from '@playwright/test';

test('카테고리별 정렬 동작 및 검증', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  const searchBox = page.getByRole('textbox', { name: '검색어를 입력해주세요' });
  await searchBox.click();
  await searchBox.fill('과자');
  await searchBox.press('Enter');

  const categories = [
    '신상품순',
    '판매량순',
    '혜택순',
    '낮은 가격순',
    '높은 가격순',
    '추천순',
  ];
  
  for (const name of categories) {
    await page.getByRole('link', { name }).click();
    const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
    await expect(firstProduct).toBeVisible();
    const productText = (await firstProduct.textContent())?.trim() || '';
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
    await page.screenshot({ path: `screenshots/${name}.png` });
  }
});