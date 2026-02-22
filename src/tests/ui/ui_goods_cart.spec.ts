import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';
import { GoodsPage } from '../../pages/GoodsPage';

test('검색 → 상세 → 장바구니 담기 → 장바구니 확인', async ({ page }, testInfo) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);
    const cartPage = new CartPage(page);
    const goodsPage = new GoodsPage(page);

    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색어 "과자"로 검색
    await mainPage.searchGoods('과자');
    await expect(page).toHaveURL(/search/);

    // 검색 결과에서 상품명 저장 후 상세 페이지 이동
    const productName = await searchPage.getFirstGoodsName();
    await searchPage.clickFirstGoods();
    await expect(page.locator('h1').first()).toBeVisible();
    await goodsPage.clickAddGoodsInCartButton(1);


    // 상품명 확인
    await goodsPage.isProductTitleVisible(productName);

    // 장바구니 페이지 이동 및 담긴 상품 확인   
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');
    
    const isVible = await cartPage.isVisibleGoodsInCart(productName);
    expect(isVible).toBe(true);
});
