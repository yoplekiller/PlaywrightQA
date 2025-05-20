import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import fs from 'fs';
import path from 'path';
import { getNowString } from '../../src/utils/dataFormat';

test('🛒 장바구니 상품 추가 및 삭제 확인', async ({ page }, testInfo) => {
  // 💬 테스트 설명
  allure.description('상품 상세 페이지에서 장바구니에 상품을 담고, 이후 선택 삭제 후 장바구니가 비어 있는지 확인한다.');

  await page.goto('https://www.kurly.com/main');

  // 상품 상세 페이지 이동 (정확한 상품명은 테스트 환경에 따라 다를 수 있음)
  await page.getByRole('link', {
    name: '최대10% 쿠폰 담기 [거대곰탕] 곰탕 15,000',
  }).click();

  // 장바구니에 담기
  await page.getByRole('button', { name: '장바구니 담기' }).click();

  // 장바구니 팝업 내 이미지 버튼 클릭 (장바구니 이동 예상)
  await page.getByRole('button', {
    name: '상품 이미지 [거대곰탕] 곰탕 장바구니에 상품을 담았습니다',
  }).click();

  // 선택 삭제 + 확인
  await page.getByRole('button', { name: '선택삭제' }).click();
  await page.getByRole('button', { name: 'confirm-button' }).click();

  // 장바구니 비어 있음 메시지 확인
  await expect(
    page.getByText('전체선택 0/0선택삭제장바구니에 담긴 상품이 없습니다')
  ).toBeVisible({ timeout: 5000 });

  // 📸 스크린샷 저장 및 Allure 첨부
  const now = getNowString();
  const browserName = testInfo.project.name;
  const screenshotName = `cart_empty_${browserName}_${now}.png`;
  const screenshotPath = path.join('screenshots', screenshotName);

  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  await page.screenshot({ path: screenshotPath });

  await allure.attachment(
    '🛒 장바구니 상태 확인 스크린샷',
    fs.readFileSync(screenshotPath),
    'image/png'
  );
});
