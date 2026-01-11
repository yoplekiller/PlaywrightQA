# iframe 처리 기술 문서

## 📖 목차
1. [문제 상황](#문제-상황)
2. [시도한 방법들](#시도한-방법들)
3. [최종 해결 방법](#최종-해결-방법)
4. [핵심 학습 내용](#핵심-학습-내용)
5. [코드 예시](#코드-예시)

---

## 문제 상황

### 이중 iframe 구조

마켓컬리 주소 검색 시 다음과 같은 **복잡한 이중 iframe 구조**를 만났습니다:

```
Window (kurly.com)
  │
  └── iframe (Kurly Main App - 메인 페이지)
        │
        ├── ... 다른 컨텐츠들
        │
        └── Popup Window (주소 검색)
              │
              └── iframe (Daum Postcode Service)
                    │
                    ├── 검색 입력 필드 (#region_name)
                    ├── 검색 버튼 (button.btn_search)
                    └── 검색 결과 (.list_post_item)
```

### 해결해야 할 과제

1. **팝업 내부 iframe 접근**: 주소 검색 팝업 안의 다음 우편번호 iframe
2. **메인 페이지 iframe 접근**: 주소 선택 후 상세주소 입력 필드
3. **비동기 로딩**: iframe이 언제 로드될지 알 수 없음
4. **동적 frame 탐색**: iframe id/name이 고정적이지 않을 수 있음

---

## 시도한 방법들

### ❌ 시도 1: frameLocator() 사용

**코드:**
```typescript
test('주소 검색', async ({ page }) => {
    const popup = await page.waitForEvent('popup');

    // iframe 접근 시도
    const frame = popup.frameLocator('iframe#daumPostcodeLayer');
    await frame.locator('#region_name').fill('판교역로 6-3');
});
```

**에러:**
```
TimeoutError: locator.fill: Timeout 70000ms exceeded.
Call log:
  - waiting for locator('iframe#daumPostcodeLayer')
    .contentFrame()
    .locator('#region_name')
```

**실패 이유:**
- `frameLocator()`는 **즉시 사용 가능한** iframe에만 작동
- iframe이 **비동기로 로딩**되는 경우 찾지 못함
- iframe의 **로딩 완료를 기다리지 않음**

---

### ❌ 시도 2: frameLocator() + waitForTimeout

**코드:**
```typescript
test('주소 검색', async ({ page }) => {
    const popup = await page.waitForEvent('popup');
    await popup.waitForLoadState('networkidle');

    // 3초 대기 후 시도
    await popup.waitForTimeout(3000);

    const frame = popup.frameLocator('iframe#daumPostcodeLayer');
    await frame.locator('#region_name').fill('판교역로 6-3');
});
```

**에러:**
```
TimeoutError: locator.fill: Timeout 70000ms exceeded.
```

**실패 이유:**
- 고정된 대기 시간(3초)으로는 부족할 수 있음
- iframe 셀렉터(`iframe#daumPostcodeLayer`)가 정확하지 않을 수 있음
- `frameLocator`는 여전히 동적 iframe에 취약

---

### ⚠️ 시도 3: 직접 iframe 찾기 (page.frame())

**코드:**
```typescript
test('주소 검색', async ({ page }) => {
    const popup = await page.waitForEvent('popup');

    // iframe을 이름으로 찾기
    const frame = popup.frame({ name: 'daumPostcodeLayer' });
    await frame?.locator('#region_name').fill('판교역로 6-3');
});
```

**에러:**
```
TypeError: Cannot read properties of null
```

**실패 이유:**
- `page.frame()`은 **단일 frame만 반환**
- iframe이 아직 로드되지 않으면 `null` 반환
- 동적 로딩을 기다리지 않음

---

### ✅ 시도 4: frames() + 동적 탐색 (성공!)

**코드:**
```typescript
test('주소 검색', async ({ page }) => {
    const popup = await page.waitForEvent('popup');
    await popup.waitForLoadState('domcontentloaded');
    await popup.waitForLoadState('networkidle');

    // iframe 로딩을 위한 충분한 대기
    await popup.waitForTimeout(3000);

    // ✅ 모든 frame 가져오기
    const frames = popup.frames();
    console.log('전체 frame 개수:', frames.length);

    // ✅ URL 패턴으로 올바른 frame 찾기
    let addressFrame = frames.find(f => f.url().includes('postcode'));

    // 못 찾으면 마지막 frame 사용 (보통 새로 추가된 iframe)
    if (!addressFrame && frames.length > 1) {
        addressFrame = frames[frames.length - 1];
    }

    console.log('대상 frame URL:', addressFrame.url());

    // ✅ 요소가 나타날 때까지 명시적 대기
    await addressFrame.waitForSelector('#region_name', {
        state: 'visible',
        timeout: 15000
    });

    // ✅ 이제 안전하게 접근 가능
    await addressFrame.locator('#region_name').fill('판교역로 6-3');
    await addressFrame.locator('button.btn_search').click();
});
```

**성공 이유:**
- ✅ `frames()`로 **실제 로드된 frame 객체** 직접 다룸
- ✅ `waitForSelector()`로 **명시적 대기**
- ✅ URL 패턴 매칭으로 **동적으로 frame 찾기**
- ✅ 충분한 timeout 설정

---

## 최종 해결 방법

### 핵심 원칙

1. **frames() 사용**: `frameLocator()` 대신 실제 frame 객체 직접 접근
2. **명시적 대기**: `waitForSelector()`로 요소 준비 확인
3. **동적 탐색**: URL 패턴 또는 index로 frame 찾기
4. **충분한 timeout**: 비동기 로딩을 고려한 대기 시간

### 템플릿 코드

```typescript
/**
 * iframe 처리 템플릿
 *
 * @param page - Playwright Page 또는 Popup
 * @param urlPattern - frame URL에 포함될 패턴 (예: 'postcode')
 * @param selector - 찾을 요소의 셀렉터
 * @returns 찾은 Frame 객체
 */
async function findFrameByPattern(
    page: Page,
    urlPattern: string,
    selector: string
) {
    // 1. iframe 로딩 대기
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // 2. 모든 frame 가져오기
    const frames = page.frames();
    console.log(`전체 frame 개수: ${frames.length}`);

    // 3. URL 패턴으로 찾기
    let targetFrame = frames.find(f => f.url().includes(urlPattern));

    // 4. 못 찾으면 fallback (마지막 frame 또는 index 1)
    if (!targetFrame && frames.length > 1) {
        targetFrame = frames[frames.length - 1]; // 또는 frames[1]
    }

    if (!targetFrame) {
        throw new Error(`URL 패턴 "${urlPattern}"을 가진 frame을 찾을 수 없습니다`);
    }

    console.log(`대상 frame URL: ${targetFrame.url()}`);

    // 5. 요소가 나타날 때까지 대기
    await targetFrame.waitForSelector(selector, {
        state: 'visible',
        timeout: 15000
    });

    return targetFrame;
}

// 사용 예시
test('주소 검색', async ({ page }) => {
    const popup = await page.waitForEvent('popup');

    // iframe에서 검색 필드 찾기
    const addressFrame = await findFrameByPattern(
        popup,
        'postcode',
        '#region_name'
    );

    // 이제 안전하게 사용
    await addressFrame.locator('#region_name').fill('판교역로 6-3');
});
```

---

## 핵심 학습 내용

### frameLocator vs frames() 비교

| 항목 | frameLocator() | frames() |
|------|----------------|----------|
| **반환 타입** | FrameLocator (Proxy) | Frame[] (실제 객체) |
| **사용 시점** | iframe이 **즉시** 사용 가능한 경우 | iframe이 **동적 로딩**되는 경우 |
| **대기 방법** | 자동 대기 (제한적) | 수동 대기 (명시적) |
| **유연성** | 낮음 | 높음 |
| **추천 상황** | 정적 iframe | 비동기 iframe, 복잡한 구조 |

### 코드 예시

```typescript
// ❌ frameLocator - 정적 iframe용
const frame = page.frameLocator('iframe#static-frame');
await frame.locator('#input').fill('text');

// ✅ frames() - 동적 iframe용
const frames = page.frames();
const targetFrame = frames.find(f => f.url().includes('pattern'));
await targetFrame.waitForSelector('#input');
await targetFrame.locator('#input').fill('text');
```

---

### waitFor 메서드 비교

| 메서드 | 용도 | 예시 |
|--------|------|------|
| `waitForLoadState('domcontentloaded')` | DOM 로드 대기 | 페이지 기본 구조 준비 |
| `waitForLoadState('networkidle')` | 네트워크 요청 완료 대기 | API 호출 완료 |
| `waitForTimeout(ms)` | 고정 시간 대기 | iframe 로딩 (비추천) |
| `waitForSelector(selector)` | 특정 요소 대기 | 요소가 나타날 때까지 (추천) |

### 권장 순서

```typescript
// ✅ 안전한 iframe 접근 순서
await popup.waitForLoadState('domcontentloaded');  // 1. DOM 준비
await popup.waitForLoadState('networkidle');       // 2. 네트워크 안정
await popup.waitForTimeout(3000);                   // 3. iframe 로딩 여유
const frames = popup.frames();                      // 4. frame 탐색
await frame.waitForSelector('#element');            // 5. 요소 대기
```

---

## 코드 예시

### 전체 플로우 예시

```typescript
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test('주소 검색 전체 플로우', async ({ page }) => {
    const mainpage = new MainPage(page);
    const TEST_ADDRESS = '경기 성남시 분당구 판교역로 6-3';
    const DETAIL_ADDRESS = '101동 101호';

    // ===== 1단계: 팝업 열기 =====
    await page.goto('https://www.kurly.com/main');
    await mainpage.hoverAddressButton();

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: '주소 검색' }).click()
    ]);

    await popup.waitForLoadState('networkidle');
    await popup.waitForTimeout(3000); // iframe 로딩 대기

    // ===== 2단계: 팝업 내 iframe에서 주소 검색 =====
    const popupFrames = popup.frames();
    console.log('팝업 frame 개수:', popupFrames.length);

    // URL로 올바른 frame 찾기
    let addressFrame = popupFrames.find(f => f.url().includes('postcode'));
    if (!addressFrame && popupFrames.length > 1) {
        addressFrame = popupFrames[1];
    }

    if (!addressFrame) {
        throw new Error('주소 검색 iframe을 찾을 수 없습니다');
    }

    console.log('주소 검색 frame URL:', addressFrame.url());

    // 검색 필드가 보일 때까지 대기
    await addressFrame.waitForSelector('#region_name', {
        state: 'visible',
        timeout: 15000
    });

    // 검색
    await addressFrame.locator('#region_name').clear();
    await addressFrame.locator('#region_name').fill('판교역로 6-3');
    await addressFrame.locator('button.btn_search').click();

    // 검색 결과 대기
    await addressFrame.waitForSelector('.list_post_item', {
        state: 'visible',
        timeout: 10000
    });

    // 주소 선택
    await addressFrame.locator(`.list_post_item[data-addr="${TEST_ADDRESS}"]`)
        .locator('.main_road .link_post')
        .click();

    // 팝업 닫힘 대기
    await popup.waitForEvent('close', { timeout: 5000 }).catch(() => {
        console.log('팝업이 자동으로 닫히지 않음');
    });

    // ===== 3단계: 메인 페이지 iframe에서 상세주소 입력 =====
    await page.bringToFront();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const pageFrames = page.frames();
    console.log('메인 페이지 frame 개수:', pageFrames.length);

    // 각 frame에서 상세주소 입력 필드 찾기
    let detailInput = null;
    for (let i = 0; i < pageFrames.length; i++) {
        const input = pageFrames[i].locator('input[placeholder*="나머지"]').first();
        const isVisible = await input.isVisible().catch(() => false);

        if (isVisible) {
            console.log(`Frame ${i}에서 상세주소 필드 발견`);
            detailInput = input;
            break;
        }
    }

    if (!detailInput) {
        await page.screenshot({ path: 'error-detail-input.png' });
        throw new Error('상세주소 입력 필드를 찾을 수 없습니다');
    }

    // 상세주소 입력
    await detailInput.fill(DETAIL_ADDRESS);

    const inputValue = await detailInput.inputValue();
    expect(inputValue).toBe(DETAIL_ADDRESS);

    console.log('✅ 주소 검색 전체 플로우 완료');
});
```

---

### 헬퍼 함수로 추상화

```typescript
/**
 * 모든 frame에서 요소 찾기
 */
async function findElementInFrames(
    page: Page,
    selectors: string[]
): Promise<Locator | null> {
    const frames = page.frames();

    for (let i = 0; i < frames.length; i++) {
        for (const selector of selectors) {
            const element = frames[i].locator(selector).first();
            const isVisible = await element.isVisible().catch(() => false);

            if (isVisible) {
                console.log(`✅ Frame ${i}에서 "${selector}" 발견`);
                return element;
            }
        }
    }

    return null;
}

// 사용 예시
const detailInput = await findElementInFrames(page, [
    'input[placeholder*="나머지"]',
    'input[placeholder*="상세"]',
    'input[name*="detail"]'
]);

if (detailInput) {
    await detailInput.fill('101동 101호');
}
```

---

## 디버깅 팁

### 1. frame 구조 확인

```typescript
const frames = page.frames();
console.log(`총 ${frames.length}개의 frame 발견`);

for (let i = 0; i < frames.length; i++) {
    console.log(`Frame ${i}:`);
    console.log(`  URL: ${frames[i].url()}`);
    console.log(`  Name: ${await frames[i].getAttribute('name').catch(() => 'N/A')}`);
}
```

### 2. 요소 존재 여부 확인

```typescript
const selector = '#region_name';
const exists = await frame.locator(selector).count();
console.log(`"${selector}" 존재 여부: ${exists > 0}`);

if (exists === 0) {
    // 스크린샷 찍기
    await frame.screenshot({ path: 'frame-debug.png' });
}
```

### 3. 모든 input 찾기

```typescript
const allInputs = await frame.locator('input').all();
console.log(`총 ${allInputs.length}개의 input 발견`);

for (let i = 0; i < allInputs.length; i++) {
    const placeholder = await allInputs[i].getAttribute('placeholder').catch(() => '');
    const name = await allInputs[i].getAttribute('name').catch(() => '');
    const type = await allInputs[i].getAttribute('type').catch(() => '');

    console.log(`Input ${i}: type="${type}", name="${name}", placeholder="${placeholder}"`);
}
```

---

## 체크리스트

테스트 작성 시 확인사항:

- [ ] `frames()`를 사용했는가?
- [ ] URL 패턴으로 frame을 찾는가?
- [ ] `waitForSelector()`로 요소 대기를 했는가?
- [ ] timeout을 충분히 설정했는가? (15초 이상)
- [ ] 에러 처리를 했는가? (try-catch 또는 catch(() => {}))
- [ ] 디버깅용 console.log를 추가했는가?
- [ ] 실패 시 스크린샷을 찍는가?

---

## 참고 자료

- [Playwright Frames 공식 문서](https://playwright.dev/docs/frames)
- [FrameLocator API](https://playwright.dev/docs/api/class-framelocator)
- [waitForSelector 옵션](https://playwright.dev/docs/api/class-frame#frame-wait-for-selector)

---

**작성일**: 2026-01-11
**버전**: 1.0
