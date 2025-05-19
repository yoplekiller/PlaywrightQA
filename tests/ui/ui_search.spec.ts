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
  }
});