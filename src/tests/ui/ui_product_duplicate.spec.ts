import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { MainPage } from '../../pages/MainPage';
import { SearchPage } from '../../pages/SearchPage';
import { GoodsPage } from '../../pages/GoodsPage';

test('상품 중복 담기 기능 확인', async ({ page }) => {
  allure.description('상품을 장바구니에 중복으로 담기 후, 장바구니에서 수량이 정상적으로 증가하는지 확인하는 테스트.');

    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);
    const goodspage = new GoodsPage(page);
    const addCount = 2 // 몇 번 담을지 설정

    await allure.step('마켓컬리 메인 페이지 접속', async () => {  
      await page.goto('https://www.kurly.com/main');

    }
  );
    await allure.step('검색어 "수박"으로 검색 및 첫 번째 상품 선택', async () => {
      await mainpage.searchGoods('수박');
      await expect(page.getByText('수박')).toBeVisible();
      await searchpage.clickFirstGoods();
    }
  );
    await allure.step('첫 번째 상품 장바구니에 중복 담기 및 수량 확인', async () => {
      await goodspage.clickAddGoodsInCartButton(addCount);
      
      await page.goto('https://www.kurly.com/cart');
      await expect(page).toHaveURL('https://www.kurly.com/cart');

      const quantityLocator = page.getByText(`${addCount}`, { exact: true });
      await expect(quantityLocator).toHaveText(`${addCount}`);
    }

  );
});