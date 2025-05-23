import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test('📍 주소 검색 기능 테스트', async ({ page }) => {
  allure.description('우편번호 팝업 및 주소 선택 동작 확인');

  await page.goto('https://www.kurly.com/main');
  await page.setViewportSize({ width: 1280, height: 720 });

  // 배송지 설정 버튼 클릭
  await page.locator('.css-14vnom0.e1n3mt0d1').click();

  // 팝업 기다리기
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: '주소 검색' }).click();
  const popup = await popupPromise;

  expect(popup).not.toBeNull();

  const outerFrame = popup.frameLocator('iframe[title="우편번호서비스 레이어 프레임"]');
  const innerFrame = outerFrame.frameLocator('iframe[title="우편번호 검색 프레임"]');

  // 텍스트 클릭 (예시 텍스트가 있는지 확인)
  await expect(innerFrame.getByText('예) 판교역로 166, 분당 주공, 백현동')).toBeVisible({ timeout: 7000 });
  await innerFrame.getByText('예) 판교역로 166, 분당 주공, 백현동').click();

  // 주소 입력
  const searchBox = innerFrame.getByRole('textbox', {
    name: /검색할 도로명\/지번주소를 입력/,
  });

  await searchBox.fill('서울시 을지로 100');
  await searchBox.press('Enter');

  // 결과 선택
  const resultBtn = innerFrame.getByRole('button', {
    name: '서울 중구 을지로 100 (파인에비뉴)',
  });

  await expect(resultBtn).toBeVisible({ timeout: 7000 });
  await resultBtn.click();

  // 저장 및 확인
  await popup.getByRole('button', { name: '저장' }).click();
  await popup.getByRole('button', { name: 'confirm-button' }).click();

  // 다시 메인으로 이동해서 주소 확인
  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-14vnom0.e1n3mt0d1').click();

  const addressLocator = page.getByText('서울 중구 을지로 100 (파인에비뉴)');
  await expect(addressLocator).toBeVisible({ timeout: 5000 });

  // Allure 첨부
  const screenshot = await page.screenshot();
  allure.attachment('📸 주소 검색 확인 스크린샷', screenshot, 'image/png');
});


