import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright'; // ✅ Allure 첨부용
import { getNowString } from '../../src/utils/dataFormat';
import fs from 'fs';
import path from 'path';

test('🔲 공백 입력 시, 팝업 노출 확인', async ({ page }, testInfo) => {
  // 💬 테스트 설명 추가
  allure.description('검색창에 아무것도 입력하지 않고 Enter 입력 시, "검색어를 입력해주세요" 팝업이 노출되는지 확인');

  await page.goto('https://www.kurly.com/main');
  await page.setViewportSize({ width: 1280, height: 720 });

  const searchBox = page.locator('input[placeholder="검색어를 입력해주세요"]');
  await searchBox.fill('');
  await searchBox.press('Enter');

  // 🔍 팝업 셀렉터 확인
  const popup = page.locator('.popup-content.css-15yaaju.e1k5padi2');
  await expect(popup).toBeVisible({ timeout: 5000 });

  const popupText = await popup.textContent();
  expect(popupText).toContain('검색어를 입력해주세요');

  // 📸 스크린샷 저장 + Allure 첨부
  const now = getNowString();
  const browserName = testInfo.project.name;
  const screenshotName = `blank_search_popup_${browserName}_${now}.png`;
  const screenshotPath = path.join('screenshots', screenshotName);

  // 폴더 없으면 생성
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  await page.screenshot({ path: screenshotPath });

  allure.attachment('공백 검색 팝업 스크린샷', fs.readFileSync(screenshotPath), 'image/png');
});
