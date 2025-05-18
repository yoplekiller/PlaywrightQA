# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:3:5

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('.css-4ypn7b.e17x72af0') resolved to 65 elements:
    1) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[아티장 비스킷] 밀러스 베이커 앤 바리스타 비스킷 4종 (택1)커피와 잘 어울리는 아티장 비스킷8,800원188Kurly Only' }).locator('button')
    2) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '쉐이크밀 증정담기샛별배송[컴포트잇츠이너프] 베이크드 쿠키 2종 (택1)곡물이 알알이 씹히는 쿠키5,000원10%4,500원' }).locator('button')
    3) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '쉐이크밀 증정담기샛별배송[컴포트잇츠이너프] 토스티드 브레드 45g자꾸만 손이 가는 간식3,200원10%2,880원' }).locator('button')
    4) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[훈와리 메이진] 콩가루 모찌 과자 75g' }).locator('button')
    5) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[다이코] 노리텐 김부각 과자 2종 (택1)4,480원' }).locator('button')
    6) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[단백질 과자점] 고단백 누네띠네 칩' }).locator('button')
    7) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[로투스] 비스코프 50' }).locator('button')
    8) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[생미쉘] 마들렝 250g' }).locator('button')
    9) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[로투스] 비스코프 샌드 2' }).locator('button')
    10) <button type="button" class="css-4ypn7b e17x72af0">…</button> aka locator('a').filter({ hasText: '담기샛별배송[생미쉘] 화이트 브라우니 210g5,' }).locator('button')
    ...

Call log:
  - expect.toBeVisible with timeout 7000ms
  - waiting for locator('.css-4ypn7b.e17x72af0')

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_product_cancel.spec.ts:16:28
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
  15 |   const nextButton = page.locator('.css-4ypn7b.e17x72af0');
> 16 |   await expect(nextButton).toBeVisible({ timeout: 7000 });
     |                            ^ Error: expect.toBeVisible: Error: strict mode violation: locator('.css-4ypn7b.e17x72af0') resolved to 65 elements:
  17 |   await nextButton.click();
  18 |   await page.locator('.css-ahkst0.e4nu7ef3').click();
  19 |   await page.locator('.css-g25h97.e14oy6dx1').click();
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