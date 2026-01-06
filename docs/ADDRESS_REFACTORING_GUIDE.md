# 주소 검색 기능 리팩토링 가이드 📝

## 📌 개요
주소 검색 테스트 코드를 Page Object Pattern과 상수화를 적용하여 리팩토링하는 가이드입니다.

---

## 1️⃣ 이미 완료된 작업 ✅

### `src/constants/addressConstants.ts` 생성 완료

```typescript
/**
 * 주소 검색 관련 상수
 */
export const ADDRESS_CONSTANTS = {
    // iframe title 속성
    IFRAME_TITLE_OUTER: '우편번호서비스 레이어 프레임',
    IFRAME_TITLE_INNER: '우편번호 검색 프레임',

    // 버튼 텍스트
    BUTTON_ADDRESS_SEARCH: '주소 검색',
    BUTTON_SEARCH: '검색',
    BUTTON_SAVE: '저장',
    BUTTON_CONFIRM: /확인|확정|confirm/i,

    // 검색창 placeholder
    PLACEHOLDER_SEARCH_BOX: /검색할 도로명/,

    // 예시 텍스트
    EXAMPLE_TEXT: '예) 판교역로 166, 분당 주공, 백현동',

    // 테스트 데이터 ID
    INPUT_BOX_TEST_ID: 'input-box'
} as const;
```

---

## 2️⃣ MainPage.ts 수정 작업

### 🔧 Step 1: import 추가

**파일**: `src/pages/MainPage.ts`

**기존 코드**:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
```

**수정 후**:
```typescript
import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ADDRESS_CONSTANTS } from '../constants/addressConstants';
```

---

### 🔧 Step 2: 주소 검색 메서드 추가

**위치**: `isLoggedIn()` 메서드 아래에 추가

```typescript
// ===== Private Helper: iframe 접근 =====
private getAddressIframe(popup: Page): FrameLocator {
    const firstFrame = popup.frameLocator(
        `iframe[title="${ADDRESS_CONSTANTS.IFRAME_TITLE_OUTER}"]`
    );
    const secondFrame = firstFrame.frameLocator(
        `iframe[title="${ADDRESS_CONSTANTS.IFRAME_TITLE_INNER}"]`
    );
    return secondFrame;
}

// ===== 주소 검색 관련 Public 메서드 =====

/**
 * 주소 검색 팝업을 열고 주소를 검색합니다
 * @param address 검색할 주소 (예: '방이동', '판교역로 166')
 * @returns popup과 addressFrame 객체
 */
async searchAddressInPopup(address: string) {
    // popup 대기
    const popupPromise = this.page.waitForEvent('popup');
    await this.page.getByRole('button', {
        name: ADDRESS_CONSTANTS.BUTTON_ADDRESS_SEARCH,
        exact: true
    }).click();
    const popup = await popupPromise;

    // iframe 참조
    const addressFrame = this.getAddressIframe(popup);

    // 주소 검색
    const searchBox = addressFrame.getByRole('textbox', {
        name: ADDRESS_CONSTANTS.PLACEHOLDER_SEARCH_BOX
    });
    await searchBox.fill(address);
    await addressFrame.getByRole('button', {
        name: ADDRESS_CONSTANTS.BUTTON_SEARCH
    }).click();

    // 검색 결과 대기 (안정적)
    await addressFrame.getByRole('button').first().waitFor({ state: 'visible' });

    return { popup, addressFrame };
}

/**
 * 검색 결과에서 주소를 선택하고 상세주소를 입력한 후 저장합니다
 * @param popup 주소 검색 팝업 Page 객체
 * @param addressFrame iframe FrameLocator
 * @param addressName 선택할 주소 이름 (예: '서울 송파구 가락로 232')
 * @param detailAddress 상세 주소 (예: '222', '1층')
 */
