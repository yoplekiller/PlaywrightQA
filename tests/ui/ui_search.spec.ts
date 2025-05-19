import { test, expect } from '@playwright/test';
import { loadExcelFile } from '../../src/utils/excel_loader';
import path from 'path';

let searchCases: { tc_id: string; search_term: string }[] = [];

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
    await page.screenshot({ path: `screenshots/search_${safeSearchTerm}.png` });
    console.log(`Test Case ID: ${tc_id}, Search Term: ${search_term}, Results Count: ${count}`);
}
  await page.close();
} );
test.afterAll(async () => {
  console.log('모든 테스트가 완료되었습니다.');
} );