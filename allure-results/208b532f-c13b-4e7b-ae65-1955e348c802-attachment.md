# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for locator('body > div:nth-child(51) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(3)')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:19:186
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
  13 |   
  14 |   // XPath로 '담기' 버튼을 첫 번째로 찾기
  15 |   const targetButton = page.locator("xpath=(//button[@type='button'][contains(text(),'담기')])[1]");
  16 |   await expect(targetButton).toBeVisible({ timeout: 7000 });
  17 |   await targetButton.click();
  18 |
> 19 |   await page.locator('body > div:nth-child(51) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(3)').click();
     |                                                                                                                                                                                          ^ Error: locator.click: Test timeout of 150000ms exceeded.
  20 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
  21 |   // await expect(page).toHaveURL('https://www.kurly.com/cart');
  22 |
  23 |   // await page.getByRole('button', { name: '2', exact: true }).click();
  24 |   // await page.getByText('전체선택 2/').click();
  25 |   // await page.getByText('전체선택 0/').click();
  26 |   // await page.getByRole('button', { name: '선택삭제' }).click();
  27 |   // await page.getByRole('button', { name: 'confirm-button' }).click();
  28 |   // await page.getByText('전체선택 0/').click();
  29 |   // await expect(page.getByText('장바구니에 담긴 상품이 없습니다.')).toBeVisible();
  30 | });
```