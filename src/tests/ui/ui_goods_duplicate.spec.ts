import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';
import { GoodsPage } from '../../pages/GoodsPage';
import { CartPage } from '../../pages/CartPage';

test('상품 중복 담기 기능 확인', async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);
    const goodsPage = new GoodsPage(page);
    const cartPage = new CartPage(page);
    const addCount = 2; // 몇 번 담을지 설정

    // 마켓컬리 메인 페이지 접속
    await mainPage.openMainPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색어 "수박"으로 검색 및 첫 번째 상품 선택
    await mainPage.searchGoods('수박');
    await expect(page.getByText('수박')).toBeVisible();
    await searchPage.clickFirstGoods();

    // 첫 번째 상품 장바구니에 중복 담기    
    await goodsPage.clickAddGoodsInCartButton(addCount);


    // 장바구니 페이지 이동 및 수량 검증
    await mainPage.openCartPage();
    await expect(page).toHaveURL('/cart');

    expect(await cartPage.hasGoodsQuantity(addCount)).toBe(true);
});
    