# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_choice_toggle.spec.ts:9:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: '담기 [압구정주꾸미] 주꾸미 볶음 2종 (택1) 8,' })

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_choice_toggle.spec.ts:20:75
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import dotenv from 'dotenv';
   3 |
   4 | dotenv.config(); 
   5 |
   6 | const KURLY_ID = process.env.kurly_id;
   7 | const KURLY_PW = process.env.kurly_pw;
   8 |
   9 | test('test', async ({ page }) => {
  10 |   await page.goto('https://www.kurly.com/main');
  11 |   await page.getByText('로그인').click();
  12 |
  13 |   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill('kurly_id');
  14 |   // 비밀번호 입력  
  15 |   await page.getByRole('textbox', { name: '비밀번호를 입력해주세요' }).fill('kurly_pw');
  16 |
  17 |   // 로그인 버튼 클릭
  18 |   await page.getByRole('button', { name: '로그인' }).click();
  19 |   
> 20 |   await page.getByRole('link', { name: '담기 [압구정주꾸미] 주꾸미 볶음 2종 (택1) 8,' }).click();
     |                                                                           ^ Error: locator.click: Target page, context or browser has been closed
  21 |   await page.locator('#product-atf').getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  22 |   await page.getByRole('button', { name: '찜하기' }).click();
  23 |
  24 |   await expect(page.getByText("[압구정주꾸미] 주꾸미 볶음 2종 (택1)")).toBeVisible();
  25 |
  26 | });
```