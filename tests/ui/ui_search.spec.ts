import { test, expect } from '@playwright/test';
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

    await page.goto('https://www.kurly.com/main');
    const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
    await searchBox.fill(search_term);
    await searchBox.press('Enter');
    await page.waitForTimeout(4000); // Wait for 2 seconds to observe the change

    
    const matchingProduct = page.locator(`text=${search_term}`);
    await expect(matchingProduct.first()).toBeVisible({ timeout: 5000 });




    // 스크린샷 저장
    const safeSearchTerm = search_term.replace(/[\/:*?"<>|]/g, '_');
    const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 스크린샷 경로: ${screenshotPath}`);
    console.log(`Test Case ID: ${tc_id}, Search Term: ${search_term}, Results Count: ${count}`);
  }
  await page.close();
});
test.afterAll(() => {
  console.log('모든 테스트가 완료되었습니다.');
});