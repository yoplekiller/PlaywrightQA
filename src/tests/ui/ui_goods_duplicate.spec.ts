import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';
import { GoodsPage } from '../../pages/GoodsPage';
import { CartPage } from '../../pages/CartPage';

test('상품 중복 담기 기능 확인', async ({ page }) => {
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);
    const goodspage = new GoodsPage(page);
    const cartPage = new CartPage(page);
    const addCount = 2; // 몇 번 담을지 설정

    // 마켓컬리 메인 페이지 접속
    await page.goto('https://www.kurly.com/main');

    // 검색어 "수박"으로 검색 및 첫 번째 상품 선택
    await mainpage.searchGoods('수박');
    await expect(page.getByText('수박')).toBeVisible();
    await searchpage.clickFirstGoods();

    // 첫 번째 상품 장바구니에 중복 담기
    await goodspage.clickAddGoodsInCartButton(addCount);


    // 장바구니 페이지 이동 및 수량 검증
    await page.goto('https://www.kurly.com/cart');
    await expect(page).toHaveURL('https://www.kurly.com/cart');

    expect(await cartPage.hasGoodsQuantity(addCount)).toBe(true);
});
