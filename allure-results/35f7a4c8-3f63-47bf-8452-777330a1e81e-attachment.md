# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: Timed out 7000ms waiting for expect(locator).toBeVisible()

Locator: locator('button.css-mxd3pm.ekdqe1a0')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 7000ms
  - waiting for locator('button.css-mxd3pm.ekdqe1a0')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:5:26
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |   const myButton = page.locator('button.css-mxd3pm.ekdqe1a0');
>  5 |   await expect(myButton).toBeVisible({ timeout: 7000 }); // 최대 7초 대기
     |                          ^ Error: Timed out 7000ms waiting for expect(locator).toBeVisible()
   6 |   await myButton.click();
   7 |   
   8 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).fill('과자');
   9 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).press('Enter');
  10 |   await page.getByRole('link', { name: '담기 샛별배송 [아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) 커피와 잘 어울리는 아티장 비스킷 8,800원 188' }).getByRole('button').click();
  11 |   
  12 |   await page.locator('.css-4ypn7b.e17x72af0').click();
  13 |   await page.locator('.css-18y6jr4.e1hx75jb0').click();
  14 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
  15 |   await page.locator('.css-g25h97.e14oy6dx1').click();
  16 |   await expect(page).toHaveURL('https://www.kurly.com/cart');
  17 |
  18 |   await page.getByRole('button', { name: '2', exact: true }).click();
  19 |   await page.getByText('전체선택 2/').click();
  20 |   await page.getByText('전체선택 0/').click();
  21 |   await page.getByRole('button', { name: '선택삭제' }).click();
  22 |   await page.getByRole('button', { name: 'confirm-button' }).click();
  23 |   await page.getByText('전체선택 0/').click();
  24 |   await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
  25 | });
```