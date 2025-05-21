import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import path from 'path';
import fs from 'fs';
import { getNowString } from '../../src/utils/dataFormat';

test('🛒 상품 상세페이지 진입 확인', async ({ page }, testInfo) => {
  allure.description('검색어 "바나나"로 검색한 뒤 상품을 클릭하여 상세페이지에 진입하고, 상품명이 정확히 노출되는지 확인');

  const now = getNowString();
  const browserName = testInfo.project.name;

  const screenshot = async (step: string) => {
    const filename = `product_detail_${step}_${browserName}_${now}.png`;
    const screenshotPath = path.join('screenshots', filename);

    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    await page.screenshot({ path: screenshotPath });

    const imageBuffer = fs.readFileSync(screenshotPath);
    allure.attachment(`📸 ${step}`, imageBuffer, 'image/png');
  };

  await test.step('메인 페이지 접속', async () => {
    await page.goto('https://www.kurly.com/main');
    await screenshot('홈페이지');
  });

  await test.step('검색창에 "바나나" 입력', async () => {
    const searchBox = page.getByRole('textbox', { name: '검색어를 입력해주세요' });
    await searchBox.click();
    await searchBox.fill('바나나');
    await searchBox.press('Enter');
  });

  await test.step('검색 결과 로딩 대기', async () => {
    await page.waitForLoadState('networkidle');
    await screenshot('검색결과');
  });

  await test.step('검색 결과에서 상품 클릭', async () => {
    const productLink = page.getByRole('link', {
      name: /바나나|실속 바나나|담기/i,
    });
    await expect(productLink).toBeVisible();
    await productLink.click();
  });

  await test.step('상세 페이지에서 상품명 확인', async () => {
    const productTitle = page.getByText('[KF365] 실속 바나나 1kg 2종');
    await expect(productTitle).toBeVisible();
    await screenshot('상세페이지');
  });
});
