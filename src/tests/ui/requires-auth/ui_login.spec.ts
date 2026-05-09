import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { MainPage } from '../../../pages/MainPage';
import { LoginPage } from '../../../pages/LoginPage';


dotenv.config();

const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;

test.skip(process.env.CI === 'true', 'Skip in CI');
test('로그인 후 메인 버튼 확인 테스트', async ({ page }, testInfo) => {
    // 페이지 객체 생성
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    // 마켓컬리 메인 페이지 접속
    await mainPage.openMainPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    // 로그인 수행
    await mainPage.clickLoginButton();
    await loginPage.login(kurly_id, kurly_pw);

    // 로그인 성공 여부 확인
    const loggedIn = await mainPage.isLoggedIn();
    expect(loggedIn).toBeTruthy();
});
