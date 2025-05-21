import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright'; // ✅ Allure 첨부용
import fs from 'fs';  

test('상품 상세페이지 진입 확인', async ({ page }) => {
  allure.description('특정 상품 상세페이지에 진입 후, 해당 상품의 화면이 정상적으로 표시되는지 확인합니다.');

  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-vdi47h').click();
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('바나나');
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');
  await page.getByRole('link', { name: '담기 샛별배송 [KF365] 실속 바나나 1kg 2' }).click();
  await expect(page.getByText('[KF365] 실속 바나나 1kg 2종')).toBeVisible();

  const screenshotPath = 'screenshots/product_detail.png';
  await page.screenshot({ path: screenshotPath });

  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }   
  await test.info().attach('상품 상세페이지 스크린샷', {
    body: Buffer.from(await page.screenshot()),
    contentType: 'image/png',
  });

});

