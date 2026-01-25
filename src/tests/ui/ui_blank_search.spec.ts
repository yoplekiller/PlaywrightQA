import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('🔲 공백 입력 시, 팝업 노출 확인', async ({ page }, testInfo) => {
    const mainpage = new MainPage(page);

    // 메인 페이지 접속
    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색창에 공백 입력 후 검색
    await mainpage.searchGoods(" ");

    // 팝업 노출 확인
    const popup = page.locator('.popup-content.css-15yaaju.e1k5padi2');
    await expect(popup).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('검색어를 입력해주세요')).toBeVisible();
});
