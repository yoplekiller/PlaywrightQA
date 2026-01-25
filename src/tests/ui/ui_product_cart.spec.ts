import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';

test('🛒 검색 → 상세 → 장바구니 담기 → 장바구니 확인', async ({ page }, testInfo) => {
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);
    const cartpage = new CartPage(page);

    // 마켓컬리 메인 페이지 접속
    await page.goto('https://www.kurly.com/main');

    // 검색어 "과자"로 검색
    await mainpage.searchGoods('과자');
    await page.waitForTimeout(2000);

    // 첫 번째 상품 상세 페이지 이동 및 장바구니 담기
    await searchpage.clickFirstGoods();
    await expect(page.locator('h1').first()).toBeVisible();
    await cartpage.clickAddGoodsButton();
    await expect(page.getByText('장바구니에 상품을 담았습니다.')).toBeVisible();

    // 장바구니 페이지 이동 및 담긴 상품 확인
    await page.goto('https://www.kurly.com/cart');
    await expect(page).toHaveURL('https://www.kurly.com/cart');
    const expectedProductName = '[오리온] 초코칩쿠키 256g';
    const isVible = await cartpage.isVisibleGoodsInCart(expectedProductName);
    expect(isVible).toBe(true);
});
