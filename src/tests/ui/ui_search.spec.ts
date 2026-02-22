import { test, expect } from '@playwright/test';
import { loadExcelFile } from '../../utils/excel_loader';
import path from 'path';
import fs from 'fs';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';

// 테스트 케이스 데이터를 저장할 배열
let searchCases: { tc_id: string; search_term: string }[] = [];

// 스크린샷 저장 디렉토리 설정
const screenshotDir = path.resolve(__dirname, '../../screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
}

// 테스트 시작 전에 엑셀 파일에서 데이터 로드
test.beforeAll(async () => {
    searchCases = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../data/test_case.json'), 'utf-8')
  );
});


test('엑셀 기반 상품 검색 테스트', async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);

    for (const { tc_id, search_term } of searchCases) {
        if (!tc_id || !search_term) continue;

        // 검색어로 상품 검색
        await page.goto('/main');
        await page.setViewportSize({ width: 1280, height: 720 });

        // 로그 테스트 케이스 ID 및 검색어
        await mainPage.searchGoods(search_term);
        await page.waitForLoadState('networkidle');

        // 검색 결과 확인
        const url = page.url();
        const isSearchURL = url.includes(encodeURIComponent(search_term));
        expect(isSearchURL).toBe(true);
        expect(await searchPage.isGoodsSearchResultVisible(search_term)).toBe(true);

        // 스크린샷 저장
        const safeSearchTerm = search_term.replace(/[\/:*?"<>|]/g, '_');
        const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
        await page.screenshot({ path: screenshotPath });
    }
});
