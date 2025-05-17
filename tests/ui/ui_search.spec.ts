import { test, expect } from '@playwright/test';
// import { loadExcelFile } from '../../src/excel_loader';
// const searchCases = loadExcelFile('./tests/data/test_case.xlsx')
//   .filter(tc => tc.tc_id && tc.search_term);

const searchCases = [
  { tc_id: '001', search_term: '사과' },
  { tc_id: '002', search_term: '바나나' },
];

test.describe('검색 테스트', () => {
  for (const { tc_id, search_term } of searchCases) {
    test(`TC ${tc_id}: '${search_term}' 검색 테스트`, async ({ page }) => {
      await page.goto('https://www.kurly.com/main');
      const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
      await searchBox.fill(search_term);
      await searchBox.press('Enter');
      await page.waitForTimeout(4000);
      const safeSearchTerm = search_term.replace(/[\\/:"*?<>|]+/g, '');
      await page.screenshot({ path: `screenshots/${tc_id}_${safeSearchTerm}.png` });
    });
  }
});