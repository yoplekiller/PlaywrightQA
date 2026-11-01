import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';
import { SORT_TYPES, effectivePrice, parseSearchItems, waitForSearchResponse } from '../../utils/kurlyApi';

// API + UI 하이브리드 검증: 화면이 부르는 실제 API 응답을 waitForResponse 로 잡아서
// "서버가 준 데이터"와 "화면에 그려진 결과"를 대조한다.
// 화면 텍스트만 보면 쿠폰가·첫구매가 같은 표시 가격 때문에 정렬 검증이 흔들렸는데(가격정렬 테스트의 쿠폰 카드 제외 우회),
// 정렬 기준은 API 데이터로, 화면은 "API 순서대로 그렸는가"로 나눠 보면 원인 구분이 명확해진다.

const COMPARE_COUNT = 20;

test.describe('API + UI 하이브리드 검증', () => {
    test('검색 결과 카드 순서가 검색 API 응답 순서와 같다 @regression @hybrid', async ({ page, searchPage }) => {
        const responsePromise = waitForSearchResponse(page, SORT_TYPES['추천순']);
        await page.goto(`/search?sword=${encodeURIComponent(products.apple)}`);
        const apiItems = await parseSearchItems(await responsePromise);

        expect(apiItems.length, '검색 API 가 상품을 돌려줘야 함').toBeGreaterThan(0);
        await expect(searchPage.getProductItems().first()).toBeVisible({ timeout: 10000 });

        const count = Math.min(COMPARE_COUNT, apiItems.length);
        await expect.poll(() => searchPage.getProductNos(count), {
            message: `화면의 앞 ${count}개 상품번호가 API 응답 순서와 같아야 함`,
        }).toEqual(apiItems.slice(0, count).map(item => item.no));
    });

    for (const [sortName, direction] of [['낮은 가격순', 'asc'], ['높은 가격순', 'desc']] as const) {
        test(`${sortName}: API 는 실제 판매가 기준으로 정렬하고 화면은 그 순서대로 그린다 @regression @hybrid`, async ({ page, searchPage }) => {
            await page.goto(`/search?sword=${encodeURIComponent(products.apple)}`);
            await expect(searchPage.getProductItems().first()).toBeVisible({ timeout: 10000 });

            const responsePromise = waitForSearchResponse(page, SORT_TYPES[sortName]);
            await page.getByRole('link', { name: sortName }).click();
            const response = await responsePromise;
            const apiItems = await parseSearchItems(response);

            // 1) 요청: 정렬 탭이 올바른 sortType 으로 API 를 호출했는지
            expect(new URL(response.url()).searchParams.get('sortType')).toBe(SORT_TYPES[sortName]);

            // 2) 서버 데이터: 실제 판매가(할인가 우선) 기준으로 정렬돼 있는지
            const prices = apiItems.map(effectivePrice);
            expect(prices.length).toBeGreaterThanOrEqual(3);
            const sorted = [...prices].sort((a, b) => (direction === 'asc' ? a - b : b - a));
            expect(prices, `${sortName} API 응답이 판매가 기준으로 정렬돼 있지 않음`).toEqual(sorted);

            // 3) 화면: API 가 준 순서 그대로 카드가 그려졌는지
            const count = Math.min(COMPARE_COUNT, apiItems.length);
            await expect.poll(() => searchPage.getProductNos(count), {
                message: `${sortName} 화면 순서가 API 응답 순서와 같아야 함`,
            }).toEqual(apiItems.slice(0, count).map(item => item.no));
        });
    }

    test('장바구니 담기 API 가 성공하고 장바구니 화면 수량이 담은 수량과 같다 @regression @hybrid', async ({ page, searchPage, goodsPage, cartPage }) => {
        await page.goto(`/search?sword=${encodeURIComponent(products.watermelon)}`);
        await searchPage.clickFirstGoods();
        await expect(page).toHaveURL(/\/goods\//, { timeout: 10000 });

        // clickAddGoodsInCartButton 이 매 클릭마다 external-cart/v2/add 응답(200, success=true)을 검증하고 요청값을 돌려준다
        const added = await goodsPage.clickAddGoodsInCartButton(2);
        expect(new Set(added.map(a => a.dealProductNo)).size, '같은 상품을 두 번 담아야 함').toBe(1);
        const totalQuantity = added.reduce((sum, a) => sum + a.quantity, 0);

        await page.goto('/cart');
        await cartPage.expectItemQuantity(totalQuantity);
    });
});
