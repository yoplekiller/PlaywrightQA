import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';

test('상품 상세페이지 진입 확인', async ({ page }) => {
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);

    // 마켓컬리 메인 페이지 접속
    await page.goto('https://www.kurly.com/main');

    // 상품 검색 및 상세페이지 진입
    await mainpage.searchGoods('바나나');
    await searchpage.clickFirstGoods();

    // 상품 상세페이지 진입 확인
    const productTitle = page.getByText(/바나나/).first();
    await productTitle.waitFor({ state: 'visible', timeout: 5000 });
    await expect(productTitle).toBeVisible();
});
