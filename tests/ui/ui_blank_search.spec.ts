import { test, expect } from '@playwright/test';

test('공백 입력 시, 팝업 노출 확인', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
    await searchBox.fill('');
    await searchBox.press('Enter');

    // 더 구체적인 셀렉터로 변경 (정확히 1개만 찾도록)
    const popup = page.locator('.popup-content.css-15yaaju.e1k5padi2');
    await expect(popup).toBeVisible({ timeout: 5000 });

    const popupText = await popup.textContent();
    expect(popupText).toContain('검색어를 입력해주세요');
    // await page.waitForTimeout(3000); // 시연용 (최종 코드에서는 주석 처리 ㅇㅇ!)
    await page.screenshot({ path: 'screenshots/blank_search_popup.png' });
});