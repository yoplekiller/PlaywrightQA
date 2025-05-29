// import { test, expect } from '@playwright/test';
// import { allure } from 'allure-playwright';
// import { getNowString } from '../../src/utils/dataFormat';
// import fs from 'fs';
// import path from 'path';

// test('🛒 검색 → 상세 → 장바구니 담기 → 장바구니 확인', async ({ page }, testInfo) => {
//   // 📘 Allure 리포트 설명
//   allure.description('검색어 "과자"로 검색 후 첫 번째 상품을 선택하고 장바구니에 담은 뒤, 장바구니 페이지에서 해당 상품이 담겨 있는지 확인');

//   await page.goto('https://www.kurly.com/main');

//   const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
//   await searchBox.click();
//   await searchBox.fill('과자');
//   await searchBox.press('Enter');

//   await page.waitForTimeout(2000); // 검색 결과 로딩 대기

//   const firstProduct = page.locator('.css-1dry2r1.e1c07x485').first();
//   await expect(firstProduct).toBeVisible();
//   await firstProduct.click();

//   const cartButton = page.locator('button:has-text("장바구니 담기")');
//   await expect(cartButton).toBeVisible();
//   await cartButton.click();

//   await page.waitForTimeout(2000); // 장바구니 담기 완료 대기

//   await page.goto('https://www.kurly.com/cart');
//   await expect(page).toHaveURL('https://www.kurly.com/cart');

//   const cartProduct = page.locator('text=[오리온] 초코칩쿠키 256g');
//   await expect(cartProduct.first()).toBeVisible();

//   // 📸 스크린샷 저장 + Allure 첨부
//   const now = getNowString();
//   const browserName = testInfo.project.name;
//   const screenshotName = `cart_${browserName}_${now}.png`;
//   const screenshotPath = path.join('screenshots', screenshotName);

//   if (!fs.existsSync('screenshots')) {
//     fs.mkdirSync('screenshots');
//   }

//   await page.screenshot({ path: screenshotPath });

//   await testInfo.attach('🛒 장바구니 확인 스크린샷', {
//     path: screenshotPath,
//     contentType: 'image/png',
//   });

//   await page.waitForTimeout(2000); // 시연용 대기
// });
