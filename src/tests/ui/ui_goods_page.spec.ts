import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';

test('상품 상세페이지 진입 확인', async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);

    // 마켓컬리 메인 페이지 접속
    await mainPage.openMainPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    // 상품 검색 및 상세페이지 진입
    await mainPage.searchGoods('바나나');
    await searchPage.clickFirstGoods();

    // 상품 상세페이지 진입 확인
    const productTitle = page.getByText(/바나나/).first();
    await productTitle.waitFor({ state: 'visible', timeout: 5000 });
    await expect(productTitle).toBeVisible();
});
