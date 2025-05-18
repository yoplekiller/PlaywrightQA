# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('.css-18y6jr4.e1hx75jb0') resolved to 2 elements:
    1) <button type="button" aria-label="수량올리기" class="css-18y6jr4 e1hx75jb0"></button> aka locator('div').filter({ hasText: /^\[아티장 비스킷\] 밀러스 베이커앤바리스타 바닐라 비스킷 120g8,800원0$/ }).getByLabel('수량올리기')
    2) <button type="button" aria-label="수량올리기" class="css-18y6jr4 e1hx75jb0"></button> aka locator('div').filter({ hasText: /^\[아티장 비스킷\] 밀러스 베이커앤바리스타 스파이스드 카라멜 비스킷 120g8,800원0$/ }).getByLabel('수량올리기')

Call log:
  - waiting for locator('.css-18y6jr4.e1hx75jb0')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:15:48
```

# Page snapshot

```yaml
- dialog:
  - img "상품 이미지"
  - text: "[아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1) [아티장 비스킷] 밀러스 베이커앤바리스타 바닐라 비스킷 120g 8,800원"
  - button "수량내리기" [disabled]
  - text: "0"
  - button "수량올리기"
  - text: "[아티장 비스킷] 밀러스 베이커앤바리스타 스파이스드 카라멜 비스킷 120g 8,800원"
  - button "수량내리기" [disabled]
  - text: "0"
  - button "수량올리기"
  - text: (품절) [아티장 비스킷] 밀러스 베이커앤바리스타 더블초콜릿 비스킷 120g 8,800원 (품절) [아티장 비스킷] 밀러스 베이커앤바리스타 사워체리 비스킷 120g 8,800원
  - paragraph: 합계
  - text: 0원
  - button "취소"
  - button "장바구니 담기"
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
> 15 |   await page.locator('.css-18y6jr4.e1hx75jb0').click();
     |                                                ^ Error: locator.click: Error: strict mode violation: locator('.css-18y6jr4.e1hx75jb0') resolved to 2 elements:
  16 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
  17 |   await page.locator('.css-g25h97.e14oy6dx1').click();
  18 |   await expect(page).toHaveURL('https://www.kurly.com/cart');
  19 |
  20 |   await page.getByRole('button', { name: '2', exact: true }).click();
  21 |   await page.getByText('전체선택 2/').click();
  22 |   await page.getByText('전체선택 0/').click();
  23 |   await page.getByRole('button', { name: '선택삭제' }).click();
  24 |   await page.getByRole('button', { name: 'confirm-button' }).click();
  25 |   await page.getByText('전체선택 0/').click();
  26 |   await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
  27 | });
```