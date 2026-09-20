import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';

// 검색 결과 페이지 하단 페이지네이션(처음/이전/번호/다음/마지막) 동작 검증.
// "과자" 검색은 결과가 여러 페이지로 나뉘어 페이지네이션 컨트롤이 항상 노출된다.
test.describe('검색 결과 페이지네이션', () => {
    test.beforeEach(async ({ page, mainPage }) => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });
        await mainPage.searchGoods(products.snack);
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });
    });

    // TC-PAGE-01
    test('다음 페이지 이동 시 URL의 page 파라미터와 상품 목록이 갱신된다 @regression', async ({ page, searchPage }) => {
        const firstItemHrefBefore = await searchPage.getProductItems().first().getAttribute('href');

        await searchPage.clickNextPage();

        expect(searchPage.getCurrentPageParam()).toBe(2);
        const firstItemHrefAfter = await searchPage.getProductItems().first().getAttribute('href');
        expect(firstItemHrefAfter).not.toBe(firstItemHrefBefore);
    });

    // TC-PAGE-02
    test('특정 페이지 번호 클릭 시 해당 페이지로 이동한다 @regression', async ({ searchPage }) => {
        await searchPage.clickPageNumber(3);

        expect(searchPage.getCurrentPageParam()).toBe(3);
    });

    // TC-PAGE-03
    test('처음 페이지 아이콘 클릭 시 1페이지로 되돌아간다 @regression', async ({ searchPage }) => {
        await searchPage.clickPageNumber(3);
        expect(searchPage.getCurrentPageParam()).toBe(3);

        await searchPage.clickFirstPage();

        expect(searchPage.getCurrentPageParam()).toBe(1);
    });

    // TC-PAGE-04 (경계값): 마지막 페이지에서 다음 페이지로 이동해도 더 이상 진행되지 않는다.
    test('마지막 페이지에서 다음 페이지 이동 시 더 이상 진행되지 않는다 @regression', async ({ searchPage }) => {
        await searchPage.clickLastPage();
        const lastPage = searchPage.getCurrentPageParam();
        expect(lastPage).toBeGreaterThan(1);

        await searchPage.expectNextPageIsNoOpAtLastPage();

        expect(searchPage.getCurrentPageParam()).toBe(lastPage);
    });
});
