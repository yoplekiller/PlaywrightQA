import { test, expect } from '../../fixtures/pages';
import fs from 'fs';
import path from 'path';
import { products } from '../data/products';


if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
}

test('카테고리별 정렬 동작 및 결과 검증 @regression', async ({ page, mainPage, searchPage }, testInfo) => {
    // 마켓컬리 메인 페이지 접속 및 "과자" 검색
    await page.goto('/main');
    await mainPage.searchGoods(products.snack);
    await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

    // 검색 결과 페이지로 이동 확인
    await searchPage.expectSearchUrlContainsTerm(products.snack);

    // 정렬 탭별 동작 및 결과 검증
    const categories = [
        '신상품순',
        '판매량순',
        '혜택순',
        '낮은 가격순',
        '높은 가격순',
        '추천순',
    ];

    for (const name of categories) {
        // 정렬 탭 클릭
        await searchPage.clickSortTab(name);

        // 첫 번째 상품 확인
        await expect(searchPage.getProductItems().first()).toBeVisible();
        

        // 스크린샷 저장
        const safeName = name.replace(/[^a-zA-Z0-9가-힣]/g, '_');
        const screenshotPath = path.join('screenshots', `sort_${safeName}.png`);
        await page.screenshot({ path: screenshotPath });

        // 테스트 리포트에 첨부
        await testInfo.attach(`${name} 정렬 스크린샷`, {
            contentType: 'image/png',
            path: screenshotPath,
        });
    }
});
