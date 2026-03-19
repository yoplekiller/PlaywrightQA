import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('🔲 공백 입력 시, 팝업 노출 확인', async ({ page }, testInfo) => {
    const mainpage = new MainPage(page);

    // 메인 페이지 접속
    await page.goto('/main');
    await mainpage.setViewportSize(1280, 720);

    // 검색창에 공백 입력 후 검색
    await mainpage.searchGoods(" ");

    // 팝업 노출 확인
    const isPopupVisible = await mainpage.isBlankSearchPopupVisible();
    expect(isPopupVisible).toBeTruthy();
});
