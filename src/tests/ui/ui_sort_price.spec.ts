import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';


test.describe('가격 정렬 기능테스트', () => {
    test('가격 낮은순 정렬 기능 확인 @regression', async ({ page, mainPage, searchPage }) =>
        {
            // 메인 페이지 접속
            await page.goto('/main');
            await page.setViewportSize({ width: 1280, height: 720 });

            // 검색어 "사과"로 검색
            await mainPage.searchGoods(products.apple);
            await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

            // 가격 낮은순 정렬 선택
            await searchPage.clickSortTab('낮은 가격순');
            

            // 정렬된 상품들의 가격을 배열로 수집
            const prices = await searchPage.getProductPrices();

            expect(prices.length).toBeGreaterThanOrEqual(3);//  검증을 위한 최소 상품 개수

            // 가격이 오름차순으로 정렬되었는지 확인
            for (let i = 0; i < prices.length - 1; i++) {
                expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
            }
        }
    );

    test('높은 가격순 정렬 시, 가격이 내림차순인지 확인 @regression', async ({ page, mainPage, searchPage }) => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        await mainPage.searchGoods(products.snack);
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

          // 높은 가격순 클릭
        await searchPage.clickSortTab('높은 가격순');
        

        const prices = await searchPage.getProductPrices();

        expect(prices.length).toBeGreaterThanOrEqual(3);

          // 내림차순 정렬 확인
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
          }
      });

});