async selectAddressInPopup(
    popup: Page,
    addressFrame: FrameLocator,
    addressName: string,
    detailAddress: string
) {
    // 주소 선택
    await addressFrame.getByRole('button', {
        name: new RegExp(addressName)
    }).click();

    // 상세 주소 입력
    if (detailAddress) {
        await popup.getByTestId(ADDRESS_CONSTANTS.INPUT_BOX_TEST_ID).fill(detailAddress);
    }

    // 저장
    await popup.getByRole('button', {
        name: ADDRESS_CONSTANTS.BUTTON_SAVE
    }).click();
}

/**
 * 저장된 주소가 표시되는지 확인합니다
 * @param expectedAddress 확인할 주소 문자열
 * @returns 주소가 보이면 true
 */
async verifyAddressDisplayed(expectedAddress: string): Promise<boolean> {
    const addressLocator = this.page.getByText(expectedAddress, { exact: false });
    return await addressLocator.isVisible();
}
```

---

## 3️⃣ 테스트 파일 작성

### 📁 파일 위치
`src/tests/ui/ui_address_search.spec.ts`

### ✅ 전체 코드 (리팩토링 완료)

```typescript
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { MainPage } from '../../pages/MainPage';

test('주소 검색 기능 테스트', async ({ page }) => {
    allure.description('주소 검색 팝업에서 주소를 검색하고 선택하여 저장하는 기능 테스트');

    // 테스트 데이터
    const TEST_DATA = {
        search: '방이동',
        expected: '서울 송파구 가락로 232',
        detail: '222'
    };

    const mainPage = new MainPage(page);

    await allure.step('마켓컬리 메인 페이지 접속', async () => {
        await page.goto('https://www.kurly.com/main');
    });

    await allure.step('주소 검색 및 선택', async () => {
        // 주소 검색 팝업 열고 검색
        const { popup, addressFrame } = await mainPage.searchAddressInPopup(TEST_DATA.search);

        // 주소 선택 및 상세주소 입력 후 저장
        await mainPage.selectAddressInPopup(
            popup,
            addressFrame,
            TEST_DATA.expected,
            TEST_DATA.detail
        );
    });

    await allure.step('저장된 주소 확인', async () => {
        await page.goto('https://www.kurly.com/main');

        // 주소 버튼 클릭하여 저장된 주소 확인
        await mainPage.clickAdressButton();

        const isVisible = await mainPage.verifyAddressDisplayed(TEST_DATA.expected);
        expect(isVisible).toBe(true);

        // 스크린샷 저장
        const screenshot = await page.screenshot();
        await allure.attachment('주소 검색 완료', screenshot, 'image/png');
    });
});
```

---

## 4️⃣ 변경 사항 요약

### ✅ Before (기존 코드)
```typescript
// 중복된 iframe locator
const firstFrame = page.frameLocator('iframe[title="우편번호서비스 레이어 프레임"]');
const secondFrame = firstFrame.frameLocator('iframe[title="우편번호 검색 프레임"]');

// 하드코딩된 문자열
await page.getByRole('button', { name: '주소 검색' }).click();
await secondFrame.getByRole('textbox', { name: /검색할 도로명/ }).fill('방이동');

// 안정적이지 않은 대기
await page.waitForTimeout(3000);

// 중복된 스크린샷
await page.screenshot({ path: 'screenshots/address_search.png' });
await allure.attachment('주소 검색 스크린샷', Buffer.from(await page.screenshot()), 'image/png');
```

### ✅ After (리팩토링 후)
```typescript
// 상수화
import { ADDRESS_CONSTANTS } from '../constants/addressConstants';

// 메서드로 캡슐화
const { popup, addressFrame } = await mainPage.searchAddressInPopup('방이동');
await mainPage.selectAddressInPopup(popup, addressFrame, '서울 송파구 가락로 232', '222');

// 안정적인 대기
await addressFrame.getByRole('button').first().waitFor({ state: 'visible' });

// 스크린샷 중복 제거
const screenshot = await page.screenshot();
await allure.attachment('주소 검색 완료', screenshot, 'image/png');
```

---

## 5️⃣ 테스트 실행 방법

```bash
# 디버그 폴더 테스트 제외하고 실행
npx playwright test src/tests/ui/ui_address_search.spec.ts

