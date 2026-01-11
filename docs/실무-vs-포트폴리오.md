# 실무 vs 포트폴리오 접근법

## 📖 목차
1. [개요](#개요)
2. [실무에서의 접근법](#실무에서의-접근법)
3. [포트폴리오에서의 접근법](#포트폴리오에서의-접근법)
4. [비교표](#비교표)
5. [실제 사례](#실제-사례)
6. [추천 전략](#추천-전략)

---

## 개요

같은 테스트라도 **실무**와 **포트폴리오**에서는 목적이 다르기 때문에 접근 방법이 달라야 합니다.

### 핵심 차이

| 구분 | 실무 | 포트폴리오 |
|------|------|------------|
| **목적** | 안정적인 배포, 버그 조기 발견 | 기술력 증명, 학습 과정 공유 |
| **우선순위** | 속도, 안정성, 유지보수 | 다양성, 깊이, 문제 해결 능력 |
| **복잡도** | 최소화 | 적절한 복잡도 유지 |
| **문서화** | 간단한 주석 | 상세한 README + 기술 문서 |

---

## 실무에서의 접근법

### 🎯 목표

- ✅ 빠르고 안정적인 테스트
- ✅ 최소한의 유지보수 비용
- ✅ CI/CD 파이프라인 통합
- ✅ 핵심 비즈니스 로직 검증

### 전략

#### 1. 테스트 피라미드 준수

```
        ┌──────────────┐
        │  E2E (10%)   │  ← 핵심 플로우만 (Smoke Test)
        │              │
        ├──────────────┤
        │Integration   │  ← API 테스트 (주요 로직)
        │   (30%)      │
        ├──────────────┤
        │  Unit Test   │  ← Component 테스트 (세부 로직)
        │   (60%)      │
        └──────────────┘
```

**이유:**
- E2E는 느리고 깨지기 쉬움 → 최소화
- Unit/API는 빠르고 안정적 → 중점

#### 2. 외부 의존성 최소화

```typescript
// ✅ 실무: 외부 서비스는 연동만 확인
test('주소 검색 팝업 열림 확인', async ({ page }) => {
    const popup = await page.waitForEvent('popup');
    expect(popup.url()).toContain('postcode'); // 다음 우편번호 연동 확인만
    await popup.close();
});

// ❌ 실무에서 지양: 외부 서비스 내부까지 테스트
test('다음 우편번호에서 주소 검색', async ({ page }) => {
    // iframe 처리, 검색, 결과 선택 등...
    // → 다음에서 UI 바꾸면 우리 테스트 깨짐!
});
```

**이유:**
- 외부 서비스(다음 우편번호)는 우리가 제어 못 함
- UI 변경 시 우리 테스트 깨질 수 있음

#### 3. API 테스트 우선

```typescript
// ✅ 실무: 핵심 로직은 API로 검증
test('주소 저장 API 테스트', async ({ request }) => {
    const response = await request.post('/api/user/address', {
        data: {
            zipcode: '13536',
            address: '경기 성남시 분당구 판교역로 6-3',
            detailAddress: '101동 101호'
        }
    });

    expect(response.status()).toBe(200);
    expect(response.body().address.roadAddress).toContain('판교역로');
});
```

**장점:**
- 빠름 (2초)
- 안정적 (외부 의존성 0)
- 핵심 비즈니스 로직 검증

#### 4. CI/CD 최적화

```yaml
# .github/workflows/playwright-test.yaml

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      # ✅ 빠른 테스트만 CI에 포함
      - name: Run Smoke Tests
        run: npm run test:smoke  # Simple E2E만

      - name: Run API Tests
        run: npm run test:api    # API 테스트

      # ❌ 느린 테스트는 제외
      # - name: Run Full E2E
      #   run: npm run test:e2e:full  # 수동 실행만
```

#### 5. 실무 코드 예시

```typescript
// ✅ 실무 스타일: 간단하고 안정적
import { test, expect } from '@playwright/test';

test.describe('주소 검색 기능', () => {
    test('주소 검색 팝업 열림 확인', async ({ page }) => {
        await page.goto('https://www.kurly.com/main');

        const popupPromise = page.waitForEvent('popup');
        await page.getByRole('button', { name: '주소 검색' }).click();
        const popup = await popupPromise;

        // 연동 확인만
        expect(popup.url()).toContain('postcode');
        await popup.close();
    });

    test('주소 저장 API 검증', async ({ request }) => {
        const response = await request.post('/api/address', {
            data: { address: '판교역로 6-3', detail: '101동 101호' }
        });

        expect(response.status()).toBe(200);
    });
});
```

---

## 포트폴리오에서의 접근법

### 🎯 목표

- ✅ 기술적 깊이 증명
- ✅ 문제 해결 능력 어필
- ✅ 다양한 접근법 이해도
- ✅ Trade-off 판단 능력

### 전략

#### 1. 다양한 레벨의 테스트 제시

```
📦 tests/ui/address-search/
├── simple.spec.ts          ← 실무용 (간단, 안정적)
├── full.spec.ts            ← 학습용 (복잡, 기술력 증명)
└── api.spec.ts             ← 실무용 (핵심 로직)
```

**README.md에 명시:**
```markdown
## 왜 3가지 버전을 만들었나요?

### Simple E2E (simple.spec.ts)
- **목적**: 실무에서 실제로 사용할 안정적인 테스트
- **범위**: 다음 우편번호 팝업 연동 확인만
- **장점**: 빠르고 안정적, 유지보수 쉬움

### Full E2E (full.spec.ts)
- **목적**: iframe 처리 등 기술적 도전과제 해결 능력 검증
- **범위**: 팝업 → 검색 → 선택 → 상세주소 입력 → 저장
- **단점**: 복잡하고 느림, 외부 의존성 높음

### API Test (api.spec.ts)
- **목적**: 핵심 비즈니스 로직을 빠르고 안정적으로 검증
- **범위**: 주소 저장 API 호출 및 응답 검증

**실무 적용 시 권장**: Simple + API 조합
**포트폴리오 목적**: 문제를 다양한 관점에서 이해하고 있음을 증명
```

#### 2. 문제 해결 과정 문서화

```markdown
# docs/iframe-challenge.md

## 시도한 방법들

### ❌ 시도 1: frameLocator() 사용
- **시도**: `popup.frameLocator('iframe#id')`
- **결과**: Timeout 에러
- **실패 이유**: 비동기 로딩 타이밍 이슈

### ❌ 시도 2: frameLocator() + waitForTimeout
- **시도**: 3초 대기 후 frameLocator 사용
- **결과**: 여전히 실패
- **실패 이유**: 고정 대기 시간으로는 부족

### ✅ 시도 3: frames() + 동적 탐색
- **시도**: frames() API로 실제 frame 직접 접근
- **결과**: 성공!
- **성공 이유**: waitForSelector + URL 패턴 매칭
```

**장점:**
- 단순히 "했다"가 아니라 "어떻게 했는지" 보여줌
- 실패 과정도 학습의 일부로 포함
- 문제 해결 능력 증명

#### 3. Trade-off 분석 포함

```markdown
## 접근법 비교

| 항목 | Simple E2E | Full E2E | API Test |
|------|-----------|----------|----------|
| **속도** | 10초 | 45초 | 2초 |
| **안정성** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **복잡도** | 낮음 | 높음 | 낮음 |
| **유지보수** | 쉬움 | 어려움 | 쉬움 |
| **외부 의존성** | 낮음 | 높음 | 없음 |

### 왜 Full E2E는 실무에서 비추천인가?
1. 유지보수 비용 高 (외부 서비스 UI 변경 시 깨짐)
2. 실행 시간 長 (CI/CD 병목)
3. 불안정함 (iframe 타이밍 이슈)

하지만 **기술 검증 및 학습 목적**으로는 가치 있음!
```

#### 4. 포트폴리오 코드 예시

```typescript
// ✅ 포트폴리오 스타일: 다양성 + 깊이
import { test, expect } from '@playwright/test';

test.describe('주소 검색 - Simple (실무 추천)', () => {
    test('다음 우편번호 팝업 연동 확인', async ({ page }) => {
        // 간단하고 안정적인 테스트
        // ...
    });
});

test.describe('주소 검색 - Full (기술 검증)', () => {
    test('전체 플로우 E2E 테스트', async ({ page }) => {
        // iframe 처리 포함한 복잡한 테스트
        // 문제 해결 과정 주석으로 설명
        // ...
    });
});

test.describe('주소 검색 - API (핵심 로직)', () => {
    test('주소 저장 API 검증', async ({ request }) => {
        // 비즈니스 로직 검증
        // ...
    });
});
```

---

## 비교표

### 세부 비교

| 항목 | 실무 | 포트폴리오 |
|------|------|------------|
| **테스트 범위** | 핵심 기능만 | 다양한 시나리오 |
| **복잡도** | 최소화 | 적절한 복잡도 |
| **문서화** | 간단한 주석 | README + 기술 문서 |
| **테스트 개수** | 5-10개 (핵심만) | 15-30개 (다양하게) |
| **CI/CD** | 빠른 테스트만 | 모든 테스트 실행 옵션 |
| **코드 스타일** | 실용적 | 설명적 (주석 多) |
| **실패 처리** | 즉시 수정 | 학습 자료로 활용 |

---

## 실제 사례

### Case 1: 대기업 QA 팀

**상황:**
- 배포 주기: 주 1회
- 테스트 실행 시간: 최대 30분
- 팀 규모: QA 5명

**접근법:**
```typescript
// ✅ 채택한 방법: Simple E2E + API
- E2E: 핵심 10개 시나리오만 (10분)
- API: 100개 엔드포인트 (5분)
- Total: 15분

// ❌ 시도했다가 포기: Full E2E
- 이유: 너무 느림 (1시간+), 자주 깨짐
- 대안: 수동 QA로 월 1회 검증
```

**결과:**
- CI/CD 속도 4배 향상 (1시간 → 15분)
- 안정성 향상 (성공률 95% → 99%)
- 유지보수 시간 70% 감소

---

### Case 2: 스타트업 개발자

**상황:**
- 배포 주기: 하루 3-5회
- 테스트 실행 시간: 최대 5분
- 팀 규모: 개발자 3명 (QA 없음)

**접근법:**
```typescript
// ✅ 채택한 방법: API 중심
- API: 핵심 30개 (3분)
- E2E: Smoke Test 5개 (2분)
- Total: 5분

// ❌ E2E 최소화
- 이유: 개발 속도 > 완벽한 검증
```

**결과:**
- 빠른 피드백 루프
- 개발자 생산성 향상
- Critical Bug 조기 발견

---

### Case 3: 포트폴리오 프로젝트

**상황:**
- 목적: QA 엔지니어 포지션 지원
- 타겟: 대기업 + 스타트업

**접근법:**
```typescript
// ✅ 3가지 모두 포함
tests/
├── simple.spec.ts     // 실무 감각 증명
├── full.spec.ts       // 기술력 증명
└── api.spec.ts        // 효율성 증명

docs/
├── test-strategy.md   // 전략적 사고
├── iframe-challenge.md // 문제 해결
└── 실무-vs-포트폴리오.md // 실무 이해도
```

**결과:**
- 면접에서 "실무 감각이 있다" 평가
- 기술 깊이 인정
- 오퍼 3곳 획득

---

## 추천 전략

### 실무에서

#### ✅ DO
1. **Simple E2E + API 조합** 사용
2. **빠른 테스트 우선** (CI/CD 병목 방지)
3. **외부 의존성 최소화** (연동만 확인)
4. **유지보수 비용 고려** (복잡도 최소화)
5. **핵심 비즈니스 로직 집중**

#### ❌ DON'T
1. 모든 것을 E2E로 테스트
2. 외부 서비스 내부까지 테스트
3. 완벽함 추구 (80-20 법칙)
4. 느린 테스트를 CI에 포함
5. 깨지기 쉬운 테스트 유지

---

### 포트폴리오에서

#### ✅ DO
1. **다양한 접근법** 제시 (Simple + Full + API)
2. **문제 해결 과정** 상세히 문서화
3. **Trade-off 분석** 포함
4. **실패 사례도 공유** (학습 과정)
5. **실무 적용 시 권장사항** 명시
6. **README를 상세하게** 작성

#### ❌ DON'T
1. 복잡한 코드만 자랑
2. 완벽한 테스트만 강조
3. 실패 숨기기
4. 코드만 올리고 설명 없음
5. "했다"만 쓰고 "왜, 어떻게" 없음

---

### 포트폴리오 README 템플릿

```markdown
# 주소 검색 테스트 자동화

## 프로젝트 배경
[왜 이 프로젝트를 시작했는지]

## 기술적 도전과제
- 이중 iframe 구조 처리
- 비동기 로딩 문제 해결
- 외부 서비스 의존성 관리

## 해결 방법
### 시도 1: frameLocator (실패)
- 문제: ...
- 해결: ...

### 시도 2: frames() (성공!)
- 방법: ...
- 이유: ...

## 3가지 접근법
1. Simple E2E (실무용)
2. Full E2E (학습용)
3. API Test (핵심용)

## 실무 적용 시 권장
Simple + API 조합이 최적
- 이유 1: ...
- 이유 2: ...

## 배운 점
- 기술적 학습
- 전략적 학습
- 실무 감각

## 참고 문서
- [iframe 처리 기술 문서](./docs/iframe-challenge.md)
- [테스트 전략](./docs/test-strategy.md)
```

---

## 체크리스트

### 실무 프로젝트

- [ ] 테스트 실행 시간 < 30분
- [ ] CI/CD 통합 완료
- [ ] 핵심 기능 80% 커버리지
- [ ] 외부 의존성 최소화
- [ ] API 테스트 중심

### 포트폴리오 프로젝트

- [ ] README 상세 작성
- [ ] 기술 문서 3개 이상
- [ ] 다양한 접근법 제시
- [ ] Trade-off 분석 포함
- [ ] 문제 해결 과정 문서화
- [ ] 실무 권장사항 명시
- [ ] 실행 가능한 코드
- [ ] 스크린샷/데모 포함

---

## 최종 정리

| 목적 | 선택 |
|------|------|
| **빠른 배포** | Simple E2E + API |
| **안정적인 CI/CD** | API 중심 |
| **취업 준비** | Simple + Full + API 모두 |
| **기술력 증명** | Full E2E + 문서화 |
| **실무 감각** | Simple E2E + Trade-off 분석 |

**핵심 메시지:**
- 실무는 **실용성과 효율성**
- 포트폴리오는 **다양성과 깊이**
- 둘 다 **Trade-off 이해**가 중요!

---

**작성일**: 2026-01-11
**버전**: 1.0
