import { test, expect } from '@playwright/test';

test.describe('카테고리 기능 테스트', () => {
  test('상품 검색 후 카테고리 버튼들이 동작 하는지 확인', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 검색
    const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
    await searchBox.fill('과자');
    await searchBox.press('Enter');
    await page.waitForTimeout(12000);

    // 카테고리 버튼 테스트 함수
    const categories = [
      { name: '추천순', screenshot: '추천순' },
      { name: '낮은 가격순', screenshot: '낮은가격순' },
      { name: '높은 가격순', screenshot: '높은가격순' },
      { name: '판매량순', screenshot: '판매량순' },
      { name: '혜택순', screenshot: '혜택순' },
      { name: '신상품순', screenshot: '신상품순' },
    ];

    for (const { name, screenshot } of categories) {
      try {
        const categoryButton = page.locator(`a:has-text("${name}")`);
        await expect(categoryButton).toBeVisible({ timeout: 5000 });
        await categoryButton.click();
        await page.waitForTimeout(12000);

        await page.screenshot({ path: `screenshots_category/${screenshot}.png` });
      } catch (e) {
        await page.screenshot({ path: `screenshots_category/${screenshot}_실패.png` });
        throw new Error(`❌ '${name}' 테스트 실패: ${e}`);
      }
    }
  });
});