import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

  const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
      test(`${vp.name} 뷰포트 레이아웃 테스트`, async ({ page }) => {
          const mainPage = new MainPage(page);
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await mainPage.openMainPage();

          // 검색창 존재 확인
          const isVisible = await mainPage.isSearchBoxAccessible();
          await expect(isVisible).toBeTruthy();

          await page.screenshot({ path: `responsive-${vp.name}.png` });
      });
  }