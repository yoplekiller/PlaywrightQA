import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { allure } from 'allure-playwright';
import dotenv from 'dotenv';

dotenv.config();

const kurly_id = process.env.kurly_id!;
const kurly_pw = process.env.kurly_pw!;


test('🔐 로그인 후 메인 버튼 확인 테스트', async({page}) => {
    allure.description('로그인 후 마켓컬리, 뷰티컬리 버튼이 정상적으로 노출되는지 확인하는 테스트입니다.');
    
    const loginPage = new LoginPage(page);

    // 마켓컬리 접속
    await page.goto('https://www.kurly.com/');

    // 로그인
    await loginPage.login(kurly_id, kurly_pw);

    // 버튼 확인
    expect(await loginPage.isMarketButtonVisible()).toBe(true);
    expect(await loginPage.isBeautyButtonVisible()).toBe(true);

    // 스크린샷
    await loginPage.takeScreenshot('login-success-buttons');

});