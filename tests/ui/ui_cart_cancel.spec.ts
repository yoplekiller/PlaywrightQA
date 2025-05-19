import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.kurly.com/main');
  await page.getByRole('link', { name: '최대10% 쿠폰 담기 [거대곰탕] 곰탕 15,000' }).click();
  await page.getByRole('button', { name: '장바구니 담기' }).click();
  await page.getByRole('button', { name: '상품 이미지 [거대곰탕] 곰탕 장바구니에 상품을 담았습니다' }).click();

 
  await page.getByRole('button', { name: '선택삭제' }).click();
  await page.getByRole('button', { name: 'confirm-button' }).click();
  await expect(page.getByText("전체선택 0/0선택삭제장바구니에 담긴 상품이 없습니다")).toBeVisible();
});