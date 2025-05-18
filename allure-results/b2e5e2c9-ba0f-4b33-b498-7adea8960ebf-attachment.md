# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for locator('button.css-4ypn7b.e17x72af0')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:4:53
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
>  4 |   await page.locator('button.css-4ypn7b.e17x72af0').click();
     |                                                     ^ Error: locator.click: Test timeout of 150000ms exceeded.
   5 |
   6 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).fill('과자');
   7 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).press('Enter');
   8 |   await page.getByRole('link', { name: '담기 샛별배송 [아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) 커피와 잘 어울리는 아티장 비스킷 8,800원 188' }).getByRole('button').click();
   9 |   
  10 |   await page.locator('.css-4ypn7b.e17x72af0').click();
  11 |   await page.locator('.css-18y6jr4.e1hx75jb0').click();
  12 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
  13 |   await page.locator('.css-g25h97.e14oy6dx1').click();
  14 |   await expect(page).toHaveURL('https://www.kurly.com/cart');
  15 |
  16 |   await page.getByRole('button', { name: '2', exact: true }).click();
  17 |   await page.getByText('전체선택 2/').click();
  18 |   await page.getByText('전체선택 0/').click();
  19 |   await page.getByRole('button', { name: '선택삭제' }).click();
  20 |   await page.getByRole('button', { name: 'confirm-button' }).click();
  21 |   await page.getByText('전체선택 0/').click();
  22 |   await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
  23 | });
```