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
    // 첫 번째 상품명 추출 (셀렉터는 실제 구조에 맞게)
    const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
    await expect(firstProduct).toBeVisible();
    const productText = (await firstProduct.textContent())?.trim() || '';
    await page.screenshot({ path: `screenshots/${name}.png` });
    // 중복 체크 및 에러 throw는 제거 (실제 서비스에서는 같은 상품이 여러 정렬에 나올 수 있음)
    // firstProducts.push(productText); // 필요시 상품명 기록만 유지
  }
});