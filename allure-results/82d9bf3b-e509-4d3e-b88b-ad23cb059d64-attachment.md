# Test info

- Name: 상품 중복 담기 기능 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_duplicate.spec.ts:4:5

# Error details

```
Error: locator.click: Test timeout of 70000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '장바구니 담기' })
    - locator resolved to <button height="56" type="button" class="css-ahkst0 e4nu7ef3">…</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_product_duplicate.spec.ts:12:55
```

# Page snapshot

```yaml
- dialog:
  - img "상품 이미지"
  - text: 속노란 블랙망고 수박 2kg 이상 속노란 블랙망고 수박 2kg 14,925원24,900원
  - button "수량내리기" [disabled]
  - text: "1"
  - button "수량올리기"
  - paragraph: 합계
  - text: 14,925원
  - button "취소"
  - button "장바구니 담기"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { allure } from 'allure-playwright';
   3 |
   4 | test('상품 중복 담기 기능 확인', async ({ page }) => {
   5 |   allure.description('상품을 장바구니에 중복으로 담기 후, 장바구니에서 수량이 정상적으로 증가하는지 확인합니다.');
   6 |
   7 |   await page.goto('https://www.kurly.com/main');
   8 |   await page.locator('.css-vdi47h').click();
   9 |   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('수박');
  10 |   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');
  11 |   await page.getByRole('link', { name: '마감세일 담기 샛별배송 속노란 블랙망고 수박 2kg' }).getByRole('button').click();
> 12 |   await page.getByRole('button', { name: '장바구니 담기' }).click();
     |                                                       ^ Error: locator.click: Test timeout of 70000ms exceeded.
  13 |   await page.getByRole('link', { name: '마감세일 담기 샛별배송 속노란 블랙망고 수박 2kg' }).getByRole('button').click();
  14 |   await page.getByRole('button', { name: '장바구니 담기' }).click();
  15 |   await page.getByRole('button', { name: '1', exact: true }).click();
  16 |
  17 |   const quantityLocator = page.locator('p.kpds_j1jks21');
  18 |   await expect(quantityLocator).toHaveText('2');
  19 |
  20 |   await page.waitForTimeout(2000); // 페이지 로딩 대기
  21 |
  22 |   // 스크린샷 저장
  23 |   const screenshotPath = 'screenshots/cart_duplicate.png';
  24 |   await page.screenshot({ path: screenshotPath });
  25 |   await test.info().attach('장바구니 중복 담기 스크린샷', {
  26 |     body: Buffer.from(await page.screenshot()),
  27 |     contentType: 'image/png',
  28 |   });
  29 | });
```