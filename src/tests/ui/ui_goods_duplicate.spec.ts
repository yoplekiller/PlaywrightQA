import { test, expect } from '../../fixtures/pages';

test.skip('상품 중복 담기 기능 확인', async ({ page, mainPage, searchPage, goodsPage, cartPage }) => {
    const addCount = 2; // 몇 번 담을지 설정

    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색어 "수박"으로 검색 및 첫 번째 상품 선택
    await mainPage.searchGoods('수박');
    await searchPage.expectSearchResultsVisible('수박');
    await searchPage.clickFirstGoods();

    // 첫 번째 상품 장바구니에 중복 담기
    await goodsPage.clickAddGoodsInCartButton(addCount);


    // 장바구니 페이지 이동 및 수량 검증
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');

    await cartPage.expectGoodsQuantity(addCount);
});
