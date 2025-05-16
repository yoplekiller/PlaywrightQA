# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_cate.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: '15%쿠폰+증정 담기 [헤라] New' }).getByRole('button')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_cate.spec.ts:4:86
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
>  4 |   await page.getByRole('link', { name: '15%쿠폰+증정 담기 [헤라] New' }).getByRole('button').click();
     |                                                                                      ^ Error: locator.click: Test timeout of 150000ms exceeded.
   5 |   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 13N166,600원74,000원0$/ }).getByLabel('수량올리기').click();
   6 |   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 17C166,600원74,000원0$/ }).getByLabel('수량올리기').click();
   7 |   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 17N166,600원74,000원0$/ }).getByLabel('수량올리기').click();
   8 |   await page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 21C166,600원74,000원0$/ }).getByLabel('수량올리기').click();
   9 |   await page.getByRole('button', { name: '장바구니 담기' }).click();
  10 |   await page.getByRole('button', { name: '상품 이미지 [헤라] 블랙 쿠션(리필 포함) 17C1' }).click();
  11 |   await page.goto('https://www.kurly.com/cart');
  12 |   const cartItem = page.locator('div').filter({ hasText: /^\[헤라\] 블랙 쿠션\(리필 포함\) 17C166,600원74,000원0$/ });
  13 |   await expect(cartItem).toBeVisible();
  14 |   });
  15 |
```