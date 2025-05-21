// import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// import { allure } from 'allure-playwright'; // ✅ Allure 첨부용

// dotenv.config(); 

// const kurly_id = process.env.kurly_id!;
// const kurly_pw = process.env.kurly_pw!;

// test('상품 찜하기 버튼 후 찜하기에 포함되어 있는지 확인', async ({ page }) => {
//   allure.description('로그인 후 찜하기 버튼 클릭 시, 찜하기 화면에 정상적으로 표시되는지 확인합니다.');
//   await page.goto('https://www.kurly.com/main');
//   await page.getByText('로그인').click();

//   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill(kurly_id);
//   // 비밀번호 입력  
//   await page.getByRole('textbox', { name: '비밀번호를 입력해주세요' }).fill(kurly_pw);

//   // 로그인 버튼 클릭
//   await page.getByRole('button', { name: '로그인' }).click();
  
//   await page.getByRole('link', { name: '담기 [압구정주꾸미] 주꾸미 볶음 2종 (택1) 8,' }).click();
//   await page.locator('#product-atf').getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
//   await page.getByRole('button', { name: '찜하기' }).click();

//   await expect(page.getByText("[압구정주꾸미] 주꾸미 볶음 2종 (택1)")).toBeVisible();

//     // 스크린샷 저장       
//     const screenshotPath = 'screenshots/favorite.png';
//     await page.screenshot({ path: screenshotPath });
//     // 스크린샷이 저장된 경로를 Allure에 첨부
//     await allure.attachment('찜하기 스크린샷', Buffer.from(await page.screenshot()), 'image/png');
//     // 스크린샷이 저장된 경로를 콘솔에 출력
//     console.log(`Screenshot saved at: ${screenshotPath}`);
    
// });