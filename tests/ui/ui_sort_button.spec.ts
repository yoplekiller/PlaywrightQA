import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import fs from 'fs';
import path from 'path';

test('🧭 카테고리별 정렬 동작 및 결과 검증', async ({ page }, testInfo) => {
  allure.description('검색 후 정렬 탭(신상품순, 판매량순 등)을 클릭했을 때, 첫 번째 상품이 정상적으로 표시되는지 확인하고 각 상태를 스크린샷으로 기록합니다.');

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

  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  for (const name of categories) {
    // 📌 정렬 탭 클릭
    const tab = page.getByRole('link', { name });
    await expect(tab).toBeVisible();
    await tab.click();

    // ✅ 첫 번째 상품 확인
    const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
    await expect(firstProduct).toBeVisible({ timeout: 5000 });

    // 💡 안정화 대기 (렌더링 지연 대비)
    await page.waitForTimeout(2000);
    

    // 📸 스크린샷 저장 (파일명 안전화)
    const safeName = name.replace(/[^a-zA-Z0-9가-힣]/g, '_');
    const screenshotPath = path.join('screenshots', `sort_${safeName}.png`);
    await page.screenshot({ path: screenshotPath });

    // 🧷 Allure 첨부
    await testInfo.attach(`${name} 정렬 스크린샷`, {
      contentType: 'image/png',
      path: screenshotPath,
    });
  }
});
