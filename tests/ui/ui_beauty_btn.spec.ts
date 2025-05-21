import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright'; // ✅ 현재 사용 가능

test('🔘 뷰티컬리 버튼 동작 테스트', async ({ page }) => {
  // 📝 테스트 설명 추가
  allure.description('홈페이지에서 "뷰티컬리" 버튼 클릭 시 뷰티 페이지로 이동하는지 확인');

  // 페이지 진입
  await page.goto('https://www.kurly.com/main');

  // 버튼 클릭
  const beautyButton = page.getByRole('button', { name: '뷰티컬리' });
  await expect(beautyButton).toBeVisible({ timeout: 5000 });
  await beautyButton.click();

  // URL 검증
  await expect(page).toHaveURL('https://www.kurly.com/main/beauty');

  // 📸 스크린샷 저장 및 Allure 첨부
  const screenshotPath = 'screenshots/beauty_kurly_click.png';
  await page.screenshot({ path: screenshotPath });

  await allure.attachment('뷰티컬리 이동 결과 화면', Buffer.from(await page.screenshot()), 'image/png');
});
