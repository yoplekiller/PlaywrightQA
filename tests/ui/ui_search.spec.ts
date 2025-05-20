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
});

test('🔍 엑셀 기반 상품 검색 테스트', async ({ page }) => {
  for (const { tc_id, search_term } of searchCases) {
    if (!tc_id || !search_term) continue;

    await page.goto('https://www.kurly.com/main');
    const searchBox = page.getByPlaceholder('검색어를 입력해주세요');
    await searchBox.fill(search_term);
    await searchBox.press('Enter');
    await page.waitForLoadState('networkidle');

    const results = page.locator('[class*=product-card]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);

    const safeSearchTerm = search_term.replace(/[^a-zA-Z0-9]/g, '_');
    const screenshotPath = path.join(screenshotDir, `search_${safeSearchTerm}.png`);
    console.log("📸 스크린샷 경로:", screenshotPath); // ✅ 실제 저장 위치 로그
    await page.screenshot({ path: screenshotPath });
    console.log(`Test Case ID: ${tc_id}, Search Term: ${search_term}, Results Count: ${count}`);
  }

  await page.close(); // ✅ 이제 for 루프 밖에서 정확히 실행됨
});

test.afterAll(async () => {
  console.log('모든 테스트가 완료되었습니다.');
});
