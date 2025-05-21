# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_test_address_search.spec.ts:3:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: '마켓컬리뷰티컬리' })

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_test_address_search.spec.ts:6:56
```

# Test source

```ts
   1 | import { test, expect, Locator } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |   await page.goto('https://www.kurly.com/main');
   5 |   await page.setViewportSize({ width: 1280, height: 720 });
>  6 |   await page.getByRole('button', { name: '마켓컬리뷰티컬리' }).click();
     |                                                        ^ Error: locator.click: Target page, context or browser has been closed
   7 |   await page.waitForTimeout(5000);
   8 | });
   9 |
  10 |   
  11 | //   await page.getByLabel('배송지를 등록하고구매 가능한 상품을 확인하세요!로그인주소 검색').click();
  12 | //   const page1Promise = page.waitForEvent('popup');
  13 | //   await page.getByRole('button', { name: '주소 검색' }).click();
  14 | //   const page1 = await page1Promise;
  15 | //   await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByText('예) 판교역로 166, 분당 주공, 백현동').click();
  16 | //   await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('textbox', { name: '검색할 도로명/지번주소를 입력, 예시) 판교역로' }).fill('서울시 을지로 100');
  17 | //   await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('textbox', { name: '검색할 도로명/지번주소를 입력, 예시) 판교역로' }).press('Enter');
  18 | //   await page1.locator('iframe[title="우편번호서비스 레이어 프레임"]').contentFrame().locator('iframe[title="우편번호 검색 프레임"]').contentFrame().getByRole('button', { name: '서울 중구 을지로 100 (파인에비뉴)' }).click();
  19 | //   await page1.getByRole('button', { name: '저장' }).click();
  20 | //   await page1.getByRole('button', { name: 'confirm-button' }).click();
  21 | //   await page.goto('https://www.kurly.com/main');
  22 | //   await page.getByText('서울 중구 을지로 100 (파인에비뉴)').click({
  23 | //     button: 'right'
  24 | //   });
  25 | //   await page.getByLabel('서울 중구 을지로 100').click();
  26 | //   await page.getByText('서울 중구 을지로 100 (파인에비뉴)').click({
  27 | //     button: 'right'
  28 | //   });
  29 | // });
```