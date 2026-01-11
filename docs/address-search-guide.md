# 주소 검색 테스트 자동화 가이드

## 📖 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술적 도전과제](#기술적-도전과제)
3. [테스트 전략](#테스트-전략)
4. [구현 방법](#구현-방법)
5. [실무 vs 포트폴리오](#실무-vs-포트폴리오)
6. [면접 대비](#면접-대비)

---

## 프로젝트 개요

### 🎯 목적
마켓컬리의 **주소 검색 기능**(다음 우편번호 서비스 연동)을 Playwright로 자동화하고, **이중 iframe 구조 처리** 문제를 해결하는 프로젝트입니다.

### 주요 특징
- ✅ 다음 우편번호 서비스 팝업 처리
- ✅ 이중 iframe 구조 자동 탐색
- ✅ 비동기 로딩 안정적 처리
- ✅ 3가지 접근법 제시 (Simple / Full / API)

---

## 기술적 도전과제

### 1. 이중 iframe 구조

```
Window (kurly.com)
  └── iframe (Kurly Main App)
        └── Popup Window (주소 검색 팝업)
              └── iframe (Daum Postcode Service)
```

**문제점:**
- 팝업 내부에 iframe 존재
- 메인 페이지도 iframe 구조
- 상세주소 입력 필드 접근 어려움

**해결 방법:**
```typescript
// ❌ frameLocator 사용 (실패)
const frame = popup.frameLocator('iframe#daumPostcodeLayer');
await frame.locator('#region_name').fill('주소');
// Timeout 발생!

// ✅ frames() 사용 (성공)
const frames = popup.frames();
const addressFrame = frames.find(f => f.url().includes('postcode')) || frames[1];
await addressFrame.waitForSelector('#region_name', { timeout: 15000 });
await addressFrame.locator('#region_name').fill('주소');
```

---

### 2. 비동기 iframe 로딩

**문제점:**
- iframe 로딩 타이밍을 예측할 수 없음
- 요소가 준비되기 전에 접근 시도 → Timeout

**해결 방법:**
```typescript
// ✅ waitForSelector로 명시적 대기
await addressFrame.waitForSelector('#region_name', {
    state: 'visible',
    timeout: 15000
});

// ✅ 충분한 대기 시간 설정
await popup.waitForTimeout(3000); // iframe 로딩 대기
```

---

### 3. 외부 서비스 의존성

**문제점:**
- 다음 우편번호 서비스는 외부에서 제어
- UI 변경 시 우리 테스트 깨짐
- 유지보수 비용 高

**해결 방법:**
```typescript
// ✅ 연동만 확인하는 Simple 버전
test('주소 검색 팝업 열림 확인', async ({ page }) => {
    const popup = await page.waitForEvent('popup');
    expect(popup.url()).toContain('postcode'); // 연동 확인만!
});

// ✅ 핵심 로직은 API로 검증
test('주소 저장 API 테스트', async ({ request }) => {
    const response = await request.post('/api/address', {
        data: { address: '판교역로 6-3', detail: '101동 101호' }
    });
    expect(response.status()).toBe(200);
});
```

---

## 테스트 전략

### 📊 3가지 접근법 비교

| 접근법 | 범위 | 복잡도 | 안정성 | 속도 | 유지보수 | 실무 추천 |
|--------|------|--------|--------|------|----------|----------|
| **Simple E2E** | 팝업 연동 확인 | ⭐ | ⭐⭐⭐⭐⭐ | 10초 | ⭐⭐⭐⭐⭐ | ✅✅ |
| **Full E2E** | 전체 플로우 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 45초 | ⭐ | ❌ |
| **API Test** | 주소 저장 로직 | ⭐ | ⭐⭐⭐⭐⭐ | 2초 | ⭐⭐⭐⭐⭐ | ✅✅✅ |

### 권장 조합

**실무에서:**
```
Simple E2E (팝업 연동) + API Test (저장 로직) = 최적의 조합
```

**포트폴리오에서:**
```
Simple + Full + API 모두 포함 = 다양한 접근법 이해도 증명
```

---

## 구현 방법

### 1️⃣ Simple E2E (실무 추천)

**목적:** 다음 우편번호 서비스가 정상적으로 연동되는지만 확인

```typescript
test('주소 검색 팝업 열림 확인', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');

    const mainpage = new MainPage(page);
    await mainpage.hoverAddressButton();

    // 팝업 열림 확인
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: '주소 검색' }).click();
    const popup = await popupPromise;

    // 다음 우편번호 서비스인지 확인
    expect(popup.url()).toContain('postcode');

    await popup.close();
});
```

**장점:**
- ✅ 간단하고 빠름 (10초)
- ✅ 외부 의존성 최소
- ✅ 깨질 가능성 낮음
- ✅ 유지보수 쉬움

**단점:**
- ❌ 전체 플로우 검증 못 함
- ❌ 실제 주소 입력까지 테스트 안 함

---

### 2️⃣ Full E2E (학습용)

**목적:** iframe 처리 등 기술적 도전과제 해결 능력 증명

```typescript
test('주소 검색 전체 플로우', async ({ page }) => {
    await page.goto('https://www.kurly.com/main');

    let popup: any;

    // 1. 팝업 열기
    await mainpage.hoverAddressButton();
    const [newPopup] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: '주소 검색' }).click()
    ]);
    popup = newPopup;
    await popup.waitForLoadState('networkidle');
    await popup.waitForTimeout(3000); // iframe 로딩 대기

    // 2. 팝업 내 iframe에서 주소 검색
    const frames = popup.frames();
    const addressFrame = frames.find(f => f.url().includes('postcode')) || frames[1];

    await addressFrame.waitForSelector('#region_name', { timeout: 15000 });
    await addressFrame.locator('#region_name').fill('판교역로 6-3');
    await addressFrame.locator('button.btn_search').click();

    // 3. 검색 결과에서 선택
    await addressFrame.waitForSelector('.list_post_item', { timeout: 10000 });
    await addressFrame.locator('.list_post_item[data-addr="경기 성남시 분당구 판교역로 6-3"]')
        .locator('.main_road .link_post')
        .click();

    // 4. 원래 페이지에서 상세주소 입력
    await page.bringToFront();
    await page.waitForTimeout(3000);

    // 메인 페이지도 iframe 구조 처리
    const pageFrames = page.frames();
    let detailInput = null;

    for (let i = 0; i < pageFrames.length; i++) {
        const input = pageFrames[i].locator('input[placeholder*="나머지"]').first();
        const isVisible = await input.isVisible().catch(() => false);

        if (isVisible) {
            detailInput = input;
            break;
        }
    }

    await detailInput?.fill('101동 101호');

    // 5. 저장
    await page.getByRole('button', { name: /저장/ }).click();
});
```

**장점:**
- ✅ 완전한 E2E 검증
- ✅ iframe 처리 능력 증명
- ✅ 실제 사용자 플로우 재현

**단점:**
- ❌ 복잡함 (코드 50줄+)
- ❌ 느림 (45초)
- ❌ 깨지기 쉬움
- ❌ 유지보수 어려움

---

### 3️⃣ API Test (가장 추천)

**목적:** 핵심 비즈니스 로직(주소 저장)을 빠르고 안정적으로 검증

```typescript
test('주소 저장 API 테스트', async ({ request }) => {
    const response = await request.post('/api/user/address', {
        data: {
            zipcode: '13536',
            address: '경기 성남시 분당구 판교역로 6-3',
            detailAddress: '101동 101호'
        },
        headers: {
            'Authorization': 'Bearer test_token'
        }
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.address.roadAddress).toContain('판교역로');
    expect(data.address.detailAddress).toBe('101동 101호');
});
```

**장점:**
- ✅ 매우 빠름 (2초)
- ✅ 안정적 (외부 의존성 0)
- ✅ 간단함
- ✅ 핵심 로직 검증

**단점:**
- ❌ UI 테스트 아님
- ❌ 사용자 경험 검증 못 함

---

## 실무 vs 포트폴리오

### 🏢 실무에서는?

**접근법:** Simple E2E + API Test 조합

```typescript
// ✅ CI/CD 파이프라인에 포함
test('주소 검색 연동 확인', async ({ page }) => {
    // 팝업만 열리는지 확인 (10초)
});

test('주소 저장 API 검증', async ({ request }) => {
    // 핵심 로직 검증 (2초)
});

// ❌ CI/CD에서 제외 (수동 실행만)
test.skip('주소 검색 전체 플로우', async ({ page }) => {
    // Full E2E는 너무 느리고 불안정
});
```

**이유:**
- 빠르고 안정적인 테스트만 CI에 포함
- 외부 의존성 최소화
- 유지보수 비용 절감
- 핵심 로직은 API로 검증

---

### 🎨 포트폴리오에서는?

**접근법:** Simple + Full + API 모두 포함

```
📦 tests/ui/
├── address-search-simple.spec.ts     (실무용 - 메인으로 보여주기)
├── address-search-full.spec.ts       (학습용 - 기술력 어필)
└── address-search-api.spec.ts        (실무용 - 핵심 로직)
```

**README.md에 명시:**
```markdown
## 왜 3가지 버전을 만들었나요?

1. **Simple E2E**: 실무에서 실제로 사용할 안정적인 테스트
2. **Full E2E**: iframe 처리 등 기술적 도전과제 해결 능력 검증
3. **API Test**: 핵심 로직을 빠르고 안정적으로 검증

**실무 적용 시 추천**: Simple E2E + API Test 조합
**포트폴리오 목적**: 문제 해결 능력과 실무 감각을 동시에 보여주기
```

**이유:**
- 다양한 접근법 이해도 증명
- 기술적 깊이 보여주기
- Trade-off 이해도 어필
- 실무 감각 증명

---

## 면접 대비

### Q1: 왜 iframe 처리를 이렇게 복잡하게 했나요?

**A**:
처음에는 `frameLocator()`를 사용했으나 비동기 로딩 타이밍 이슈로 요소를 찾지 못하는 문제가 발생했습니다.

이를 해결하기 위해:
1. `frames()` API로 실제 로드된 frame 객체에 직접 접근
2. `waitForSelector()`로 명시적 대기 추가
3. URL 패턴 매칭으로 올바른 frame 찾기

하지만 **실무에서는 이런 복잡한 테스트보다 Simple E2E + API 테스트 조합을 추천**합니다. 외부 서비스(다음 우편번호)의 UI 변경에 영향을 덜 받고, 유지보수 비용이 훨씬 낮기 때문입니다.

---

### Q2: Full E2E를 왜 만들었나요?

**A**:
크게 두 가지 목적이 있었습니다:

1. **기술적 가능성 검증**
   - iframe 처리, 비동기 로딩 등 복잡한 시나리오 해결 능력 증명
   - Playwright의 다양한 API 활용 경험

2. **학습 목적**
   - 실무에서 만날 수 있는 어려운 문제를 미리 경험
   - 문제 해결 과정 문서화

포트폴리오에 Simple과 Full 두 가지를 모두 포함해 **"문제를 다양한 관점에서 볼 줄 알고, trade-off를 이해하고 있다"**는 것을 보여주고 싶었습니다.

---

### Q3: 테스트가 깨지면 어떻게 대응하나요?

**A**:
각 테스트 유형별로 다르게 접근합니다:

**E2E Full (iframe 처리)**
- 외부 의존성으로 깨지기 쉬우므로 **CI에서 제외**
- 수동 실행으로 주기적 검증
- 깨지면 다음 우편번호 서비스 UI 변경 확인

**E2E Simple (팝업 연동)**
- 팝업 URL만 확인하므로 **비교적 안정적**
- CI에 포함하여 매 배포 전 검증
- 깨지면 연동 자체 문제이므로 즉시 대응

**API Test (주소 저장)**
- 내부 로직이므로 **가장 안정적**
- CI의 메인 검증 수단
- 깨지면 실제 버그이므로 배포 중단

또한 **실패 시 스크린샷과 trace 파일**을 자동으로 수집하도록 설정해 빠른 디버깅이 가능합니다.

---

### Q4: 실무에서 이 테스트를 어떻게 활용하시겠습니까?

**A**:

**단기적 (1-3개월)**
- Simple E2E + API Test를 **CI/CD 파이프라인**에 통합
- 배포 전 필수 검증 항목으로 설정
- 매일 밤 **스케줄 실행**으로 Smoke 테스트
- Slack 알림으로 실패 시 즉시 통보

**중기적 (3-6개월)**
- **Visual Regression 테스트** 추가 (UI 변경 감지)
- **성능 테스트** 통합 (페이지 로딩 시간 측정)
- **크로스 브라우저 테스트** 확대 (Chrome, Safari, Firefox)

**장기적 (6개월+)**
- 테스트 커버리지 **80% 이상** 달성
- 자동화된 회귀 테스트로 **QA 시간 50% 절감**
- 테스트 결과 **데이터 분석**으로 취약 영역 파악

**팀 협업**
- QA 팀과 테스트 케이스 **주간 리뷰**
- 개발팀에 테스트 실패 **즉시 알림** (Slack)
- **월간 테스트 리포트** 공유 (커버리지, 실패율, 속도)

---

### Q5: 왜 다음 우편번호 서비스를 직접 테스트하지 않나요?

**A**:

**테스트 피라미드 원칙**에 따라 외부 서비스는 연동만 확인합니다:

```
우리가 제어 가능한 것    → API Test (핵심)
우리가 제어 불가능한 것  → 연동만 확인 (Simple E2E)
```

**이유:**
1. **다음이 이미 테스트함**: 다음 우편번호 서비스는 자체 QA 프로세스 있음
2. **UI 변경 대응 불가**: 다음에서 UI 바꾸면 우리 테스트 깨짐
3. **유지보수 비용**: Full E2E는 관리 비용이 너무 높음
4. **핵심 집중**: 우리의 비즈니스 로직(주소 저장)에 리소스 집중

대신 **연동 여부만 확인**하고, **실제 저장 로직은 API로 검증**하는 것이 효율적입니다.

---

## 📚 추가 학습 자료

- [Playwright Frames 문서](https://playwright.dev/docs/frames)
- [iframe 처리 베스트 프랙티스](./iframe-challenge.md)
- [테스트 전략 상세](./test-strategy.md)
- [실무 가이드](./실무-vs-포트폴리오.md)

---

**작성일**: 2026-01-11
**버전**: 1.0
