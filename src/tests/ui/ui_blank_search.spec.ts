import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { MainPage } from '../../pages/MainPage';

test('🔲 공백 입력 시, 팝업 노출 확인', async ({ page }, testInfo) => {
  
  allure.description('메인 페이지 검색창에 공백을 입력하고 검색 시, "검색어를 입력해주세요" 팝업이 정상적으로 노출되는지 확인하는 테스트.');

    const mainpage = new MainPage(page);

    await allure.step('메인 페이지 접속', async () => {
      await page.goto('https://www.kurly.com/main');
      await page.setViewportSize({ width: 1280, height: 720 }); 
    });

    await allure.step('검색창에 공백 입력 후 검색', async () => {
      await mainpage.searchGoods(" ");
    }
  );

  await allure.step('팝업 노출 확인', async () => {
    const popup = page.locator('.popup-content.css-15yaaju.e1k5padi2');
    await expect(popup).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('검색어를 입력해주세요')).toBeVisible();
  });

});
