import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';

// 입력값/수량의 경계 조건을 검증한다.
test.describe('경계값 테스트', () => {

    // TC-BOUND-01: 검색어를 아예 입력하지 않은 채(빈 문자열) 검색 버튼을 누르는 경우.
    // 공백(" ") 입력 케이스는 ui_blank_search.spec.ts에서 별도로 검증한다.
    test('검색어 미입력 상태로 검색 시 안내 팝업이 노출된다 @regression', async ({ page, mainPage }) => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        await mainPage.clickSearchButton();

        await mainPage.expectBlankSearchPopupVisible();
    });

    // TC-BOUND-02: 장바구니에 상품이 1개(최소 수량) 담긴 상태에서 수량 감소 버튼은
    // 비활성화되어 0 이하로 내려가지 않아야 한다.
    test('장바구니 최소 수량(1)에서 수량 감소 버튼이 비활성화된다 @regression', async ({
        page,
        mainPage,
        searchPage,
        goodsPage,
        cartPage,
    }) => {
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        await mainPage.searchGoods(products.watermelon);
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

        await searchPage.clickFirstGoods();
        await expect(page).toHaveURL(/\/goods\//, { timeout: 10000 });
        await goodsPage.clickAddGoodsInCartButton(1);

        await page.goto('/cart');
        await expect(page).toHaveURL(/\/cart/);
        await cartPage.expectItemQuantity(1);

        await cartPage.expectDecreaseItemQuantityDisabled();

        // 비활성화된 버튼을 눌러도 수량은 그대로 1이어야 한다.
        await cartPage.clickDecreaseItemQuantity();
        await cartPage.expectItemQuantity(1);
    });
});

