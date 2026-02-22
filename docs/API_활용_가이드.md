# Playwright 실무 API 활용 가이드

마켓컬리 API 키 없이, 브라우저가 이미 호출하는 요청을 활용하는 실무 패턴 3가지.

---

## 1. storageState로 로그인 처리

한 번만 UI 로그인하고, 쿠키/세션을 파일로 저장해서 모든 테스트에서 재사용한다.

### global.setup.ts (새 파일)

```ts
import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // UI로 딱 한 번만 로그인
    await page.goto('https://www.kurly.com/main');
    await page.getByRole('link', { name: /로그인/i }).click();
    await page.getByRole('textbox', { name: /아이디를 입력해주세요/i })
        .fill(process.env.KURLY_TEST_USER_EMAIL!);
    await page.getByRole('textbox', { name: /비밀번호를 입력해주세요/i })
        .fill(process.env.KURLY_TEST_USER_PASSWORD!);
    await page.getByRole('button', { name: /로그인/i }).click();
    await page.waitForURL('**/main**');

    // 세션 저장 → 이미 있는 auth.json에 저장
    await context.storageState({ path: 'auth.json' });
    await browser.close();
}

export default globalSetup;
```

### playwright.config.ts 수정

```ts
export default defineConfig({
    globalSetup: require.resolve('./global.setup'),  // 추가
    // ...기존 설정
    projects: [
        // 로그인 없이 돌리는 테스트
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            testIgnore: '**/requires-auth/**',
        },
        // 로그인 필요한 테스트 → storageState 사용
        {
            name: 'chromium-auth',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'auth.json',  // 저장된 세션 자동 주입
            },
            testMatch: '**/requires-auth/**',
        },
    ],
});
```

### requires-auth 테스트 변경

```ts
// Before: 매번 로그인
test('찜하기 테스트', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');
    await mainPage.clickLoginButton();
    await loginPage.login(id, pw);  // 매번 5~10초 소모
    // ... 테스트 로직
});

// After: 로그인 코드 없이 바로 시작 (이미 로그인된 상태)
test('찜하기 테스트', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');
    // 이미 로그인된 상태 → 바로 테스트
    // ... 테스트 로직
});
```

---

## 2. waitForResponse로 API 응답 검증

UI 동작 시 브라우저가 보내는 API 응답을 가로채서 데이터까지 검증한다.

### ui_search.spec.ts 개선

```ts
test('검색 시 API 응답 데이터 검증', async ({ page }) => {
    const mainpage = new MainPage(page);

    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    // UI 검색과 동시에 API 응답 캡처
    const [response] = await Promise.all([
        page.waitForResponse(
            resp => resp.url().includes('/search') && resp.status() === 200
        ),
        mainpage.searchGoods('바나나'),
    ]);

    // API 응답 데이터 검증
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.data?.length).toBeGreaterThan(0);  // 검색 결과가 있는지

    // UI도 같이 검증
    expect(page.url()).toContain(encodeURIComponent('바나나'));
});
```

### ui_sort_price.spec.ts 개선

```ts
test('낮은 가격순 정렬 - API 응답과 UI 동시 검증', async ({ page }) => {
    const mainPage = new MainPage(page);
    const searchPage = new SearchPage(page);

    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    await mainPage.searchGoods('사과');
    await page.waitForURL(/search/, { timeout: 10000 });

    // 정렬 클릭 시 API 응답 캡처
    const [response] = await Promise.all([
        page.waitForResponse(
            resp => resp.url().includes('/search') && resp.status() === 200
        ),
        searchPage.clickSortTab('낮은 가격순'),
    ]);

    // API 레벨 검증: 서버가 정렬된 데이터를 주는지 확인
    const body = await response.json();
    const apiPrices = body.data?.map((item: any) => item.price || item.sales_price);
    for (let i = 0; i < apiPrices.length - 1; i++) {
        expect(apiPrices[i]).toBeLessThanOrEqual(apiPrices[i + 1]);
    }

    // UI 레벨 검증: 화면에 표시되는 가격도 확인
    const uiPrices = await searchPage.getProductPrices();
    expect(uiPrices.length).toBeGreaterThanOrEqual(3);
    for (let i = 0; i < uiPrices.length - 1; i++) {
        expect(uiPrices[i]).toBeLessThanOrEqual(uiPrices[i + 1]);
    }
});
```

### ui_goods_cart.spec.ts 개선

