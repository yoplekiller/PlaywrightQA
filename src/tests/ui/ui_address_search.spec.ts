import { test, expect } from '../../fixtures/pages';


test('주소 검색 E2E 플로우 테스트 - 간소화 @regression', async ({ page, mainPage }) => {
    await test.step('마켓컬리 메인 페이지 접속', async () => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });
    });

    // 주소 검색 팝업 열기
    const popup = await mainPage.openAddressSearchPopup();

    // 주소 검색 팝업 URL 검증
    await expect(popup).toHaveURL(/\/address\/shipping-address.*/);
});
