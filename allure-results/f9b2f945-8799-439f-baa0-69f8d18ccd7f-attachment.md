# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for locator('.css-g25h97.e14oy6dx1')
    - locator resolved to <button class="css-g25h97 e14oy6dx1"></button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="swal2-container swal2-center swal2-backdrop-show">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="swal2-container swal2-center swal2-backdrop-show">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    258 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <div class="swal2-container swal2-center swal2-backdrop-show">…</div> intercepts pointer events
      - retrying click action
        - waiting 500ms

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:19:47
```

# Page snapshot

```yaml
- dialog:
  - text: "[아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) 상품의 최소 구매 수량은 1개 입니다."
  - button "confirm-button": 확인
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |
   5 |   await page.goto('https://www.kurly.com/main');
   6 |   // 더 견고하게: 버튼 텍스트로 찾기 (뷰티컬리)
   7 |   const myButton = page.locator('button:has-text("뷰티컬리")');
   8 |   await expect(myButton).toBeVisible({ timeout: 7000 });
   9 |   await myButton.click();
  10 |
  11 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).fill('과자');
  12 |   await page.getByRole('textbox', { name: '뷰티 상품을 검색하세요' }).press('Enter');
  13 |   await page.getByRole('link', { name: '담기 샛별배송 [아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) 커피와 잘 어울리는 아티장 비스킷 8,800원 188' }).getByRole('button').click();
  14 |   
  15 |
  16 |   
  17 |   
  18 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
> 19 |   await page.locator('.css-g25h97.e14oy6dx1').click();
     |                                               ^ Error: locator.click: Test timeout of 150000ms exceeded.
  20 |   await expect(page).toHaveURL('https://www.kurly.com/cart');
  21 |
  22 |   await page.getByRole('button', { name: '2', exact: true }).click();
  23 |   await page.getByText('전체선택 2/').click();
  24 |   await page.getByText('전체선택 0/').click();
  25 |   await page.getByRole('button', { name: '선택삭제' }).click();
  26 |   await page.getByRole('button', { name: 'confirm-button' }).click();
  27 |   await page.getByText('전체선택 0/').click();
  28 |   await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
  29 | });
```