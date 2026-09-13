import { test, expect } from '@playwright/test';

  const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
      test(`${vp.name} 뷰포트 레이아웃 테스트 @responsive @regression`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.goto('/main');

          // 검색창 존재 확인
          const searchBox = page.getByRole('textbox', { name: /^검색어를 입력해주세요$/i });
          await expect(searchBox).toBeVisible();

          // 콘텐츠가 뷰포트 밖으로 삐져나가 가로 스크롤이 생기지 않는지 확인
          const hasHorizontalScroll = await page.evaluate(
              () => document.documentElement.scrollWidth > document.documentElement.clientWidth
          );
          expect(hasHorizontalScroll).toBe(false);
      });
  }
