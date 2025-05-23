# Test info

- Name: test
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_duplicate.spec.ts:3:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('button', { name: '장바구니 담기' })

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_cart_duplicate.spec.ts:11:55
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |   await page.goto('https://www.kurly.com/main'); 
   5 |   await page.setViewportSize({ width: 1440, height: 900});
   6 |   
   7 |   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).click();
   8 |   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).fill('수박');
   9 |   await page.getByRole('textbox', { name: '검색어를 입력해주세요' }).press('Enter');
  10 |   await page.locator('a:nth-child(1) div:nth-child(2) button:nth-child(1)').click
> 11 |   await page.getByRole('button', { name: '장바구니 담기' }).click();
     |                                                       ^ Error: locator.click: Target page, context or browser has been closed
  12 |   await page.locator('a:nth-child(1) div:nth-child(2) button:nth-child(1)').click
  13 |   await page.locator('.css-g25h97.e14oy6dx1').click();
  14 |   await expect(page.getByText("[KF365] 당도선별 수박 4kg 이상")).toBeVisible();
  15 |
  16 |   const quantityLocator = page.locator('//p[contains(@class, "kpds_") and text()="2"]');
  17 |   await expect(quantityLocator).toHaveText('2');
  18 | });
  19 |
```