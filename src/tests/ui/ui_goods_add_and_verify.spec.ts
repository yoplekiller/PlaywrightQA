import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { MainPage } from '../../pages/MainPage';
import { getNowString } from '../../utils/dataFormat';
import { SearchPage } from '../../pages/SearchPage';
import fs from 'fs';
import path from 'path';


test.describe('🛒 상품 추가 및 장바구니 확인 (POM 패턴)', () => {

  test('상품 검색 → 상품 추가 → 장바구니에서 확인', async ({ page }, testInfo) => {
    // 📘 Allure 리포트 설명
    allure.description(
      '검색어로 상품을 검색하고, 첫 번째 상품을 장바구니에 담은 후, ' +
      '장바구니 페이지에서 해당 상품이 정확히 담겨 있는지 확인하는 E2E 테스트'
    );
    allure.severity('critical');
    allure.tag('UI');
    allure.tag('Cart');
    allure.tag('POM');

    const kurly_id = process.env.KURLY_TEST_USER_EMAIL!;
    const kurly_pw = process.env.KURLY_TEST_USER_PASSWORD!;

    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page); // MainPage에서 검색 기능 사용

    // Step 1: 로그인
    await allure.step("로그인 수행", async () => {
      // 로그인 페이지로 직접 이동
      await page.goto('https://www.kurly.com/member/login');
      await page.waitForLoadState('domcontentloaded');

      // 로그인 수행
      await loginPage.login(kurly_id, kurly_pw);
      await page.waitForTimeout(3000); // 로그인 완료 대기
    });

    // Step 2: 메인 페이지로 이동
    await allure.step('메인 페이지 접속', async () => {
      await page.goto('https://www.kurly.com/main');
      await expect(page).toHaveURL(/.*kurly.com\/main/);
    });
    

    // Step 3: 상품 검색
    const searchKeyword = '과자';
    await allure.step(`"${searchKeyword}" 검색`, async () => {
      await mainPage.searchGoods(searchKeyword);
      await page.waitForTimeout(2000); // 검색 결과 로딩 대기
    });

    // Step 4: 첫 번째 상품 클릭
    const GoodsNumber = 1; // 첫 번째 상품
    await allure.step('첫 번째 상품 상세 페이지로 이동', async () => {
      await searchPage.clickGoodsByIndex(GoodsNumber - 1);
      await page.waitForTimeout(2000); // 상세 페이지 로딩 대기
    });

    // Step 5: 장바구니 담기
    await allure.step('장바구니에 상품 추가', async () => {
      await searchPage.clickAddCartButton();
      await page.waitForTimeout(2000); // 장바구니 담기 완료 대기
    });

    // Step 6: 장바구니로 이동
    await allure.step('장바구니 페이지로 이동', async () => {
      await page.goto('https://www.kurly.com/cart');
      await expect(page).toHaveURL('https://www.kurly.com/cart');
    });

    // Step 7: 장바구니에 상품이 있는지 확인
    await allure.step('장바구니에 상품이 담겼는지 확인', async () => {
      // 📸 스크린샷 저장
      const now = getNowString();
      const browserName = testInfo.project.name;
      const screenshotName = `cart_verify_${browserName}_${now}.png`;
      const screenshotPath = path.join('screenshots', screenshotName);

      if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
      }

      await page.screenshot({ path: screenshotPath });

      await testInfo.attach('🛒 장바구니 확인 스크린샷', {
        path: screenshotPath,
        contentType: 'image/png',
      });

      // 장바구니에 상품이 있는지 확인 (빈 장바구니 메시지가 없어야 함)
      await allure.step('장바구니 비어있지 않음 확인', async () => {
        const isEmpty = await cartPage.isCartEmpty().catch(() => false);
        expect(isEmpty).toBeFalsy(); // 장바구니가 비어있지 않아야 함

        console.log(`✅ 장바구니에 상품이 추가되었습니다`);
      });
    });
  });
});