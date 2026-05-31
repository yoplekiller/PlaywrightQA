import { test, expect } from '../../fixtures/pages';
import { products } from '../data/products';

test('상품 상세페이지 진입 확인 @regression', async ({ page, mainPage, searchPage }) => {
    // 마켓컬리 메인 페이지 접속
    await page.goto('/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // 상품 검색 및 상세페이지 진입
    await mainPage.searchGoods(products.banana);
    await searchPage.clickFirstGoods();

    // 상품 상세페이지 진입 확인
    const productTitle = page.getByText(/바나나/).first();
    await productTitle.waitFor({ state: 'visible', timeout: 5000 });
    await expect(productTitle).toBeVisible();
});
