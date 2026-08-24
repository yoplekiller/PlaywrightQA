import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';

test('비회원 장바구니는 결제 버튼 대신 로그인을 요구한다 @regression', async ({ page, mainPage, searchPage, cartPage, goodsPage }) => {
    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색어 "수박"으로 검색 후 상세 페이지 이동, 장바구니 담기
    await mainPage.searchGoods(products.watermelon);
    await expect(page).toHaveURL(/search/);
    await searchPage.clickFirstGoods();
    await expect(page).toHaveURL(/\/goods\//, { timeout: 10000 });
    await goodsPage.clickAddGoodsInCartButton(1);

    // 장바구니 페이지 이동
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');
    await cartPage.expectCartNotEmpty();

    // 결제/구매 버튼은 없고, 로그인 유도만 노출되어야 함
    await cartPage.expectCheckoutRequiresLogin();
});
