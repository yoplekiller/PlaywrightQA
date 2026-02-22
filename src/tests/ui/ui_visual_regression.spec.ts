import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';
import { GoodsPage } from '../../pages/GoodsPage';

test.describe('Visual Regression 테스트', () => {

    test('메인 페이지 전체 스냅샷 비교', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto('https://www.kurly.com/main');

        // 검색창이 보이면 페이지 로드 완료로 판단
        const isLoaded = await mainPage.isSearchBoxAccessible();
        expect(isLoaded).toBeTruthy();

        await expect(page).toHaveScreenshot('main-page-full.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

    test('검색 결과 페이지 스냅샷 비교', async ({ page }) => {
        const mainPage = new MainPage(page);
        const searchPage = new SearchPage(page);

        await mainPage.goto('https://www.kurly.com/main');
        await mainPage.searchGoods('우유');

        // 검색 결과 페이지 URL 전환 대기
        await page.waitForURL(/\/search\?/, { timeout: 10000 });
        // 첫 번째 상품이 보일 때까지 대기
        await searchPage.isFirstProductVisible();

        await expect(page).toHaveScreenshot('search-result-page.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

    test('뷰티컬리 페이지 전환 스냅샷 비교', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto('https://www.kurly.com/main');
        await mainPage.clickBeautyButton();

        // 뷰티컬리 페이지 전환 대기
        await page.waitForURL(/\/main\/beauty/, { timeout: 10000 });
        await page.waitForLoadState('domcontentloaded');

        await expect(page).toHaveScreenshot('beauty-page-full.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

    test('상품 상세 페이지 스냅샷 비교', async ({ page }) => {
        const mainPage = new MainPage(page);
        const goodsPage = new GoodsPage(page);
        const searchPage = new SearchPage(page);

        await mainPage.goto('/main');
        await mainPage.searchGoods('바나나');

        // 검색 결과 페이지 URL 전환 대기
        await page.waitForURL(/\/search\?/, { timeout: 10000 });
        // 첫 번째 상품이 보일 때까지 대기
        await searchPage.isFirstProductVisible();
        await searchPage.clickFirstGoods();

        // 상품 상세 페이지 URL 전환 대기
        await page.waitForURL(/\/goods\//, { timeout: 10000 });
        await page.waitForLoadState('domcontentloaded');

        await expect(page).toHaveScreenshot('goods-page-full.png', {
            maxDiffPixelRatio: 0.15,
            fullPage: false,
        });
    });

});