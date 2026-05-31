import { test, expect } from '../../../fixtures/pages';

test.skip(process.env.CI === 'true', 'Skip in CI');
test('상품 찜하기 버튼 후 찜하기에 포함되어 있는지 확인 @auth @regression', async ({ page, mainPage, goodsPage, searchPage }) => {
    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await expect(page.getByRole('link', { name: /.+님$/i })).toBeVisible({ timeout: 10000 });

    // 상품 검색 후 찜하기 버튼 클릭
    await mainPage.searchGoods('과자');
    await searchPage.clickGoodsByIndex(0);
    await goodsPage.clickLikeButton();

    // 찜한후 찜 성공 toast 메시지 확인
    await goodsPage.expectCompletedLikeGoodsVisible();

    // 스크린샷 저장
    const screenshotPath = 'screenshots/favorite.png';
    await page.screenshot({ path: screenshotPath });
});
