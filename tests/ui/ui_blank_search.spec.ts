import { test, expect } from '@playwright/test';
import { getNowString } from '../../src/utils/dataFormat';
import fs from 'fs';
import path from 'path';

test('🔲 공백 입력 시, 팝업 노출 확인', async ({ page }, testInfo) => {
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
  await page.waitForTimeout(2000); // 페이지 로딩 대기

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
});