# headed 모드로 실행 (브라우저 보면서)
npx playwright test src/tests/ui/ui_address_search.spec.ts --headed

# 디버그 모드
npx playwright test src/tests/ui/ui_address_search.spec.ts --debug
```

---

## 6️⃣ 체크리스트 ✅

작업 완료 후 확인:

- [ ] `src/constants/addressConstants.ts` 파일 존재 확인
- [ ] `MainPage.ts`에 import 추가됨
- [ ] `MainPage.ts`에 3개 메서드 추가됨
  - [ ] `getAddressIframe()`
  - [ ] `searchAddressInPopup()`
  - [ ] `selectAddressInPopup()`
  - [ ] `verifyAddressDisplayed()`
- [ ] `ui_address_search.spec.ts` 리팩토링 완료
- [ ] 테스트 실행 성공
- [ ] git commit 완료

---

## 7️⃣ 예상 이슈 & 해결법

### ❌ 이슈 1: popup 찾지 못함
```
Error: page.waitForEvent: Timeout waiting for event "popup"
```

**해결법**:
- 주소 검색 버튼이 modal로 열리는지 확인
- selector가 변경되었는지 확인: `await page.getByRole('button', { name: '주소 검색' })`

---

### ❌ 이슈 2: iframe 찾지 못함
```
Error: Frame not found
```

**해결법**:
- iframe title이 변경되었는지 개발자 도구로 확인
- `addressConstants.ts`의 title 수정

---

### ❌ 이슈 3: 주소 버튼 클릭 실패
```
Error: locator.click: Test timeout
```

**해결법**:
- MainPage의 `adressButton` selector 확인
- CSS 클래스가 변경되었을 가능성 → Codegen으로 재확인

---

## 8️⃣ 추가 개선 아이디어 (선택)

### 💡 테스트 데이터 별도 파일로 분리

```typescript
// src/testdata/addressTestData.ts
export const ADDRESS_TEST_DATA = {
    BANGI: {
        search: '방이동',
        expected: '서울 송파구 가락로 232',
        detail: '222'
    },
    PANGYO: {
        search: '판교역로 166',
        expected: '경기 성남시 분당구 판교역로 166',
        detail: '카카오 아지트'
    }
};
```

### 💡 여러 주소로 테스트 (Data-Driven)

```typescript
import { ADDRESS_TEST_DATA } from '../../testdata/addressTestData';

for (const [name, data] of Object.entries(ADDRESS_TEST_DATA)) {
    test(`주소 검색 - ${name}`, async ({ page }) => {
        // ... 테스트 로직
        const { popup, addressFrame } = await mainPage.searchAddressInPopup(data.search);
        await mainPage.selectAddressInPopup(popup, addressFrame, data.expected, data.detail);
    });
}
```

---

## 9️⃣ 참고 자료

### 핵심 개념
- **popup**: 새 창(별도 Page 객체) → 파라미터로 전달 필요
- **modal**: 같은 페이지 overlay → `this.page`로 접근 가능
- **iframe**: 페이지 내부의 독립적인 document → `frameLocator()` 사용

### Playwright 공식 문서
- [Frames](https://playwright.dev/docs/frames)
- [Popup/New Page](https://playwright.dev/docs/pages#handling-new-pages)
- [Page Object Model](https://playwright.dev/docs/pom)

---

## 🎯 최종 목표

**리팩토링 후 코드의 장점:**
1. ✅ 코드 재사용성 향상 (다른 테스트에서도 사용 가능)
2. ✅ 유지보수 용이 (selector 변경 시 한 곳만 수정)
3. ✅ 가독성 향상 (테스트 의도가 명확)
4. ✅ 포트폴리오 어필 (Page Object Pattern 적용 증명)

---

**작업 화이팅! 🚀**

궁금한 점 있으면 언제든 물어보세요!
