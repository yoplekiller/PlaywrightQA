import { test, expect } from '@playwright/test';

test('공백 입력 시, 팝업 노출 확인', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
    await searchBox.fill('');
    await searchBox.press('Enter');

    const popup = page.locator('div').filter({ hasText: '검색어를 입력해주세요' });
    await expect(popup).toBeVisible({ timeout: 5000 });

    const popupText = await popup.textContent();
    expect(popupText).toContain('검색어를 입력해주세요');
    await page.screenshot({ path: 'screenshots/blank_search_popup.png' });
});