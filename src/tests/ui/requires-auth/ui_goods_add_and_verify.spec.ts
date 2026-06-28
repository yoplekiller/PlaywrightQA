import { test, expect } from '../../../fixtures/pages';
import { getNowString } from '../../../utils/dataFormat';
import fs from 'fs';
import path from 'path';


test.skip(process.env.CI === 'true', 'Skip in CI');
test.describe('상품 추가 및 장바구니 확인', () => {

    test('상품 검색 → 상품 추가 → 장바구니에서 확인 @auth @regression', async ({ page, cartPage, mainPage, searchPage }, testInfo) => {
        // Step 1: 저장된 로그인 상태 확인
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });
        await expect(page.getByRole('link', { name: /.+님$/i })).toBeVisible({ timeout: 10000 });

        // Step 2: 상품 검색
        await mainPage.searchGoods('과자');
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

        // Step 3: 첫 번째 상품 클릭
        const GoodsNumber = 1;
        await searchPage.clickGoodsByIndex(GoodsNumber - 1);
        await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });

        // Step 4: 장바구니 담기
        await searchPage.clickAddCartButton();
        await expect(page.getByText('장바구니에 상품을 담았습니다.', { exact: true })).toBeVisible({ timeout: 5000 });

        // Step 5: 장바구니로 이동
        await page.goto('/cart');
        await expect(page).toHaveURL(/\/cart/);

        // Step 6: 장바구니에 상품이 있는지 확인
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
        await cartPage.expectCartNotEmpty();
    });
});
