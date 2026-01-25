import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import { PickPage } from '../../pages/PickPage';
import dotenv from 'dotenv';


dotenv.config();

test.describe('Pick(찜하기) 버튼 기능 테스트', () => {

    const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
    const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;

    test('Pick 버튼 클릭 테스트', async ({ page }) => {
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        // 마켓컬리 메인 페이지 접속
        await page.goto('https://www.kurly.com/main');

        // 로그인
        await mainPage.clickLoginButton();
        await loginPage.login(kurly_id, kurly_pw);

        // 찜하기 버튼 클릭
        await mainPage.clickLikeButton();
        await page.waitForURL('**/pick/**');

        // Pick 페이지로 이동 확인
        const currentUrl = page.url();
        const isPicks = currentUrl.includes('pick');
        expect(isPicks).toBe(true);
    });

    test('비로그인 상태에서 Pick 버튼 클릭 시 알럿 노출 확인', async ({ page }) => {
        const mainPage = new MainPage(page);
        const pickPage = new PickPage(page);

        // 마켓컬리 메인 페이지 접속
        await page.goto('https://www.kurly.com/main');

        // Pick 버튼 클릭 및 알럿 노출 확인
        await mainPage.clickPickButton();
        await page.waitForSelector('text=로그인하셔야 본 서비스를 이용하실 수 있습니다.', { timeout: 5000 });
        expect(await pickPage.isNeedLoginAltVisible()).toBe(true);
    });
});
