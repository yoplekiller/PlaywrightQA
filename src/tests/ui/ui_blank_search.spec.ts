import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('공백 입력 시 팝업 노출 확인', async ({ page }, testInfo) => {
    const mainPage = new MainPage(page);

    // 메인 페이지 접속
    await mainPage.goto('/main');
    await mainPage.setViewportSize(1280, 720);

    // 검색창에 공백 입력 후 검색
    await mainPage.searchGoods(" ");

    // 팝업 노출 확인
    const isPopupVisible = await mainPage.isBlankSearchPopupVisible();
    expect(isPopupVisible).toBeTruthy();
});
