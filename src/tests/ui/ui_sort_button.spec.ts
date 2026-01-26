import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';


if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
}

test('🧭 카테고리별 정렬 동작 및 결과 검증', async ({ page }, testInfo) => {
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);

    // 마켓컬리 메인 페이지 접속 및 "과자" 검색
    await page.goto('https://www.kurly.com/main');
    await mainpage.searchGoods('과자');
    await page.waitForURL(/search/); //대기 for navigation

    // 검색 결과 페이지로 이동 확인
    const url = page.url();
    expect(url).toContain(encodeURIComponent('과자'));

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
        await searchpage.clickSortTab(name);

        // 첫 번째 상품 확인
        expect(await searchpage.isFirstProductVisible()).toBe(true);

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
