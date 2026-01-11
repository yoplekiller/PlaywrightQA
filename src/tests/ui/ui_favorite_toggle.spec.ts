import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import * as allure from 'allure-js-commons'; // ✅ Allure 첨부용
import { LoginPage } from '../../pages/LoginPage';
import { MainPage } from '../../pages/MainPage';
import { GoodsPage } from '../../pages/GoodsPage';
import { SearchPage } from '../../pages/SearchPage';

dotenv.config(); 

  

test('상품 찜하기 버튼 후 찜하기에 포함되어 있는지 확인', async ({ page }) => {
  allure.description('로그인 후 찜하기 버튼 클릭 시, 찜하기 화면에 정상적으로 표시되는지 확인합니다.');
  
  const loginpage = new LoginPage(page);
  const mainPage = new MainPage(page);
  const goodsPage = new GoodsPage(page);
  const searchPage = new SearchPage(page);
  const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
  const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;
  
  
  await allure.step('마켓컬리 메인 페이지 접속 및 로그인', async () => {
    await page.goto('https://www.kurly.com/main');
    await mainPage.clickLoginButton();
    await loginpage.login(kurly_id, kurly_pw);
    await page.waitForTimeout(3000); // 로그인 완료 대기
  }
);

  await allure.step('상품 검색 후 찜하기 버튼 클릭', async () =>{
    await mainPage.searchGoods('과자');
    await searchPage.clickGoodsByIndex(0); // 첫 번째 상품 클릭
    await goodsPage.clickLikeButton();
     
  }
);
  await allure.step('찜한후 찜 성공 toast 메시지 확인', async () => {
    return goodsPage.isCompletedLikeGoodsVisible();

});

    // 스크린샷 저장       
    const screenshotPath = 'screenshots/favorite.png';
    await page.screenshot({ path: screenshotPath });
    // 스크린샷이 저장된 경로를 Allure에 첨부
    await allure.attachment('찜하기 스크린샷', Buffer.from(await page.screenshot()), 'image/png');
    // 스크린샷이 저장된 경로를 콘솔에 출력
    console.log(`Screenshot saved at: ${screenshotPath}`);
    
});