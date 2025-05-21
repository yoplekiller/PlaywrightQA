import { test, expect, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';

test('주소 검색 기능 테스트', async ({ page }) => {
  allure.description('주소 검색 기능 테스트');
  await page.goto('https://www.kurly.com/main');
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.locator('.css-14vnom0.e1n3mt0d1').click();
  await page.waitForTimeout(5000);
// });

  
  await page.getByLabel('배송지를 등록하고구매 가능한 상품을 확인하세요!로그인주소 검색').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: '주소 검색' }).click();
  const page1 = await page1Promise;
  await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByText('예) 판교역로 166, 분당 주공, 백현동').click();
  await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('textbox', { name: '검색할 도로명/지번주소를 입력, 예시) 판교역로' }).fill('서울시 을지로 100');
  await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('textbox', { name: '검색할 도로명/지번주소를 입력, 예시) 판교역로' }).press('Enter');
  await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('button', { name: '서울 중구 을지로 100 (파인에비뉴)' }).click();
  await page1.getByRole('button', { name: '저장' }).click();
  await page1.getByRole('button', { name: 'confirm-button' }).click();
  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-14vnom0.e1n3mt0d1').click();

  const addressLocator = page.getByText('서울 중구 을지로 100 (파인에비뉴)');
  await expect(addressLocator).toBeVisible();

  // 스크린샷 저장
  const screenshotPath = 'screenshots/address_search.png';  
  await page.screenshot({ path: screenshotPath });        
  // 스크린샷이 저장된 경로를 Allure에 첨부
  await allure.attachment('주소 검색 스크린샷', Buffer.from(await page.screenshot()), 'image/png');
  // 스크린샷이 저장된 경로를 콘솔에 출력
  console.log(`Screenshot saved at: ${screenshotPath}`);
});

