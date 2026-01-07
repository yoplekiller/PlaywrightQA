import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
// Make sure to import LoginPage from its module, adjust the path as needed
import { MainPage } from '../../pages/MainPage';

test('주소 검색 기능 테스트', async ({ page }) => {
  allure.description('주소 검색 팝업에서 주소를 검색하고 선택 후 저장하는 기능 테스트');
  
  const TEST_DATA = {
    search: '방이동',
    expected: '서울 송파구 가락로 232',
    detail: '222'
    
  }

  const mainPage = new MainPage(page);

  await allure.step('마켓컬리 메인 페이지 접속', async () => {
      await page.goto('https://www.kurly.com/main');
    });
  
   await allure.step('주소 검색 및 선택', async () => {
        // 주소 검색 팝업 열고 검색
        mainPage.clickAddressButton();
        const { popup, addressIframe } = await mainPage.searchAddressInPopup(TEST_DATA.search);

        // 주소 선택 및 상세주소 입력 후 저장
        await mainPage.selectAddressInPopup(
            popup,
            addressIframe,
            TEST_DATA.expected,
            TEST_DATA.detail
        );
    });

    await allure.step('저장된 주소 확인', async () => {
        // 다시 메인으로 돌아가서 주소 확인
        await page.goto('https://www.kurly.com/main');
        await mainPage.clickAddressButton();
        const isVisible = await mainPage.verifyAddressDisplayed(TEST_DATA.expected);
        expect(isVisible).toBe(true);

        const addressLocator = page.getByText('서울 송파구 가락로 232 (222)');
        await expect(addressLocator).toBeVisible();
    }

  );
}); 