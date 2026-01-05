import { test, expect } from '@playwright/test';

test('이벤트 팝업 기능', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).getByRole('link').click();
  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the change
  await expect(page).toHaveURL('https://event.kurly.com/lego/event/2023/0911/join/coupon');

  
  await page.waitForTimeout(2000); // 페이지 로딩 대기

  // 스크린샷 저장
  const screenshotPath = 'screenshots/10th_popup.png';
  await page.screenshot({ path: screenshotPath });
  // 스크린샷이 저장된 경로를 Allure에 첨부
  await test.info().attach('10주년 팝업 스크린샷', {
    body: Buffer.from(await page.screenshot()),
    contentType: 'image/png',

  });
});
  

