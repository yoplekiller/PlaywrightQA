import { test, expect } from '../../fixtures/pages';

test('🔲 공백 입력 시, 팝업 노출 확인', async ({ page, mainPage }) => {
    // 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색창에 공백 입력 후 검색
    await mainPage.searchGoods(" ");

    // 팝업 노출 확인
    await mainPage.expectBlankSearchPopupVisible();
});
