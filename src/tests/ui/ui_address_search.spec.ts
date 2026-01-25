import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';


test('주소 검색 E2E 플로우 테스트 - 간소화', async ({ page }) => {
    const mainpage = new MainPage(page);

    // 마켓컬리 메인 페이지 접속
    await page.goto('https://www.kurly.com/main');

    // 주소 검색 팝업 열기
    await mainpage.hoverAddressButton();
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: '주소 검색', exact: true }).click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');

    // 주소 검색 팝업 URL 검증
    await expect(popup).toHaveURL(/https:\/\/www\.kurly\.com\/address\/shipping-address.*/);
});
