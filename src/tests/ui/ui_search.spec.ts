    import { test, expect } from '@playwright/test';
    import * as allure from 'allure-js-commons';
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
    searchCases = await loadExcelFile(
        path.resolve(__dirname, '../data/test_case.xlsx')
    );
    console.log('엑셀 데이터:', searchCases);
    });


    test('🔍 엑셀 기반 상품 검색 테스트', async ({ page }) => {
        const mainpage = new MainPage(page);
        const searchpage = new SearchPage(page);

        // 📝 Allure 테스트 스위트명 기록
        for (const { tc_id, search_term } of searchCases) {
        if (!tc_id || !search_term) continue;

        // 📝 Allure 테스트 케이스명 기록
        allure.label('testCaseId', tc_id); 
        allure.description(`검색어 "${search_term}"에 대한 상품 노출 여부 확인`);
        await allure.step(`검색어 "${search_term}"로 상품 검색`, async () => {

            await page.goto('https://www.kurly.com/main');
            await mainpage.searchGoods(search_term);
            await page.waitForTimeout(2000);

        });

        await allure.step(`검색 결과 확인 `, async () => {
            const url = page.url();
            console.log(`현재 URL: ${url}`);
            const isSearchURL = url.includes(encodeURIComponent(search_term));
            expect(isSearchURL).toBe(true);
            expect(await searchpage.isGoodsSearchResultVisible(search_term)).toBe(true);
    
        });


        // 📸 스크린샷 저장 및 Allure 첨부
        await allure.step(`검색 결과 스크린샷 저장 및 첨부`, async () => {

            const safeSearchTerm = search_term.replace(/[\/:*?"<>|]/g, '_');
            const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
            await page.screenshot({ path: screenshotPath });
        

        // ✅ Allure에 첨부
            const imageBuffer = fs.readFileSync(screenshotPath);
            allure.attachment(`📸 ${search_term} 검색 결과`, imageBuffer, 'image/png');
        });
        }
    });