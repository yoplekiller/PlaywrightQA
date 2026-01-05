import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import dotenv from 'dotenv';
import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';


dotenv.config(); 

const kurly_id = process.env.kurly_id!;
const kurly_pw = process.env.kurly_pw!;

test('🔐 로그인 후 메인 버튼 확인 테스트', async ({ page }, testInfo) => {
    allure.description('로그인 기능을 사용하여 메인 페이지에 접근한 후, 주요 버튼들이 정상적으로 표시되는지 확인하는 테스트입니다.');

    // 페이지 객체 생성
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await allure.step('마켓컬리 메인 페이지 접속 및 로그인', async () => {
        await page.goto('https://www.kurly.com/main');
    });

    
    await allure.step("로그인 수행", async () => {
        await mainPage.clickLoginButton();
        await loginPage.login(kurly_id, kurly_pw);
    });

    
    await allure.step("로그인 성공 여부 확인", async () => {
        const loggedIn = await mainPage.isLoggedIn();
        expect(loggedIn).toBeTruthy();
    });
});



