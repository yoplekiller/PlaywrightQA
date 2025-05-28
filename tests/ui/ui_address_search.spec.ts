import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test('주소 검색 기능 테스트', async ({ page }) => {
  allure.description('주소 검색 기능 테스트');

  // 메인 진입
  await page.goto('https://www.kurly.com/main');

  const locationBtn = page.locator('.css-14vnom0.e1n3mt0d1');
  await locationBtn.waitFor({ state: 'visible', timeout: 10000 });
  await locationBtn.click();

  // 주소 검색 버튼 클릭
  await page.getByRole('button', { name: '주소 검색' }).click();

  // 최상위 iframe 접근
  const firstFrameHandle = await page.frameLocator('iframe[title="우편번호서비스 레이어 프레임"]');
  const secondFrameHandle = firstFrameHandle.frameLocator('iframe[title="우편번호 검색 프레임"]');

  // 예시 텍스트 클릭 및 검색어 입력
  await secondFrameHandle.getByText('예) 판교역로 166, 분당 주공, 백현동').click();
  const searchBox = secondFrameHandle.getByRole('textbox', { name: /검색할 도로명/ });
  await searchBox.fill('서울시 을지로 100');
  await searchBox.press('Enter');
  await page.waitForTimeout(3000); // 검색 결과 기다림

  // 주소 선택 및 저장
  await secondFrameHandle.getByRole('button', { name: /서울 중구 을지로 100/ }).click();
  await page.getByRole('button', { name: /저장/ }).click();
  await page.getByRole('button', { name: /확인|확정|confirm/i }).click();

  // 다시 메인으로 돌아가서 주소 확인
  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-14vnom0.e1n3mt0d1').click();
  const addressLocator = page.getByText('서울 중구 을지로 100 (파인에비뉴)');
  await expect(addressLocator).toBeVisible();

  // 스크린샷 저장 및 Allure 첨부
  const screenshotPath = 'screenshots/address_search.png';
  await page.screenshot({ path: screenshotPath });
  await allure.attachment('주소 검색 스크린샷', Buffer.from(await page.screenshot()), 'image/png');
  console.log(`Screenshot saved at: ${screenshotPath}`);
});
