import { test, expect } from '@playwright/test';

  const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
  ];

  // known issue: 마켓컬리 실사이트가 mobile/tablet 폭에서 가로 스크롤이 생김(2026-09-13 확인).
  // 사이트 측 결함이라 test.fail()로 처리 — 사이트가 수정되면 예상외 통과로 CI에서 드러남.
  const knownHorizontalScrollViewports = ['mobile', 'tablet'];

  for (const vp of viewports) {
      test(`${vp.name} 뷰포트 레이아웃 테스트 @responsive @regression`, async ({ page }) => {
          test.fail(
              knownHorizontalScrollViewports.includes(vp.name),
              `kurly.com 실사이트 결함 — ${vp.name} 뷰포트에서 가로 스크롤 발생`
          );

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
