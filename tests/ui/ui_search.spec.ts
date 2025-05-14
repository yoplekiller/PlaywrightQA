import { test, expect } from '@playwright/test';
import { loadExcelFile } from './excel_loader'; // ✅ 한 줄로만 불러오기

const searchCases = loadExcelFile('./test_case.xlsx');

test.describe('엑셀 데이터 기반 검색 테스트', () => {
  for (const { tc_id, search_term } of searchCases) {
    test(`TC ${tc_id}: '${search_term}' 검색 테스트`, async ({ page }) => {
      await page.goto('https://www.kurly.com/main');

      const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
      await searchBox.fill(search_term);
      await searchBox.press('Enter');

      await page.waitForTimeout(4000);

      const productElements = page.locator('span.css-1qfsi3d');

      // 파일명 특수문자 제거
      const safeSearchTerm = search_term.replace(/[\\/:"*?<>|]+/g, '');
      await page.screenshot({ path: `screenshots/${tc_id}_${safeSearchTerm}.png` });
    });
  }
});
