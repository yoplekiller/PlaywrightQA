import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';

test.describe('검색 결과 없음 테스트', () => {

    test('🔍 존재하지 않는 상품 검색 시, 결과 없음 메시지 노출', async ({ page }) => {
        const mainPage = new MainPage(page);
        const searchPage = new SearchPage(page);

        // 메인 페이지 접속
        await mainPage.openMainPage();
        await page.setViewportSize({ width: 1280, height: 720 });

        // 존재하지 않는 상품명으로 검색 (의미없는 문자열)
        const nonsenseKeyword = '미ㅏㅇㄴ로ㅠㅣㅇㄴ마ㅓ륭ㄴ미ㅏㅠㅇ';
        await mainPage.searchGoods(nonsenseKeyword);

        // 검색 결과 페이지로 이동 확인
        await expect(page).toHaveURL(/\/search\//, { timeout: 10000 });

        // 검색 결과가 없음을 확인 (상품 개수 0개)
        const resultCount = await searchPage.getSearchResultCount();
        expect(resultCount).toBe(0);
    });

    test('🔍 긴 문자열 검색 시, 정상 처리 확인', async ({ page }) => {
        const mainPage = new MainPage(page);
        const searchPage = new SearchPage(page);

        // 메인 페이지 접속
        await mainPage.openMainPage();
        await page.setViewportSize({ width: 1280, height: 720 });

        // 매우 긴 검색어
        const longKeyword = 'a'.repeat(500);
        await mainPage.searchGoods(longKeyword);

        // 검색 결과 페이지로 이동 확인 (에러 없이 정상 처리)
        await expect(page).toHaveURL(/\/search\//, { timeout: 10000 });

        // 결과가 없어도 페이지가 정상 동작하는지 확인
        const resultCount = await searchPage.getSearchResultCount();
        expect(resultCount).toBeGreaterThanOrEqual(0);
    });

});
