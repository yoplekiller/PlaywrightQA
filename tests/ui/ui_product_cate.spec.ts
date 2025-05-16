// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.getByRole('link', { name: '15%쿠폰+증정 담기 [헤라] New' }).getByRole('button').click();
//   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 13N166,600원74,000원0$/ }).getByLabel('수량올리기').click();
//   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 17C166,600원74,000원0$/ }).getByLabel('수량올리기').click();
//   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 17N166,600원74,000원0$/ }).getByLabel('수량올리기').click();
//   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 21C166,600원74,000원0$/ }).getByLabel('수량올리기').click();
//   await page.getByRole('button', { name: '장바구니 담기' }).click();
//   await page.getByRole('button', { name: '상품 이미지 [헤라] 블랙 쿠션(리필 포함) 17C1' }).click();
//   await page.goto('https://www.kurly.com/cart');
//   const cartItem = page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 17C166,600원74,000원0$/ });
//   await expect(cartItem).toBeVisible();
//   });
