import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../../../pages/LoginPage';
import { MainPage } from '../../../pages/MainPage';
import { GoodsPage } from '../../../pages/GoodsPage';
import { SearchPage } from '../../../pages/SearchPage';


dotenv.config();

test('상품 찜하기 버튼 후 찜하기에 포함되어 있는지 확인', async ({ page }) => {
    const loginpage = new LoginPage(page);
    const mainPage = new MainPage(page);
    const goodsPage = new GoodsPage(page);
    const searchPage = new SearchPage(page);
    const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
    const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;

    // 마켓컬리 메인 페이지 접속 및 로그인
    await page.goto('https://www.kurly.com/main');
    await mainPage.clickLoginButton();
    await loginpage.login(kurly_id, kurly_pw);
    await page.waitForTimeout(3000);

    // 상품 검색 후 찜하기 버튼 클릭
    await mainPage.searchGoods('과자');
    await searchPage.clickGoodsByIndex(0);
    await goodsPage.clickLikeButton();

    // 찜한후 찜 성공 toast 메시지 확인
    const isLikeVisible = await goodsPage.isCompletedLikeGoodsVisible();
    expect(isLikeVisible).toBeTruthy();

    // 스크린샷 저장
    const screenshotPath = 'screenshots/favorite.png';
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
});
