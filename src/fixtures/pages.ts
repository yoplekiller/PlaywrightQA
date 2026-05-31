import { test as base, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { GoodsPage } from '../pages/GoodsPage';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { PickPage } from '../pages/PickPage';
import { SearchPage } from '../pages/SearchPage';
import { attachLocatorDiagnostics } from '../utils/locatorDiagnostics';

type PageFixtures = {
  cartPage: CartPage;
  goodsPage: GoodsPage;
  loginPage: LoginPage;
  mainPage: MainPage;
  pickPage: PickPage;
  searchPage: SearchPage;
};

export const test = base.extend<PageFixtures>({
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  goodsPage: async ({ page }, use) => {
    await use(new GoodsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  pickPage: async ({ page }, use) => {
    await use(new PickPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
});

test.afterEach(async ({ page }, testInfo) => {
  await attachLocatorDiagnostics(page, testInfo);
});

export { expect };
