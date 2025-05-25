import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test('상품 중복 담기 기능 확인', async ({ page }) => {
  allure.description('상품을 장바구니에 중복으로 담기 후, 장바구니에서 수량이 정상적으로 증가하는지 확인합니다.');

  await page.goto('https://www.kurly.com/main');
  await page.locator('.css-vdi47h').click();
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('수박');
  await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');
  await page.getByRole('link', { name: '+20%쿠폰 담기 샛별배송 [KF365] 당도선별 수박 4kg 이상 시원하고 달콤한 과즙이 듬뿍 29,900원 16%24,900원 999+' }).getByRole('button').click();
  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await page.getByRole('link', { name: '+20%쿠폰 담기 샛별배송 [KF365] 당도선별 수박 4kg 이상 시원하고 달콤한 과즙이 듬뿍 29,900원 16%24,900원 999+' }).getByRole('button').click();
  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await page.getByRole('button', { name: '상품 이미지 [KF365] 당도선별 수박 4kg' }).click();
  await page.getByRole('button', { name: '1', exact: true }).click();

  const quantityLocator = page.locator('p.kpds_j1jks21');
  await expect(quantityLocator).toHaveText('2');

  // 스크린샷 저장
  const screenshotPath = 'screenshots/cart_duplicate.png';
  await page.screenshot({ path: screenshotPath });
  await test.info().attach('장바구니 중복 담기 스크린샷', {
    body: Buffer.from(await page.screenshot()),
    contentType: 'image/png',
  });
});