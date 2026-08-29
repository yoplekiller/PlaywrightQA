import { test, expect } from '@playwright/test';

// 헤더(GNB) 영역만 스코프로 잡는 이유: 메인 페이지 전체를 캡처하면 배너 회전/가격 변동으로
// 매번 diff가 나서 신뢰할 수 없는 테스트가 됨(과거 시도 실패 원인). 헤더는 로고/검색창/
// 로그인/찜/카테고리 탭으로만 구성돼 리뉴얼 전까진 거의 안 바뀌는 안정적인 영역이라
// "레이아웃이 의도치 않게 깨졌는가"를 판단하기에 적합함.
//
// clip 좌표(x:0, y:42, width:1280, height:156)는 1920x1080 뷰포트에서 헤더 컨테이너의
// 실측 bounding box. class 대신 좌표로 고정한 이유는 이 사이트가 CSS-in-JS 해시 클래스를
// 써서 배포마다 클래스명이 바뀔 수 있기 때문.
test('메인 페이지 헤더 시각적 회귀 검사 @visual', async ({ page }) => {
    await page.goto('/main');

    const searchBox = page.getByRole('textbox', { name: /^검색어를 입력해주세요$/i });
    await searchBox.waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot('header.png', {
        clip: { x: 0, y: 42, width: 1280, height: 156 },
        maxDiffPixelRatio: 0.02,
        animations: 'disabled',
    });
});
