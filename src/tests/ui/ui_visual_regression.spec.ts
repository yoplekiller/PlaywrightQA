import { test, expect } from '../../fixtures/pages';

test.describe('Visual Regression 테스트', () => {

    test('메인 페이지 전체 스냅샷 비교', async ({ page, mainPage }) => {
        await page.goto('/main');

        // 검색창이 보이면 페이지 로드 완료로 판단
        await expect(page.getByRole('textbox', { name: /검색어를 입력해주세요/i })).toBeVisible();

        await expect(page).toHaveScreenshot('main-page-full.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

    test('검색 결과 페이지 스냅샷 비교', async ({ page, mainPage, searchPage }) => {
        await page.goto('/main');
        await mainPage.searchGoods('우유');

        // 검색 결과 페이지 URL 전환 대기
        await expect(page).toHaveURL(/\/search\?/, { timeout: 10000 });
        // 첫 번째 상품이 보일 때까지 대기
        await expect(searchPage.getProductItems().first()).toBeVisible();

        await expect(page).toHaveScreenshot('search-result-page.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

    test('뷰티컬리 페이지 전환 스냅샷 비교', async ({ page, mainPage }) => {
        await page.goto('/main');
        await mainPage.clickBeautyButton();

        // 뷰티컬리 페이지 전환 대기
        await expect(page).toHaveURL(/\/main\/beauty/, { timeout: 10000 });

        await expect(page).toHaveScreenshot('beauty-page-full.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

    test('상품 상세 페이지 스냅샷 비교', async ({ page, mainPage, searchPage }) => {
        await page.goto('/main');
        await mainPage.searchGoods('바나나');

        // 검색 결과 페이지 URL 전환 대기
        await expect(page).toHaveURL(/\/search\?/, { timeout: 10000 });
        // 첫 번째 상품이 보일 때까지 대기
        await expect(searchPage.getProductItems().first()).toBeVisible();
        await searchPage.clickFirstGoods();

        // 상품 상세 페이지 URL 전환 대기
        await expect(page).toHaveURL(/\/goods\//, { timeout: 10000 });

        await expect(page).toHaveScreenshot('goods-page-full.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

});
