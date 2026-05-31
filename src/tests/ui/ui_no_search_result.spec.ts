import { test, expect } from '../../fixtures/pages';

test.describe('검색 결과 없음 테스트', () => {

    test('무작위 검색어 입력 시, 검색 페이지 정상 처리 @regression', async ({ page, mainPage, searchPage }) => {
        // 메인 페이지 접속
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        // 존재하지 않는 상품명으로 검색 (의미없는 문자열)
        const nonsenseKeyword = 'no-result-keyword-9f7c2b1d8e6a4c0b';
        await mainPage.searchGoods(nonsenseKeyword);

        // 검색 결과 페이지로 이동 확인
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

        // 외부 검색 서비스는 무작위 문자열에도 추천 결과를 반환할 수 있으므로,
        // 검색어가 정상 반영되고 검색 페이지가 깨지지 않는지만 검증한다.
        await searchPage.expectSearchUrlContainsTerm(nonsenseKeyword);
        await expect(page.getByRole('heading', { name: /검색결과/ })).toBeVisible();
    });

    test('긴 문자열 검색 시, 정상 처리 확인 @regression', async ({ page, mainPage, searchPage }) => {
        // 메인 페이지 접속
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        // 매우 긴 검색어
        const longKeyword = 'a'.repeat(500);
        await mainPage.searchGoods(longKeyword);

        // 검색 결과 페이지로 이동 확인 (에러 없이 정상 처리)
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

        // 결과가 없어도 검색 페이지가 정상 동작하는지 확인
        await searchPage.expectSearchUrlContainsTerm(longKeyword);
        await expect(page.locator('body')).toBeVisible();
    });

});
