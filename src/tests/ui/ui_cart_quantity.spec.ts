import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';


test.describe('장바구니 수량 검증', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });
    });

    test('상품 1개 담기 후 장바구니 수량이 1이어야 한다 @smoke', async ({
        page,
        mainPage,
        searchPage,
        cartPage, 
        goodsPage }) => {
            await mainPage.searchGoods(products.watermelon);
            await expect(page).toHaveURL(/search/);

            await searchPage.clickFirstGoods();
            await expect(page).toHaveURL(/\/goods\//, {timeout: 10000});

            await goodsPage.clickAddGoodsInCartButton(1);

            await page.goto('/cart');
            await expect(page).toHaveURL(/cart/);
            await cartPage.expectGoodsQuantity(1);
    })
});

