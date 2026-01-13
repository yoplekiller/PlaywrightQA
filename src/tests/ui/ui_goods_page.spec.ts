import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';

test('상품 상세페이지 진입 확인', async ({ page }) => {
  allure.description('특정 상품 상세페이지에 진입 후, 해당 상품의 화면이 정상적으로 표시되는지 확인하는 테스트.');

  const mainpage = new MainPage(page);
  const searchpage = new SearchPage(page);


    await allure.step('마켓컬리 메인 페이지 접속', async () => {
      await page.goto('https://www.kurly.com/main');
    });
    
    await allure.step('상품 검색 및 상세페이지 진입', async () => {
      await mainpage.searchGoods('바나나');
      await searchpage.clickFirstGoods();
    });

    await allure.step('상품 상세페이지 진입 확인', async () => {
      const productTitle = page.getByText(/바나나/).first();
      await productTitle.waitFor({ state: 'visible', timeout: 5000 });
      await expect(productTitle).toBeVisible();
    });

});

