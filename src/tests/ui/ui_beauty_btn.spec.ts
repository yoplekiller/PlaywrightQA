import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
// Update the import path below if the actual path is different
import { MainPage } from '../../pages/MainPage';

test('🔘 뷰티컬리 버튼 동작 테스트', async ({ page }) => {
  allure.description('메인 페이지에서 뷰티컬리 버튼을 클릭했을 때, 올바른 URL로 이동하는지 확인하는 테스트입니다.');

    // 페이지 객체 생성
    const mainPage = new MainPage(page);

    await allure.step('마켓컬리 메인 페이지 접속', async () => {
        await page.goto('https://www.kurly.com/main');
    });

    await allure.step('뷰티컬리 버튼 클릭 및 URL 검증', async () => {
        await mainPage.clickBeautyButton();
    });


  // URL 검증
    await allure.step('뷰티컬리 페이지로 이동했는지 확인', async () => {
        await expect(page).toHaveURL('https://www.kurly.com/main/beauty');
        await page.waitForTimeout(2000); // 페이지 로딩 대기

  //스크린샷 저장
      const screenshotPath = 'screenshots/beauty_kurly_click.png';
      await page.screenshot({ path: screenshotPath });
 });
});