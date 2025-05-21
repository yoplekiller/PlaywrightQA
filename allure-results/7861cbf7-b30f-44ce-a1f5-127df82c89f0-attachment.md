# Test info

- Name: 🔐 로그인 후 메인 버튼 확인 테스트
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_login.spec.ts:7:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('button', { name: '마켓컬리' })
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByRole('button', { name: '마켓컬리' })

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_login.spec.ts:28:30
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
   2 | import { allure } from 'allure-playwright';
   3 | import path from 'path';
   4 | import fs from 'fs';
   5 | import { getNowString } from '../../src/utils/dataFormat';
   6 |
   7 | test('🔐 로그인 후 메인 버튼 확인 테스트', async ({ page }, testInfo) => {
   8 |   // 💬 테스트 설명
   9 |   allure.description('올바른 아이디/비밀번호 입력 후, 메인 화면에서 "마켓컬리" 및 "뷰티컬리" 버튼이 정상적으로 표시되는지 확인합니다.');
  10 |
  11 |   // 마켓컬리 접속
  12 |   await page.goto('https://www.kurly.com/main');
  13 |
  14 |   // 로그인 페이지로 이동
  15 |   await page.locator('a').filter({ hasText: '로그인' }).click();
  16 |
  17 |  
  18 |   await page.getByRole('textbox', { name: '아이디를 입력해주세요' }).fill('kurly_id');
  19 |   await page.getByRole('textbox', { name: '비밀번호를 입력해주세요' }).fill('kurly_pw');
  20 |
  21 |   
  22 |   await page.getByRole('button', { name: '로그인' }).click();
  23 |
  24 |   // 💡 로그인 성공 후 요소 확인 (버튼 존재 확인)
  25 |   const marketButton = page.getByRole('button', { name: '마켓컬리' });
  26 |   const beautyButton = page.getByRole('button', { name: '뷰티컬리' });
  27 |
> 28 |   await expect(marketButton).toBeVisible({ timeout: 5000 });
     |                              ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  29 |   await expect(beautyButton).toBeVisible({ timeout: 5000 });
  30 |
  31 |   // 💾 스크린샷 저장 + Allure 첨부
  32 |   const now = getNowString();
  33 |   const browserName = testInfo.project.name;
  34 |   const screenshotName = `login_success_${browserName}_${now}.png`;
  35 |   const screenshotPath = path.join('screenshots', screenshotName);
  36 |
  37 |   if (!fs.existsSync('screenshots')) {
  38 |     fs.mkdirSync('screenshots');
  39 |   }
  40 |
  41 |   await page.screenshot({ path: screenshotPath });
  42 |
  43 |   await allure.attachment(
  44 |     '✅ 로그인 성공 후 화면',
  45 |     fs.readFileSync(screenshotPath),
  46 |     'image/png'
  47 |   );
  48 | });
  49 |
```