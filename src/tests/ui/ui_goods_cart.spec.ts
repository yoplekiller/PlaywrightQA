import { test, expect } from '../../fixtures/pages';

test('검색 → 상세 → 장바구니 담기 → 장바구니 확인', async ({ page, mainPage, searchPage, cartPage, goodsPage }) => {
    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 검색어 "수박"으로 검색
    await mainPage.searchGoods('수박');
    await expect(page).toHaveURL(/search/);

    // 검색 결과에서 상세 페이지 이동
    await searchPage.clickFirstGoods();
    await expect(page).toHaveURL(/\/goods\//, { timeout: 10000 });
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('h1').first()).not.toContainText('검색결과');
    const productName = await goodsPage.getProductTitle();
    await goodsPage.clickAddGoodsInCartButton(1);


    // 상품명 확인
    await goodsPage.expectProductTitleVisible(productName);

    // 장바구니 페이지 이동 및 담긴 상품 확인   
    await page.goto('/cart');
    await expect(page).toHaveURL('/cart');
    
    await cartPage.expectGoodsVisible(productName);
});
