import { test, expect } from '@playwright/test';
// Update the import path below to the correct relative path where CartPage.ts exists
import { CartPage } from '../../../pages/CartPage'; 
import { LoginPage } from '../../../pages/LoginPage';
import { MainPage } from '../../../pages/MainPage';
import { getNowString } from '../../../utils/dataFormat';
import { SearchPage } from '../../../pages/SearchPage';
import fs from 'fs';
import path from 'path';


test.skip(process.env.CI === 'true', 'Skip in CI');
test.describe('상품 추가 및 장바구니 확인', () => {

    test('상품 검색 → 상품 추가 → 장바구니에서 확인', async ({ page }, testInfo) => {
        const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
        const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;

        const cartPage = new CartPage(page);
        const loginPage = new LoginPage(page);
        const mainPage = new MainPage(page);
        const searchPage = new SearchPage(page);

        // Step 1: 로그인
        await mainPage.openLoginPage();
        await page.waitForLoadState('domcontentloaded');
        await page.setViewportSize({ width: 1280, height: 720 });
        
        await loginPage.login(kurly_id, kurly_pw);
        await mainPage.expectLoggedIn();

        // Step 2: 메인 페이지로 이동
        await mainPage.openMainPage();
        await expect(page).toHaveURL(/\/main/);

        // Step 3: 상품 검색
        const searchKeyword = '과자';
        await mainPage.searchGoods(searchKeyword);
        await page.waitForLoadState('networkidle');

        // Step 4: 첫 번째 상품 클릭
        const GoodsNumber = 1;
        await searchPage.clickGoodsByIndex(GoodsNumber - 1);
        await page.waitForLoadState('networkidle');

        // Step 5: 장바구니 담기
        await searchPage.clickAddCartButton();
        await page.waitForLoadState('networkidle');

        // Step 6: 장바구니로 이동
        await mainPage.openCartPage();
        await expect(page).toHaveURL(/\/cart/);

        // Step 7: 장바구니에 상품이 있는지 확인
        const now = getNowString();
        const browserName = testInfo.project.name;
        const screenshotName = `cart_verify_${browserName}_${now}.png`;
        const screenshotPath = path.join('screenshots', screenshotName);

        if (!fs.existsSync('screenshots')) {
            fs.mkdirSync('screenshots');
        }

        await page.screenshot({ path: screenshotPath });

        await testInfo.attach('🛒 장바구니 확인 스크린샷', {
            path: screenshotPath,
            contentType: 'image/png',
        });

        // 장바구니 비어있지 않음 확인
        const isEmpty = await cartPage.isCartEmpty().catch(() => false);
        expect(isEmpty).toBeFalsy();
    });
});
