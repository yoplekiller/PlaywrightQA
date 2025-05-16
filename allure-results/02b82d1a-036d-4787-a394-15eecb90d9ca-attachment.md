# Test info

- Name: 공백 입력 시, 팝업 노출 확인
- Location: C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_blank_search.spec.ts:3:5

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('div').filter({ hasText: '검색어를 입력해주세요' }) resolved to 5 elements:
    1) <div class="swal2-container swal2-center swal2-backdrop-show">…</div> aka locator('div').filter({ hasText: '×검색어를 입력해주세요.확인OKNoCancel' }).first()
    2) <div tabindex="-1" role="dialog" aria-modal="true" aria-live="assertive" aria-labelledby="swal2-title" class="swal2-popup swal2-modal" aria-describedby="swal2-content">…</div> aka getByLabel('', { exact: true })
    3) <div class="swal2-content">…</div> aka locator('div').filter({ hasText: '검색어를 입력해주세요.확인' }).nth(2)
    4) <div id="swal2-content" class="swal2-html-container">…</div> aka getByText('검색어를 입력해주세요.확인')
    5) <div class="popup-content css-15yaaju e1k5padi2">검색어를 입력해주세요.</div> aka getByText('검색어를 입력해주세요')

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('div').filter({ hasText: '검색어를 입력해주세요' })

    at C:\Users\jmlim\OneDrive\Desktop\PlaywrightQA\tests\ui\ui_blank_search.spec.ts:12:25
```

# Page snapshot

```yaml
- dialog:
  - text: 검색어를 입력해주세요.
  - button "confirm-button": 확인
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('공백 입력 시, 팝업 노출 확인', async ({ page }) => {
   4 |     await page.goto('https://www.kurly.com/main');
   5 |     await page.setViewportSize({ width: 1280, height: 720 });
   6 |
   7 |     const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
   8 |     await searchBox.fill('');
   9 |     await searchBox.press('Enter');
  10 |
  11 |     const popup = page.locator('div').filter({ hasText: '검색어를 입력해주세요' });
> 12 |     await expect(popup).toBeVisible({ timeout: 5000 });
     |                         ^ Error: expect.toBeVisible: Error: strict mode violation: locator('div').filter({ hasText: '검색어를 입력해주세요' }) resolved to 5 elements:
  13 |
  14 |     const popupText = await popup.textContent();
  15 |     expect(popupText).toContain('검색어를 입력해주세요');
  16 |     await page.screenshot({ path: 'screenshots/blank_search_popup.png' });
  17 | });
```