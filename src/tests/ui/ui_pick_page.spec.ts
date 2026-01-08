import { test, expect } from '@playwright/test';
// Update the import path below if your MainPage file is located elsewhere
import { MainPage } from '../../pages/MainPage';
import { LoginPage } from '../../pages/LoginPage';
import * as allure from 'allure-js-commons';
import { PickPage } from '../../pages/PickPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Pick(찜하기) 버튼 기능 테스트', () => {
    
    const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
    const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;

    test('Pick 버튼 클릭 테스트', async ({ page }) => {
        allure.description('메인 페이지에서 Pick(찜하기) 버튼을 클릭하여 Pick 페이지로 이동하는지 확인하는 테스트');
        
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        // Go to the main page
        await page.goto('https://www.kurly.com/main');

        await allure.step('로그인', async () => {
            await mainPage.clickLoginButton();
            await loginPage.login(kurly_id, kurly_pw);
        });

        await allure.step('찜하기 버튼 클릭', async () => {
            await mainPage.clickLikeButton();
            await page.waitForURL('**/pick/**');
        });

        await allure.step('Pick 페이지로 이동 확인', async () => {
            const currentUrl = page.url();
            const isPicks = currentUrl.includes('pick');
            expect(isPicks).toBe(true);
        });
    });

    test('비로그인 상태에서 Pick 버튼 클릭 시 알럿 노출 확인', async ({ page }) => {
        const mainPage = new MainPage(page);
        const pickPage = new PickPage(page);

        await page.goto('https://www.kurly.com/main');
        await mainPage.clickPickButton();
        await page.waitForSelector('text=로그인하셔야 본 서비스를 이용하실 수 있습니다.');

        // 비로그인 상태면 알럿 노출
        const needLoginAltVisible = await pickPage.isNeedLoginAltVisible();
        expect(needLoginAltVisible).toBe(true);
    });
});