import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright'; // ✅ deprecated이지만 지금은 사용 가능
import { loadExcelFile } from '../../src/utils/excel_loader';
import path from 'path';
import fs from 'fs';

let searchCases: { tc_id: string; search_term: string }[] = [];

const screenshotDir = path.resolve(__dirname, '../../screenshots');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}

test.beforeAll(async () => {
  searchCases = await loadExcelFile(
    path.resolve(__dirname, '../data/test_case.xlsx')
  );
  console.log('엑셀 데이터:', searchCases);
});

test('🔍 엑셀 기반 상품 검색 테스트', async ({ page }) => {
  for (const { tc_id, search_term } of searchCases) {
    if (!tc_id || !search_term) continue;

    // 📝 Allure 테스트 케이스명 기록
    allure.label('testCaseId', tc_id); 
    allure.description(`검색어 "${search_term}"에 대한 상품 노출 여부 확인`);

    await page.goto('https://www.kurly.com/main');
    const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
    await searchBox.fill(search_term);
    await searchBox.press('Enter');
    await page.waitForTimeout(4000); // 로딩 안정화용 대기

    // ✅ 검색어 포함 텍스트가 화면에 존재하는지 확인
    const matchingProduct = page.locator(`text=${search_term}`);
    await expect(matchingProduct.first()).toBeVisible({ timeout: 5000 });

    // 📸 스크린샷 저장 및 Allure 첨부
    const safeSearchTerm = search_term.replace(/[\/:*?"<>|]/g, '_');
    const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
    await page.screenshot({ path: screenshotPath });

    // ✅ Allure에 첨부
    const imageBuffer = fs.readFileSync(screenshotPath);
    allure.attachment(`📸 ${search_term} 검색 결과`, imageBuffer, 'image/png');
  }

  await page.close();
});

test.afterAll(() => {
  console.log('모든 테스트가 완료되었습니다.');
});
