import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import * as allure from 'allure-js-commons';



  test('주소 검색 E2E 플로우 테스트 - 간소화', async ({ page }) => {
    allure.description('메인 페이지에서 주소 검색 버튼을 클릭하여 팝업이 정상적으로 열리는지 확인하는 간소화된 E2E 테스트.');
      const mainpage = new MainPage(page);


      await allure.step('마켓컬리 메인 페이지 접속 및 주소 검색 버튼 클릭', async () => {
        await page.goto('https://www.kurly.com/main');
        });

      let popup: any;

      await allure.step('주소 검색 팝업 열기', async () => {
          await mainpage.hoverAddressButton();
          const popupPromise = page.waitForEvent('popup');
          await page.getByRole('button', { name: '주소 검색', exact: true }).click();
          popup = await popupPromise;
          await popup.waitForLoadState('domcontentloaded');
      });

      await allure.step('주소 검색 팝업 URL 검증', async () => {
          await expect(popup).toHaveURL(/https:\/\/www\.kurly\.com\/address\/shipping-address.*/);
    });
});
      