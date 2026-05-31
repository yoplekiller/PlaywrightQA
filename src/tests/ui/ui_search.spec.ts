import { test, expect } from '../../fixtures/pages';
import { searchCases } from '../data/searchCases';
import path from 'path';
import fs from 'fs';

// 스크린샷 저장 디렉토리 설정
const screenshotDir = path.resolve(__dirname, '../../screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
}

test('상품 검색 smoke 테스트 @smoke @regression', async ({ page, mainPage, searchPage }) => {
    for (const { tc_id, search_term } of searchCases) {
        // 검색어로 상품 검색
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        // 로그 테스트 케이스 ID 및 검색어
        await mainPage.searchGoods(search_term);
        await expect(page).toHaveURL(/\/search(?:\?|$)/, { timeout: 10000 });

        // 검색 결과 확인
        await searchPage.expectSearchResultsVisible(search_term);

        // 스크린샷 저장
        const safeSearchTerm = search_term.replace(/[\/:*?"<>|]/g, '_');
        const screenshotPath = path.join(screenshotDir, `${tc_id}_${safeSearchTerm}.png`);
        await page.screenshot({ path: screenshotPath });
    }
});
