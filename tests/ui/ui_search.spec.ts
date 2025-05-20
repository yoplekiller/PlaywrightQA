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

    // 결과가 보일 때까지 대기
    const results = page.locator('[class*=product-card]');
    const count = await results.count();
    console.log(`검색어 "${search_term}"에 대한 결과 수: ${count}`);

    if (count > 0) {
      await expect(results.first()).toBeVisible({ timeout: 10000 });
    } else {
      console.log(`❗검색 결과 없음: ${search_term}`);
    }

    // 스크린샷 저장
    const safeSearchTerm = search_term.replace(/[^a-zA-Z0-9]/g, '_');
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