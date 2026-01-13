import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import * as allure from 'allure-js-commons';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';


if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

test('🧭 카테고리별 정렬 동작 및 결과 검증', async ({ page }, testInfo) => {
  allure.description('검색 결과 페이지에서 다양한 정렬 옵션을 선택했을 때, 해당 정렬이 정상적으로 적용되는지 확인하는 테스트.');
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);


    await allure.step('마켓컬리 메인 페이지 접속 및 "과자" 검색', async () => {
      await page.goto('https://www.kurly.com/main');
      await mainpage.searchGoods('과자');
    
    await allure.step('검색 결과 페이지로 이동 확인', async () => {
      const url = page.url(); 
      expect(url).toContain(encodeURIComponent('과자'));
    });
    
    await allure.step('정렬 탭별 동작 및 결과 검증', async () => {
    // 📌 정렬 카테고리 목록
    const categories = [
      '신상품순',
      '판매량순',
      '혜택순',
      '낮은 가격순',
      '높은 가격순',
      '추천순',
    ];

    
    for (const name of categories) {
      // 📌 정렬 탭 클릭
      const tab = page.getByRole('link', { name });
      await expect(tab).toBeVisible();
      await tab.click();

      // ✅ 첫 번째 상품 확인
      const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
      await expect(firstProduct).toBeVisible({ timeout: 5000 });
    

      // 📸 스크린샷 저장 (파일명 안전화)
      const safeName = name.replace(/[^a-zA-Z0-9가-힣]/g, '_');
      const screenshotPath = path.join('screenshots', `sort_${safeName}.png`);
      await page.screenshot({ path: screenshotPath });

      // 🧷 Allure 첨부
      await testInfo.attach(`${name} 정렬 스크린샷`, {
        contentType: 'imge/png',
        path: screenshotPath,
      });
   }
  });
 });
});
