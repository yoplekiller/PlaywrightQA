# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_choice_toggle.spec.ts:3:5

# Error details

```
Error: locator.click: Test timeout of 150000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: '담기 [압구정주꾸미] 주꾸미 볶음 2종 (택1) 8,' })

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_choice_toggle.spec.ts:13:75
```

# Page snapshot

```yaml
- dialog:
  - text: 아이디, 비밀번호를 확인해주세요.
  - button "confirm-button": 확인
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |   await page.goto('https://www.kurly.com/main');
   5 |   await page.getByText('로그인').click();
   6 |
   7 |   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill('kurly_id');
   8 |   await page.getByRole('textbox', { name: '비밀번호를 입력해주세요' }).fill('kurly_pw');
   9 |
  10 |   // 로그인 버튼 클릭
  11 |   await page.getByRole('button', { name: '로그인' }).click();
  12 |   
> 13 |   await page.getByRole('link', { name: '담기 [압구정주꾸미] 주꾸미 볶음 2종 (택1) 8,' }).click();
     |                                                                           ^ Error: locator.click: Test timeout of 150000ms exceeded.
  14 |   await page.locator('#product-atf').getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  15 |   await page.getByRole('button', { name: '찜하기' }).click();
  16 |
  17 |   await expect(page.getByText("[압구정주꾸미] 주꾸미 볶음 2종 (택1)")).toBeVisible();
  18 |
  19 | });
```