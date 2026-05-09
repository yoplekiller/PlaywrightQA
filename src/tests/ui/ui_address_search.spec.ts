import { test } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { AddressPage } from '../../pages/AddressPage';


test('주소 검색 E2E 플로우 테스트 - 간소화', async ({ page }) => {
    const mainPage = new MainPage(page);

    await test.step('마켓컬리 메인 페이지 접속', async () => {
        await mainPage.openMainPage();
        await mainPage.setViewportSize(1280, 720);
    });

    // 주소 검색 팝업 열기
    const popup = await mainPage.openAddressSearchPopup();

    const addressPage = new AddressPage(popup);
    await addressPage.verifyPopupUrl();
});