```ts
test('장바구니 담기 - API 응답 검증 포함', async ({ page }) => {
    const mainpage = new MainPage(page);
    const searchpage = new SearchPage(page);
    const goodsPage = new GoodsPage(page);
    const cartpage = new CartPage(page);

    await page.goto('https://www.kurly.com/main');
    await page.setViewportSize({ width: 1280, height: 720 });

    await mainpage.searchGoods('과자');
    await page.waitForTimeout(2000);
    await searchpage.clickFirstGoods();
    await expect(page.locator('h1').first()).toBeVisible();

    // 장바구니 담기 시 API 응답 검증
    const [cartResponse] = await Promise.all([
        page.waitForResponse(
            resp => resp.url().includes('/cart') && resp.request().method() === 'POST'
        ),
        goodsPage.clickAddGoodsInCartButton(1),
    ]);

    // API가 성공 응답을 줬는지 확인
    expect(cartResponse.status()).toBe(200);

    // UI에서도 장바구니에 상품이 있는지 확인
    await page.goto('https://www.kurly.com/cart');
    const isVisible = await cartpage.isVisibleGoodsInCart('[오리온] 초코칩쿠키 256g');
    expect(isVisible).toBe(true);
});
```

---

## 3. page.route()로 Mock/에러 시나리오

API를 Mock하여 재현하기 어려운 에러/엣지케이스를 테스트한다.

### ui_network_error.spec.ts 개선

```ts
test('API 500 에러 시 에러 UI 표시 확인', async ({ page }) => {
    // 검색 API만 500으로 Mock
    await page.route('**/search/**', route => {
        route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal Server Error' }),
        });
    });

    await page.goto('https://www.kurly.com/main');
    await page.getByRole('textbox', { name: /검색어를 입력해주세요/i }).fill('사과');
    await page.keyboard.press('Enter');

    // 에러 상태에서 UI가 적절히 반응하는지 검증
    const errorOrEmpty = page.locator('text=/검색 결과가 없습니다|오류|다시 시도/i');
    await expect(errorOrEmpty).toBeVisible({ timeout: 5000 });

    await page.screenshot({ path: 'network-error.png' });
});

test('검색 결과 0건 시 빈 상태 UI 확인', async ({ page }) => {
    // 검색 결과가 빈 배열인 경우를 Mock
    await page.route('**/search/**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: [], total: 0 }),
        });
    });

    await page.goto('https://www.kurly.com/main');
    await page.getByRole('textbox', { name: /검색어를 입력해주세요/i }).fill('사과');
    await page.keyboard.press('Enter');

    // 빈 결과 UI가 나오는지 확인
    const emptyState = page.locator('text=/검색 결과가 없습니다/i');
    await expect(emptyState).toBeVisible({ timeout: 5000 });
});

test('네트워크 타임아웃 시 동작 확인', async ({ page }) => {
    await page.route('**/api/**', route => route.abort('timedout'));

    await page.goto('https://www.kurly.com/main');

    // 페이지가 크래시 없이 로드되는지 확인
    const searchBox = page.getByRole('textbox', { name: /검색어를 입력해주세요/i });
    await expect(searchBox).toBeVisible({ timeout: 10000 });
});
```

---

## 파일별 변경 요약

| 파일 | 변경 내용 |
|------|-----------|
| `global.setup.ts` | 새로 생성. UI 로그인 1회 → `auth.json` 저장 |
| `playwright.config.ts` | `globalSetup` 추가, `chromium-auth` 프로젝트 추가 |
| `requires-auth/*.spec.ts` | 로그인 코드 전부 제거 (storageState가 처리) |
| `ui_search.spec.ts` | `waitForResponse`로 검색 API 응답 검증 추가 |
| `ui_sort_price.spec.ts` | API 응답 가격 정렬 + UI 가격 정렬 이중 검증 |
| `ui_goods_cart.spec.ts` | 장바구니 POST API 응답 상태 검증 추가 |
| `ui_network_error.spec.ts` | assertion 추가 (현재는 스크린샷만 찍고 끝남) |

---

## 핵심 포인트

- 마켓컬리 API 키 없이도 `waitForResponse`로 브라우저가 호출하는 요청을 잡을 수 있다
- `page.route()`로 Mock하면 에러/엣지케이스를 자유롭게 재현할 수 있다
- `storageState`로 로그인을 1회로 줄이면 테스트 속도와 안정성이 크게 향상된다
- 이 3가지가 외부 서비스 대상 Playwright 테스트의 실무 표준 패턴이다
