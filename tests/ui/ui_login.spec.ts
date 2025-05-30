// import { test, expect } from '@playwright/test';
// import { allure } from 'allure-playwright';
// import path from 'path';
// import fs from 'fs';
// import { getNowString } from '../../src/utils/dataFormat';
// import dotenv from 'dotenv';

// dotenv.config(); 

// const KURLY_ID = process.env.kurly_id!;
// const KURLY_PW = process.env.kurly_pw!;

// test('🔐 로그인 후 메인 버튼 확인 테스트', async ({ page }, testInfo) => {
//   // 💬 테스트 설명
//   allure.description('올바른 아이디/비밀번호 입력 후, 메인 화면에서 "마켓컬리" 및 "뷰티컬리" 버튼이 정상적으로 표시되는지 확인합니다.');

//   // 마켓컬리 접속
//   await page.goto('https://www.kurly.com/main');

//   // 로그인 페이지로 이동
//   await page.locator('a').filter({ hasText: '로그인' }).click();

 
//   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill('kurly_id');
//   await page.getByRole('text box', { name: '비밀번호를 입력해주세요' }).fill('kurly_pw');

  
//   await page.getByRole('button', { name: '로그인' }).click();

//   // 💡 로그인 성공 후 요소 확인 (버튼 존재 확인)
//   const marketButton = page.getByRole('button', { name: '마켓컬리' });
//   const beautyButton = page.getByRole('button', { name: '뷰티컬리' });

//   await expect(marketButton).toBeVisible({ timeout: 5000 });
//   await expect(beautyButton).toBeVisible({ timeout: 5000 });

//   // 💾 스크린샷 저장 + Allure 첨부
//   const now = getNowString();
//   const browserName = testInfo.project.name;
//   const screenshotName = `login_success_${browserName}_${now}.png`;
//   const screenshotPath = path.join('screenshots', screenshotName);

//   if (!fs.existsSync('screenshots')) {
//     fs.mkdirSync('screenshots');
//   }

//   await page.screenshot({ path: screenshotPath });

//   await allure.attachment(
//     '✅ 로그인 성공 후 화면',
//     fs.readFileSync(screenshotPath),
//     'image/png'
//   );
// });
